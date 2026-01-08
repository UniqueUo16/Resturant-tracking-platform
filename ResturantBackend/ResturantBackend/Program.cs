using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using ResturantBackend.Models;


var builder = WebApplication.CreateBuilder(args);

// ✅ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://customresturant.vercel.app",
            "https://resturant-v02.vercel.app",
            "https://resturant-v02-dvpb5hju7-uniqueuos-projects.vercel.app",
            "https://resturant-v02-cmsqypcwn-uniqueuos-projects.vercel.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// ✅ DATABASE CONNECTION
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL") 
                  ?? builder.Configuration["DATABASE_URL"];
if (string.IsNullOrEmpty(databaseUrl))
    throw new Exception("DATABASE_URL is not set");

var uri = new Uri(databaseUrl);
var db = uri.AbsolutePath.Trim('/');
var userInfo = uri.UserInfo.Split(':');
int port = uri.Port > 0 ? uri.Port : 5432;

var connectionString = $"Host={uri.Host};Port={port};Database={db};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

var app = builder.Build();

// ✅ Apply migrations automatically
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
}

// ✅ Middleware
app.UseCors("AllowFrontend");
app.UseStaticFiles();

// ✅ Menu endpoints
app.MapGet("/menujs", async (AppDbContext db) => await db.MenuItems.ToListAsync());
app.MapPost("/menujs", async (AppDbContext db, MenuItem item) =>
{
    db.MenuItems.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/menujs/{item.Id}", item);
});
app.MapPut("/menujs/{id}", async (int id, AppDbContext db, MenuItem update) =>
{
    var item = await db.MenuItems.FindAsync(id);
    if (item is null) return Results.NotFound();

    item.Name = update.Name;
    item.Category = update.Category;
    item.Description = update.Description;
    item.Price = update.Price;
    item.Img = update.Img;

    await db.SaveChangesAsync();
    return Results.Ok(item);
});
app.MapDelete("/menujs/{id}", async (int id, AppDbContext db) =>
{
    var item = await db.MenuItems.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.MenuItems.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// ✅ Other endpoints
app.MapGet("/", () => "🍽️ Welcome to Unique Uo’s Restaurant API!");
app.MapGet("/services", () => new
{
    headingSmall = "Greek Salad",
    headingBig = "Lorem Welcome to Unique Uo’s Restaurant API!",
    description1 = "Greek Salad",
    description2 = "Lorem",
    img1 = "/imgs/service-1.jpg",
    img2 = "/imgs/service-2.jpg"
});
app.MapGet("/story", () => new
{
    storytxt1 = "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    storytxt2 = "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
});

// ✅ Reserve endpoint with SendGrid
app.MapPost("/reserve", async (AppDbContext db, Reservation res) =>
{
    res.Date = res.Date.ToUniversalTime();
    db.Reservations.Add(res);
    await db.SaveChangesAsync();

    // Call Vercel function to send emails
    try
    {
        var vercelFnUrl = "https://resturant-v02.vercel.app/api/send-email";
        using var http = new HttpClient();
        var response = await http.PostAsJsonAsync(vercelFnUrl, res);
        if (!response.IsSuccessStatusCode)
            Console.WriteLine($"❌ Vercel email function failed: {response.StatusCode}");
        else
            Console.WriteLine("✅ Emails sent via Vercel function");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Error calling Vercel function: {ex}");
    }

    return Results.Created($"/reservations/{res.Id}", res);
});


app.Run();

// ✅ MODELS
public class Order
{
    public string CustomerName { get; set; } = string.Empty;
    public List<OrderItem> Items { get; set; } = new();
    public double Total { get; set; }
}

public class OrderItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public double Price { get; set; }
}
