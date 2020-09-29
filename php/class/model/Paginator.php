<?php
/**
 * ********************************************
 * @class Paginator
 * Cria sistema de paginação baseado em
 * consultas no banco de dados.
 * ********************************************
 * @requires Padrão de conexão PDO pessoal do
 * autor.
 * @copyright (c) 2018-06-16, Spell Master
 * @version 1.0
 * ********************************************
 */

class Paginator {

    private $rows;
    private $limit;
    private $offset;
    private $result;
    private $baseHref;
    private $linkQuant;
    private $listLink;

    /**
     * ****************************************
     * Inicia a paginação.
     * ****************************************
     * * @param {STR} $index
     * Informar o arquivo e o valor da
     * GLOBAL-GET que armazena o  índice.
     * - Exemplo index.php?pagina=
     * * @param {INT} $rows
     * Informar qual o índice inicial do
     * resultado através da entrada GET.
     * * @param {INT} $print
     * Quantidade máxima de resultados para
     * serem exibidos por página.
     * ****************************************
     */
    public function getPaginator($index, $rows, $print) {
        $this->baseHref = (string) $index;
        $this->rows = ((int) $rows ? $rows : 1);
        $this->limit = (int) $print;
        $this->offset = ($this->rows * $this->limit) - $this->limit;
    }

    /**
     * ****************************************
     * Faz a busca pelos dados
     * ****************************************
     * @param {STR} $query
     * Informar uma query para o resultado da
     * paginação.
     * ****************************************
     */
    public function findData($query) {
        $find = new Select();
        $find->setQuery($query);
        $this->result = $find->count();
        $this->numLinks();
    }

    /**
     * ****************************************
     * Retorna o limite de resultado para a
     * query de leitura ao qual mostrará no
     * renderizador final.
     * ****************************************
     */
    public function getLimit() {
        return $this->limit;
    }

    /**
     * ****************************************
     * Retorna o offset de resultado para a
     * página atual para query de leitura ao
     * qual mostrará no renderizador final.
     * ****************************************
     */
    public function getOffset() {
        return $this->offset;
    }

    /**
     * ****************************************
     * Se o índice informado na URL for maior
     * que a quantidade de páginas, redirecina
     * para a primeira página.
     * ****************************************
     */
    public function maxPages() {
        if ($this->rows > $this->linkQuant) {
            header("Location: {$this->baseHref}1");
        }
    }

    /**
     * ****************************************
     * Obtem o layout dos botões de navegação.
     * ****************************************
     */
    public function navLinks() {
        return $this->listLink;
    }

    /**
     * ****************************************
     * Informa quantos registros
     * existem.
     * ****************************************
     */
    public function rowsCount() {
        return $this->result;
    }

    /**
     * ****************************************
     * Cria o layout dos botões de navegação.
     * ****************************************
     */
    private function numLinks() {
        if ($this->result > $this->limit) {
            $this->linkQuant = ceil($this->result / $this->limit);
            $this->listLink = "<ul class=\"paginator\">";
            if ($this->rows != 1) {
                $this->listLink .= "<li><a title=\"Primeira Página\" href=\"{$this->baseHref}1\" class=\"paginator-link\"> &lt; </a></li>";
            }
            for ($below = $this->rows - 1; $below <= $this->rows - 1; $below ++) {
                if ($below >= 1) {
                    $this->listLink .= "<li><a title=\"Página {$below}\" href=\"{$this->baseHref}{$below}\" class=\"paginator-link\">{$below}</a></li>";
                }
            }
            $this->listLink .= "<li class=\"current\"><a>{$this->rows}</a></li>";
            for ($above = $this->rows + 1; $above <= $this->rows + 1; $above ++) {
                if ($above <= $this->linkQuant) {
                    $this->listLink .= "<li><a title=\"Página {$above}\" href=\"{$this->baseHref}{$above}\" class=\"paginator-link\">{$above}</a></li>";
                }
            }
            if ($this->linkQuant != $below) {
                $this->listLink .= "<li><a title=\"Última Página\" href=\"{$this->baseHref}{$this->linkQuant}\" class=\"paginator-link\"> &gt; </a></li>";
            }
            $this->listLink .= "<li><a class=\"amount\">{$this->rows}/{$this->linkQuant}</a></li>";
            $this->listLink .= "</ul>";
        }
    }
}
