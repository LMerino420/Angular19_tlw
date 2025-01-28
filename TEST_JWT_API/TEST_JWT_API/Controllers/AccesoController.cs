using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using TEST_JWT_API.Custom;
using TEST_JWT_API.Models;
using TEST_JWT_API.Models.DTOs;

namespace TEST_JWT_API.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AccesoController : ControllerBase
    {
        private readonly ILogger<AccesoController> _logger;
        //Variables para gestion de acceso
        private readonly DbTestContext _dbTestContext;
        private readonly Utilidades _utilidades;
        public AccesoController(ILogger<AccesoController> logger,DbTestContext dbTestContext,Utilidades utilidades)
        {
            _logger = logger;

            _dbTestContext = dbTestContext;
            _utilidades = utilidades;
        }

        //------------------------------------
        //Registro de usuarios
        //------------------------------------
        [HttpPost]
        [Route("Regist")]
        public async Task<IActionResult> Registrarse(UsuarioDTO obj)
        {
            //Se crea el modelo para guardar usuario
            var modelUsr = new Usuario
            {
                Nombre = obj.Nombre,
                Correo = obj.Correo,
                Clave = _utilidades.EncriptarSHA256(obj.Clave)
            };

            //Se guarda en la base de datos
            await _dbTestContext.Usuarios.AddAsync(modelUsr);
            await _dbTestContext.SaveChangesAsync();

            //Se verifica que se haya guardado
            if(modelUsr.IdUser != 0)
                return StatusCode(StatusCodes.Status200OK, new {isSuccess = true});
            else
                return StatusCode(StatusCodes.Status200OK, new {isSuccess = false});
        }

        //------------------------------------
        //Acceso de usuario
        //------------------------------------
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Ingresar(LoginDTO obj) {
            //Se verifica que el usuario exista
            var userFound = await _dbTestContext.Usuarios.Where(
                u=>
                u.Correo == obj.Correo &&
                u.Clave == _utilidades.EncriptarSHA256(obj.Clave)
                ).FirstOrDefaultAsync();

            //Se valida el acceso
            if(userFound == null)
                return StatusCode(StatusCodes.Status200OK, new {isSuccess = false,token = ""});
            else
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _utilidades.GenerarJWT(userFound) });
        }
    }
}
