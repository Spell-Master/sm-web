/**
 * ************************************************
 * @Copyright (c) Spell Master.
 * @Requisitos: Navegador compatível com HTML 5
 * ****************************************************
 * @class Gerencia aplicação modal
 * ****************************************************
 * @param modal elemento#ID do modal
 * ****************************************************
 */

var ModalShow = function (modal) {
    var $tgt = document.getElementById(modal);
    var $box = $tgt.getElementsByClassName('modal-box')[0];
    var $x;

    /**
     * ************************************************
     * @function : Abre a janela
     * @param text : (opcional) Informar string para
     * o título da janela
     * @param x : (Opcional) Informar BOL true/false
     * se verdadeiro o botão de fechar é mostrado no
     * momento que a janela é aberta.
     * ************************************************
     */
    this.open = function (text, x) {
        $tgt.querySelector('.modal-header').innerHTML = '<div class="modal-close"></div><div class="modal-title"></div>';
        if (text) {
            title(text);
        } else {
            title('Janela');
        }
        if (x) {
            showX();
        }
        $tgt.classList.add('active');
        checkH();
    };

    /**
     * ************************************************
     * @public Esconde o botão de fechar
     * ************************************************
     */
    this.hiddenX = function () {
        if ($x) {
            $x.classList.remove('active');
            $x.removeEventListener('click', close, true);
            $x = null;
        }
    };

    /**
     * ************************************************
     * @public Acesso públio as funções
     * ************************************************
     */
    this.title = title;
    this.showX = showX;
    this.close = close;

    /**
     * ************************************************
     * @function : Mostra o botão de fechar.
     * ************************************************
     */
    function showX() {
        if (!$x) {
            $x = $tgt.querySelector('.modal-close');
            $x.classList.add('active');
            $x.addEventListener('click', close, true);
        }
    }

    /**
     * ************************************************
     * @function : Escreve o título da janela.
     * @param {string} text : Título para a janela.
     * ************************************************
     */
    function title(text) {
        $tgt.querySelector('.modal-title').innerText = text;
    }

    /**
     * ************************************************
     * @function : Fecha a janela.
     * ************************************************
     */
    function close() {
        $box.classList.add('zoom-out');
        if ($x) {
            $x.removeEventListener('click', close);
            $x.classList.remove('active');
            $x = null;
        }
        setTimeout(function () {
            $tgt.classList.remove('active');
            $box.classList.remove('zoom-out');
        }, 500);
    }

    /**
     * ************************************************
     * @function : Checa a altura e a posição da
     * janela.
     * * Se não houver espaço no eixo vertical para
     * compor margem e altura do elemento central
     * remove a margem e manipula a altura do
     * conteúdo.
     * ************************************************
     */
    function checkH() {
        var $wH = window.innerHeight;
        var $bT = $box.offsetTop;
        var $bH = $box.offsetHeight;
        if (($bT + $bH) > $wH) {
            $box.style.margin = 'auto';
            $box.querySelector('.modal-content').style.height = ($wH - 50) + 'px';
        }
    }
};
