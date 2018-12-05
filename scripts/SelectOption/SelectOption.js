/**
 * ****************************************************
 * @Copyright (c) 2017, Spell Master.
 * @version 3.2 (2018)
 * @requires  Navegador compatível com HTML 5
 * ****************************************************
 * @class Personaliza grupo de opções.
 * ****************************************************
 */

var SelectOption = function () {
    var $select = document.getElementsByClassName('select-options'), $idx, $current, $base, $button, $j, $ul, $li, $head, $opt, $active, $target;
    createNew();

    /**
     * ************************************************
     * Reinicia os grupo de opções.
     * @see : Uso em caso de repassagem de requisições
     *        sícronas.
     * ************************************************
     */
    this.restart = function () {
        var $sBase = document.getElementsByClassName('select-base');
        while ($sBase.length > 0) {
            $sBase[0].parentNode.removeChild($sBase[0]);
        }
        $select = document.getElementsByClassName('select-options');
        createNew();
    };

    /**
     * ************************************************
     * Cria um novo elemento para abrigar o novo select
     * ************************************************
     */
    function createNew() {
        for ($idx = 0; $idx < $select.length; $idx++) {
            $current = $select[$idx];
            $current.style.display = 'none';
            $base = document.createElement('div');
            $base.classList.add('select-base');
            $current.parentNode.insertBefore($base, $current);
            createButton();
        }
    }

    /**
     * ************************************************
     * Cria o botão de controle
     * ************************************************
     */
    function createButton() {
        $button = document.createElement('div');
        $button.classList.add('select-button');
        $base.appendChild($button);
        createList();
    }

    /**
     * ************************************************
     * Cria um elemento de lista para o novo select
     * ************************************************
     */
    function createList() {
        $ul = document.createElement('ul');
        $ul.classList.add('select-list');
        $button.parentNode.insertBefore($ul, $button.nextSibling);
        queryOptions();
    }

    /**
     * ************************************************
     * Obtem os valores do select e aplica os mesmos
     * ao novo select
     * ************************************************
     */
    function queryOptions() {
        $head = document.getElementsByClassName('select-button');
        $opt = $current.querySelectorAll('option');
        for ($j = 0; $j < $opt.length; $j++) {
            $li = document.createElement('li');
            $li.setAttribute('data-select', $opt[$j].value);
            $li.setAttribute('data-parent', $idx);
            $li.innerText = $opt[$j].innerText.substring(0, 20);
            $li.addEventListener('click', clickItem, false);
            $ul.appendChild($li);
        }
        var $selected = $current.selectedIndex;
        if ($selected >= 1) {
            $head[$idx].innerText = $opt[$selected].innerText.substring(0, 20);
        } else {
            $head[$idx].innerText = $opt[0].innerText.substring(0, 20);
        }
    }

    /**
     * ************************************************
     * Modifica os dados quando uma das opções é
     * selecionada.
     * * @param e : Evento disparado
     * ************************************************
     */
    function clickItem(e) {
        var $cT = e.target;
        var $dataSet = [$cT.dataset.parent, $cT.dataset.select];
        $head[$dataSet[0]].innerText = $cT.innerText.substring(0, 20);
        $select[$dataSet[0]].value = $dataSet[1];
    }

    /**
     * ************************************************
     * Controle a exibição dos selects
     * * @param event : Evento disparado
     * ************************************************
     */
    function clickDoc(event) {
        if (event.which === 1) {
            $target = event.target;
            if ($active === $target) {
                $active.classList.remove('active');
                $target.nextElementSibling.classList.remove('active');
                $active = null;
            } else if ($target.className === 'select-button') {
                if ($active) {
                    $active.classList.remove('active');
                    $active.nextElementSibling.classList.remove('active');
                }
                $target.classList.add('active');
                $target.nextElementSibling.classList.add('active');
                $active = $target;
            } else if ($active != undefined || $active != null) {
                $active.classList.remove('active');
                $active.nextElementSibling.classList.remove('active');
                $active = null;
            }
        }
    }
    document.addEventListener('click', clickDoc, false);
};
