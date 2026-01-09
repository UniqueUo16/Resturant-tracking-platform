using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using ResturantBackend.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

var builder = WebApplication.CreateBuilder(args);

// ========================
// ✅ CORS
// ========================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3001",
            "https://customresturant.vercel.app",
            "https://resturant-v02.vercel.app",
            "https://resturant-v02-dvpb5hju7-uniqueuos-projects.vercel.app",
            "https://resturant-v02-cmsqypcwn-uniqueuos-projects.vercel.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// ========================
// ✅ Controllers
// ========================
builder.Services.AddControllers();

// ========================
// ✅ Database Connection
// ========================
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL") 
                  ?? builder.Configuration["DATABASE_URL"];

if (string.IsNullOrEmpty(databaseUrl))
    throw new Exception("DATABASE_URL is not set");

var uri = new Uri(databaseUrl);
var dbName = uri.AbsolutePath.Trim('/');
var userInfo = uri.UserInfo.Split(':');
int port = uri.Port > 0 ? uri.Port : 5432;

var connectionString = $"Host={uri.Host};Port={port};Database={dbName};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

var app = builder.Build();

// ========================
// ✅ Apply Migrations & Seed Data
// ========================
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.Migrate();

    // Seed menu items if empty
    if (!context.MenuItems.Any())
    {
        context.MenuItems.AddRange(new[]
        {
            new MenuItem { Img = "/imgs/menu-1.png", Name = "Greek Salad", Category = "Fresh", Price = 25.50m, Description = "A refreshing mix of cucumbers, olives, and feta cheese drizzled with olive oil." },
            new MenuItem { Img = "/imgs/menu-2.png", Name = "Pasta Carbonara", Category = "Chef's Special", Price = 30.00m, Description = "Classic Italian pasta with creamy sauce and crispy bacon." },
            new MenuItem { Img = "/imgs/menu-3.png", Name = "Tomato Soup", Category = "Hot", Price = 18.00m, Description = "Creamy tomato soup served with fresh herbs and toast." },
            new MenuItem { Img = "/imgs/menu-4.png", Name = "Beef Steak", Category = "Grilled", Price = 45.00m, Description = "Tender steak grilled to perfection with pepper sauce." },
            new MenuItem { Img = "/imgs/menu-5.png", Name = "Seafood Platter", Category = "Ocean Fresh", Price = 60.00m, Description = "Shrimp, calamari, and crab served with lemon butter." },
            new MenuItem { Img = "/imgs/menu-6.png", Name = "Chocolate Cake", Category = "Dessert", Price = 25.50m, Description = "Moist chocolate cake topped with creamy frosting." }
        });
        context.SaveChanges();
    }
}

// ========================
// ✅ Middleware
// ========================
app.UseCors("AllowFrontend");
app.UseStaticFiles();

app.MapGet("/reserve", () => new { img = "imgs/about-banner.jpg", header = "Reserve Your Seat at the Table", text1 = "Step into an atmosphere where flavor, craft, and elegance meet. Secure your table in advance and let us prepare an unforgettable dining experience for you.", text2 = "Each reservation is carefully curated to ensure comfort, privacy, and exceptional service from the moment you arrive.", text3 = "Our kitchen operates with precision and passion — allowing us to deliver a seamless experience, from the first course to the final impression." });

// ========================
// ✅ Menu Endpoints
// ========================

//✅ MENU ENDPOINT (GET) 
app.MapGet("/menu", () => new[] { new { id = 1, name = "Greek Salad", price = 25.5, img = "/imgs/menu-1.png", category = "Starters" }, new { id = 2, name = "Pasta Carbonara", price = 30.0, img = "/imgs/menu-2.png", category = "Main Course" }, new { id = 3, name = "Chocolate Cake", price = 15.0, img = "/imgs/menu-6.png", category = "Desserts" }, new { id = 4, name = "Château Margaux Wine (Glass)", price = 30.0, img = "/imgs/menu-4.png", category = "Drinks" } }); //--

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

// ========================
// ✅ Other Endpoints
// ========================
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

// ========================
// ✅ Reserve Endpoint with SendGrid
// ========================
app.MapPost("/reserve", async (AppDbContext db, Reservation res) =>
{
    res.Date = res.Date.ToUniversalTime();
    db.Reservations.Add(res);
    await db.SaveChangesAsync();

    await SendReservationEmailSendGridAsync(res);

    return Results.Created($"/reservations/{res.Id}", res);
});

// ========================
// ✅ SendGrid Email Function
// ========================
async Task SendReservationEmailSendGridAsync(Reservation res)
{
    try
    {
        var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var fromEmail = Environment.GetEnvironmentVariable("SENDGRID_FROM_EMAIL");
        var ownerEmail = Environment.GetEnvironmentVariable("OWNER_EMAIL");

        if (string.IsNullOrWhiteSpace(apiKey) || string.IsNullOrWhiteSpace(fromEmail))
        {
            Console.WriteLine("❌ SendGrid API key or From email not set.");
            return;
        }

        var client = new SendGridClient(apiKey);
        var from = new EmailAddress(fromEmail, "Unique Dine");

        // Customer Email
        var msg = MailHelper.CreateSingleEmail(
            from,
            new EmailAddress(res.Email, res.FullName),
            "Reservation Confirmed!",
            "",
            $@"
            <h2>Hi {res.FullName}, your reservation is confirmed!</h2>
            <p>📅 Date: {res.Date:dd/MM/yyyy}</p>
            <p>⏰ Time: {res.Time}</p>
            <p>👥 Guests: {res.Guests}</p>
            {(string.IsNullOrWhiteSpace(res.SpecialRequests) ? "" : $"<p>💌 Requests: {res.SpecialRequests}</p>")}
            <p>Thank you for booking with Unique Dine!</p>"
        );
        await client.SendEmailAsync(msg);

        // Owner/Admin Email
        if (!string.IsNullOrWhiteSpace(ownerEmail))
        {
            var ownerMsg = MailHelper.CreateSingleEmail(
                from,
                new EmailAddress(ownerEmail),
                $"New Reservation: {res.FullName}",
                "",
                $@"
                <h2>New Reservation Alert</h2>
                <p>👤 Guest: {res.FullName}</p>
                <p>📧 Email: {res.Email}</p>
                <p>📞 Phone: {res.Phone}</p>
                <p>📅 Date: {res.Date:dd/MM/yyyy}</p>
                <p>⏰ Time: {res.Time}</p>
                <p>👥 Guests: {res.Guests}</p>
                {(string.IsNullOrWhiteSpace(res.SpecialRequests) ? "" : $"<p>💌 Requests: {res.SpecialRequests}</p>")}"); 
            await client.SendEmailAsync(ownerMsg);
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ SendGrid email error: {ex}");
    }
}

app.Run();

// ========================
// ✅ Models
// ========================
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
