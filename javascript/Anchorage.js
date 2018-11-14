/**
 * ****************************************************
 * @Copyright (c) 2016, Spell Master.
 * @Version: 2.0
 * ****************************************************
 * @class Executa efeito sanfona em seletores.
 * ****************************************************
 **/
var Accordion = function () {

    var $button = document.getElementsByClassName('acc-button'), $target, $next, $copy, $h, $last;

    queryButtons();

    /**
     * ************************************************
     * @private : Obtem os botões do cabeçalho
     * e adiciona o evento click em cada.
     * ************************************************
     */
    function queryButtons() {
        for (var $i = 0; $i < $button.length; $i++) {
            $button[$i].addEventListener('click', togleContainer, false);
        }
    }

    /**
     * ************************************************
     * @private : Aciona as funções para expandir ou
     * contrair os elementos.
     * @param e : Referencio ao evento do elemento
     * clicado.
     * ************************************************
     */
    function togleContainer(e) {
        $target = e.target;
        $next = $target.nextElementSibling;
        if ($last == $next) {
            closeOpen();
        } else {
            if ($last) {
                closeOpen();
            }
            cloneNode();
            openTarget();
        }
    }

    /**
     * ************************************************
     * @private : Cria temporariamente um elemento
     * cópia do alvo na expansão para obter sua altura
     * ************************************************
     */
    function cloneNode() {
        $copy = $next.cloneNode(true);
        $copy.setAttribute('style', 'height:auto; visibility:visible');
        $next.parentNode.appendChild($copy);
        $h = $copy.offsetHeight;
        $next.parentNode.removeChild($copy);
    }

    /**
     * ************************************************
     * @private : Contrai o elemento que estiver
     * expandido
     * ************************************************
     */
    function closeOpen() {
        $last.previousElementSibling.classList.remove('active');
        $last.style.height = 0 + 'px';
        $last = null;
        $h = 0;
    }

    /**
     * ************************************************
     * @private : Expande o elemento alvo
     * ************************************************
     */
    function openTarget() {
        $target.classList.add('active');
        $next.style.height = $h + 'px';
        $last = $next;
    }

    /**
     * ************************************************
     * @public : Forca a expansão de um elemento.
     * @param p : Índice do elemento para expandir
     * ************************************************
     */
    this.forceOpen = function (p) {
        var $n;
        if (p) {
            $n = parseInt(p - 1);
        } else {
            $n = 0;
        }
        $next = document.getElementsByClassName('acc-container')[$n];
        $last = $next;
        $target = $next.previousElementSibling;
        cloneNode();
        openTarget();
    };
};
