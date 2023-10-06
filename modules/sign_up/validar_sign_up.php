<?php
require '../../connect/conexion.php';

$username = $_POST["username"];
$name = $_POST["name"];
$last_name = $_POST["last_name"];
$email = $_POST["email"];
$sex = $_POST["sex"];
$password = $_POST["password"];
$password_confirm = $_POST["password_confirm"];

$username = mysqli_real_escape_string($conexion, $username);
$name = mysqli_real_escape_string($conexion, $name);
$last_name = mysqli_real_escape_string($conexion, $last_name);
$email = mysqli_real_escape_string($conexion, $email);
$sex = mysqli_real_escape_string($conexion, $sex);
$password = mysqli_real_escape_string($conexion, $password);
$password_confirm = mysqli_real_escape_string($conexion, $password_confirm);

if($password === $password_confirm){
    $query_personas = "INSERT INTO personas (nombre, apellido, sexo) VALUES ('$name', '$last_name', '$sex')";

    $result_personas = mysqli_query($conexion, $query_personas);

    if ($result_personas) {
        $id_persona = mysqli_insert_id($conexion);

        $query_usuarios = "INSERT INTO usuarios (usuario, email, contrasenia, id_persona) VALUES ('$username', '$email', '$password', '$id_persona')";

        $result_usuarios = mysqli_query($conexion, $query_usuarios);

        if ($result_usuarios) {
            header("Location: ../../login/login.php");
        } else {
            echo "Error al insertar en la tabla 'usuarios': " . mysqli_error($conexion);
        }
    } else {
        echo "Error al insertar en la tabla 'personas': " . mysqli_error($conexion);
    }
} else {
    echo "Las contraseñas no coinciden.";
}

mysqli_close($conexion);
?>
