/**
 * ****************************************************
 * * ModalShow
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2018
 * * @version 3.0 (2020)
 * ****************************************************
 * * Gerencia aplicação modal.
 * 
 * ****************************************************
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
 * ****************************************************
 */

/**
 * ****************************************************
 * @param {STR} modal
 * * #ID do elemento modal
 * ****************************************************
 */
var ModalShow = function (modal) {

    var $this = {
        modal: document.getElementById(modal),
        close: null,
        content: null
    };

    /**
     * ************************************************
     * Exibe o bloco modal designado pela instância.
     *  
     * @public
     * ************************************************
     * 
     * @param {STR} title (opcional)
     * Informar o título do cabeçalho do bloco modal
     * designado pela instância.
     * 
     * @param {BOOL} close (opcional) true/false
     * Se verdadeiro um botão para fechar será exibido
     * no bloco modal designado pela instância.
     * ************************************************
     */
    function openModal(title, close) {
        $this.modal.querySelector('.modal-header').innerHTML = '<div class="modal-close"></div><div class="modal-title"></div>';
        $this.content = $this.modal.querySelector('.modal-content');
        if (title) {
            setTitle(title);
        }
        if (close) {
            setClose();
        }
        $this.modal.classList.add('active');
    }

    /**
     * ************************************************
     * Oculta o bloco modal designado pela instância.
     *  
     * @public
     * ************************************************
     */
    function closeModal() {
        if ($this.close) {
            $this.close.removeEventListener('click', closeModal);
            $this.close.classList.remove('active');
            $this.close = null;
        }
        $this.modal.classList.remove('active');
    }

    /**
     * ************************************************
     * Exibe o bloco modal designado pela instância.
     *  
     * @public
     * ************************************************
     * 
     * @param {STR} title (opcional)
     * Altera ou adiciona o título do cabeçalho do
     * bloco designado pela instância.
     * ************************************************
     */
    function setTitle(title) {
        $this.modal.querySelector('.modal-title').innerText = title;
    }

    /**
     * ************************************************
     * Mostra um botão de fechar se ele não estiver
     * visível no bloco modal designado pela instância.
     *  
     * @public
     * ************************************************
     */
    function setClose() {
        if (!$this.close) {
            $this.close = $this.modal.querySelector('.modal-close');
            $this.close.classList.add('active');
            $this.close.addEventListener('click', closeModal, true);
        }
    }

    /**
     * ************************************************
     * Oculta o botão de fechar se ele estiver visível
     * no bloco modal designado pela instância.
     *  
     * @public
     * ************************************************
     */
    function unsetClose() {
        if ($this.close) {
            $this.close.classList.remove('active');
            $this.close.removeEventListener('click', close, true);
            $this.close = null;
        }
    }

    /**
     * ************************************************
     * * Acesso público aos métodos
     * ************************************************
     */
    this.open = openModal;
    this.close = closeModal;
    this.title = setTitle;
    this.showX = setClose;
    this.hiddenX = unsetClose;

};
