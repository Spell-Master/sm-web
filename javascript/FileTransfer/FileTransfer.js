/**
 * ****************************************************
 * @Copyright (c) 2018, Spell Master.
 * @version 1.0
 * @requires  Navegador compatível com HTML 5
 * ****************************************************
 * @class Executa ajax para processamento de arquivos.
 * ****************************************************
 */
var FileTransfer = function () {

    // * Variáveis compatilhada pelo upload e download
    var $request, $file, $name, $cancel, $type, $div, $progress = [];
    // * Variáveis do upload
    var $data, $result, $input, $response;
    // * Variáveis do download
    var $objetURL, $link;

    /**
     * ************************************************
     * * Envia arquivos do hadware do
     * usuário para o servidor remoto.
     * * @param {STR} form
     * - Elemento#ID do formulário de envio.
     * * @param {STR} sendTo
     * - Arquivo que será processará os dados do envio
     * pelo lado do servidor.
     * * @param {BOLL} cancel (true/false/null)
     * - Durante o processo de envio um botão para
     * cancelar deve ser ativo?
     * * @param {STR/BOLL} result
     * - Elemento#ID do local do html onde o arquivo
     * de processamento deve ser mostrado.
     * ************************************************
     */
    this.upload = function (form, sendTo, result, cancel) {
        if (!form) {
            console.warn('ID do formulário não expecificado');
        } else if (!sendTo) {
            console.warn('Arquivo de recebimento não expecificado');
        } else if (!($request instanceof XMLHttpRequest)) {
            $request = new XMLHttpRequest();
            $data = new FormData();
            $cancel = (cancel ? true : null);
            $result = (result ? result : null);
            $type = 'upload';
            $input = document.getElementById(form).querySelector('input[type="file"]');
            if (!$input.value) {
                clearVar();
                console.warn('Nenhum arquivo selecionado');
            } else {
                $file = $input.files[0];
                $name = $file.name;
                $data.append($input.name, $file);
                createProgress();
                queryDOM();
                $request.upload.addEventListener('progress', transferProgress, false);
                $request.addEventListener('readystatechange', transferComplete, false);

                $request.responseType = 'text';
                $request.open('POST', sendTo, true);
                $request.send($data);
            }
        } else {
            console.warn('Já existe um processo em andamento');
        }
        return (false);
    };

    /**
     * ************************************************
     * * Envia arquivos do servidor remoto
     * para hadware do usuário.
     * * @param {STR} file
     * - Arquivo para ser enviad.
     * Informar extensão.
     * Informar diretórios (se houver)
     * Expl.: 'pasta/arquivos/envio.bmp'
     * * @param {BOLL} cancel (true/false/null)
     * - Durante o processo de envio um botão para
     * cancelar deve ser ativo?
     * ************************************************
     */
    this.download = function (file, cancel) {
        if (!file) {
            console.warn('Arquivo de envio não expecificado');
        } else if (!($request instanceof XMLHttpRequest)) {
            $request = new XMLHttpRequest();
            var $fileArr = file.split('/').reverse();
            $file = file;
            $name = $fileArr[0];
            $cancel = (cancel ? cancel : false);
            $type = 'download';
            createProgress();
            queryDOM();
            $request.addEventListener('progress', transferProgress, false);
            $request.addEventListener('readystatechange', transferComplete, false);
            $request.responseType = 'blob';
            $request.open('GET', file, true);
            $request.send();
        } else {
            console.warn('Já existe um processo em andamento');
        }
        return (false);
    };

    /**
     * ************************************************
     * * Criar um elemento HTML para
     * execução dos dados de processo.
     * ************************************************
     */
    function createProgress() {
        $div = document.createElement('div');
        $div.id = 'transfer-progress';
        $div.innerHTML = '<div class="progress-text"></div>\n\
            <div class="progress-file"></div>\n\
            <div class="progress-percent"></div>\n\
            <div class="progress-line">\n\
                <div class="progress-bar"></div>\n\
            </div>';
        if ($cancel) {
            $div.innerHTML += '<button class="progress-cancel">Cancelar</button>';
            $div.querySelector('.progress-cancel').addEventListener('click', stopTrasnfer, false);
        }
        document.body.appendChild($div);
    }

    /**
     * ************************************************
     * * Criar um elemento HTML para
     * execução dos dados de processo.
     * ************************************************
     */
    function queryDOM() {
        if ($type === 'upload') {
            $div.querySelector('.progress-text').innerText = 'Enviando Arquivo';
        } else if ($type === 'download') {
            $div.querySelector('.progress-text').innerText = 'Transferindo Arquivo';
        }
        $div.querySelector('.progress-file').innerText = $name;
        $progress[0] = $div.querySelector('.progress-percent');
        $progress[1] = $div.querySelector('.progress-bar');
    }

    /**
     * ************************************************
     * * Monitora os dados da requisição
     * a partir da leitura dos mesmos.
     * * @param e
     * - Evento em andamento. 
     * ************************************************
     */
    function transferProgress(e) {
        var $upProgress;
        if (e.lengthComputable) {
            $upProgress = Math.round((e.loaded / e.total) * 100);
            $progress[0].innerText = $upProgress + '% completado';
            $progress[1].style.width = $upProgress + '%';
        }
    }

    /**
     * ************************************************
     * * Quando completado o processo de
     * leitura dos dados toma as ações baseadas no
     * status da requisição em relação as definições
     * de variáveis.
     * ************************************************
     */
    function transferComplete() {
        if ($request.status === 404) {
            console.warn('Não foi possível localizar o arquivo (' + $name + ')');
            stopTrasnfer();
        } else if (($request.readyState === 4) && ($request.status === 200)) {
            if ($cancel) {
                $div.querySelector('.progress-cancel').style.display = 'none';
            }
            setTimeout(function () {
                if ($result) {
                    $response = $request.responseText;
                    sincHtml();
                }
                if ($type === 'upload') {
                    removeProgress();
                } else if ($type === 'download') {
                    $objetURL = window.URL.createObjectURL($request.response);
                    sendFile();
                }
            }, 1000);
        }
    }

    /**
     * ************************************************
     * * Para o processo de download cria
     * um novo elemento que requisita o arquivo como
     * link html, forçando um click falso no elemento.
     * ************************************************
     */
    function sendFile() {
        $link = document.createElement('a');
        $link.href = $file;
        $link.download = $name;
        document.body.appendChild($link);
        $link.click();
        removeProgress();
    }

    /**
     * ************************************************
     * * Sincorniza a abertura do arquivo
     * via parâmentro do upload, exibindo o mesmo
     * como como html limpo.
     * @augments : Essas ações são as mesmas usadas
     * em outro arquivo javascripr de manipulação
     * asíncrona (AjaxRequest.js)
     * ************************************************
     */
    function sincHtml() {
        var $load = document.getElementById($result);
        if ($load !== null) {
            $load.innerHTML = $request.responseText;
            var $j = $response.indexOf('<script', 0), $src, $idxSrc, $endSrc, $strSrc;
            var $os = $load.getElementsByTagName('script'), $k;
            for ($k = $os.length - 1; $k >= 0; $k--) {
                $os[$k].parentNode.removeChild($os[$k]);
            }
            while ($j != -1) {
                $src = document.createElement('script');
                $idxSrc = $response.indexOf(' src', $j);
                $j = $response.indexOf('>', $j) + 1;
                if ($idxSrc < $j && $idxSrc >= 0) {
                    $j = $idxSrc + 4;
                    $endSrc = $response.indexOf('.js', $j) + 3;
                    $strSrc = $response.substring($j, $endSrc);
                    $strSrc = $strSrc.replace('=', '')
                            .replace(' ', '')
                            .replace('"', '')
                            .replace('"', '')
                            .replace("'", '')
                            .replace("'", '')
                            .replace('>', '');
                    $src.src = $strSrc;
                } else {
                    $endSrc = $response.indexOf('</script>', $j);
                    $strSrc = $response.substring($j, $endSrc);
                    $src.text = $strSrc;
                }
                $load.appendChild($src);
                $j = $response.indexOf('<script', $endSrc);
                $src = null;
            }
        } else {
            console.warn('Não é possível determinar sucesso do envio, elemento de #ID de validação é "null"');
        }
    }

    /**
     * ************************************************
     * * Elimina elementos criados pelos
     * métodos.
     * ************************************************
     */
    function removeProgress() {
        if ($cancel) {
            $div.querySelector('.progress-cancel').removeEventListener('click', stopTrasnfer);
        }
        if ($type === 'download') {
            if ($objetURL) {
                window.URL.revokeObjectURL($objetURL);
                document.body.removeChild($link);
            }
        }
        document.body.removeChild($div);
        clearVar();
    }

    /**
     * ************************************************
     * * Re-define todas variáveis
     * usadas para nada.
     * ************************************************
     */
    function clearVar() {
        if ($type === 'upload') {
            $data = null;
            $result = null;
            $input = null;
        } else if ($type === 'download') {
            $objetURL = null;
            $link = null;
        }
        $request = null;
        $file = null;
        $name = null;
        $cancel = null;
        $type = null;
        $div = null;
        $progress = [];
    }

    /**
     * ************************************************
     * * Cancela/para a aquisição dos dados.
     * ************************************************
     */
    function stopTrasnfer() {
        $request.abort();
        removeProgress();
    }
};
