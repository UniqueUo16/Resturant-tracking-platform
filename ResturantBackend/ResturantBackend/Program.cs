using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using ResturantBackend.Models;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.AspNetCore.Http.HttpResults;

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
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SMTP"));

// ✅ DATABASE CONNECTION
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL")
                  ?? builder.Configuration["DATABASE_URL"];

if (string.IsNullOrEmpty(databaseUrl))
    throw new Exception("DATABASE_URL is not set");

var uri = new Uri(databaseUrl);
var db = uri.AbsolutePath.Trim('/');
var userInfo = uri.UserInfo.Split(':');


int port = uri.Port > 0 ? uri.Port : 5432; // ← DEFAULT TO 5432 IF MISSING

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

// ✅ MENU ENDPOINTS
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

// ✅ OTHER ENDPOINTS
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

app.MapPost("/reserve", async (
    AppDbContext db,
    Reservation res,
    IConfiguration config) =>
{
    // Ensure UTC for Postgres
    res.Date = res.Date.ToUniversalTime();

    db.Reservations.Add(res);
    await db.SaveChangesAsync();

    // Fire-and-forget email
    _ = SendReservationEmailAsync(res, config);

    return Results.Created($"/reservations/{res.Id}", res);
});


// --- Email function ---
async Task SendReservationEmailAsync(Reservation res, IConfiguration config)
{
    try
    {
        var smtp = config.GetSection("SMTP").Get<SmtpSettings>();
        if (smtp == null) { Console.WriteLine("SMTP section missing."); return; }
        if (string.IsNullOrWhiteSpace(smtp.Email)) { Console.WriteLine("SMTP Email missing."); return; }
        if (string.IsNullOrWhiteSpace(res.Email)) { Console.WriteLine("Customer email missing."); return; }

        // --- Customer Email ---
        var customerMessage = new MimeMessage();
        customerMessage.From.Add(new MailboxAddress("Unique Dine", smtp.Email));
        customerMessage.To.Add(new MailboxAddress(res.FullName, res.Email));
        customerMessage.Subject = "Reservation Confirmed!";

        var customerHtml = $@"
<html>
  <body style='margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f5f5;'>
    <table align='center' width='100%' style='max-width:600px; background-color:#ffffff; border-radius:15px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.1);'>
      <!-- Hero Image -->
      <tr>
        <td style='text-align:center;'>
          <img src='https://resturant-v02.vercel.app/img/about-banner.jpg' alt='Uninque Uo Dine' width='100%' style='display:block; border-bottom:4px solid #d97706;'/>
        </td>
      </tr>
      <!-- Header -->
      <tr>
        <td style='padding:30px 25px; text-align:center;'>
          <h1 style='font-family: Georgia, serif; color:#d97706;'>Reservation Confirmed!</h1>
          <p>Hi {res.FullName}, thank you for booking with us.</p>
        </td>
      </tr>
      <!-- Reservation Details -->
      <tr>
        <td style='padding:15px 25px;'>
          <table width='100%' style='font-size:16px; color:#333; border-collapse:collapse;'>
            <tr><td>📅 Date:</td><td>{res.Date:dd/MM/yyyy}</td></tr>
            <tr><td>⏰ Time:</td><td>{res.Time}</td></tr>
            <tr><td>👥 Guests:</td><td>{res.Guests}</td></tr>
            {(string.IsNullOrWhiteSpace(res.SpecialRequests) ? "" : $"<tr><td>💌 Requests:</td><td>{res.SpecialRequests}</td></tr>")}
          </table>
        </td>
      </tr>
      <!-- CTA -->
      <tr>
        <td style='padding:20px 25px; text-align:center;'>
          <a href='https://yourwebsite.com/menu' style='background:linear-gradient(90deg,#d97706,#fbbf24); color:#fff; padding:14px 35px; font-size:16px; font-weight:bold; text-decoration:none; border-radius:30px;'>Explore Our Menu</a>
        </td>
      </tr>
    </table>
  </body>
</html>
";

        customerMessage.Body = new TextPart("html") { Text = customerHtml };

        // --- Owner Email (optional) ---
        MimeMessage? ownerMessage = null;
        if (!string.IsNullOrWhiteSpace(smtp.OwnerEmail))
        {
            ownerMessage = new MimeMessage();
            ownerMessage.From.Add(new MailboxAddress("Unique Dine", smtp.Email));
            ownerMessage.To.Add(MailboxAddress.Parse(smtp.OwnerEmail));
            ownerMessage.Subject = $"New Booking: {res.FullName}";

            ownerMessage.Body = new TextPart("html")
            {
      Text = $@"
<html>
  <body style='margin:0; padding:0; font-family: Arial, sans-serif; background-color:#111827;'>

    <table align='center' width='100%' style='max-width:600px; background-color:#0b0b0b; border-radius:12px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.4);'>
      
      <!-- Header -->
      <tr>
        <td style='padding:24px; text-align:center; background:#000; border-bottom:2px solid #d97706;'>
          <h2 style='margin:0; font-family:Georgia, serif; color:#d97706;'>
            New Reservation Alert
          </h2>
          <p style='margin:6px 0 0; color:#9ca3af; font-size:14px;'>
            A new booking has just been made
          </p>
        </td>
      </tr>

      <!-- Details -->
      <tr>
        <td style='padding:24px;'>
          <table width='100%' style='color:#e5e7eb; font-size:15px;'>
            <tr>
              <td style='padding:8px 0; font-weight:bold;'>👤 Guest</td>
              <td style='padding:8px 0;'>{res.FullName}</td>
            </tr>
            <tr>
              <td style='padding:8px 0; font-weight:bold;'>📧 Email</td>
              <td style='padding:8px 0;'>{res.Email}</td>
            </tr>
            <tr>
              <td style='padding:8px 0; font-weight:bold;'>📞 Phone</td>
              <td style='padding:8px 0;'>{res.Phone}</td>
            </tr>
            <tr>
              <td style='padding:8px 0; font-weight:bold;'>📅 Date</td>
              <td style='padding:8px 0;'>{res.Date:dd/MM/yyyy}</td>
            </tr>
            <tr>
              <td style='padding:8px 0; font-weight:bold;'>⏰ Time</td>
              <td style='padding:8px 0;'>{res.Time}</td>
            </tr>
            <tr>
              <td style='padding:8px 0; font-weight:bold;'>👥 Guests</td>
              <td style='padding:8px 0;'>{res.Guests}</td>
            </tr>

            {(string.IsNullOrWhiteSpace(res.SpecialRequests) ? "" : $@"
            <tr>
              <td style='padding:8px 0; font-weight:bold;'>💌 Requests</td>
              <td style='padding:8px 0;'>{res.SpecialRequests}</td>
            </tr>
            ")}
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style='padding:18px; text-align:center; background:#000; color:#9ca3af; font-size:13px;'>
          <p style='margin:0;'>Unique Dine — Admin Notification</p>
          <p style='margin:4px 0 0; font-style:italic; color:#d97706;'>
            Precision dining. Zero missed tables.
          </p>
        </td>
      </tr>

    </table>

  </body>
</html>
"

            };
        }

        // --- Connect Once, Send Both Emails, Disconnect ---
        using var client = new SmtpClient();
        await client.ConnectAsync(smtp.Host, smtp.Port, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(smtp.Email, smtp.Password);

        await client.SendAsync(customerMessage);
        if (ownerMessage != null)
            await client.SendAsync(ownerMessage);

        await client.DisconnectAsync(true);

        Console.WriteLine($"Emails sent to {res.Email}" + (ownerMessage != null ? $" and owner ({smtp.OwnerEmail})" : ""));
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Email error: {ex}");
    }
}




app.MapGet("/menu", () => new[]
{
    new { id = 1, name = "Greek Salad", price = 25.5, img = "/imgs/menu-1.png", category = "Starters" },
    new { id = 2, name = "Pasta Carbonara", price = 30.0, img = "/imgs/menu-2.png", category = "Main Course" },
    new { id = 3, name = "Chocolate Cake", price = 15.0, img = "/imgs/menu-6.png", category = "Desserts" },
    new { id = 4, name = "Château Margaux Wine (Glass)", price = 30.0, img = "/imgs/menu-4.png", category = "Drinks" }
});

app.MapPost("/order", async (HttpContext context) =>
{
    var order = await context.Request.ReadFromJsonAsync<Order>();
    if (order is null || order.Items.Count == 0)
        return Results.BadRequest(new { message = "Invalid order data." });

    Console.WriteLine($"Order from {order.CustomerName}, Total: ${order.Total}");

    return Results.Ok(new
    {
        message = "Order received successfully!",
        orderId = Guid.NewGuid()
    });
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
