<?php
require '../../connect/conexion.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $sexo = $_POST['sexo'];

    $sql = "INSERT INTO personas (nombre, apellido, sexo) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    $stmt->bind_param("sss", $nombre, $apellido, $sexo);

    if ($stmt->execute()) {
        $response = array(
            "success" => true,
            "id_persona" => $conexion->insert_id,
        );
        echo json_encode($response);
    } else {
        $response = array("success" => false);
        echo json_encode($response);
    }

    $stmt->close();
    $conexion->close();
} else {
    $response = array("success" => false);
    echo json_encode($response);
}
?>
