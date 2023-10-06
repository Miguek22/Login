function validateForm() {
  console.log("llega aqui 1")
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("llega aqui 2")
  if (username.trim() === "") {
      alert("Por favor, ingresa tu usuario.");
      return false;
  }
  console.log("llega aqui 3")
  if (password.trim() === "") {
      alert("Por favor, ingresa tu contraseña.");
      return false;
  }
  console.log("llega aqui 4")

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  console.log("llega aqui 5")
  fetch("../login/validar_login.php", {
      method: "POST",
      body: formData,
  })
  .then((response) => response.json())
  .then((data) => {
      if (data.success) {
          console.log("llega aqui 6")
          alert("Inicio de sesión exitoso.");

          const userRole = data.role; 
          sessionStorage.setItem('userRole', userRole);

          window.location.href = "../modules/dashboard/dashboard.php"; 
      } else {
          console.log("llega aqui 7")
          alert("Usuario o contraseña incorrectos.");
      }
  })
  .catch((error) => {
      console.log("llega aqui 8")
      console.error("Error en la solicitud: ", error);
  });
  console.log("llega aqui 9")
  return false; 
}
