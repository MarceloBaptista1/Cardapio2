<?php

    $servidor       = "localhost";
    $usuario        = "garage_itech_mysql"; 
    $senha          = "str0mP@ss";
    $nome_banco     = "garage_itech_mysql";

    // Criando a conexão
    $conn = mysqli_connect($servidor, $usuario, $senha, $nome_banco);

    // Verificando a conexão
    if (!$conn) {
        die("Falha na conexão: " . mysqli_connect_error());
    }
    echo "Conexão bem-sucedida!";

    // Fechando a conexão
    mysqli_close($conn);

?>