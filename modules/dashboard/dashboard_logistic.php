<?php
require '../../connect/conexion.php';

$formData = $_POST; 

$id_persona = $formData["id_persona"];
$nombre = $formData["nombre"];
$apellido = $formData["apellido"];
$sexo = $formData["sexo"];

$query = "UPDATE personas SET nombre = ?, apellido = ?, sexo = ? WHERE id_persona = ?";
$stmt = mysqli_prepare($conexion, $query);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "sssi", $nombre, $apellido, $sexo, $id_persona);
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        $response = array("success" => true);
    } else {
        $response = array("success" => false);
    }

    mysqli_stmt_close($stmt);
} else {
    $response = array("success" => false);
}

header("Content-Type: application/json");
echo json_encode($response);

?>
