<?php
require (__DIR__ . DIRECTORY_SEPARATOR . 'ImageUpload.php');
if (isset($_FILES['photo']) && !empty($_FILES['photo']['name'])) {
    $upload = new ImageUpload();
    $imageName = 'imagem' . time();
    $upload->sendImage($_FILES['photo'], $imageName, 600);
    if ($upload->setResult()) {
        $imgSrc = $upload->getImgName();
        ?>
        <form id="save-cut" onsubmit="return false;">
            <input type="hidden" name="img-text" id="img-text" value="" />
            <input type="hidden" name="img-name" value="<?= $imgSrc ?>" />
            
            <div class="align-center" id="adjust">
                <p class="text-red font-large underline">&nbsp; Ajuste o Corte &nbsp;</p>
                <div class="margin-top">
                    <img src="upload/<?= $imgSrc ?>?rand=<?= rand() . time() ?>" id="image-prev" style="max-width:400px; max-height:300px"/>
                </div>

                <button onclick="saveCut()" class="btn-info button-block text-white">Cortar & Salvar</button>
            </div>
        </form>
        <div id="save-result"></div>
        <script>
            var cut = new ImageCut('image-prev');
            var imageID = document.getElementById('image-prev');
            var adjust = document.getElementById('adjust');
            var text = document.getElementById('img-text');
            var saveImage;
            var imageNew;

            function saveCut() {
                cut.setCut();
                saveImage = cut.getImage();

                text.value = saveImage;

                adjust.innerHTML = null;
                imageNew = document.createElement('img');
                imageNew.src = saveImage;
                adjust.appendChild(imageNew);

                saveCut.prototype = new AjaxRequest();
                saveCut.prototype.formSend('save-cut', 'save-result', 'create-photo.php');
                return(false);
            }
        </script>
        <?php
    } else if ($_FILES['enviar']['error']) {
        echo ("Não foi possível salvar o arquivo, normalmente isso acontece pelos seguintes motivos:"
        . "<div class=\"margin-all padding-left bg-light\">"
        . "<p class=\"list\">O limite de 30 segundos de latência foi atingido</p>"
        . "<p class=\"list\">O diretório de salvamento não existe</p>"
        . "<p class=\"list\">O arquivo é maior que as configurações no PHP.INI \"post_max_size\" e \"upload_max_filesize\"</p>"
        . "<p class=\"list\">O máximo de bits de armazenamento no servidor foi atingido</p>"
        . "</div>");
    } else {
        echo ("Erro desconhecido ao tentar salvar imagem");
    }
} else {
    echo ("Nenhum arquivo recebido");
}

