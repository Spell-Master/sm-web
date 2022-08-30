/**
 * **************************************************
 * @Class SelectOption
 * @author Spell-Master (Omar Pautz)
 * @copyright 2017
 * @version 3.6 (2022)
 * 
 * Personaliza menu suspenso.
 * **************************************************
 */

var SelectOption = function () {

    var $this = {},
        $event = new Event('change');

    /**
     * **********************************************
     * @private
     * Cria o recipiente para o seletor
     *  personalizado.
     * **********************************************
     */
    function createNew() {
        $this.container = document.createElement('div');
        $this.container.classList.add('select-option-container');
        $this.current.parentNode.insertBefore($this.container, $this.current);
    }

    /**
     * **********************************************
     * @private
     * Cria o botão para abrir as opções.
     * **********************************************
     */
    function createButton() {
        $this.button[$this.index] = document.createElement('div');
        $this.button[$this.index].classList.add('select-button');
        $this.container.appendChild($this.button[$this.index]);
    }

    /**
     * **********************************************
     * @private
     * Cria o recipiente para a lista de opções.
     * **********************************************
     */
    function createList() {
        $this.list = document.createElement('div');
        $this.list.classList.add('select-list');
        $this.container.appendChild($this.list);
    }

    /**
     * **********************************************
     * @private
     * Reduz a quantidade de caracteres no botão
     *  para abrir as opções.
     * @param {STRING} t
     * Texto para reduzir.
     * **********************************************
     */
    function parseTitle(t) {
        return (t.length <= 20 ? t : t.substring(0, 20) + '...');
    };

    /**
     * **********************************************
     * @private
     * Cria a lista de opções.
     * **********************************************
     */
    function createOptions() {
        var $opts = $this.current.children,
            $selected = $this.current.selectedIndex,
            $i = 0;
            $title = '';
        for (; $i < $opts.length; $i++) {
            $this.option = document.createElement('div');
            $this.option.innerText = $opts[$i].innerText;
            $this.option.setAttribute('data-option-value', $opts[$i].value);
            $this.option.setAttribute('data-option-select', $this.index);
            $this.option.addEventListener('click', clickOption, false);
            $this.list.appendChild($this.option);
        }
        $this.button[$this.index].innerText = parseTitle($opts[($selected >= 1 ? $selected : 0)].innerText);
    }

    /**
     * **********************************************
     * @private
     * Chama as funções dentro de um loop de todos
     *  seletores obtidos.
     * @param {OBJECT} selector
     * tag select atual.
     * @param {OBJECT} index
     * índice da tag select atual.
     * **********************************************
     */
    function runSelector(selector, index) {
        $this.index = index;
        $this.current = selector;
        selector.style.display = 'none';
        createNew();
        createButton();
        createList();
        createOptions();
    }

    /**
     * **********************************************
     * @private
     * Modifica o seletor quando uma das opções é 
     *  clicada.
     * @param {OBJECT} e
     * Evento click.
     * **********************************************
     */
    function clickOption(e) {
        var $targetOption = e.target,
            $dataSet = [
                $targetOption.dataset.optionSelect,
                $targetOption.dataset.optionValue
            ];
        $this.select[$dataSet[0]].value = $dataSet[1];
        $this.button[$dataSet[0]].innerText = parseTitle($targetOption.innerText);
        $this.select[$dataSet[0]].dispatchEvent($event);
    }

    /**
     * **********************************************
     * @private
     * Mosta ou oculta dos seletores personalizados.
     * @param {OBJECT} e
     * Evento click.
     * **********************************************
     */
    function clickDoc(e) {
        var $targetDoc = e.target;
        if ($targetDoc.className === 'select-button') {
            if ($this.open) {
                $this.open.classList.remove('active');
                $this.open.nextElementSibling.classList.remove('active');
            }
            $targetDoc.classList.add('active');
            $targetDoc.nextElementSibling.classList.add('active');
            $this.open = $targetDoc;
        } else if ($this.open) {
            $this.open.classList.remove('active');
            $this.open.nextElementSibling.classList.remove('active');
            $this.open = undefined;
        }
    }

    /**
     * **********************************************
     * @public
     * Obtem e define os dados necessários.
     * **********************************************
     */
    function init() {
        $this = {
            select: document.querySelectorAll('select[data-select]'),
            index: 0,
            current: undefined,
            container: null,
            button: [],
            list: null,
            option: null,
            open: undefined
        };
        $this.select.forEach(runSelector);
    }

    /**
     * **********************************************
     * @public
     * Reinicia todos os dados e processos.
     * **********************************************
     */
    function resetAll() {
        var $select = $this.select,
            $container = document.querySelectorAll('div.select-option-container'),
            $i = 0,
            $prev = null;
        for (; $i < $select.length; $i++) {
            $prev = $container[$i];
            if (typeof $prev !== 'undefined' && $prev !== null) {
                $prev.parentNode.removeChild($prev);
            }
        }
        init();
    }

    /**
     * **********************************************
     * @public
     * Retorna os dados das tag's select usadas.
     * **********************************************
     */
    function getSeletor() {
        var $select = $this.select,  $i = 0, $enties = {};
        for (; $i < $select.length; $i++) {
            $enties[$i] = {
                index: $i,
                name: $select[$i].name,
                value: $select[$i].value,
                select: $select[$i]
            };
        }
        return ($enties);
    }

    /**
     * **********************************************
     * Acesso aos métodos públicos.
     * **********************************************
     */
    this.reload = resetAll;
    this.data = getSeletor;

    init();
    document.addEventListener('click', clickDoc, false);
};
