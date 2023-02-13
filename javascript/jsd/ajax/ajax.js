/**
 * **************************************************
 * @author Spell-Master (Omar Pautz)
 * @copyright 2022
 * @version 1.1 (2023)
 * @requires js-default.js 1.0 ou superior
 * 
 * Executa Asynchronous Javascript and Xml.
 * **************************************************
 */
(function () {
    'use strict';

    var $xhr = undefined;
    /**
     * **********************************************
     * @param {OBJECT} options (opcional)
     * Opções de execução.
     * 
     * url: Informar string para onde os dados devem
     *  ser enviados.
     * protocol: Informar string qual é o tipo de
     *  requisição.
     * type: Tipo de envio de dados
     * response: Tipo de dados na resposta
     * values: Informar ou um objeto com índices e
     *  valores a se enviar ou uma string no formato
     *  de url válida.
     * onError: Informar uma função que será
     *  executada quando algum erro ocorrer.
     * onStart: Informar uma função que será
     *  executada quando o processo começa.
     * onProgress: Informar uma função que será
     *  executada quando o processo ainda está
     *  carregando.
     * onEnd: Informar uma função que será executada
     *  quando o processo terminou de carregar.
     * onResult: Informar uma função que será
     *  executada obtendo o resultado da requisição.
     */
    var ajax = function (options) {
        options = options || {};
        var $options = {
            url: (options.url || location.href).replace(/^\/\//, location.protocol + '//').split('?')[0],
            protocol: (options.protocol === 'GET') ? 'GET' : (options.protocol === 'POST') ? 'POST' : 'GET',
            type: mimeType(options.type) || 'text/html',
            response: responseType(options.response) || 'responseText',
            values: options.values || undefined,
            onError: options.onError || undefined,
            onStart: options.onStart || undefined,
            onProgress: options.onProgress || undefined,
            onEnd: options.onEnd || undefined,
            onResult: options.onResult || undefined
        }, $mimes = {
            html: 'text/html',
            text: 'text/plain',
            xml: 'text/xml'
        }, $response = {
            text: 'responseText',
            xml: 'responseXML'
        }, $ajax = {};

        /**
         * *******************************************
         * Retorna o correto valor para options.type
         * @param {type} v
         * @returns {$mimes|ajaxL#5.ajax.$mimes}
         * *******************************************
         */
        function mimeType(v) {
            for (var $key in $mimes) {
                if ($key === v || $mimes[$key] == v) {
                    return ($mimes[v]);
                }
            }
        }

        /**
         * *******************************************
         * Retorna o correto valor para
         *  options.response
         * @param {type} v
         * @returns {$response|ajaxL#5.ajax.$response}
         * *******************************************
         */
        function responseType(v) {
            for (var $key in $response) {
                if ($key === v || $response[$key] == v) {
                    return ($response[v]);
                }
            }
        }

        /**
         * *******************************************
         * Codifica os dados de options.values para
         *  um formato de URI válido.
         * @returns {String}
         * *******************************************
         */
        function encodeURI() {
            var $key = '', $arr = [];
            for (var $key in $options.values) {
                $arr.push(encodeURIComponent($key) + '=' + encodeURIComponent($options.values[$key]));
            }
            return ($arr.join('&'));
        }

        /**
         * *******************************************
         * Define os dados para o local de destino
         * e quais dados serão enviados.
         * *******************************************
         */
        function urlPath() {
            if ($options.values) {
                $ajax.send = (typeof $options.values === 'object' ? encodeURI() : $options.values.replace(/\?/g, ''));
            }
            $ajax.open = ($options.protocol === 'GET' ? $options.url + '?' + $ajax.send : $options.url);
        }

        /**
         * *******************************************
         * Inicia e envia o protocolo para o
         *  HttpRequest
         * *******************************************
         */
        function initXMLHR() {
            $xhr = new XMLHttpRequest;
            if ($xhr.overrideMimeType) {
                $xhr.overrideMimeType($options.type);
            }
            $xhr.addEventListener('readystatechange', readyState, false);
            $xhr.open($options.protocol, $ajax.open, true);
            if ($options.protocol === 'GET') {
                $xhr.send(null);
            } else {
                $xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=' + document.charset);
                $xhr.send($ajax.send);
            }
        }

        /**
         * *******************************************
         * Monitora o estado da requisição invocando
         *  as funções definidas em options para cada
         *  estágio do processo.
         * *******************************************
         */
        function readyState() {
            if ($xhr.readyState === 1) {
                if (typeof $options.onStart === 'function') {
                    $options.onStart('Situação: Solicitado resposta');
                }
            } else if ($xhr.readyState === 3) {
                if (typeof $options.onProgress === 'function') {
                    $options.onProgress('Situação: Aguardando resposta');
                }
            } else if ($xhr.readyState === 4) {
                if (typeof $options.onEnd === 'function') {
                    $options.onEnd('Situação: Resposta recebida, processando...');
                }
                readyComplete();
            }
        }

        /**
         * *******************************************
         * Define as ações a se tormar quando a
         *  requisição está terminada.
         * *******************************************
         */
        function readyComplete() {
            if ($xhr.status === 200) {
                if (typeof $options.onResult === 'function') {
                    $options.onResult($xhr[$options.response]);
                }
                resetVars();
            } else if ($xhr.status > 200) {
                throwError('Situação: Não foi possível completar a operação (código ' + $xhr.status + ')');
            } else if ($xhr.onerror) {
                throwError($xhr.onerror);
            } else {
                throwError('Situação: Não foi possível completar a operação (código DESCONHECIDO)');
            }
        }

        /**
         * *******************************************
         * Interrompe a requisição e informa erros
         *  ocorridos 
         * @param {STRING} err
         * Erro ocorrido
         * *******************************************
         */
        function throwError(err) {
            $xhr.abort();
            if (typeof $options.onError === 'function') {
                $options.onError(err);
            }
            console.error(err);
            resetVars();
        }

        /**
         * *******************************************
         * Redefine os parâmetros para o estado
         *  inicial.
         * *******************************************
         */
        function resetVars() {
            $xhr = undefined;
            $ajax = {};
            $options = {};
        }

        if ($xhr instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição em andamento.');
        } else {
            urlPath();
            initXMLHR();
        }
    };
    window.jsd.addFunction(ajax);
}());

