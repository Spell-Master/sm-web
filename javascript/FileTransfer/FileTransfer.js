/**
 * **************************************************
 * FileTransfer
 * @author Spell-Master (Omar Pautz)
 * @copyright 2018
 * @version 3.0 (2022)
 * 
 * Executa transferência de arquivos.
 * Servidor X usuário (download)
 * Usuário X servidor (upload)
 * 
 * @param {OBJECT} options
 * * 'method': Método a ser usado download ou upload.
 * * 'url': Endereço/destino do processo,
 *  quando download informar o local do arquivo,
 *  quando upload informar o local de salvamento.
 * * 'cancel': O botão para cancelar deve ser
 *  adicionado? Defina como "false" para não mostrar
 *  o botão.
 * * 'input': tag input[file] para obter os arquivos
 *  no upload, é opcional quando "method" for
 *  download.
 * * 'onStart': Função a ser executada antes do
 *  início dos processos. (opcional)
 * * 'onError': Função a ser executada quando ocorre
 *  erros.  (opcional)
 * * 'onResult': Função a ser executada quando os
 *  processos terminam. (opcional)
 * **************************************************
 */

var FileTransfer = function (options) {

    options = options || {};

    var $options = {
        method: options.method || undefined,
        url: options.url || undefined,
        cancel: options.cancel || undefined,
        input: options.input || undefined,
        onStart: options.onStart || undefined,
        onError: options.onError || undefined,
        onResult: options.onResult || undefined
    }, $this = {
        request: null,
        data: null,
        link: undefined,
        file: '',
        loaded: 0
    }, $node = {
        container: undefined,
        item: undefined,
        method: undefined,
        percent: undefined,
        line: undefined,
        progress: undefined,
        name: undefined,
        cancel: undefined
    };

    /**
     * **********************************************
     * Verifica se os valores necessários das opções
     *  estão transcritos de forma correta para
     *  melhor funcionamento dos recursos.
     * **********************************************
     */
    function checkOptions() {
        try {
            if (typeof $options.method !== 'string') {
                throw  'method: não é uma string válida';
            } else if ($options.method !== 'download' && $options.method !== 'upload') {
                throw 'method: possui um valor inválido';
            } else if (typeof $options.url !== 'string') {
                throw 'url: não é uma string válida';
            } else if ($options.url === '') {
                throw 'url: não contém um arquivo válido';
            }
            if ($options.method === 'upload') {
                if ($options.input.tagName === undefined) {
                    throw 'input: não é um elemento type[\'file\']';
                } else if ($options.input.tagName.toLowerCase() !== 'input') {
                    throw 'input: não é um elemento type[\'file\']';
                }
            }
        } catch (exception) {
            console.error(exception);
            return false;
        }
    }

    /**
     * **********************************************
     * Adiciona os principais elementos no documento
     *  para mostrar os processos.
     * **********************************************
     */
    function addNodes() {
        $node.container = document.getElementById('file-transfer-container');
        if (typeof $node.container === undefined || $node.container === null) {
            $node.container = document.createElement('div');
            $node.container.id = 'file-transfer-container';
            document.body.appendChild($node.container);
        }
        $node.item = document.createElement('div');
        $node.item.className = 'transfer-item';
        $node.container.insertBefore($node.item, $node.container.firstChild);
        for (var $n in $node) {
            if ($n === 'method' || $n === 'percent' || $n === 'line') {
                $node[$n] = document.createElement('div');
                $node[$n].className = 'transfer-' + $n;
                $node.item.appendChild($node[$n]);
            }
        }
        $node.progress = document.createElement('div');
        $node.progress.className = 'transfer-progress';
        $node.line.appendChild($node.progress);
        methodNodes();
        if ($options.cancel !== false) {
            setCancel();
        }
    }

    /**
     * **********************************************
     * Adiciona os elementos referentes aos métodos
     *  de download ou upload.
     * **********************************************
     */
    function methodNodes() {
        if ($options.method === 'download') {
            $this.link = document.createElement('a');
            $node.name = document.createElement('div');
            $node.name.className = 'transfer-name';
            $node.item.appendChild($node.name);
            $node.name.innerText = $options.url.split('/').reverse()[0].substring(0, 50);
            $node.method.innerText = 'Recebendo...';
        } else {
            $node.method.innerText = 'Enviando...';
        }
    }

    /**
     * **********************************************
     * Adiciona o botão de parar a transferência.
     * **********************************************
     */
    function setCancel() {
        $node.cancel = document.createElement('button');
        $node.cancel.className = 'file-transfer-cancel';
        $node.cancel.innerText = 'Cancelar';
        $node.cancel.addEventListener('click', transferStop, false);
        $node.item.appendChild($node.cancel);
    }

    /**
     * **********************************************
     * Remove todos elementos adicionados do
     *  documento.
     * **********************************************
     */
    function removeNodes() {
        $this.request = null;
        var $time = 0, $interval = setInterval(function () {
            if ($time === 1) {
                //if ($options.method === 'download') {
                //    $this.link.parentNode.removeChild($this.link);
                //    document.body.removeChild($this.link);
                //}
                $node.item.className = 'file-transfer-out';
            } else if ($time === 2) {
                if ($node.container.childElementCount > 1) {
                    $node.item.parentNode.removeChild($node.item);
                } else {
                    $node.container.parentNode.removeChild($node.container);
                }
                clearInterval($interval);
            }
            $time++;
        }, 1000);
    }

    /**
     * **********************************************
     * Para a transferência dos arquivos.
     * **********************************************
     */
    function transferStop() {
        if ($this.request instanceof XMLHttpRequest) {
            $this.request.abort();
            removeNodes();
            reset();
        }
    }

    /**
     * **********************************************
     * Exibe os erros quando eles ocorrem.
     * @param {STRING} err
     * Texto de exibição do erro.
     * **********************************************
     */
    function transferError(err) {
        if (typeof $options.onError === 'function') {
            $options.onError(err);
            transferStop();
        }
    }

    /**
     * **********************************************
     * Altera o tamanho da barra de progresso de
     *  acordo com os dados já processados.
     * @param {OBJECT} e
     * progress prototype.
     * **********************************************
     */
    function progressStatus(e) {
        if (e.lengthComputable) {
            $this.loaded = Math.round((e.loaded / e.total) * 100);
            $node.percent.innerText = $this.loaded + '% completado';
            $node.progress.style.width = $this.loaded + '%';
        }
    }

    /**
     * **********************************************
     * Conclui as operações e mostra os resultados.
     * **********************************************
     */
    function loadResult() {
        var $response = '';
        setTimeout(function () {
            if ($options.method === 'download') {
                $this.link.href = $this.file;
                $this.link.download = $this.request.responseURL.split('/').reverse()[0];
                //document.body.appendChild($this.link);
                $this.link.click();
                $response = 'Completo';
            } else {
                $response = $this.request.responseText;
            }
            if (typeof $options.onResult === 'function') {
                $options.onResult($response);
            }
            removeNodes();
            reset();
        }, 1000);
    }

    /**
     * **********************************************
     * Monitora as alterações no status da aquisição
     *  do arquivo.
     * **********************************************
     */
    function readyState() {
        if ($this.request.readyState === 4) {
            if ($options.cancel !== false) {
                $node.cancel.removeEventListener('click', transferStop);
                $node.cancel.style.display = 'none';
            }
            if ($this.request.status === 200) {
                loadResult();
            }
        } else if ($this.request.status > 200) {
            transferError($this.request.status);
        } else if ($this.request.onerror) {
            transferError($this.request.onerror);
        }
    }

    /**
     * **********************************************
     * Inicia os processos.
     * **********************************************
     */
    function init() {
        addNodes();
        $this.request.addEventListener('progress', progressStatus, false);
        $this.request.addEventListener('readystatechange', readyState, false);
        $this.request.send($this.data);
    }

    /**
     * **********************************************
     * Define os dados principais ao estado inicial
     *  para limpar a memória.
     * **********************************************
     */
    function reset() {
        $this = {
            request: null,
            data: null
        };
    }

    /**
     * **********************************************
     * @constructor
     * **********************************************
     */
    if (checkOptions() !== false) {
        $this.request = new XMLHttpRequest();
        if ($options.method === 'download') {
            $this.data = null;
            $this.file = $options.url;
            $this.request.responseType = 'blob';
            $this.request.open('GET', $options.url, true);
        } else {
            $this.data = new FormData();
            $this.file = $options.input.files;
            for (var $i = 0; $i < $this.file.length; $i++) {
                $this.data.append($options.input.name, $this.file[$i]);
            }
            $this.request.responseType = 'text';
            $this.request.open('POST', $options.url, true);
        }
        if (typeof $options.onStart === 'function') {
            (($options.onStart($this.file) !== false) ? init() : reset());
        } else {
            init();
        }
    }
};
