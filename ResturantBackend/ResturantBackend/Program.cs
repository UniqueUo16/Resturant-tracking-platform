var builder = WebApplication.CreateBuilder(args);

// ✅ Enable CORS for your frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "https://resturantlogistics.vercel.app" // live frontend URL
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


// ✅ Add support for JSON serialization
builder.Services.AddControllers();

var app = builder.Build();

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
app.MapGet("/menujs", () => new[]
{
    new {
       id = 1,
       img = "/imgs/menu-1.png",
       name = "Greek Salad",
       category = "Fresh",
       price = 25.50,
       description = "A refreshing mix of cucumbers, olives, and feta cheese drizzled with olive oil."
    },
    new {
       id = 2,
       img = "/imgs/menu-2.png",
       name = "Pasta Carbonara",
       category = "Chef's Special",
       price = 30.00,
       description = "Classic Italian pasta with creamy sauce and crispy bacon."
    },
    new {
       id = 3,
       img = "/imgs/menu-3.png",
       name = "Tomato Soup",
       category = "Hot",
       price = 18.00,
       description = "Creamy tomato soup served with fresh herbs and toast."
    },
    new {
       id = 4,
       img = "/imgs/menu-4.png",
       name = "Beef Steak",
       category = "Grilled",
       price = 45.00,
       description = "Tender steak grilled to perfection with pepper sauce."
    },
    new {
       id = 5,
       img = "/imgs/menu-5.png",
       name = "Seafood Platter",
       category = "Ocean Fresh",
       price = 60.00,
       description = "Shrimp, calamari, and crab served with lemon butter."
    },
    new {
       id = 6,
       img = "/imgs/menu-6.png",
       name = "Chocolate Cake",
       category = "Dessert",
       price = 25.50,
       description = "Moist chocolate cake topped with creamy frosting."
    }
});
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

