<?php
require '../connect/conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $username = mysqli_real_escape_string($conexion, $username);
    $password = mysqli_real_escape_string($conexion, $password);

    $query = "SELECT * FROM usuarios WHERE usuario='$username' AND contrasenia='$password'";
    $result = mysqli_query($conexion, $query);

    if (mysqli_num_rows($result) > 0) {
        // El inicio de sesión es exitoso.
        $row = mysqli_fetch_assoc($result);
        $role_id = $row['role_id'];

        // Iniciar la sesión para almacenar el rol del usuario.
        session_start();
        $_SESSION['user_role'] = $role_id;

        $response = array("success" => true, "role" => $role_id);
    } else {
        $response = array("success" => false);
    }

    echo json_encode($response);
}
?>
