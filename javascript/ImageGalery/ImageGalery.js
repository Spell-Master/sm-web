/**
 * **************************************************
 * ImageGalery
 * @author Spell-Master (Omar Pautz)
 * @copyright 2019
 * @version 3.0 (13/08/2026)
 *
 * Exibe imagens como forma de galeria.
 * **************************************************
 */

var ImageGalery = function (options) {
    var $options = options || {
        images: undefined,
        zIndex: 1
    }, $element = {
        container: null,
        bg: null,
        close: null,
        center: null,
        bottom: null,
        thumb: null
    }, $array = {
        images: [],
        list: []
    }, $context = {
        open: false,
        target: undefined,
        count: 0
    };

    /**
     * *********************************************
     * Inicia as funções para criar os elementos
     *  usáveis, adiciona imagens se disponíveis no
     *  carregamento inicial, adiciona evento de
     *  fechar pela tecla de escape.
     * *********************************************
     */
    function intGalery() {
        createContainer();
        createBg();
        createClose();
        createCenter();
        createBottom();
        if ($options.images) {
            imgCollection($options.images);
            $array.images.forEach(imgAttach);
        }
        document.addEventListener('keydown', keyClose, false);
    }

    /**
     * *********************************************
     * Cria o recipiente dos elementos.
     * *********************************************
     */
    function createContainer() {
        $element.container = document.createElement('div');
        $element.container.classList.add('image-galery-container');
        $element.container.setAttribute('style', 'z-index:' + (isNaN($options.zIndex) ? parseInt($options.zIndex) : $options.zIndex));
        document.body.appendChild($element.container);
    }

    /**
     * *********************************************
     * Cria a imagem de plano de fundo.
     * *********************************************
     */
    function createBg() {
        $element.bg = new Image();
        $element.bg.classList.add('image-galery-background');
        $element.bg.alt = '';
        $element.bg.draggable = false;
        $element.container.appendChild($element.bg);
    }

    /**
     * *********************************************
     * Cria o botão de fechar.
     * *********************************************
     */
    function createClose() {
        $element.close = document.createElement('button');
        $element.close.classList.add('image-galery-close');
        $element.close.title = 'Fechar';
        $element.close.addEventListener('click', closeGalery, false);
        $element.container.appendChild($element.close);
    }

    /**
     * *********************************************
     * Cria a imagem central.
     * *********************************************
     */
    function createCenter() {
        $element.center = new Image();
        $element.center.classList.add('image-galery-center');
        $element.center.alt = '';
        $element.center.draggable = false;
        $element.container.appendChild($element.center);
    }

    /**
     * *********************************************
     * Cria o recipiente do rodapé.
     * *********************************************
     */
    function createBottom() {
        $element.bottom = document.createElement('div');
        $element.bottom.classList.add('image-galery-bottom');
        $element.container.appendChild($element.bottom);
        $element.bottom.addEventListener('click', bottomClick, false);
    }

    /**
     * *********************************************
     * Verifica se a(s) imagen(s) pertence a
     *  elemento(s) html inseridos no documento.
     *  
     * @param {DOM} img
     * Elemntos de imagem.
     * *********************************************
     */
    function imgCollection(img) {
        $array.images = [];
        if (img instanceof HTMLElement) {
            $array.images.push(img);
        } else if (img instanceof NodeList || img instanceof HTMLCollection) {
            $array.images = img;
        }
    }

    /**
     * *********************************************
     * Esconde os elementos quando precionado o
     *  botão de escape no teclado.
     *  
     * @param {OBJ} e
     * Dados do evento.
     * *********************************************
     */
    function keyClose(e) {
        if (e.keyCode === 27) {
            closeGalery();
        }
    }

    /**
     * *********************************************
     * Verifica se o elemento clicado no rodapé é
     *  uma imagem então altera a visualização para
     *  essa imagem.
     *  
     * @param {OBJ} e
     * Dados do evento.
     * *********************************************
     */
    function bottomClick(e) {
        if (e.target.src) {
            changeImages(e.target.src);
        }
    }

    /**
     * *********************************************
     * Adiciona imagem da galeria.
     *  
     * @param {DOM} img
     * Elemento de imagem no documento.
     * *********************************************
     */
    function imgAttach(img) {
        if (!$array.list.includes(img)) {
            $context.target = img;
            if ($context.target.src) {
                thumbAdd();
                $context.target.classList.add('image-galery-point');
                $context.target.addEventListener('click', openGalery, false);
                $array.list.push($context.target);
            }
        }
    }

    /**
     * *********************************************
     * Remove imagem da galeria.
     *  
     * @param {DOM} img
     * Elemento de imagem no documento.
     * *********************************************
     */
    function imgDetach(img) {
        $context.target = img;
        for ($context.count = 0; $context.count < $array.list.length; $context.count++) {
            if ($context.target === $array.list[$context.count]) {
                $array.list[$context.count].classList.remove('image-galery-point');
                $array.list[$context.count].removeEventListener('click', openGalery);
                thumbRemove();
                $array.list.splice($context.count, 1);
            }
        }
    }

    /**
     * *********************************************
     * Adiciona imagem de miniatua na galeria.
     * *********************************************
     */
    function thumbAdd() {
        $element.thumb = new Image();
        $element.thumb.alt = '';
        $element.thumb.src = $context.target.src;
        $element.thumb.draggable = false;
        $element.thumb.setAttribute('style', 'cursor:pointer');
        $element.bottom.appendChild($element.thumb);
    }

    /**
     * *********************************************
     * Remove imagem de miniatua na galeria.
     * *********************************************
     */
    function thumbRemove() {
        $element.bottom.removeChild($element.bottom.childNodes[$context.count]);
    }

    /**
     * *********************************************
     * Altera qual imagem é exibida.
     * 
     * @param {STR} img
     * Elemento de imagem a ser exibida.
     * *********************************************
     */
    function changeImages(img) {
        $element.bg.src = img;
        $element.center.src = img;
    }

    /**
     * *********************************************
     * Abre a visualização da galeria.
     * 
     * @param {OBJ} e
     * Dados do evento.
     * *********************************************
     */
    function openGalery(e) {
        if (!$context.open && e.target.src) {
            changeImages(e.target.src);
            $element.container.classList.add('image-galery-open');
            $context.open = true;
        }
    }

    /**
     * *********************************************
     * Fecha a visualização da galeria.
     * *********************************************
     */
    function closeGalery() {
        if ($context.open) {
            $element.container.classList.remove('image-galery-open');
            changeImages('');
            $context.open = false;
        }
    }

    /**
     * *********************************************
     * @public
     * Verifica quais arquivos de imagem estão
     *  anexos.
     * 
     * @returns {ARR} Lista de arquivos.
     * *********************************************
     */
    function checkImages() {
        if (!$context.open) {
            return ($array.list);
        }
    }

    /**
     * *********************************************
     * @public
     * Aciona a remoção de imagem na galeria.
     * 
     * @param {DOM} img
     * Elemento de imagem no documento.
     * *********************************************
     */
    function removeImages(img) {
        if (!$context.open) {
            imgCollection(img);
            $array.images.forEach(imgDetach);
        }
    }

    /**
     * *********************************************
     * @public
     * Aciona a adesão de imagem na galeria.
     * 
     * @param {DOM} img
     * Elemento de imagem no documento.
     * *********************************************
     */
    function addImages(img) {
        if (!$context.open) {
            imgCollection(img);
            $array.images.forEach(imgAttach);
        }
    }

    /* Iniciação das funções */
    intGalery();

    /**
     * *********************************************
     * Funções públicas
     * *********************************************
     */
    this.add = addImages;
    this.remove = removeImages;
    this.check = checkImages;
};
