<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../css/style_login.css">
</head>
<body>
  <div class="login-container animated-entrada font">
    <!-- <div class="logo">
      <img src="../../img/logo_sf.png" height="350" width="350" alt="Logo">
    </div> -->
    <div class="login-form text-center">
      <form action="validar_sign_up.php" method="POST">
        <div class="form-group">
          <input type="text" id="name" name="name" class="form-control" required placeholder="Nombre">
        </div>
        <div class="form-group">
          <input type="text" id="last_name" name="last_name" class="form-control" required placeholder="Apellido">
        </div>
        <div class="form-group">
          <input type="text" id="username" name="username" class="form-control" required placeholder="Nombre de usuario">
        </div>
        <div class="form-group">
          <input type="email" id="email" name="email" class="form-control" required placeholder="Email">
        </div>
        <div class="form-group">
            <select id="sex" name="sex" class="form-control" required>
                <option value="" disabled selected>Seleccione su sexo</option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
            </select>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" class="form-control" required placeholder="Contraseña">
        </div>
        <div class="form-group">
          <input type="password" id="password_confirm" name="password_confirm" class="form-control" required placeholder="Confirmar contraseña">
        </div>
        <button type="submit" class="btn btn-primary">Guardar registro</button>
      </form>
    </div>
  </div>
</body>
</html>