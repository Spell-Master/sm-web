/**
 * **************************************************
 * Class Paginator
 * @author Spell-Master (Omar Pautz)
 * @copyright 2020
 * @version 2.0 (2022) Carol & Spell-Master
 * 
 * Realiza paginação de elementos.
 * 
 * @param {OBJECT} options
 * * 'id': #ID do elemento que contém os itens para
 * paginar.
 * * 'item': Itens que serão paginados.
 * * 'limit': Quantidade de itens que serão exibidos
 * a cada página.
 * * 'go': Página para iniciar.
 * * 'onChange': Função a ser executada quando a
 * página é trocada.
 * **************************************************
 */

var Paginator = function (options) {

    options = options || {};

    var $this = {
        container: undefined, // elemento #ID da paginação
        limit: 0, // máximo de itens a exibir
        click: 0 // atual click/página na navegação
    }, $pageData = {
        item: [], // elementos internos do #ID a paginar
        len: 0, // quantidade total de elementos a paginar
        amount: 0, // quantidade de páginas
        page: 0, // página atual
        offset: 0 // elementos atuais na páginação
    }, $navData = {
        menu: undefined, // elementos do menu de navegação
        list: [], // elementos <ul> de navegação
        link: null, // elementos <li> de navegação
        lastLi: null, // último elemento <li> que conta as páginas
        index: 0, // índice dos elementos <li>
        total: 0, // quantidade de elementos <li> que fazem navegação
        final: 0, // último elemento <li> que fazem navegação
        check: 0, // índice correto para navegar no último elemento <li>
        ready: false // o menu de navegação está presente
    };

    /**
     * **********************************************
     * @private
     * Obtem o elemento para fazer que abriga a
     *  paginação.
     * **********************************************
     */
    function getID() {
        $this.container = document.getElementById(options.id) || undefined;
        return ($this.container);
    }

    /**
     * **********************************************
     * @private
     * Obtem os elementos que serão paginados.
     * **********************************************
     */
    function getItem() {
        $pageData.item = $this.container.getElementsByClassName(options.item);
        return ($pageData.item);
    }

    /**
     * **********************************************
     * @private
     * Define a página atual e quais itens pertencem
     *  a ela.
     * @param {INTERGER} page
     * Índice da página.
     * **********************************************
     */
    function setData(page) {
        var $pageIndex = (page > $pageData.amount ? $pageData.amount : page);
        $pageData.page = $pageIndex;
        $pageData.offset = ($pageData.page * $this.limit) - $this.limit;
    }

    /**
     * **********************************************
     * @private
     * Remove todos elementos internos do menu de
     *  páginação.
     * @param {OBJECT} e
     * **********************************************
     */
    function navReset(e) {
        while (e.childNodes.length) {
            e.removeChild(e.firstChild);
        }
    }

    /**
     * **********************************************
     * @private
     * Define as propriedades de cada link da
     *  paginação.
     * @param {INTERGER} attr
     * Índice da página que será trocada quando o
     *  link for clicado.
     * @param {STRING} title
     * Valor do atributo title.
     * @param {STRING} html
     * Texto a exibir no link.
     * **********************************************
     */
    function navValues(attr, title, html) {
        $navData.link.setAttribute('data-paginator-link', attr);
        $navData.link.title = title;
        $navData.link.innerHTML = html;
    }

    /**
     * **********************************************
     * @private
     * Cria os menus de navegação.
     * @param {OBJECT} e
     * Atual menu.
     * @param {OBJECT} i
     * ìndice do atual menu.
     * **********************************************
     */
    function navCreate(e, i) {
        $navData.list[i] = document.createElement('ul');
        $navData.list[i].id = 'paginator-navid-' + i;
        $navData.list[i].classList.add('paginator-nav');
        while ($navData.index !== $navData.total) {
            $navData.link = document.createElement('li');
            $navData.link.classList.add('paginator-link');
            if ($navData.index === 0) {
                navValues(0, 'Primeira Página', '&lt;');
            } else if ($navData.index === $navData.final) {
                $navData.check = ($navData.index - 2);
                navValues($navData.check, 'Última Página', '&gt;');
            } else {
                navValues(($navData.index - 1), 'Página ' + $navData.index, $navData.index);
            }
            $navData.index++;
            $navData.link.addEventListener('click', setClick, false);
            $navData.list[i].appendChild($navData.link);
        }
        $navData.lastLi = document.createElement('li');
        $navData.lastLi.innerHTML = $pageData.page + '/' + $pageData.amount;
        $navData.list[i].appendChild($navData.lastLi);

        e.appendChild($navData.list[i]);
        $navData.index = 0;
    }

    /**
     * **********************************************
     * @private
     * Exibe/esconde os links nos menus de páginação.
     * @param {INTERGER} page
     * Índice da página atual.
     * **********************************************
     */
    function navChange(page) {
        if ($navData.ready) {
            var $int = 0,
                $last = 0,
                $childNodes = $navData.list[0].childNodes,
                $below = (page === 0 ? 2 : 1),
                $above = (page === $navData.check ? 2 : 1),
                $i = 0,
                $j = 0;

            for (; $i < $navData.list.length; $i++) {
                $childNodes = $navData.list[$i].childNodes;
                $last = ($childNodes.length - 3);

                for ($j = 0; $j < $childNodes.length; $j++) {
                    $int = parseInt($childNodes[$j].dataset.paginatorLink);
                    $childNodes[$j].classList.remove('paginator-hide');
                    $childNodes[$j].classList.remove('current');
                    if ($j !== 0 && $j <= $last) {
                        if ($int === page) {
                            $childNodes[$j].classList.add('current');
                        }
                        if ($int > (page + $below)) {
                            $childNodes[$j].classList.add('paginator-hide');
                        }
                        if ($int < (page - $above)) {
                            $childNodes[$j].classList.add('paginator-hide');
                        }
                    }
                }
            }
            $navData.lastLi.innerHTML = $pageData.page + '/' + $pageData.amount;
        }
    }

    /**
     * **********************************************
     * @private
     * Exibe/esconde os itens da páginação.
     * @param {BOOLEAN} fnc
     * Executar callback?
     * **********************************************
     */
    function changePages(fnc) {
        var $delimiter = ($pageData.offset + $this.limit), $i = 0;
        for (; $i < $pageData.len; $i++) {
            if ($i < $pageData.offset || $i >= $delimiter) {
                $pageData.item[$i].classList.add('paginator-hide');
            } else {
                $pageData.item[$i].classList.remove('paginator-hide');
                if ($pageData.item[$i].style.display === 'none') {
                    $pageData.item[$i].style.display = '';
                }
            }
        }
        if (typeof options.onChange === 'function' && fnc) {
            options.onChange($pageData.page);
        }
    }

    /**
     * **********************************************
     * @private
     * Executa a troca dos elementos quando um link
     *  é ativado.
     * @param {OBJECT} e
     * Link do menu de páginação clicado.
     * **********************************************
     */
    function setClick(e) {
        var $tgtClick = parseInt((e.target).dataset.paginatorLink);
        if ($tgtClick !== $this.click) {
            setData($tgtClick + 1);
            navChange($tgtClick);
            changePages(true);
            $this.click = $tgtClick;
        }
    }

    /**
     * **********************************************
     * @private
     * Inicia/define a paginação.
     * @param {OBJECT} params
     * * 'limit' o mesmo que options.limit
     * * 'go' o mesmo que options.go
     * **********************************************
     */
    function init(params) {
        params = params || {};

        $this.limit = parseInt(params.limit) || 3;
        $pageData.len = $pageData.item.length;
        $pageData.amount = Math.ceil($pageData.len / $this.limit);

        setData(parseInt(params.go) || 1);

        if ($pageData.len >= $pageData.offset) {
            changePages(false);
            $navData.menu.forEach(navReset);
            if ($navData.menu.length >= 1 && ($pageData.len > $this.limit)) {
                $navData.total = ($pageData.amount + 2);
                $navData.final = ($pageData.amount + 1);
                $navData.menu.forEach(navCreate);
                $navData.ready = true;
            } else {
                $navData.ready = false;
            }
            $this.click = ($pageData.page - 1);
            navChange($this.click);
        }
    }

    /**
     * **********************************************
     * @public
     * Vai para a página designada.
     * @param {INTERGER} index
     * Índice da página para ir.
     * @param {BOOLEAN} call
     * Executar a chamada de função secundária
     *  designada por options.onChange?
     * **********************************************
     */
    function goTo(index, call) {
        var $index = parseInt(index) || 1, $parseIndex = 0;
        if ($index > $pageData.amount) {
            console.warn('Paginator: não existe o índice [' + $index + '] para exibir');
        } else {
            $parseIndex = ($index - 1);
            setData($index);
            navChange($parseIndex);
            changePages(typeof call === 'boolean' ? call : false);
            $this.click = $parseIndex;
        }
    }

    /**
     * **********************************************
     * @public
     * Obtem a última página.
     * **********************************************
     */
    function lastPageIndex() {
        return ($pageData.amount);
    }

    /**
     * **********************************************
     * @public
     * Obtem o elemento usado para a paginação.
     * **********************************************
     */
    function getContainer() {
        return ($this.container);
    }

    /**
     * **********************************************
     * @public
     * Obtem os índices de cada página disponível.
     * **********************************************
     */
    function navIndex() {
        if ($navData.ready) {
            var $childNodes = $navData.list[0].childNodes,
                    $lastNodes = ($childNodes.length - 2),
                    $validNodes = [];
            for (var $i = 0; $i < $childNodes.length; $i++) {
                if ($i >= 1 && $i < $lastNodes) {
                    $validNodes.push(parseInt($childNodes[$i].dataset.paginatorLink) + 1);
                }
            }
            return ($validNodes);
        }
    }

    /**
     * **********************************************
     * Obtem os dados necessários.
     * **********************************************
     */
    try {
        if (getID() === undefined) {
            throw 'Paginator = {id:"' + options.id + '"}';
        } else if (getItem().length === 0) {
            throw 'Paginator = {item:"' + options.item + '"}';
        } else {
            $navData.menu = $this.container.querySelectorAll('[data-paginator]');
            init({
                go: options.go,
                limit: options.limit
            });
        }
    } catch (exception) {
        console.error(exception);
    }

    /**
     * **********************************************
     * Acesso aos métodos públicos.
     * **********************************************
     */
    this.reload = init;
    this.go = goTo;
    this.lastIndex = lastPageIndex;
    this.links = navIndex;
    this.pagIn = getContainer;
};
