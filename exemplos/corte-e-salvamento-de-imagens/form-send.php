<div class="padding-all">

    <div id="send-erro" class="margin-tb card-red text-white align-center fade-in" style="display:none"></div>

    <div id="send-photo">
        <form id="form-photo" onsubmit="return (false);">
            <input type="file" name="photo" id="photo" class="hide" accept=".jpg, .jpeg" />
            <label class="btn-default button-block upload-photo" for="photo">
                Clique para inserir uma imagem
            </label>
        </form>
    </div>
    <script>
        
        var input = document.getElementById('photo');
        var error = document.getElementById('send-erro');
        //<![CDATA  
        var fileSize = '<?= ini_get('upload_max_filesize') ?>';
        //]]
        var maxSize = fileSize.replace(/[^\d]+/g, '') + '000000';
        input.addEventListener('change', send, false);
        var file, ext;

        function send(e) {
            file = e.target.files[0];
            ext = (file.name).substr((file.name).lastIndexOf('.') + 1);
            if (file.size >= maxSize) {
                sendError(1);
            } else if (ext == 'jpg' || ext == 'JPG' || ext == 'jpeg' || ext == 'JPEG') {
                abrir.prototype.hiddenX();
                send.prototype = new FileTransfer();
                send.prototype.upload('form-photo', 'upload-image.php', 'send-photo', true);
            } else {
                sendError(2);
            }
        }

        function sendError(mod) {
            error.style.display = 'block';
            switch (mod) {
                case 1:
                    error.innerHTML = 'A imagem selecionada contém: ' + file.size + 'bits!'
                            + '<p>Por favor selecione uma imagem com no máximo: <span class="bold">'
                            + maxSize + '</span>bits...</p>';
                    break;
                case 2:
                    error.style.display = 'block';
                    error.innerHTML = 'A imagem selecionada é do formato: .' + ext + '!'
                            + '<p>Por favor selecione uma imagem do formato: <span class="bold">.jpg</span>'
                            + ' ou <span class="bold">jpeg</span>...</p>';
            }
            setTimeout(function () {
                error.style.display = 'none';
            }, 5000);
        }
    </script>
</div>