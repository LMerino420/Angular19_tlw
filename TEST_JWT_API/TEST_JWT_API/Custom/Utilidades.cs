using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TEST_JWT_API.Models;

namespace TEST_JWT_API.Custom
{
    public class Utilidades
    {
        //------------------------------------------------------
        //Constructor para poder acceder a la informacion  
        // que se establecio en appsettings.json
        //------------------------------------------------------
        private readonly IConfiguration _configuration;
        public Utilidades(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        //------------------------------------------------------
        //Metodo para encriptar contraseña
        //------------------------------------------------------
        public string EncriptarSHA256(string texto)
        {
            using SHA256 sha256Hash = SHA256.Create();
            //Computar el hash
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(texto));

            //Convertir array de bytes en string
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }

            //Retorna el texto encriptado (hash creado)
            return builder.ToString();
        }

        //------------------------------------------------------
        //Metodo para generar el JWT
        //------------------------------------------------------
        public string GenerarJWT(Usuario modelo) {
            //Crear informacion del usuario para el token
            var userClaim = new[] { 
                new Claim(ClaimTypes.NameIdentifier, modelo.IdUser.ToString()),
                new Claim(ClaimTypes.Email,modelo.Correo!)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            //Crear detalle del token
            var jwtConfig = new JwtSecurityToken(
                claims:userClaim,
                expires: DateTime.UtcNow.AddMinutes(5),
                signingCredentials: credentials
                );

            //Retornar el token
            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }
    }
}
