<?php

// Mostrar os dados recebidos no servidor (descomente para melhor análise)
/*
 * echo ("<pre>");
 * var_dump($_FILES);
 * echo ("</pre>");
 */

// Mover o arquivos do diretório temporário para o diretório de "transferecia"
foreach ($_FILES['enviar']['name'] as $key => $value) {
    move_uploaded_file($_FILES['enviar']['tmp_name'][$key], 'transferecia/' . $value);
}
