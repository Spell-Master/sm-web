/**
 * ****************************************************
 * * @Class FileTransfer
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2018
 * * @version 1.1 (2020)
 * ****************************************************
 * * Executa transferência de arquivos.
 * Servidor X usuário (download)
 * Usuário X servidor (upload)
 * ****************************************************
 */

var FileTransfer = function () {

    var $data = {
        request: null,
        file: null,
        name: null,
        cancel: null,
        type: null,
        div: null,
        percent: null,
        bar: null
    }, $upload = {
        form: null,
        result: null,
        input: null,
        response: null
    }, $download = {
        url: null,
        link: null
    };


    /**
     * ************************************************
     * @function: Envia arquivos do hadware do usuário
     *  para o servidor.
     *  
     * @public
     * ************************************************
     * 
     * @param {STR} form
     *  Elemento#ID do formulário de envio.
     *  
     * @param {STR} sendTo
     *  Arquivo que será processará os dados do envio
     *  pelo lado do servidor.
     *  
     * @param {BOLL} cancel (true/false/null)
     *  Durante o processo de envio um botão para
     *  cancelar deve ser ativo?
     *  
     * @param {STR/BOLL} result
     *  Elemento#ID do local do html onde o arquivo
     *  de processamento deve ser mostrado.
     * ************************************************
     */
    this.upload = function (form, sendTo, result, cancel) {
        if (!form) {
            console.warn('ID do formulário não expecificado');
        } else if (!sendTo) {
            console.warn('Arquivo de recebimento não expecificado');
        } else if (!($data.request instanceof XMLHttpRequest)) {
            $data.request = new XMLHttpRequest();
            $upload.form = new FormData();
            $data.cancel = (cancel ? true : null);
            $upload.result = (result ? result : null);
            $data.type = 'upload';
            $upload.input = document.getElementById(form).querySelector('input[type="file"]');
            if (!$upload.input.value) {
                clearVar();
                console.warn('Nenhum arquivo selecionado');
            } else {
                $data.file = $upload.input.files[0];
                $data.name = $data.file.name;
                $upload.form.append($upload.input.name, $data.file);
                createProgress();
                queryDOM();
                $data.request.upload.addEventListener('progress', transferProgress, false);
                $data.request.addEventListener('readystatechange', transferComplete, false);

                $data.request.responseType = 'text';
                $data.request.open('POST', sendTo, true);
                $data.request.send($upload.form);
            }
        } else {
            console.warn('Já existe um processo em andamento');
        }
        return (false);
    };

    /**
     * ************************************************
     * @function: Envia arquivos do servidor remoto
     *  para hadware do usuário.
     *  
     * @public
     * ************************************************
     * 
     * @param {STR} file
     *  Arquivo para ser enviado.
     *  - Informar extensão.
     *  - Informar diretórios (se houver)
     *  - Expl.: 'pasta/arquivos/envio.zip'
     * 
     * @param {BOLL} cancel (true/false/null)
     *  Durante o processo de envio um botão para
     *  cancelar deve ser ativo?
     * ************************************************
     */
    this.download = function (file, cancel) {
        if (!file) {
            console.warn('Arquivo de envio não expecificado');
        } else if (!($data.request instanceof XMLHttpRequest)) {
            $data.request = new XMLHttpRequest();
            var $fileArr = file.split('/').reverse();
            $data.file = file;
            $data.name = $fileArr[0];
            $data.cancel = (cancel ? cancel : false);
            $data.type = 'download';
            createProgress();
            queryDOM();
            $data.request.addEventListener('progress', transferProgress, false);
            $data.request.addEventListener('readystatechange', transferComplete, false);
            $data.request.responseType = 'blob';
            $data.request.open('GET', file, true);
            $data.request.send();
        } else {
            console.warn('Já existe um processo em andamento');
        }
        return (false);
    };

    /**
     * ************************************************
     * @function: Cria um elemento para mostrar status
     *  da transferência em progresso.
     *  Adiciona o botão de interrupção quando definido
     *  no upload ou download.
     *  
     * @private
     * ************************************************
     */
    function createProgress() {
        $data.div = document.createElement('div');
        $data.div.id = 'transfer-progress';
        $data.div.innerHTML = '<div class="progress-text"></div><div class="progress-file"></div><div class="progress-percent"></div><div class="progress-line"><div class="progress-bar"></div></div>';
        if ($data.cancel) {
            $data.div.innerHTML += '<button class="progress-cancel">Cancelar</button>';
            $data.div.querySelector('.progress-cancel').addEventListener('click', stopTrasnfer, false);
        }
        document.body.appendChild($data.div);
    }

    /**
     * ************************************************
     * @function: Obtem dados do monitor de progresso.
     *  
     * @private
     * ************************************************
     */
    function queryDOM() {
        if ($data.type === 'upload') {
            $data.div.querySelector('.progress-text').innerText = 'Enviando Arquivo';
        } else if ($data.type === 'download') {
            $data.div.querySelector('.progress-text').innerText = 'Recebendo Arquivo';
        }
        $data.div.querySelector('.progress-file').innerText = $data.name;
        $data.percent = $data.div.querySelector('.progress-percent');
        $data.bar = $data.div.querySelector('.progress-bar');
    }

    /**
     * ************************************************
     * @function: Mostra o percentual da transferência
     *  no monitor.
     *  
     * @private
     * ************************************************
     * @param {OBJ} e
     *  Dados do evento "progress" 
     * ************************************************
     */
    function transferProgress(e) {
        var $upProgress;
        if (e.lengthComputable) {
            $upProgress = Math.round((e.loaded / e.total) * 100);
            $data.percent.innerText = $upProgress + '% completado';
            $data.bar.style.width = $upProgress + '%';
        }
    }

    /**
     * ************************************************
     * @function: Quando completado o processo de
     *  leitura dos dados toma as ações baseadas no
     *  status da requisição em relação as definições
     *  de variáveis.
     *  
     * @private
     * ************************************************
     */
    function transferComplete() {
        if ($data.request.status === 404) {
            console.warn('Não foi possível localizar o arquivo (' + $data.name + ')');
            stopTrasnfer();
        } else if (($data.request.readyState === 4) && ($data.request.status === 200)) {
            if ($data.cancel) {
                $data.div.querySelector('.progress-cancel').style.display = 'none';
            }
            setTimeout(function () {
                if ($upload.result) {
                    $upload.response = $data.request.responseText;
                    sincHtml();
                }
                if ($data.type === 'upload') {
                    removeProgress();
                } else if ($data.type === 'download') {
                    $download.url = window.URL.createObjectURL($data.request.response);
                    sendFile();
                }
            }, 1000);
        }
    }

    /**
     * ************************************************
     * @function: Para o processo de download cria
     *  um novo elemento que requisita o arquivo como
     * link html, forçando um click falso no elemento.
     *  
     * @private
     * ************************************************
     */
    function sendFile() {
        $download.link = document.createElement('a');
        $download.link.href = $data.file;
        $download.link.download = $data.name;
        document.body.appendChild($download.link);
        $download.link.click();
        removeProgress();
    }

    /**
     * ************************************************
     * @function: Sincorniza a abertura do arquivo
     *  via parâmentro do upload, exibindo o mesmo
     *  como como html limpo.
     * 
     * @augments : Essas ações são as mesmas usadas
     *  em outro arquivo javascripr de manipulação
     *  assíncrona (AjaxRequest.js)
     *  
     * @private
     * ************************************************
     */
    function sincHtml() {
        var $load = document.getElementById($upload.result);
        if ($load !== null) {
            $load.innerHTML = $data.request.responseText;
            var $j = $upload.response.indexOf('<script', 0), $src, $idxSrc, $endSrc, $strSrc;
            var $os = $load.getElementsByTagName('script'), $k;
            for ($k = $os.length - 1; $k >= 0; $k--) {
                $os[$k].parentNode.removeChild($os[$k]);
            }
            while ($j != -1) {
                $src = document.createElement('script');
                $idxSrc = $upload.response.indexOf(' src', $j);
                $j = $upload.response.indexOf('>', $j) + 1;
                if ($idxSrc < $j && $idxSrc >= 0) {
                    $j = $idxSrc + 4;
                    $endSrc = $upload.response.indexOf('.js', $j) + 3;
                    $strSrc = $upload.response.substring($j, $endSrc);
                    $strSrc = $strSrc.replace('=', '')
                            .replace(' ', '')
                            .replace('"', '')
                            .replace('"', '')
                            .replace("'", '')
                            .replace("'", '')
                            .replace('>', '');
                    $src.src = $strSrc;
                } else {
                    $endSrc = $upload.response.indexOf('</script>', $j);
                    $strSrc = $upload.response.substring($j, $endSrc);
                    $src.text = $strSrc;
                }
                $load.appendChild($src);
                $j = $upload.response.indexOf('<script', $endSrc);
                $src = null;
            }
        } else {
            console.warn('Não é possível determinar sucesso do envio, elemento de #ID de validação é "null"');
        }
    }

    /**
     * ************************************************
     * @function: Elimina elementos criados pelos
     *  métodos.
     *  
     * @private
     * ************************************************
     */
    function removeProgress() {
        if ($data.cancel) {
            $data.div.querySelector('.progress-cancel').removeEventListener('click', stopTrasnfer);
        }
        if ($data.type === 'download') {
            if ($download.url) {
                window.URL.revokeObjectURL($download.url);
                document.body.removeChild($download.link);
            }
        }
        document.body.removeChild($data.div);
        clearVar();
    }

    /**
     * ************************************************
     * @function: Define todas dados usadas para nada.
     *  
     * @private
     * ************************************************
     */
    function clearVar() {
        if ($data.type === 'upload') {
            $upload.form = null;
            $upload.result = null;
            $upload.input = null;
        } else if ($data.type === 'download') {
            $download.url = null;
            $download.link = null;
        }
        $data.request = null;
        $data.file = null;
        $data.name = null;
        $data.cancel = null;
        $data.type = null;
        $data.div = null;
        $data.bar = null;
        $data.percent = null;
        $data.bar = null;
    }

    /**
     * ************************************************
     * @function: Cancela/ para a aquisição dos
     *  arquivos.
     *  
     * @private
     * ************************************************
     */
    function stopTrasnfer() {
        $data.request.abort();
        removeProgress();
    }
};
