using Microsoft.EntityFrameworkCore;
using MyApp.Models;
using ResturantBackend.Models;

namespace MyApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
             : base(options)
        {
        }

        public DbSet<MenuItem> MenuItems { get; set; } = null!;
        public DbSet<Reservation> Reservations => Set<Reservation>();
    }
}
