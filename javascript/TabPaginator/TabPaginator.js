/**
 * ****************************************************
 * * TabPaginator
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2017
 * * @version 4.1 (2020)
 * ****************************************************
 * * Executa paginação de conteúdo por blocos.
 * 
 * ****************************************************
 * @requires
 * Estrutura HTML
 * <div id="identificador">
 *    <ul class="tab-menu">
 *        <li><a class="tab-link">A</a></li>
 *        <li><a class="tab-link">B</a></li>
 *    </ul>
 *    <div class="tab-body">Conteúdo A</div>
 *    <div class="tab-body">Conteúdo B</div>
 * </div>
 * ****************************************************
 */

/**
 * ****************************************************
 * * @param {STR} propriety (opcional)
 * Elemento #ID para determinar o conjunto de ativação.
 * ****************************************************
 */
var TabPaginator = function (propriety) {

    var $node = propriety ? document.getElementById(propriety) : document;

    var $this = {
        link: $node.getElementsByClassName('tab-link'),
        body: $node.getElementsByClassName('tab-body'),
        index: 0
    };

    tabButtons();
    openTab();
    this.openTab = openTab;

    /**
     * ************************************************
     * Adiciona evento de click e cada botão do menu.
     *  
     * @private
     * ************************************************
     */
    function tabButtons() {
        for (var $i = 0; $i < $this.link.length; $i++) {
            $this.link[$i].addEventListener('click', getTab($i + 1), false);
        }
    }

    /**
     * ************************************************
     * Solicita a abertura da tab solicitada por click
     * nos botões do menu.
     * ************************************************
     * 
     * @param {INT} tb
     * Índice da tab para abrir.
     * ************************************************
     */
    function getTab(tb) {
        return function () {
            openTab(tb);
        };
    }

    /**
     * ************************************************
     * Abre a tab solicitada.
     * ************************************************
     * 
     * @param {INT} index
     * Índice da tab para abrir.
     * ************************************************
     */
    function openTab(index) {
        closeTabs();
        $this.index = (index ? parseInt(index - 1) : 0);
        $this.link[$this.index].classList.add('active');
        $this.body[$this.index].classList.add('active');
    }

    /**
     * ************************************************
     * Fecha todas as tabs para correta abertura da
     * atual.
     * ************************************************
     */
    function closeTabs() {
        var $i;
        for ($i = 0; $i < $this.link.length; $i++) {
            $this.link[$i].classList.remove('active');
            $this.body[$i].classList.remove('active');
        }
    }
};
