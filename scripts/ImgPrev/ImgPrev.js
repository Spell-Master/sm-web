/**
 * ****************************************************
 * Pr�via de imagem para upload.
 * * @Copyright : (2015) Spell Master "omar pautz"
 * * @version : 2.1 (2018) "Spell Master"
 * ****************************************************
 * * @param {STR} inputFile : Elemento #ID do input
 *          de envio 
 * * @param {STR} divPrev : Elemento #ID do local de
 *          exibi��o da pr�via.
 * ****************************************************
 */
var ImgPrev = function (inputFile, divPrev) {
    var $input = document.getElementById(inputFile);
    var $prev = document.getElementById(divPrev);
    var $bar = document.getElementById('preview-progress'), $transfer, $reader, $file, $image;

    /**
     * ************************************************
     * Obtem dados o input de envio
     * * @param {OBJ} e
     *   Evento disparado
     * ************************************************
     */
    function getInput(e) {
        $transfer = e.target.files;
        checkFile($transfer);
    }

    /**
     * ************************************************
     * Verifica o tipo de arquivo enviado
     * - Caso o envio constar mais de 1 arquivo
     *   seleciona s� o primeiro da lista.
     * - Cria o cabe�alho da leitura.
     * - Adciona o evento de progresso
     * * @param {STR} files
     *   Evento disparado
     * ************************************************
     */
    function checkFile(files) {
        $file = files[0];
        if (/\.(jpe?g|png|gif|bmp)$/i.test(files[0].name)) {
            $progress = 0;
            $bar.style.width = 0;
            $reader = new FileReader();
            $reader.addEventListener('progress', progress, true);
            $prev.innerHTML = null;
            createPrev(files[0]);
        }
    }

    /**
     * ************************************************
     * Cria a c�pia da imagem em base64.
     * * @param {STR} file
     *   Arquivo de envio
     * ************************************************
     */
    function createPrev(file) {
        $image = document.createElement('img');
        $image.classList.add('image-prev');
        $image.file = file;
        $prev.appendChild($image);
        $reader.addEventListener('load', loadPreview, true);
        $reader.readAsDataURL(file);
    }

    /**
     * ************************************************
     * Exibe a imagem no local designado.
     * pr�via.
     * * @param {OBJ} e
     *   Arquivo de envio
     * ************************************************
     */
    function loadPreview(e) {
        $image.src = e.target.result;
        setTimeout(function () {
            $progress = 0;
            $bar.style.width = 0;
        }, 1000);
    }

    /**
     * ************************************************
     * Exibe o progresso de envio.
     * * @param {OBJ} e
     *   Evento em andamento.
     * ************************************************
     */
    function progress(e) {
        var $progress;
        if (e.lengthComputable) {
            $progress = Math.round((e.loaded / e.total) * 1000);
            $bar.style.width = $progress + '%';
        }
    }

    /**
     * ************************************************
     * * Adiciona o evento de ativa��o ao input
     * ************************************************
     */
    $input.addEventListener('change', getInput, false);
};
