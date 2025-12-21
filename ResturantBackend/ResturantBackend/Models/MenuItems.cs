namespace MyApp.Models;

public class MenuItem
{
    public int Id { get; set; }
    public string Img { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Description { get; set; } = string.Empty;
}