namespace TEST_JWT_API.Models.DTOs
{
    public class LoginDTO
    {
        public required string Correo { get; set; }
        public required string Clave { get; set; }
    }
}
