<?php
/**
 * ********************************************
 * * @class StrClean
 * * @copyright (c) Spell master
 * * @version 4.0
 * * @see Classe para limpeza de string
 * ********************************************
 */

class StrClean {

    /**
     * ****************************************
     * Formata uma string que contenha
     * caracteres ilegais.
     * ****************************************
     * @param {STR} $string
     * Entrada para tratamento.
     * @return $string formatada
     * 
     * @example :
     * ENTRADA -> João e maria. @<src>Oi</src>
     * SAÍDA   -> Joao-e-maria-src-Oi-src- 
     * ****************************************
     */
    public function formatStr($string) {
        $match = [];
        $match['a'] = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜüÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿRr"!@#$%&*()_+={[}]/?;:.,\\\'<>°ºª`';
        $match['b'] = 'aaaaaaaceeeeiiiidnoooooouuuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr                                 ';
        $decode = strtr(utf8_decode($string), utf8_decode($match['a']), $match['b']);
        $stroke = preg_replace('/[ -]+/', '-', $decode);
        $leftStroke = ltrim($stroke, '-');
        $rightStroke = rtrim($leftStroke, '-');
        return (utf8_encode($rightStroke));
    }

    /**
     * ****************************************
     * Formata uma string que contenha
     * caracteres ilegais
     * - Para tratamento de
     * nomes/ endereços etc...
     * ****************************************
     * @param {STR} $name
     * Entrada para tratamento
     * @return {STR} $name formatada
     * 
     * @example :
     * ENTRADA -> "!@#$%João &*()-=[] .e maria na pada,;ria <123456789>
     * SAÍDA   -> João e maria na padaria 123456789
     * ****************************************
     */
    public function clearName($name) {
        return (preg_replace('/[^a-zA-Z À-ú 0-9]+/', null, $name));
    }

    /**
     * ****************************************
     * Converte datas para o formato latino
     * americano.
     * ****************************************
     * @param {STR} $date
     * Entrada para tratamento.
     * @return {STR} $date convertida
     * 
     * @example :
     * ENTRADA -> 2010-12-01
     * SAÍDA   -> 01/12/2010
     * ****************************************
     */
    public function invertDate($date) {
        return (implode('/', array_reverse(explode('-', $date))));
    }

    /**
     * ****************************************
     * Converte datas com horas para o formato
     * latino americano.
     * ****************************************
     * @param {STR} $dateTime
     * Entrada para tratamento.
     * @return {STR} $dateTime convertida
     * 
     * @example
     * ENTRADA -> 2010-12-01 23:59:59
     * SAÍDA   -> 01/12/2010 23:59:59
     * 
     * @todo datetime
     * ****************************************
     */
    public function dateTime($dateTime) {
        $timestamp = explode(' ', $dateTime);
        $getDate = implode('/', array_reverse(explode('-', $timestamp[0])));
        return ($getDate . ' (' . (isset($timestamp[1]) && preg_match('/:/', $timestamp[1]) ? $timestamp[1] . ')' : null) );
    }

    /**
     * ****************************************
     * Criptograga dados para binário em
     * base 64.
     * ****************************************
     * @example :
     * ENTRADA -> Olá mundo
     * SAÍDA   -> T2zDoSBtdW5kbw==
     * ****************************************
     */
    public function baseEncode($base64) {
        return (base64_encode($base64));
    }

    /**
     * ****************************************
     * Remove criptografia de dados binário
     * com base 64.
     * ****************************************
     * @example :
     * ENTRADA -> T2zDoSBtdW5kbw==
     * SAÍDA   -> Olá mundo
     * ****************************************
     */
    public function baseDecode($base64) {
        return (base64_decode($base64));
    }

    /**
     * ****************************************
     * Criptografa entradas XML para
     * Syntax HTML.
     * ****************************************
     * @param {STR} $htmlEntrie
     * String para conversão.
     * 
     * @example :
     * ENTRADA -> <div class="
     * SAÍDA   -> &lt;div class=&quot;
     * 
     * @see : Em exibição html entradas como
     * "&lt;" sempre serão mostradas como <
     * Use um depurador de console para
     * real avaliação.
     * ****************************************
     */
    public function xmlEncode($htmlEntrie) {
        return (str_replace(['&', '"', "'", '<', '>'], ['&amp;', '&quot;', '&apos;', '&lt;', '&gt;'], $htmlEntrie));
    }

    /**
     * ****************************************
     * Descriptografa entradas de Syntax HTML
     * para XML.
     * ****************************************
     * @param {STR} $htmlEntrie
     * String para conversão.
     * 
     * @example :
     * ENTRADA -> &lt;div class=&quot;
     * SAÍDA   -> <div class="
     * ****************************************
     */
    public function xmlDecode($htmlEntrie) {
        return (str_replace(['&amp;', '&quot;', '&apos;', '&lt;', '&gt;'], ['&', '"', "'", '<', '>'], $htmlEntrie));
    }

    /**
     * ****************************************
     * Limpa códigos e carcateres inválidos
     * para entradas do tipo $_GET.
     * - Ideal para prevenção de SQL-INJECT
     * e execuções inválidas pela url.
     * - NOTA: Usar somente como segunda camada
     * de proteção.
     * ****************************************
     * @param {STR} $getValue
     * Entrada para limpeza.
     * 
     * @example :
     * ENTRADA -> javascript: void();
     * SAÍDA   -> javascriptvoid
     * ****************************************
     */
    public function clearUrl($getValue) {
        return (preg_replace('/[^A-Za-z0-9-_=-]/', '', $getValue));
    }

    /**
     * ****************************************
     * Limpa espaços duplicados em uma string
     * Remove também espaços antes e depois
     * da string.
     * ****************************************
     * @param {STR} $text
     * Entrada para limpeza.
     * ****************************************
     */
    public function clearSpaces($text) {
        $string = trim(preg_replace('/ {2,}/', ' ', $text));
        return ($string);
    }

}
