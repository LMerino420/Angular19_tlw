using System;
using System.Collections.Generic;

namespace TEST_JWT_API.Models;

public partial class Usuario
{
    public int IdUser { get; set; }

    public string? Nombre { get; set; }

    public string? Correo { get; set; }

    public string? Clave { get; set; }
}
