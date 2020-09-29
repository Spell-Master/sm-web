<?php
/**
 * ********************************************
 * * @class StrValid
 * * @copyright (c) Spell master
 * * @version 2.1
 * * @see Classe para verificação de string
 * ********************************************
 */

class StrValid {

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres alfabéticos "Não acentuados
     *  e sem espaços"
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function strCheck($subject) {
        if (preg_match('/^([a-z]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres numéricos
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function intCheck($subject) {
        if (preg_match('/^([0-9]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres alfabéticos "Incluíndo
     *  acentos"
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function strAccent($subject) {
        if (preg_match('/^([a-zÀ-ú]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres alfabéticos "Incluíndo
     *  espaços"
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function StrSpace($subject) {
        if (preg_match('/^([a-z ]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres numéricos "com ou sem
     *  espaços"
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function intSpace($subject) {
        if (preg_match('/^([0-9 ]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres alfabéticos ou numéricos
     *  "sem espaços ou acentos"
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function strInt($subject) {
        if (preg_match('/^([a-z0-9]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres alfabéticos ou numéricos
     *  "incluíndo espaços ou acentos"
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function strIntSpace($subject) {
        if (preg_match('/^([a-z À-ú 0-9]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres alfabéticos "Incluíndo
     *  acentos ou espaços"
     * - Tipo de verificação padrão para nomes
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function nameCheck($subject) {
        if (preg_match('/^([a-z À-ú]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente
     *  caracteres para uma url válida
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * @example :
     * - https://url/?entrada_get=algum-valor
     *   Retorna true por ser válido
     * - /algumacoisa
     *   Retorna true por ser válido
     * ****************************************
     */
    public function urlCheck($subject) {
        if (preg_match('/^([a-zA-Z0-9-_:\/?&=%]+)$/i', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string possui somente 
     *  caracteres válidos para um endereço de
     *  e-mail.
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function mailCheck($subject) {
        if (preg_match('/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{3})$/', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string é um tipo de
     *  telefone válido.
     * @example :
     * - +55 (99) 99999-9999
     * - 99 99999-8888
     * - 9999-9999
     * - 9999999999999
     *   Ambos números são válidos.
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function checkPhone($subject) {
        if (preg_match('/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string é um tipo de
     *  CPF válido.
     * @example :
     * - 000.000000-00
     *   CPF é válido.
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function checkCpf($subject) {
        if (preg_match('/^([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})$/', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string é um tipo de
     *  CNPJ válido.
     * @example :
     * - 00.000.000/0000-00
     *   CNPJ é válido.
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function checkCnpj($subject) {
        if (preg_match('/^([0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[-][0-9]{2})$/', $subject)) {
            return (true);
        }
    }

    /**
     * ****************************************
     * Verificar se uma string é um tipo de
     *  CPF ou CNPJ válido.
     * @example :
     * - 000.000000-00
     * - 00000000000
     *   CPF é válido.
     * 
     * - 00.000.000/0000-00
     * - 00000000000000
     *   CNPJ é válido.
     * ****************************************
     * @param {string} $subject
     * Entrada para verificação
     * @return {true} (A string é valida)
     * ****************************************
     */
    public function checkCpfCnpj($subject) {
        if (preg_match('/^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})|([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})$/', $subject)) {
            return (true);
        }
    }
}
