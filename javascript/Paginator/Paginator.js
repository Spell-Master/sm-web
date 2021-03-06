/**
 * ****************************************************
 * * Paginator
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2020
 * * @version 1.1 (2021)
 * ****************************************************
 * * Realiza paginação de elementos.
 * ****************************************************
 */

/**
 * ****************************************************
 * @param {STR} targetItem
 * Informar quais são os alvos da paginação.
 * @param {INT} maxItens
 * Informar qual a quantidade máxima de itens a ser
 * exibida por vez.
 * @param {STR} targetID (Opcional)
 * Elemento identificador do grupo de paginação.
 * Usado no contexto de ter mais de uma paginação no
 * documento.
 * ****************************************************
 */
var Paginator = function (targetItem, maxItens, targetID = null) {

    var $targetID = (typeof targetID !== 'undefined' && targetID !== null) ? document.getElementById(targetID) : document;

    var $this = {
        targetItem: $targetID.getElementsByClassName(targetItem),
        limit: parseInt(maxItens),
        offset: 0,
        amount: 0,
        linksHtml: null
    };

    /**
     * ************************************************
     * @public
     * Define os dados de quais elementos são os alvos
     * da paginação.
     * @param {INT} rows (opcional)
     * Informar numero de linha inicial.
     * ************************************************
     */
    function setData(rows) {
        $this.rows = (rows ? parseInt(rows) : 1);
        $this.offset = ($this.rows * $this.limit) - $this.limit;
        hidenItens();
        navLinks();
        showItens();
    }

    /**
     * ************************************************
     * @private
     * Cria o HTML para o links de navegação entre os
     * elementos.
     * ************************************************
     */
    function navLinks() {
        var $below = $this.rows - 1;
        var $above = $this.rows + 1;
        var $length = $this.targetItem.length;
        if ($length > $this.limit) {
            $this.amount = Math.ceil($length / $this.limit);
            $this.linksHtml = '<ul class="paginator">';
            if ($this.rows != 1) {
                $this.linksHtml += '<li><a title="Primeira Página" data-link-paginator="1" class="paginator-link"> &lt; </a></li>';
            }
            for ($below; $below <= $this.rows - 1; $below++) {
                if ($below >= 1) {
                    $this.linksHtml += '<li><a title="Página' + $below + '" data-link-paginator="' + $below + '" class="paginator-link">' + $below + '</a></li>';
                }
            }
            $this.linksHtml += '<li class="current"><a>' + $this.rows + '</a></li>';
            for ($above; $above <= $this.rows + 1; $above++) {
                if ($above <= $this.amount) {
                    $this.linksHtml += '<li><a title="Página ' + $above + '" data-link-paginator="' + $above + '" class="paginator-link">' + $above + '</a></li>';
                }
            }
            if ($this.amount != $below) {
                $this.linksHtml += '<li><a title="Última Página" data-link-paginator="' + $this.amount + '" class="paginator-link"> &gt; </a></li>';
            }
            $this.linksHtml += '<li><a class="amount">' + $this.rows + '/ ' + $this.amount + '</a></li>';
            $this.linksHtml += "</ul>";
            $targetID.querySelectorAll('[data-paginator]').forEach(attachLinks);
        }
    }

    /**
     * ************************************************
     * @private
     * Oculta os elmentos que não fazem parte da
     * coluna de itens atual.
     * ************************************************
     */
    function hidenItens() {
        for (var i = 0; i < $this.targetItem.length; i++) {
            $this.targetItem[i].style.display = 'none';
        }
    }

    /**
     * ************************************************
     * @private
     * Mostra os elementos que fazem parte da coluna
     * de itens atual.
     * ************************************************
     */
    function showItens() {
        var $count = $this.offset;
        var $delimiter = $this.offset + $this.limit;
        for (var i = $count; i < $delimiter; i++) {
            if (typeof $this.targetItem[i] !== 'undefined' && $this.targetItem[i] !== null) {
                $this.targetItem[i].style.display = 'block';
            }
            $count++;
        }
    }

    /**
     * ************************************************
     * @private
     * Anexa o links de navegação aos elementos
     * responsável por abrigar-los.
     * Adiciona evento de click a cada link.
     * @param {OBJ} e 
     * ************************************************
     */
    function attachLinks(e) {
        e.innerHTML = $this.linksHtml;
        $targetID.querySelectorAll('[data-link-paginator]').forEach(setClick);
    }

    /**
     * ************************************************
     * @private
     * Inicia o evento de click em cada link da
     * navegação.
     * @param {OBJ} e 
     * ************************************************
     */
    function setClick(e) {
        e.addEventListener('click', changePage, false);
    }

    /**
     * ************************************************
     * @private
     * Altera a coluna de itens atual pelo propriedade
     * data de cada link de navegação.
     * @param {OBJ} e 
     * ************************************************
     */
    function changePage(e) {
        var $key = (e.target).dataset.linkPaginator;
        if ($key !== 'undefined') {
            setData($key);
        }
    }

    /**
     * ************************************************
     * Inicia o processo de paginação.
     * ************************************************
     */
    this.init = setData;
};