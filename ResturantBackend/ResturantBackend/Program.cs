using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MyApp.Data;
using MyApp.Models;


var builder = WebApplication.CreateBuilder(args);


// ✅ Enable CORS for your frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "https://customresturant.vercel.app",
                 "https://resturant-v02-dvpb5hju7-uniqueuos-projects.vercel.app",
                 "https://resturant-v02-cmsqypcwn-uniqueuos-projects.vercel.app"
                //  // live frontend URL
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlite("Data Source=menu.db"));

// ✅ Add support for JSON serialization
builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}


    app.UseCors("AllowFrontend");

// app.UseHttpsRedirection();
app.UseStaticFiles();

// ✅ TEST ROUTES
app.MapGet("/", () => "🍽️ Welcome to Unique Uo’s Restaurant API!");
//-----------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.MapGet("/services", () => new
{
    headingSmall = "Greek Salad",
    headingBig = "Lorem 🍽️ Welcome to Unique Uo’s Restaurant API!",
    description1 = "Greek Salad",
    description2 = "Lorem",
    img1 = "/imgs/service-1.jpg",
    img2 = "/imgs/service-2.jpg"
});
//-----------------------------------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//STORY-----------------------------------------------------------------------------------------------------
app.MapGet("/story", () => new
{
    storytxt1 = "Lorem ipsum dolor sit amet consectetur adipisicing elit.Nulla dolore sint deserunt veniam eos saepe.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe. Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe. ",

    storytxt2 = "Lorem ipsum dolor sit amet consectetur adipisicing elit.Nulla dolore sint deserunt veniam eos saepe.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe. Nulla dolore sint deserunt veniam eos saepe.  Nulla dolore sint deserunt veniam eos saepe. "
});
//--------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// -------------------------------------------------------------------------------------------------------------------
app.MapGet("/reserve", () => new
{
    img = "imgs/about-banner.jpg",
    header = "Simplify your bookings with Restaurant-v.02",
    text1 = " Take advantage of getting instant prices on your shipment, browse through an easy-to-navigate booking interface and even track your goods",
    text2 = "  Let us guide you through the first steps of your digital journey and help you choose the best service to match your needs",
    text3 = "  Our own-controlled freight network and strict SOPs ensure fewer touchpoints,}smoother handling, and built-in flexibility to avoid disruptions."
});
// ✅ MENU ENDPOINT (GET)
app.MapGet("/menu", () => new[] {
    new {
        id = 1,
        name = "Greek Salad",
        price = 25.5,
        img = "/imgs/menu-1.png",
        category = "Starters"
    },
    new {
        id = 2,
        name = "Pasta Carbonara",
        price = 30.0,
        img = "/imgs/menu-2.png",
        category = "Main Course"
    },
    new {
        id = 3,
        name = "Chocolate Cake",
        price = 15.0,
        img = "/imgs/menu-6.png",
        category = "Desserts"
    },
    new {
        id = 4,
        name = "Château Margaux Wine (Glass)",
        price = 30.0,
        img = "/imgs/menu-4.png",
        category = "Drinks"
    }
});
//-------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// -------------------------------------------------------------------------------------------------------------------------------
//MENU COMPONENT ENDPOINT

// GET all
app.MapGet("/menujs", async (AppDbContext db) =>
    await db.MenuItems.ToListAsync());

// POST new item
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
    item.Price = update.Price;
    item.Description = update.Description;
    item.Img = update.Img;


    await db.SaveChangesAsync();
    return Results.Ok(item);
});


// DELETE
app.MapDelete("/menujs/{id}", async (int id, AppDbContext db) =>
{
    var item = await db.MenuItems.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.MenuItems.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    // ✅ Seed initial menu data if empty
    if (!db.MenuItems.Any())
    {
        db.MenuItems.AddRange(new[]
        {
            new MenuItem { Img = "/imgs/menu-1.png", Name = "Greek Salad", Category = "Fresh", Price = 25.50, Description = "A refreshing mix of cucumbers, olives, and feta cheese drizzled with olive oil." },
            new MenuItem { Img = "/imgs/menu-2.png", Name = "Pasta Carbonara", Category = "Chef's Special", Price = 30.00, Description = "Classic Italian pasta with creamy sauce and crispy bacon." },
            new MenuItem { Img = "/imgs/menu-3.png", Name = "Tomato Soup", Category = "Hot", Price = 18.00, Description = "Creamy tomato soup served with fresh herbs and toast." },
            new MenuItem { Img = "/imgs/menu-4.png", Name = "Beef Steak", Category = "Grilled", Price = 45.00, Description = "Tender steak grilled to perfection with pepper sauce." },
            new MenuItem { Img = "/imgs/menu-5.png", Name = "Seafood Platter", Category = "Ocean Fresh", Price = 60.00, Description = "Shrimp, calamari, and crab served with lemon butter." },
            new MenuItem { Img = "/imgs/menu-6.png", Name = "Chocolate Cake", Category = "Dessert", Price = 25.50, Description = "Moist chocolate cake topped with creamy frosting." }
        });

        db.SaveChanges();
    }
}
//--------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
/// -----------------------------------------------------------------------------------


// ✅ ORDER ENDPOINT (POST)
app.MapPost("/order", async (HttpContext context) =>
{
    var order = await context.Request.ReadFromJsonAsync<Order>();

    if (order is null || order.Items.Count == 0)
    {
        return Results.BadRequest(new { message = "Invalid order data." });
    }

    // (Later you’ll save this to a database — for now we’ll just confirm receipt)
    Console.WriteLine($"✅ Order received from {order.CustomerName}");
    Console.WriteLine($"Items: {order.Items.Count}");
    Console.WriteLine($"Total: ${order.Total}");

    return Results.Ok(new
    {
        message = "Order received successfully!",
        orderId = Guid.NewGuid(),
        order.CustomerName,
        order.Total
    });
});

app.Run();

// ✅ Define an Order model (normally this would be in a separate file)

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

