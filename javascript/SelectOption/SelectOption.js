/**
 * ****************************************************
 * * SelectOption
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2017
 * * @version 3.5 (2020)
 * ****************************************************
 * * Personaliza menu suspenso.
 * 
 * ****************************************************
 * @requires
 * Estrutura HTML
 * <select class="select-options">
 *     <option value="">Opção</option>
 *     <option value="">Opção</option>
 *     <option value="">Opção</option>
 * </select>
 * ****************************************************
 */

var SelectOption = function () {

    var $select = document.getElementsByClassName('select-options'),
        $event,
        $this = {
            index: 0,
            current: null,
            base: null,
            ul: null,
            active: null
        };

    createNew();

    /**
     * ************************************************
     * Cria um novo elemento para abrigar o seletor.
     *  
     * @private
     * ************************************************
     */
    function createNew() {
        $event = new Event('change');
        for ($this.index = 0; $this.index < $select.length; $this.index++) {
            $this.current = $select[$this.index];
            if (!$this.current.classList.contains('init')) {
                $this.current.classList.add('init');
                $this.current.setAttribute('style', 'opacity:0; height:0; width:0; overflow:hidden');
                $this.base = document.createElement('div');
                $this.base.classList.add('select-base');
                $this.current.parentNode.insertBefore($this.base, $this.current);
                createButton();
            }
        }
    }

    /**
     * ************************************************
     * Cria o botão de controle que ao clicado
     * mostrará as opções.
     *  
     * @private
     * ************************************************
     */
    function createButton() {
        $this.button = document.createElement('div');
        $this.button.classList.add('select-button');
        $this.base.appendChild($this.button);
        createList();
    }

    /**
     * ************************************************
     * Cria o o elemento lista que abrigará as opções.
     *  
     * @private
     * ************************************************
     */
    function createList() {
        $this.ul = document.createElement('ul');
        $this.ul.classList.add('select-list');
        $this.button.parentNode.insertBefore($this.ul, $this.button.nextSibling);
        queryOptions();
    }

    /**
     * ************************************************
     * Obtem os valores do select e aplica os mesmos
     * ao novo seletor personalizado.
     *  
     * @private
     * ************************************************
     */
    function queryOptions() {
        $this.head = document.getElementsByClassName('select-button');
        var $opt = $this.current.querySelectorAll('option'), $li;
        for (var $i = 0; $i < $opt.length; $i++) {
            $li = document.createElement('li');
            $li.setAttribute('data-select', $opt[$i].value);
            $li.setAttribute('data-parent', $this.index);
            $li.innerText = $opt[$i].innerText.substring(0, 20);
            $li.addEventListener('click', clickItem, false);
            $this.ul.appendChild($li);
        }
        for (var $j = 0; $j < $opt.length; $j++) {
            if ($opt[$j].selected) {
                break;
            }
        }
        var $selected = $this.current.selectedIndex;
        if ($selected >= 1) {
            $this.head[$this.index].innerText = $opt[$selected].innerText.substring(0, 20);
        } else {
            $this.head[$this.index].innerText = $opt[0].innerText.substring(0, 20);
        }
    }

    /**
     * ************************************************
     * Modifica o seletor quando uma das opções é 
     * clicada.
     *  
     * @private
     * ************************************************
     * 
     * @param {OBJ} e
     * Evento de click
     * ************************************************
     */
    function clickItem(e) {
        var $cT = e.target;
        var $dataSet = [$cT.dataset.parent, $cT.dataset.select];
        $this.head[$dataSet[0]].innerText = $cT.innerText.substring(0, 20);
        $select[$dataSet[0]].value = $dataSet[1];
        $select[$dataSet[0]].dispatchEvent($event);
    }

    /**
     * ************************************************
     * Controle de exibição para os seletores
     * personalizados.
     *  
     * @private
     * ************************************************
     * 
     * @param {OBJ} e
     * Evento de click
     * ************************************************
     */
    function clickDoc(e) {
        if (e.which === 1) {
            var $target = e.target;
            if ($this.active === $target) {
                $this.active.classList.remove('active');
                $target.nextElementSibling.classList.remove('active');
                $this.active = null;
            } else if ($target.className === 'select-button') {
                if ($this.active) {
                    $this.active.classList.remove('active');
                    $this.active.nextElementSibling.classList.remove('active');
                }
                $target.classList.add('active');
                $target.nextElementSibling.classList.add('active');
                $this.active = $target;
            } else if ($this.active != undefined || $this.active != null) {
                $this.active.classList.remove('active');
                $this.active.nextElementSibling.classList.remove('active');
                $this.active = null;
            }
        }
    }
    
    document.addEventListener('click', clickDoc, false);
};
