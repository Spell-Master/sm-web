/**
 * ****************************************************
 * @Copyright (c) 2017, Spell Master.
 * @version 3.0 (2018)
 * @requires  Navegador compatível com HTML 5
 * ****************************************************
 * @class Personaliza grupo de opções.
 * ****************************************************
 */

var SelectOption = function () {

    var $select = document.getElementsByClassName('selected'), $idx, $current, $base, $button, $ul, $li, $head, $opt, $j, $active, $target;
    createNew();

    /**
     * ************************************************
     * * @private : Cria um novo elemento para
     * abrigar o novo select
     * ************************************************
     */
    function createNew() {
        for ($idx = 0; $idx < $select.length; $idx++) {
            $current = $select[$idx];
            $base = document.createElement('div');
            $base.classList.add('select-base');
            $current.parentNode.insertBefore($base, $current);
            createButton();
        }
    }

    /**
     * ************************************************
     * * @private : Cria o botão de controle
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
     * * @private : Cria um elemento de lista
     * para o novo select
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
     * * @private : Obtem os valores do select e
     * aplica os mesmos ao novo select
     * ************************************************
     */
    function queryOptions() {
        if ($head == undefined) {
            $head = document.getElementsByClassName('select-button');
        }
        $opt = $current.querySelectorAll('option');
        for ($j = 0; $j < $opt.length; $j++) {
            $li = document.createElement('li');
            $li.setAttribute('data-select', $opt[$j].value);
            $li.setAttribute('data-parent', $idx);
            $li.innerText = $opt[$j].innerText.substring(0, 20);
            $li.addEventListener('click', clickItem.bind(this));
            $ul.appendChild($li);
        }
        $head[$idx].innerText = $opt[0].innerText.substring(0, 20);
    }

    /**
     * ************************************************
     * * @private : Modifica os dados quando uma das
     * opções é clicada.
     * * @param e : Evento disparado
     * ************************************************
     */
    function clickItem(e) {
        var $cT = e.currentTarget;
        var $dataSet = [$cT.dataset.parent, $cT.dataset.select];
        $head[$dataSet[0]].innerText = $cT.innerText.substring(0, 20);
        $select[$dataSet[0]].value = $dataSet[1];
    }

    /**
     * ************************************************
     * * @private : Controle a exibição dos selects
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
