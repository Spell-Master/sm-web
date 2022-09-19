/**
 * **************************************************
 * Class TabPaginator
 * @author Spell-Master (Omar Pautz)
 * @copyright 2017
 * @version 4.2 (2022)
 * 
 * Executa paginação de conteúdo por blocos.
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
 * 
 * @param {STRING} tgt
 * #ID do elemento recipiente de toda estrutura.
 * @param {INTEGER} idx
 * Qual é o numero da tag que deve ser aberta no
 *  carregamento do script.
 * **************************************************
 */

var TabPaginator = function (tgt, idx) {

    var $this = {
        target: undefined,
        menu: undefined,
        link: undefined,
        body: undefined,
        length: 0,
        index: 0
    };

    /**
     * **********************************************
     * @private
     * Fecha todas as tabs para correta abertura da
     * atual.
     * **********************************************
     */
    function closeTabs() {
        for (var $i = 0; $i < $this.length; $i++) {
            $this.link[$i].classList.remove('active');
            $this.body[$i].classList.remove('active');
        }
    }

    /**
     * **********************************************
     * @private
     * Solicita a abertura da tab solicitada por
     *  click nos botões do menu.
     * @param {INTEGER} tb
     * Índice da tab para abrir.
     * ************************************************
     */
    function getTab(tb) {
        openTab(tb);
    }

    /**
     * ************************************************
     * @private
     * Adiciona evento de click e cada botão do menu.
     * @param {OBJECT} key
     * @param {INTEGER} index
     * ************************************************
     */
    function tabButtons(key, index) {
        key.addEventListener('click', function () {
            getTab(index + 1);
        }, false);
    }

    /**
     * ************************************************
     * @private
     * Obtem os elementos da estrutura html.
     * ************************************************
     */
    function getNodes() {
        $this.menu = $this.target.querySelector('.tab-menu');
        $this.link = $this.target.querySelectorAll('.tab-link');
        $this.body = $this.target.querySelectorAll('.tab-body');
        $this.length = $this.link.length;
    }

    /**
     * ************************************************
     * @private
     * Verifica se toda a estrutura HTML está correta.
     * ************************************************
     */
    function notError() {
        if (typeof tgt === 'undefined') {
            throw 'Elemento alvo não definido';
        } else if (typeof $this.target === 'undefined' || $this.target === null) {
            throw '<div id="' + tgt + '"> não encontrado';
        } else if (typeof $this.menu === 'undefined' || $this.menu === null) {
            throw '<div class="tab-menu"> não encontrado';
        } else if ($this.length < 1) {
            throw '<div class="tab-link"> não encontrado';
        } else if ($this.body.length < 1) {
            throw '<div class="tab-body"> não encontrado';
        } else if ($this.length > $this.body.length) {
            throw 'Existem mais links de navegação do que conteúdos';
        } else if ($this.length < $this.body.length) {
            throw 'Existem menos links de navegação do que conteúdos';
        } else if ($this.link[0].parentNode !== $this.menu) {
            throw '<div class="tab-link"> não pertence ao menu';
        } else if ($this.body[0].parentNode === $this.menu) {
            throw '<div class="tab-body"> está localizado dentro do menu';
        } else if ($this.menu.nextElementSibling !== $this.body[0]) {
            throw '<div class="tab-body"> não está localizado depois do menu';
        } else {
            return (true);
        }
    }

    /**
     * **********************************************
     * @public
     * Abre a tab solicitada.
     * @param {INTEGER} index
     * Número da tab para abrir.
     * **********************************************
     */
    function openTab(index) {
        closeTabs();
        $this.index = (index ? parseInt(index - 1) : 0);
        $this.link[$this.index].classList.add('active');
        $this.body[$this.index].classList.add('active');
    }

    $this.target = document.getElementById(tgt);
    getNodes();
    try {
        if (notError() === true) {
            $this.link.forEach(tabButtons, false);
            openTab(idx);

            // Acesso ao método público
            this.openTab = openTab;
        }
    } catch (exception) {
        console.error('TabPaginator: ' + exception);
    }
};
