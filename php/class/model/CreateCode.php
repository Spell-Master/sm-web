<?php
/**
 * ********************************************
 * * @copyright (c) Spell master
 * * @version 1.0
 * * Cria códigos aletórios
 * ********************************************
 */

class CreateCode {

    private $lengths;
    private $chars;
    private $code;

    /**
     * ****************************************
     * Cria um código de string aleatório
     * ****************************************
     * @param {INT} $len
     * Quandidade de caracteres no código, se
     * não informado o valor será 5.
     * @return
     * Código alfabético com quantidade de
     * caracteres informados pelo $len.
     * ****************************************
     */
    public function strCode($len = null) {
        $this->lengths = (isset($len) ? (int) $len : 5);
        $this->chars = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVxXyYwWzZ';
        $this->setCode();
        return ($this->code);
    }

    /**
     * ****************************************
     * Cria um código de string aleatório
     * ****************************************
     * @param {INT} $len
     * Quandidade de caracteres no código, se
     * não informado o valor será 5.
     * @return 
     * Código numérico com quantidade de
     * caracteres informados pelo $len.
     * ****************************************
     */
    public function intCode($len = null) {
        $this->lengths = (isset($len) ? (int) $len : 5);
        $this->chars = '0123456789';
        $this->setCode();
        return ($this->code);
    }

    /**
     * ****************************************
     * Cria um código de string aleatório
     * ****************************************
     * @param {INT} $len
     * Quandidade de caracteres no código, se
     * não informado o valor será 10.
     * @return
     * Código numérico e alfabético misturados
     * com quantidade de caracteres informados
     * pelo $len.
     * ****************************************
     */
    public function defCode($len = null) {
        $this->lengths = (isset($len) ? (int) $len : 10);
        $this->chars = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVxXyYwWzZ0123456789';
        $this->setCode();
        return ($this->code);
    }

    /**
     * ****************************************
     * Cria o código baseado nas informações
     * dos métodos públicos.
     * ****************************************
     */
    private function setCode() {
        $this->code = "";
        $chars = str_split($this->chars);
        for ($i = 0; $i < $this->lengths; $i++) {
            $this->code .= $chars[array_rand($chars)];
        }
    }
}
