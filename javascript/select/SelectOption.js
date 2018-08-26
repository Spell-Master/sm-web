/**
 * ****************************************************
 * * @Class Select
 * * @author Spell-Master (Omar Pautz)
 * * @version 2.0 (2018)
 * ****************************************************
 * * @Info Personaliza grupo de opções 
 * ****************************************************
 * @param id : Id do select a ser personalizado
 * ****************************************************
 */

var SelectOption = function (id) {
    var $id = id;
    var $trg = document.getElementById($id);
    var $new, $head, $ul, $li, $i, $opt, $next, $cT;
    createNew();

    /**
     * ************************************************
     * * @function Cria os elementos base para o
     * select personalizado
     * ************************************************
     */
    function createNew() {
        $new = document.createElement('div');
        $new.classList.add('slt');
        $head = document.createElement('div');
        $head.classList.add('slt-title');
        $trg.parentNode.insertBefore($new, $trg.nextSibling);
        $new.appendChild($head);
        createList();
    }

    /**
     * ************************************************
     * * @function Cria a estrutura da lista
     * ************************************************
     */
    function createList() {
        $ul = document.createElement('ul');
        $ul.classList.add('slt-ul');
        $new.appendChild($ul);
        $new.addEventListener('click', toggleList);
        createOptions();
    }

    /**
     * ************************************************
     * * @function Obtem as opções do select e adiona
     * as mesmas para os personalizados
     * ************************************************
     */
    function createOptions() {
        $opt = $trg.querySelectorAll('option');
        for ($i = 0; $i < $opt.length; $i++) {
            $li = document.createElement('li');
            $li.setAttribute('data-select', $opt[$i].value);
            $li.innerText = $opt[$i].innerText;
            $li.addEventListener('click', clickItem.bind(this));
            $ul.appendChild($li);
        }
        $head.innerText = $opt[0].innerText;
    }

    /**
     * ************************************************
     * * @function 
     * Mostra a lista personalizada quando clicado
     * sobre o cabeçalho dela
     * * @param e : Obtem o atual elemento
     * ************************************************
     */
    function toggleList(e) {
        //e.stopPropagation();
        $next = e.target.nextElementSibling;
        $ul.classList.add('active');
        $head.classList.add('sarrow');
    }

    /**
     * ************************************************
     * * @function Adiciona o valor item clicado ao
     * value do select
     * * @param e : Atual elemento
     * ************************************************
     */
    function clickItem(e) {
        e.stopPropagation();
        $cT = e.currentTarget;
        $head.innerText = $cT.innerText;
        $trg.value = $cT.dataset.select;
        $cT.parentNode.classList.remove('active');
        $head.classList.remove('sarrow');
    }

    /**
     * ************************************************
     * * @function Quando clicado fora do select
     * personalizado oculta os elementos
     * ************************************************
     */
    function closeOff() {
        var $tol = document.getElementsByClassName('slt-ul');
        for ($i = 0; $i < $tol.length; $i++) {
            $tol[$i].classList.remove('active');
        }
        $head.classList.remove('sarrow');
    }
    document.addEventListener('click', closeOff, true);
};