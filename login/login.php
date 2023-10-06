<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/style_login.css">
</head>
<body>
  <div class="login-container animated-entrada font">
    <div class="logo">
      <img src="../img/logo_sf.png" height="350" width="350" alt="Logo">
    </div>
    <div class="login-form text-center">
      <form action="validar_login.php" method="POST" id="loginForm" onsubmit="return validateForm()">
        <div class="form-group">
          <input type="text" id="username" class="form-control" required placeholder="Usuario">
        </div>
        <div class="form-group">
          <input type="password" id="password" class="form-control" required placeholder="Contraseña">
        </div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
        
      </form>
    </div>
    <div class="position-button-sign_up">
      <button type="submit" class="btn btn-secondary"><a class="link" href="../modules/sign_up/sign_up.php">Registrarse</a></button>
    </div>
  </div>
  
  <script src="../js/validations.js"></script>
</body>
</html>