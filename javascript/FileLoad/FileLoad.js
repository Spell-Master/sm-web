/**
 * **************************************************
 * * FileLoad
 * @author Spell-Master (Omar Pautz)
 * @copyright 2022
 * @version 2.0 (12/06/2026)
 * 
 * Leitura de arquivos do usuário para processamento
 *  e gerenciamento antes de enviar para o servidor.
 *  
 * **************************************************
 * * Opções
 * 
 * - readType: (opcional) informar string para o
 *  tipo de resultado da leitura;
 * 'binary' = Resultado será os dados binários
 *  do arquivo.
 * 'text' = Resultado será o conteúdo do arquivo
 *  como texto.
 * 'data' = Resultado será um data URL representando
 *  os dados do arquivo.
 * - onStart: (opcional) função que será
 *  executada assim que a leitura começar;
 * Retorna o arquivo selecionado.
 * - onError: (opcional) função que será executada
 *  caso houver erro na leitura;
 * Retorna as causas do erro.
 * - onProgress: (opcional) função que será
 *  executada repetitivamente enquanto o
 *  processamento da leitura não terminar;
 * Retorna os bit's do tamanho original do
 * arquivo e os bit's que já foram processados.
 * - onResult: (opcional) função que será
 *  executada quando a leitura terminar;
 * Retorna os dados conforme o valor de "readType".
 * **************************************************
 */

var FileLoad = function () {
    var $reader = undefined, $file = undefined, $options = {};

    /**
     * *********************************************
     * * Obtem os dados para leitura
     * 
     * @param {OBJ} file
     * Informar o arquivo para ler.
     * @param {OBJ} options
     * Opções de execução.
     * *********************************************
     */
    function readData(file, options = {}) {
        $reader = new FileReader();
        $file = file;
        $options = {
            readType: options.readType,
            onStart: options.onStart,
            onError: options.onError,
            onProgress: options.onProgress,
            onResult: options.onResult
        };
        readStart();
    }

    /**
     * *********************************************
     * * Cancela a leitura em andamento.
     * *********************************************
     */
    function readAbort() {
        if ($reader instanceof FileReader) {
            $reader.abort();
            readReset();
        }
    }

    /**
     * *********************************************
     * * Chama função de eventos.
     * 
     * @callback {FNC} onStart
     * Retorna os dados do arquivo selecionado.
     * Se defindo com retorno falso executa função
     *  para cancelar a leitura
     * *********************************************
     */
    function readStart() {
        if (typeof $options.onStart === 'function') {
            if ($options.onStart($file) !== false) {
                readListener();
            } else {
                readAbort();
            }
        } else {
            readListener();
        }
    }

    /**
     * *********************************************
     * * Define o tipo de leitura e inicia os 
     * eventos para erro, progresso e leitura.
     * *********************************************
     */
    function readListener() {
        switch ($options.readType) {
            case 'binary':
                $reader.readAsBinaryString($file);
                break;
            case 'text':
                $reader.readAsText($file);
                break;
            case 'data':
            default:
                $reader.readAsDataURL($file);
                break;
        }
        $reader.addEventListener('error', readyError, false);
        $reader.addEventListener('progress', readProgress, true);
        $reader.addEventListener('load', readResult, true);
    }

    /**
     * *********************************************
     * * Monitora supostos erros na leitura.
     * 
     * @param {OBJ} e
     * Dados do evento
     * 
     * @callback {FNC} onError
     * Retorna os dados do erro disparado.
     * *********************************************
     */
    function readyError(e) {
        if (typeof $options.onError === 'function') {
            $options.onError(e);
        }
        readAbort();
    }

    /**
     * *********************************************
     * * Monitora o progresso de leitura.
     * 
     * @param {OBJ} e
     * Dados do evento
     * 
     * @callback {FNC} onProgress
     * Retorna os bit's total do arquivo (total).
     * Retorna os bit's processados (loaded).
     * *********************************************
     */
    function readProgress(e) {
        if (e.lengthComputable) {
            if (typeof $options.onProgress === 'function') {
                $options.onProgress({total: e.total, loaded: e.loaded});
            }
        }
    }

    /**
     * *********************************************
     * * Finaliza a leitura.
     * 
     * @param {OBJ} e
     * Dados do evento
     * 
     * @callback {FNC} onResult
     * Retorna os dados do arquivo lido
     * *********************************************
     */
    function readResult(e) {
        if ($reader.readyState === 2) {
            if (typeof $options.onResult === 'function') {
                $options.onResult($reader.result);
            }
            readReset();
        }
    }

    /**
     * *********************************************
     * * Reinicia as variáveis.
     * *********************************************
     */
    function readReset() {
        $reader = undefined;
        $file = undefined;
        $options = {};
    }

    /**
     * *********************************************
     * * Métodos públicos.
     * load() = Inicar
     * cancel() = Parar
     * *********************************************
     */
    this.load = readData;
    this.cancel = readAbort;
};
