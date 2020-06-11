/**
 * ****************************************************
 * * @Class Accordion
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2018
 * * @version 2.1 (2020)
 * ****************************************************
 * * Executa efeito sanfona em elementos
 * ****************************************************
 */

var Accordion = function () {

    var $button = document.getElementsByClassName('acc-button');
    var $this = {
        'target': null,
        'next': null,
        'last': null,
        'copy': null,
        'height': null
    };

    queryButtons();

    /**
     * ************************************************
     * @Method: Obtem os botões do cabeçalho
     *  e adiciona o evento click em cada.
     * ************************************************
     */
    function queryButtons() {
        for (var $i = 0; $i < $button.length; $i++) {
            $button[$i].addEventListener('click', togleContainer, false);
        }
    }

    /**
     * ************************************************
     * @Method: Aciona as funções para expandir ou
     *  contrair os elementos.
     * @param {OBJ} e 
     * Referencia ao evento do elemento
     *  clicado.
     * ************************************************
     */
    function togleContainer(e) {
        $this.target = e.target;
        $this.next = $this.target.nextElementSibling;
        if ($this.last == $this.next) {
            closeOpen();
        } else {
            if ($this.last) {
                closeOpen();
            }
            cloneNode();
            openTarget();
        }
    }

    /**
     * ************************************************
     * @Method: Cria temporariamente um elemento
     *  cópia do alvo na expansão para obter sua altura
     * ************************************************
     */
    function cloneNode() {
        $this.copy = $this.next.cloneNode(true);
        $this.copy.setAttribute('style', 'height:auto; visibility:visible');
        $this.next.parentNode.appendChild($this.copy);
        $this.height = $this.copy.offsetHeight;
        $this.next.parentNode.removeChild($this.copy);
    }

    /**
     * ************************************************
     * @Method: Contrai o elemento que estiver
     *  expandido.
     * ************************************************
     */
    function closeOpen() {
        $this.last.previousElementSibling.classList.remove('active');
        $this.last.style.height = 0 + 'px';
        $this.last = null;
        $this.height = 0;
    }

    /**
     * ************************************************
     * @Method: Expande o elemento alvo
     * ************************************************
     */
    function openTarget() {
        $this.target.classList.add('active');
        $this.next.style.height = $this.height + 'px';
        $this.last = $this.next;
    }

    /**
     * ************************************************
     * @Method: Forca a expansão de um elemento.
     * @param {INT} p
     *  Índice do elemento para expandir
     * ************************************************
     */
    this.forceOpen = function (p) {
        var $n;
        if (p) {
            $n = parseInt(p - 1);
        } else {
            $n = 0;
        }
        $this.next = document.getElementsByClassName('acc-container')[$n];
        $this.last = $this.next;
        $this.target = $this.next.previousElementSibling;
        cloneNode();
        openTarget();
    };
};
