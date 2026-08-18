/**
 * **************************************************
 * ModalShow
 * @author Spell-Master (Omar Pautz)
 * @copyright 2018
 * @version 4.0 (18/08/2026)
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

var ModalShow = function (tgt) {

    var $elements = {
        modal: tgt,
        box: null,
        header: null,
        content: null,
        title: null,
        close: null
    },
    $options = {},
    $isClose = false;

    /**
     * *********************************************
     * * Obtem os elementos, define o atributo de
     *  efeito e executa as funções para titulo e
     *  fechar o modal.
     * *********************************************
     */
    function initModal() {
        if ($elements.modal.classList.contains('modal')) {
            $elements.box = $elements.modal.querySelector('.modal-box');
            $elements.header = $elements.modal.querySelector('.modal-header');
            $elements.content = $elements.modal.querySelector('.modal-content');
            $elements.box.setAttribute('data-modal-effect', '');
            createTitle();
            createClose();
        }
    }

    /**
     * *********************************************
     * * Cria o elemento do para o titulo.
     * *********************************************
     */
    function createTitle() {
        $elements.title = document.createElement('div');
        $elements.title.classList.add('modal-title');
        $elements.header.appendChild($elements.title);
    }

    /**
     * *********************************************
     * * Cria o botão de fechar
     * *********************************************
     */
    function createClose() {
        $elements.close = document.createElement('button');
        $elements.close.classList.add('modal-close');
        $elements.close.title = 'Fechar';
        $elements.header.appendChild($elements.close);
    }

    /**
     * *********************************************
     * * Verifica e anexa o efeito de transição no
     *  modal.
     * *********************************************
     */
    function effectList() {
        var $effect = ['fade', 'zoom', 'top', 'bottom', 'left', 'right', ''];
        if ($effect.includes($options.effect)) {
            $elements.box.dataset.modalEffect = $options.effect;
        }
    }

    /**
     * *********************************************
     * * Define a comportamento de visualização do
     *  modal.
     * *********************************************
     */
    function basicStyle() {
        $elements.modal.setAttribute('style', 'z-index:' + $options.zIndex);
        $elements.box.setAttribute('style', 'max-width:' + Math.ceil($options.width) + 'px');
        setTitle($options.title);
        effectList();
    }

    /**
     * *********************************************
     * * Define as opções de execução
     * 
     * @param {OBJ} options
     * Opções de execução.
     * *********************************************
     */
    function defOptions(options) {
        $options = {
            zIndex: (typeof options.zIndex === 'number' ? options.zIndex : 1),
            width: (typeof options.width === 'number' ? options.width : document.body.offsetWidth * (1 - 10 / 100)),
            title: (typeof options.title === 'string' ? options.title : ''),
            effect: (typeof options.effect === 'string' ? options.effect : ''),
            close: (typeof options.close !== 'boolean' || typeof options.close === 'undefined' ? true : options.close),
            onOpen: options.onOpen || function () {},
            onClose: options.onClose || function () {}
        };
    }

    /**
     * *********************************************
     * @public
     * * Abre o modal.
     * *********************************************
     */
    function openModal(options) {
        defOptions(options);
        basicStyle();
        if ($options.close) {
            setClose();
        }
        $elements.modal.classList.add('modal-active');
        $options.onOpen();
    }

    /**
     * *********************************************
     * @public
     * * Fecha o modal.
     * *********************************************
     */
    function closeModal() {
        $elements.modal.classList.remove('modal-active');
        if ($isClose) {
            unsetClose();
            $options.onClose();
        }
    }

    /**
     * *********************************************
     * @public
     * * Mostra o botão de fechar o modal.
     * *********************************************
     */
    function setClose() {
        if (!$isClose) {
            $elements.close.addEventListener('click', closeModal, false);
            $elements.close.classList.add('modal-active');
            $isClose = true;
        }
    }

    /**
     * *********************************************
     * @public
     * * Esconde o botão de fechar o modal.
     * *********************************************
     */
    function unsetClose() {
        if ($isClose) {
            $elements.close.removeEventListener('click', closeModal);
            $elements.close.classList.remove('modal-active');
            $isClose = false;
        }
    }

    /**
     * *********************************************
     * @public
     * * Define o título do modal.
     * 
     * @param {STR} title
     * Texto para o título
     * *********************************************
     */
    function setTitle(title) {
        $elements.title.innerText = title;
    }

    /**
     * *********************************************
     * @public
     * * Define o conteúdo do modal.
     * 
     * @param {STR} text
     * Texto para o conteúdo.
     * *********************************************
     */
    function setContent(text) {
        if ($elements.content) {
            $elements.content.innerHTML = text;
        }
    }

    initModal();

    this.open = openModal;
    this.close = closeModal;
    this.showX = setClose;
    this.hiddenX = unsetClose;
    this.title = setTitle;
    this.content = setContent;

};
