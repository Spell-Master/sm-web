/**
 * **************************************************
 * ModalShow
 * @author Spell-Master (Omar Pautz)
 * @copyright 2018
 * @version 3.1 (2022)
 * 
 * Gerencia aplicação modal.
 * **************************************************
 * @requires
 * Estrutura HTML
 * <div class="modal" id="identificador">
 *     <div class="modal-box">
 *         <div class="modal-header"></div>
 *         <div class="modal-content">
 *             Conteúdo...
 *         </div>
 *     </div>
 * </div>
 * **************************************************
 */

/**
 * **************************************************
 * @param {STRING} modal
 * #ID do elemento modal
 * **************************************************
 */
var ModalShow = function (modal) {

    var $this = {
        modal: document.getElementById(modal),
        box: null,
        header: null,
        close: null,
        title: null,
        content: null,
        closeX: false
    }, $options = {};

    /**
     * **********************************************
     * Adiciona o efeito de transição na abertura do
     *  modal.
     * @param {STRING} effect
     * Nome do efeito para adicionar.
     * **********************************************
     */
    function setEffect(effect) {
        var $effect = ['fade', 'zoom', 'top', 'bottom', 'left', 'right'];
        if ($effect.includes(effect)) {
            $this.box.dataset.modalEffect = effect;
        }
    }

    /**
     * **********************************************
     * Define as propriedade da caixa central do
     *  modal.
     * **********************************************
     */
    function boxAttribute() {
        if (typeof $options.width === 'number' && !isNaN($options.width)) {
            $this.box.setAttribute('style', 'max-width:' + $options.width + 'px');
        }
        if (typeof $options.effect === 'string') {
            setEffect($options.effect);
        }
    }

    /**
     * **********************************************
     * Abre o modal.
     * @param {OBJECT} options
     * Opções do modal (qualquer valor é opcional)
     * - width: informar um numero correpondente a
     *  largura máxima que o modal deve possuir.
     * - effect: informar qual efeito de transição
     *  deve ocorrer na abertura....
     *  fade, zoom, top, bottom, left ou right.
     * - title: informar o título da janela.
     * - close: informar true ou false, se true ou
     *  não informado o  botão de fechar será
     *  exibido.
     * - onOpen: informar uma função que deve ser
     *  executada quando o modal é aberto.
     * - onClose: informar uma função que deve ser
     *  executada quando o modal é fechado.
     * **********************************************
     */
    function openModal(options) {
        options = options || {};
        $options = {
            width: options.width || undefined,
            effect: options.effect || undefined,
            exit: options.onClose || undefined
        };
        if (typeof options.title === 'string') {
            setTitle(options.title);
        }
        if (typeof options.close === 'undefined' || options.close === true) {
            setClose();
        }
        if ($this.box) {
            boxAttribute();
        }
        if (typeof options.onOpen === 'function') {
            options.onOpen();
        }
        $this.modal.classList.add('active');
    }

    /**
     * **********************************************
     * Fecha o modal.
     * **********************************************
     */
    function closeModal() {
        $this.modal.classList.remove('active');
        if ($this.close && $this.closeX) {
            $this.close.removeEventListener('click', closeModal);
            $this.close.classList.remove('active');
            $this.closeX = false;
            if (typeof $options.exit === 'function') {
                $options.exit();
            }
        }
    }

    /**
     * **********************************************
     * Define o título do modal.
     * @param {STRING} text
     * Texto para exibir como título.
     * **********************************************
     */
    function setTitle(text) {
        if ($this.title) {
            $this.title.innerHTML = text;
        }
    }

    /**
     * **********************************************
     * Exibe o botão de fechar.
     * **********************************************
     */
    function setClose() {
        if ($this.close && !$this.closeX) {
            $this.close.addEventListener('click', closeModal, false);
            $this.close.classList.add('active');
            $this.closeX = true;
        }
    }

    /**
     * **********************************************
     * Remove o botão de fechar.
     * **********************************************
     */
    function unsetClose() {
        if ($this.close && $this.closeX) {
            $this.close.removeEventListener('click', closeModal);
            $this.close.classList.remove('active');
            $this.closeX = false;
        }
    }

    /**
     * **********************************************
     * Define o conteúdo do modal.
     * @param {STRING} text
     * Texto para exibir como conteúdo.
     * **********************************************
     */
    function setContent(text) {
        if ($this.content) {
            $this.content.innerHTML = text;
        }
    }

    /**
     * **********************************************
     * Obtem a caixa central.
     * **********************************************
     */
    function newBox() {
        if (typeof $this.box !== undefined || $this.box !== null) {
            $this.box.setAttribute('data-modal-effect', '');
        } else {
            console.warn('ModalShow: modal-box não definido');
        }
    }

    /**
     * **********************************************
     * Obtem o cabeçalho e cria o título e o botão de
     *  fechar.
     * **********************************************
     */
    function newHeader() {
        if (typeof $this.header !== undefined && $this.header !== null) {
            $this.close = document.createElement('button');
            $this.close.classList.add('modal-close');
            $this.close.title = 'Fechar';
            $this.header.appendChild($this.close);

            $this.title = document.createElement('div');
            $this.title.classList.add('modal-title');
            $this.header.appendChild($this.title);
        } else {
            console.warn('ModalShow: modal-header não definido');
        }
    }

    /**
     * **********************************************
     * Checa se o modal já foi manipulado, caso não
     *  inicia os recursos para ele.
     * **********************************************
     */
    if ($this.modal.dataset.modal !== 'on') {
        $this.box = $this.modal.querySelector('.modal-box');
        $this.header = $this.modal.querySelector('.modal-header');
        $this.content = $this.modal.querySelector('.modal-content');
        newBox();
        newHeader();
        if (typeof $this.content === undefined || $this.content === null) {
            console.warn('ModalShow: modal-content não definido');
        }
        $this.modal.setAttribute('data-modal', 'on');
    }

    /**
     * **********************************************
     * Acesso público aos métodos.
     * **********************************************
     */
    this.open = openModal;
    this.close = closeModal;
    this.title = setTitle;
    this.showX = setClose;
    this.hiddenX = unsetClose;
    this.content = setContent;
};
