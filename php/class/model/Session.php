<?php
/**
 * ********************************************
 * * @class Session
 * * @copyright (c) Spell master
 * * @version 2.0
 * * @see Classe para gerenciamento de cessões
 * ********************************************
 * @usage
 * * Iniciar cessão
 * $session = Session::startSession();
 * Inicia as cessões, caso já iniciadas
 * retorna as mesmas não iniciando novamente.
 * 
 * * Definir uma cessão
 * $session->Word = "Olá";
 * 
 * * Verificar as cessões estão ativas
 * Session::getSession();
 * 
 * * Remover todas cessões
 * Session::destroy();
 * 
 * * Remover a cessão expecífica
 * unset($session->Word);
 * 
 * ********************************************
 * * Para evitar roubo de cessões defina
 * um nome prefixo para suas cessões exemplo:
 * $session = Session::startSession('nome');
 * $session->Word = 'Olá';
 * var_dump($_SESSION);
 * - Resultado:
 * array(1) { ["Word_nome"]=> string(3) "Olá" }
 * ********************************************
 */

class Session {

    private static $status;
    private static $globalName;
    private static $session;

    /**
     * ****************************************
     * Gerencia entradas para cessões.
     * ****************************************
     * @Param {STR} $prefix
     * Se definido o prefixo todas as cessões
     * terão esse prefixo alocado.
     * ****************************************
     */
    public static function startSession($prefix = null) {
        self::$globalName = (empty($prefix) ? null : '_' . $prefix);
        if (!self::$status) {
            self::$session = new self;
        }
        self::$status = session_start();
        return (self::$session);
    }

    /**
     * ****************************************
     * Verifica se existem cessões iniciadas
     * ****************************************
     */
    public static function getSession() {
        return (self::$status);
    }

    /**
     * ****************************************
     * Elimina todas cessões iniciadas
     * ****************************************
     */
    public static function destroy() {
        self::$session = session_destroy();
        unset($_SESSION);
    }

    /**
     * ****************************************
     * Métodos de auxilio a classe.
     * Automatiza eventos...
     * ****************************************
     */
    public function __set($name, $value) {
        $_SESSION[$name . self::$globalName] = $value;
    }

    public function __get($name) {
        if (isset($_SESSION[$name . self::$globalName])) {
            return ($_SESSION[$name . self::$globalName]);
        }
    }

    public function __isset($name) {
        return (isset($_SESSION[$name . self::$globalName]));
    }

    public function __unset($name) {
        unset($_SESSION[$name . self::$globalName]);
    }

}
