/**
 * **************************************************
 * * @Class FileLoad
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2022
 * **************************************************
 * * Carrega arquivos através de input[file]
 * Para processamento e gerenciamento de arquivos
 *  antes de enviar para o servidor.
 * **************************************************
 */

var FileLoad = function () {
    var $reader = new FileReader(),
        $file = null,
        $options = {};

    /**
     * **********************************************
     * Obtem objeto/arquivo alvo da leitura.
     * @param {OBJ} file
     * Informar o index[0] anexo ao
     *  input[type="file"].
     *  
     * @param {OBJ} options
     * * metodos de execução
     * - readType: (opcional) informar string para
     *  o tipo de resultado da leitura;
     *  o padrão é 'data'.
     * 'binary' = Resultado será os dados binários
     *  do arquivo.
     * 'text' = Resultado será o conteúdo do arquivo
     *  como string de texto.
     * 'data' = Resultado será um data 
     * URL representando os dados do arquivo.
     * - onStart: (opcional) função que será
     * executada assim que a leitura começar;
     *  Retorna o arquivo selecionado.
     * - onError: (opcional) função que será
     * executada caso houver erro na leitura;
     * Retorna as causas do erro.
     * - onProgress: (opcional) função que será
     *  executada repetitivamente enquanto o
     *  processamento da leitura não terminar;
     * Retorna os bit's do tamanho original do
     * arquivo e os bit's que já foram processados.
     * - onResult: (opcional) função que será
     *  executada quando a leitura terminar;
     * Retorna os dados conforme o valor de
     *  "readType".
     * **********************************************
     */
    function readStart(file, options = {}) {
        if (typeof (file) !== 'object') {
            console.warn('O arquivo não é um objeto válido');
        } else {
            $file = file;
            $options = {
                readType: options.readType || 'data',
                onStart: options.onStart || null,
                onError: options.onError || null,
                onProgress: options.onProgress || null,
                onResult: options.onResult || null
            };
            if (typeof ($options.onStart) === 'function') {
                $options.onStart($file);
            }
            readListener();
        }
    }

    /**
     * **********************************************
     * * Inicia o processos de carregamento e define
     *  o modo de leitura.
     * @param {OBJ} e
     * **********************************************
     */
    function readListener(e) {
        $reader.addEventListener('progress', readProgress, true);
        $reader.addEventListener('load', readResult, true);
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
    }

    /**
     * **********************************************
     * * Retorna o tamanho de bit's original do
     *  arquivo e a quantidade de bit's que foi lida
     *  enquanto ainda houver bit's para ler.
     *
     * * Em caso de erro antes da finalização do
     *  processo retorna o erro acontecido.
     * @param {OBJ} e
     * **********************************************
     */
    function readProgress(e) {
        if ($reader.error && (typeof ($options.onError) === 'function')) {
            $options.onError($reader.error);
        } else if (e.lengthComputable && (typeof ($options.onProgress) === 'function')) {
            $options.onProgress({loaded: e.loaded, total: e.total});
        }
    }

    /**
     * **********************************************
     * * Retorna os dados da leitura quando
     *  finalizado.
     *
     * * Em caso de erro antes da finalização do
     *  processo retorna o erro acontecido.
     * @param {OBJ} e
     * **********************************************
     */
    function readResult(e) {
        if ($reader.error && (typeof ($options.onError) === 'function')) {
            $options.onError($reader.error);
        } else if ($reader.readyState === 2 && (typeof ($options.onProgress) === 'function')) {
            $options.onResult($reader.result);
        }
    }

    /**
     * **********************************************
     * * Para o processo de leitura do arquivo.
     * **********************************************
     */
    function readAbort() {
        if ($reader.readyState === 1) {
            $reader.abort();
        }
    }

    /**
     * **********************************************
     * * Métodos públicos.
     * readStart() = Inicar
     * readAbort() = Parar
     * **********************************************
     */
    this.load = readStart;
    this.cancel = readAbort;
};