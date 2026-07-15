/**
 * **************************************************
 * * FileTransfer
 * @author Spell-Master (Omar Pautz)
 * @copyright 2018
 * @version 4.0 (14/07/2026)
 * 
 * Executa transferência de arquivos.
 *  
 * **************************************************
 * * Opções
 * 
 * - url = Destino da requisição.
 * - file = 
 * Em upload informar o elemento "input" onde onde
 *  arquivos estejam anexos.
 * Em  download (opcional) informar o nome do
 *  arquivo que será enviado, caso não informado
 *  o nome passa a ser o destino da requisição.
 * - onStart = (opcional) Função a ser executada
 *  no início dos processos.
 * - onProgress = (opcional) Função a ser executada
 *  durante a transferência de dados.
 * - onResult = (opcional) Função a ser executada
 *  quando tudo estiver terminado.
 * - onCancel = (opcional) Função a ser executada
 *  quando a transferência for abortada.
 * - onError = (opcional) Função a ser executada
 *  quando houver erros na transferência.
 * **************************************************
 */

var FileTransfer = function () {

    var $options = {},
        $api = {
            xhr: null,
            fd: null
        },
        $this = {
            down: false,
            abort: false,
            progress: 0,
            objetURL: undefined,
            timeOut: 0
        },
        $fileData = {};

    /**
     * *********************************************
     * * Define as opções.
     * @param {OBJ} options
     * Opções de execução.
     * *********************************************
     */
    function setOptions(options) {
        $options = {
            url: options.url || undefined,
            file: options.file || undefined,
            onStart: options.onStart || function () {},
            onProgress: options.onProgress || function () {},
            onResult: options.onResult || function () {},
            onCancel: options.onCancel || function () {},
            onError: options.onError || function () {}
        };
    }

    /**
     * *********************************************
     * * Restaura as variáveis ao estado inicial.
     * @see UPLOAD
     * *********************************************
     */
    function resetVars() {
        if (typeof $this.objetURL !== 'undefined') {
            window.URL.revokeObjectURL($this.objetURL);
        }
        clearTimeout($this.timeOut);
        $options = {};
        $api = {xhr: null, fd: null};
        $this = {down: false, abort: false, progress: 0, objetURL: undefined, timeOut: 0};
        $fileData = {};
    }

    /**
     * *********************************************
     * * Anexa os arquivos do input ao FormData.
     * @see UPLOAD
     * *********************************************
     */
    function formData() {
        var $inputFile = $options.file.files;
        $api.fd = new FormData();
        for (var $idx = 0; $idx < $inputFile.length; $idx++) {
            $api.fd.append($options.file.name, $inputFile[$idx], $inputFile[$idx].name);
        }
    }

    /**
     * *********************************************
     * * Anexa dados do(s) arquivo(s) no input ao
     * objeto de retorno dos dados a serem enviados.
     * @see UPLOAD
     * *********************************************
     */
    function fileData() {
        var $dataFiles = $api.fd.getAll($options.file.name);
        if ($dataFiles.length > 1) {
            for (var $key in $dataFiles) {
                $fileData[$key] = {
                    name: $dataFiles[$key].name,
                    size: $dataFiles[$key].size,
                    type: $dataFiles[$key].type
                };
            }
        } else {
            $fileData = {
                name: $dataFiles[0].name,
                size: $dataFiles[0].size,
                type: $dataFiles[0].type
            };
        }
    }

    /**
     * *********************************************
     * * Anexa dados do(s) arquivo(s) no input ao
     * objeto de retorno dos dados a serem enviados.
     * @param {OBJ} err 
     * Não utilizado apenas referencial.
     * *********************************************
     */
    function transferAbort(err) {
        $options.onCancel('Transferência de arquivo cancelada');
        //resetVars();
    }

    /**
     * *********************************************
     * * Informa erro na tranferência.
     * @param {STR/INT} err 
     * Código http-error.
     * *********************************************
     */
    function transferError(err) {
        $options.onError(err);
        resetVars();
    }

    /**
     * *********************************************
     * * Informa erro na tranferência.
     * @param {STR/INT} err 
     * Código http-error.
     * *********************************************
     */
    function transferProgress(ev) {
        if (ev.lengthComputable) {
            $this.progress = Math.round((ev.loaded / ev.total) * 100);
            $options.onProgress($this.progress);
        }
    }

    /**
     * *********************************************
     * * Completa a transferência enviando o
     *  arquivo para o utilizador quando o método
     *  for download ou informando a resposta do
     *  servidor quando o método for upload.
     * *********************************************
     */
    function transferComplete() {
        $this.timeOut = setTimeout(function () {
            if ($this.down) {
                var $linkURL = document.createElement('a');
                $this.objetURL = window.URL.createObjectURL($api.xhr.response);
                $linkURL.href = $this.objetURL;
                $linkURL.download = ($options.file || new Date().getTime().toString());
                $linkURL.click();
                $options.onResult(true);
            } else {
                $options.onResult($api.xhr.responseText);
            }
            resetVars();
        }, 1000);
    }

    /**
     * *********************************************
     * * Verifica o estado da requisição
     *  identificando sucesso ou erro na
     *  transferência.
     * *********************************************
     */
    function transferEnd() {
        if ($this.abort) {
            resetVars();
        } else if ($api.xhr.readyState === 4) {
            if ($api.xhr.status >= 200 && $api.xhr.status < 300) {
                transferComplete();
            } else {
                transferError($api.xhr.status);
            }
        }
    }

    /**
     * *********************************************
     * * Inicia a API XMLHttpRequest e define
     *  eventos da requisição e os dados a serem
     *  transferidos.
     * *********************************************
     */
    function httpRequest() {
        if ($api.xhr instanceof XMLHttpRequest) {
            transferError('Já existe um processo em andamento');
            resetVars();
        } else {
            $api.xhr = new XMLHttpRequest();
            $api.xhr.addEventListener('abort', transferAbort, false);
            $api.xhr.addEventListener('error', transferError, false);
            $api.xhr.addEventListener('loadend', transferEnd, false);
            if ($this.down) {
                $api.xhr.addEventListener('progress', transferProgress, false);
                $api.xhr.responseType = 'blob';
                $api.xhr.open('GET', $options.url, true);
                $api.xhr.send(null);
            } else {
                $api.xhr.upload.addEventListener('progress', transferProgress, false);
                $api.xhr.responseType = 'text';
                $api.xhr.open('POST', $options.url, true);
                $api.xhr.send($api.fd);
            }
        }
    }

    /**
     * *********************************************
     * * Executa download.
     * @param {OBJ} options
     * Opções de execução.
     * *********************************************
     */
    function downLoad(options) {
        setOptions(options);
        $this.down = true;
        if ($options.onStart(null) === false) {
            return (false);
        }
        httpRequest();
    }

    /**
     * *********************************************
     * * Executa upload.
     * @param {OBJ} options
     * Opções de execução.
     * *********************************************
     */
    function upLoad(options) {
        setOptions(options);
        if ($options.file.files.length >= 1) {
            formData();
            fileData();
            if ($options.onStart($fileData) === false) {
                return (false);
            }
            httpRequest();
        } else {
            $options.onStart(null);
        }
    }

    /**
     * *********************************************
     * * Aborta a transferência.
     * *********************************************
     */
    function abortLoad() {
        if ($api.xhr instanceof XMLHttpRequest) {
            $this.abort = true;
            $api.xhr.abort();
        }
    }

    /**
     * *********************************************
     * * Métodos públicos.
     * download() = Receber arquivo
     * upload() = Enviar arquivo
     * cancel() = Parar de receber/enviar
     * *********************************************
     */
    this.download = downLoad;
    this.upload = upLoad;
    this.cancel = abortLoad;
};
