<?php
// Mostrar os dados recebidos no servidor
var_dump($_FILES);

// Mover o arquivo do diretório temporário para o diretório de "transferecia"
move_uploaded_file(
    $_FILES['enviar']['tmp_name'],
    'transferecia/' . $_FILES['enviar']['name']
);
