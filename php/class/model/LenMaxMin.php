<?php
/**
 * ********************************************
 * * @class LenMaxMin
 * * @copyright (c) Spell master
 * * @version 1.0
 * * @see Classe para gerenciamento de
 * quantidade de caracteres
 * ********************************************
 */

class LenMaxMin {

    private $strLen;
    private $minLen;
    private $maxLen;
    private $chekType;
    private $answer;

    /**
     * ****************************************
     * Retorna a resposta dos métodos quando
     * houver.
     * ****************************************
     * @return {STR}
     * ****************************************
     */
    public function getAnswer() {
        if (empty($this->answer)) {
            $this->answer = "Nenhum valor de resposta definido";
        }
        return($this->answer);
    }

    /**
     * ****************************************
     * Método para verificação de quantidade
     * caracteres.
     * ****************************************
     * @param {STR} $parse
     * Informar o texto para verificação.
     * @param {INT} $minLen
     * Informar o mínimo de caracteres.
     * @param {INT} $maxLen
     * Informar o mínimo de caracteres.
     * @param {STR} $type
     * Informar o tipo de verificação.
     * @return {BOOL}
     * ****************************************
     */
    public function strLen($parse, $minLen, $maxLen, $type) {
        $this->strLen = (string) (empty($parse) ? false : $parse);
        $this->minLen = (int) (empty($minLen) ? 4 : $minLen);
        $this->maxLen = (int) (empty($maxLen) ? 5 : $maxLen);
        $this->chekType = (string) (empty($type) ? 'input' : $type);
        return ($this->checkLen());
    }

    /**
     * ****************************************
     * Método que checa quantos caracteres
     * permitidos.
     * ****************************************
     * @return {BOOL}
     * ****************************************
     */
    private function checkLen() {
        $relStr = utf8_decode($this->strLen);
        if (!isset($relStr) || empty($relStr)) {
            $this->answer = "O campo \"{$this->chekType}\" não pode está vazio";
            return(true);
        } else if (strlen($relStr) < $this->minLen) {
            $this->answer = "O campo \"{$this->chekType}\" deve possuir pelo menos {$this->minLen} caracteres";
            return(true);
        } else if (strlen($relStr) > $this->maxLen) {
            $this->answer = "O campo \"{$this->chekType}\" não deve possuir mais de {$this->maxLen} caracteres";
            return(true);
        }
    }
}
