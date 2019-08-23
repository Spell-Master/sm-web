<?php
if (!isset($_FILES['enviar']) && !empty($_FILES['enviar']['name'])) {
    echo ("Nenhum arquivo");
} else {
    move_uploaded_file($_FILES['enviar']['tmp_name'], 'transferecia/' . $_FILES['enviar']['name']);
    if ($_FILES['enviar']['error']) {
        echo ("Não foi possível salvar o arquivo, normalmente isso acontece pelos seguintes motivos:"
        . "<div class=\"margin-all padding-left bg-light\">"
        . "<p class=\"list\">O limite de 30 segundos de latência foi atingido</p>"
        . "<p class=\"list\">O diretório de salvamento não existe</p>"
        . "<p class=\"list\">O arquivo é maior que as configurações no PHP.INI \"post_max_size\" e \"upload_max_filesize\"</p>"
        . "<p class=\"list\">O máximo de bits de armazenamento no servidor foi atingido</p>"
        . "</div>");
    } else {
        echo ("FILE INFO:<pre>");
        var_dump($_FILES);
        echo ("</pre>");
    }
}
