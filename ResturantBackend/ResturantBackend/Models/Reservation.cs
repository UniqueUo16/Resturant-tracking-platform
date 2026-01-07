using System.ComponentModel.DataAnnotations;

namespace ResturantBackend.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; } 

//Helper to ensure UTC
public DateTime DateUtc => Date.Kind == DateTimeKind.Utc ? Date : Date.ToUniversalTime();


        [Required]
        public string Time { get; set; } = string.Empty;

        [Required]
        public int Guests { get; set; }

        public string? SpecialRequests { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}