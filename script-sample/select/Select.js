/**
 * ********************************************
 * * @Class Select
 * * @author Spell-Master (Omar Pautz)
 * * @version 1.0 (2018)
 * ********************************************
 * * @Info Personaliza grupo de opções 
 * ********************************************
 * * @param selectID
 * #ID do select a ser usado
 * ********************************************
 */

var Select = function (selectID) {
    var $selectGroup = document.querySelector(selectID);
    var $sltOpt = $selectGroup.querySelectorAll('option');
    var $newSlt, $nslt, $slti, $sltUl, $sltLi, $sltVal, $sltStatus, $sltActive;

    getNewSelect();

    /**
     * ****************************************
     * * @function getNewSelect
     * Esconde o select atual e eria o novo
     * elemento do select personalizado.
     * ****************************************
     */
    function getNewSelect() {
        $selectGroup.classList.add('slthidden');
        $newSlt = document.createElement('div');
        $selectGroup.parentNode.insertBefore($newSlt, $selectGroup);
        $newSlt.classList.add('sltp');
        $newSlt.innerHTML = '<div class="nslt" id="nslt"></div>';
        $nslt = document.getElementById('nslt');
        createList();
    }

    /**
     * ****************************************
     * * @function createList
     * Cria a lista de opções.
     * ****************************************
     */
    function createList() {
        $sltUl = document.createElement('ul');
        $sltUl.classList.add('sltlist');
        $newSlt.appendChild($sltUl);
        createOptions();
    }

    /**
     * ****************************************
     * * @function createOptions
     * Cria as opções da lista.
     * ****************************************
     */
    function createOptions() {
        for ($slti = 0; $slti < $sltOpt.length; $slti++) {
            $sltLi = document.createElement('li');
            $sltLi.setAttribute('data-value', $sltOpt[$slti].value);
            $sltLi.innerHTML = $sltOpt[$slti].innerHTML;
            $sltUl.appendChild($sltLi);
            $sltLi.addEventListener('click', optionClick.bind(this));
            $nslt.innerHTML = $sltOpt[0].innerText;
        }
        clickOff();
    }

    /**
     * ****************************************
     * * @function optionClick
     * - Captura dos dados da opção selecionada
     * - Insere o valor no select oculto.
     * * @param ev
     * Opção selecionada.
     * ****************************************
     */
    function optionClick(ev) {
        $sltVal = ev.target.getAttribute('data-value');
        $nslt.innerText = ev.target.innerText;
        $selectGroup.value = $sltVal;
    }

    /**
     * ****************************************
     * * @function clickOff
     * Oculta elemento ou aciona nova função
     * para mostrar o seletor se o mesmo for
     * clicado.
     * ****************************************
     */
    function clickOff() {
        document.addEventListener('click', function (event) {
            if (event.target.id === 'nslt') {
                openOptions();
            } else {
                $sltUl.style.display = 'none';
                $nslt.classList.remove('active');
            }
        });
    }

    /**
     * ****************************************
     * * @function openOptions
     * Mostra ou oculta as opções de acordo
     * com sua ativação.
     * ****************************************
     */
    function openOptions() {
        $sltStatus = window.getComputedStyle ? getComputedStyle($sltUl, null) : $sltUl.currentStyle;
        $sltActive = $sltStatus.display;
        if ($sltActive === 'none') {
            $sltUl.style.display = 'block';
        } else {
            $sltUl.style.display = 'none';
        }
        $nslt.classList.toggle('active');
    }
};