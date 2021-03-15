/**
 * **************************************************
 * * @Class FileTransfer
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2018
 * * @version 2.0 (2021)
 * **************************************************
 * * Executa transferência de arquivos.
 * Servidor X usuário (download)
 * Usuário X servidor (upload)
 * **************************************************
 */

var FileTransfer = function () {
    var $transfer = {
        request: null,
        method: null,
        file: null,
        name: null,
        progress: null,
        percent: null,
        cancel: null,
        bar: null
    }, $upload = {
        form: null,
        result: null
    }, $download = {
        url: null,
        blob: null,
        link: null
    };

    this.upload = uploadFile;
    this.download = downloadFile;
    this.stop = stopTrasnfer;

    /**
     * **********************************************
     * @public
     * Envia arquivos do hadware do usuário para o
     *  servidor.
     * 
     * @param {STR} form
     *  Elemento#ID do formulário de envio.
     *  
     * @param {STR} url
     *  Arquivo que será processará os dados do
     *   envio pelo lado do servidor.
     *  
     * @param {BOLL} cancel (true/false/null)
     *  Durante o processo de envio um botão para
     *  cancelar deve ser ativo?
     *  
     * @param {STR/BOLL} result
     *  Elemento#ID do local do html onde o arquivo
     *  de processamento deve ser mostrado.
     * **********************************************
     */
    function uploadFile(form, url, result, cancel) {
        var $uploadInput = document.getElementById(form).querySelector('input[type="file"]');
        if (!$uploadInput.value) {
            console.warn('Nenhum arquivo selecionado');
        } else if (!url) {
            console.warn('Destino de recebimento não expecificado');
        } else if ($transfer.request instanceof XMLHttpRequest) {
            console.warn('Já existe um processo em andamento');
        } else {
            $transfer.request = new XMLHttpRequest();
            $upload.form = new FormData();
            $transfer.cancel = (cancel ? document.createElement('button') : null);
            $upload.result = (result ? document.getElementById(result) : null);
            $transfer.method = 'up';
            $transfer.file = $uploadInput.files[0];
            $transfer.name = $transfer.file.name;
            $upload.form.append($uploadInput.name, $transfer.file);
            createProgress();
            htmlProgress();
            $transfer.request.upload.addEventListener('progress', transferProgress, false);
            $transfer.request.addEventListener('readystatechange', transferComplete, false);
            $transfer.request.responseType = 'text';
            $transfer.request.open('POST', url, true);
            $transfer.request.send($upload.form);
        }
        return (false);
    }

    /**
     * **********************************************
     * @public
     * Envia arquivos do servidor remoto para o
     *  hadware do usuário.
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
     * 
     * @param {BOLL} blob (true/false/null)
     *  A url para o arquivo deve ser binária?
     *  Isso impedirar que conheçam o verdadeiro
     *  endereço do arquivo.
     * **********************************************
     */
    function downloadFile(file, cancel, blob) {
        if (!file) {
            console.warn('Arquivo de envio não expecificado');
        } else if ($transfer.request instanceof XMLHttpRequest) {
            console.warn('Já existe um processo em andamento');
        } else {
            $transfer.request = new XMLHttpRequest();
            $transfer.file = file;
            $transfer.name = $transfer.file.split('/').reverse()[0];
            $transfer.cancel = (cancel ? document.createElement('button') : null);
            $download.blob = (blob ? blob : null);
            $transfer.method = 'do';
            $download.link = document.createElement('a');
            createProgress();
            htmlProgress();
            $transfer.request.addEventListener('progress', transferProgress, false);
            $transfer.request.addEventListener('readystatechange', transferComplete, false);
            $transfer.request.responseType = 'blob';
            $transfer.request.open('GET', file, true);
            $transfer.request.send();
        }
        return (false);
    }

    /**
     * **********************************************
     * @public
     * Interrompe o processo de transferência dos
     * arquivos.
     * **********************************************
     */
    function stopTrasnfer() {
        if ($transfer.request instanceof XMLHttpRequest) {
            $transfer.request.abort();
            removeProgress();
        }
    }

    /**
     * **********************************************
     * @private
     * Cria um monitorde progresso para informar o
     *  status da aquisição do atual arquivo.
     * Adiciona o botão de interrupção quando
     *  definido no upload ou download.
     * **********************************************
     */
    function createProgress() {
        $transfer.progress = document.createElement('div');
        $transfer.progress.id = 'transfer-progress';
        $transfer.progress.innerHTML = '<div class="progress-text"></div><div class="progress-file"></div><div class="progress-percent"></div><div class="progress-line"><div class="progress-bar"></div></div>';
        document.body.appendChild($transfer.progress);
        if ($transfer.cancel) {
            $transfer.cancel.classList.add('progress-cancel');
            $transfer.cancel.innerText = 'Cancelar';
            $transfer.cancel.addEventListener('click', stopTrasnfer, false);
            $transfer.progress.appendChild($transfer.cancel);
        }
    }

    /**
     * ************************************************
     * @private
     * Obtem dados html do monitor de progresso.
     * ************************************************
     */
    function htmlProgress() {
        if ($transfer.method === 'up') {
            $transfer.progress.querySelector('.progress-text').innerText = 'Enviando Arquivo';
        } else if ($transfer.method === 'do') {
            $transfer.progress.querySelector('.progress-text').innerText = 'Recebendo Arquivo';
        }
        $transfer.progress.querySelector('.progress-file').innerText = $transfer.name;
        $transfer.percent = $transfer.progress.querySelector('.progress-percent');
        $transfer.bar = $transfer.progress.querySelector('.progress-bar');
    }

    /**
     * **********************************************
     * @private
     * Mostra o percentual da transferência no
     *  monitor.
     *  
     * @param {OBJ} e
     *  Dados do evento "progress" 
     * ************************************************
     */
    function transferProgress(e) {
        var $upProgress;
        if (e.lengthComputable) {
            $upProgress = Math.round((e.loaded / e.total) * 100);
            $transfer.percent.innerText = $upProgress + '% completado';
            $transfer.bar.style.width = $upProgress + '%';
        }
    }

    /**
     * **********************************************
     * @private
     * Quando completado o processo de leitura dos
     *  dados toma as ações baseadas no status da
     *  requisição em relação as definições de
     *  variáveis.
     * **********************************************
     */
    function transferComplete() {
        if ($transfer.request.status === 404) {
            console.warn('Não foi possível localizar o arquivo (' + $transfer.name + ')');
            stopTrasnfer();
        } else if (($transfer.request.readyState === 4) && ($transfer.request.status === 200)) {
            if ($transfer.cancel) {
                $transfer.cancel.style.display = 'none';
            }
            if ($upload.result) {
                $upload.result.innerHTML = $transfer.request.responseText;
            }
            sincHtml();
            setTimeout(removeProgress, 1000);
        }
    }

    /**
     * **********************************************
     * @private
     * Elimina elementos criados pelos métodos.
     * **********************************************
     */
    function removeProgress() {
        if ($transfer.cancel) {
            $transfer.cancel.removeEventListener('click', stopTrasnfer);
        }
        if ($transfer.method === 'do') {
            if ($download.blob) {
                window.URL.revokeObjectURL($download.url);
            }
            document.body.removeChild($download.link);
        }
        document.body.removeChild($transfer.progress);
        clearVar();
    }

    /**
     * **********************************************
     * @private
     * Sincroniza o documento HTML com os nos novos
     *  dados requeridos pelos métodos.
     * **********************************************
     */
    function sincHtml() {
        if ($transfer.method === 'up') {
            var $script = $upload.result.getElementsByTagName('script');
            var $i;
            var $newScript;
            for ($i = $script.length - 1; $i >= 0; $i--) {
                $newScript = document.createElement('script');
                if ($script[$i].src) {
                    $newScript.src = $script[$i].src;
                } else {
                    $newScript.text = $script[$i].text;
                }
                $upload.result.appendChild($newScript);
                $upload.result.removeChild($script[$i]);
            }
        } else {
            if ($download.blob) {
                $download.url = window.URL.createObjectURL($transfer.request.response);
                $download.link.href = $download.url;
            } else {
                $download.link.href = $transfer.file;
            }
            $download.link.download = $transfer.name;
            document.body.appendChild($download.link);
            $download.link.click();
        }
    }

    /**
     * **********************************************
     * @private
     * Define todos dados usadas para nada.
     * **********************************************
     */
    function clearVar() {
        if ($transfer.method == 'up') {
            $upload.form = null;
            $upload.result = null;
        } else {
            $download.link = null;
        }
        if ($download.blob) {
            $download.blob = null;
            $download.url = null;
        }
        $transfer.request = null;
        $transfer.method = null;
        $transfer.file = null;
        $transfer.name = null;
        $transfer.progress = null;
        $transfer.percent = null;
        $transfer.cancel = null;
        $transfer.bar = null;
    }
};
