<?php
/**
 * ********************************************
 * * @Class GlobalFilter
 * * @author Spell-Master (Omar Pautz)
 * * @version 2.0 (2019)
 * ********************************************
 * * Aplica um filtro padrão sobre
 * super-globais e retorna os mesmos como
 * objetos.
 * ********************************************
 */

class GlobalFilter {

    /**
     * ****************************************
     * Converte os valores em objetos
     * ****************************************
     */
    public static function objArray($array) {
        $object = new stdClass();
        if (is_array($array)) {
            foreach ($array as $name => $value) {
                $object->$name = $value;
            }
        }
        return ($object);
    }

    /**
     * ****************************************
     * Filtro sobre Get
     * ****************************************
     */
    public static function filterGet() {
        $filterGet = filter_input_array(INPUT_GET, FILTER_DEFAULT);
        $filter = isset($filterGet) ? self::objArray($filterGet) : false;
        return ($filter);
    }

    /**
     * ****************************************
     * Filtro sobre Post
     * ****************************************
     */
    public static function filterPost() {
        $filterPost = filter_input_array(INPUT_POST, FILTER_DEFAULT);
        $filter = isset($filterPost) ? self::objArray($filterPost) : false;
        return ($filter);
    }

    /**
     * ****************************************
     * Filtro sobre sessão
     * ****************************************
     */
    public static function filterSession() {
        $filterSession = filter_input_array(INPUT_SESSION, FILTER_DEFAULT);
        $filter = isset($filterSession) ? self::objArray($filterSession) : false;
        return ($filter);
    }

    /**
     * ****************************************
     * * @method : Filtro sobre Cookie
     * ****************************************
     */
    public static function filterCookie() {
        $filterCookie = filter_input_array(INPUT_COOKIE, FILTER_DEFAULT);
        $filter = isset($filterCookie) ? self::objArray($filterCookie) : false;
        return ($filter);
    }

    /**
     * ****************************************
     * * @method : Filtro sobre Servidor
     * ****************************************
     */
    public static function filterServe() {
        $filterServe = filter_input_array(INPUT_SERVER, FILTER_DEFAULT);
        $filter = isset($filterServe) ? self::objArray($filterServe) : false;
        return ($filter);
    }

    /**
     * ****************************************
     * * @method : Filtro sobre Eventos
     * ****************************************
     */
    public static function filterEven() {
        $filterEven = filter_input_array(INPUT_ENV, FILTER_DEFAULT);
        $filter = isset($filterEven) ? self::objArray($filterEven) : false;
        return ($filter);
    }

    /**
     * ****************************************
     * * @method : Filtro sobre requisissões
     * ****************************************
     */
    public static function filterRequest() {
        $filterRequest = filter_input_array(INPUT_REQUEST, FILTER_DEFAULT);
        $filter = isset($filterRequest) ? self::objArray($filterRequest) : false;
        return ($filter);
    }

}
