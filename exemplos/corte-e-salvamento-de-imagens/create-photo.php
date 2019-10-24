<?php

if (!count($_POST)) {
    echo ("Nenhum índice na super-global POST");
} else if (!isset($_POST['img-text']) || empty($_POST['img-text'])) {
    echo ("Não é possível determinar o conteúdo da imagem");
} else if (!isset($_POST['img-name']) || empty($_POST['img-name'])) {
    echo ("Não é possível determinar o nome da imagem");
} else {
    $image = $_POST['img-text'];
    $data = str_replace('data:image/png;base64,', '', $image);
    $cross = str_replace(' ', '+', $data);
    $decode = base64_decode($cross);
    $newImage = __DIR__ . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR .$_POST['img-name'];
    $save = file_put_contents($newImage, $decode);

    if ($save) {
        echo ("<script>abrir.prototype.showX();</script>");
    }
}
