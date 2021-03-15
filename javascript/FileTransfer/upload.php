<?php
if (!isset($_FILES['enviar']) && !empty($_FILES['enviar']['name'])) {
    echo ("Nenhum arquivo");
} else {
    move_uploaded_file($_FILES['enviar']['tmp_name'], 'transferecia/' . $_FILES['enviar']['name']);
    if ($_FILES['enviar']['error']) {
        echo ("Não foi possível salvar o arquivo, normalmente isso acontece pelos seguintes motivos:"
        . "<p>O limite de 30 segundos de latência foi atingido</p>"
        . "<p>O diretório de salvamento não existe</p>"
        . "<p>O arquivo é maior que as configurações no PHP.INI \"post_max_size\" e \"upload_max_filesize\"</p>"
        . "<p>O máximo de bits de armazenamento no servidor foi atingido</p>");
    } else {
        echo ("FILE INFO:<pre>");
        var_dump($_FILES);
        echo ("</pre>");
    }
}
