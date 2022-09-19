/**
 * **************************************************
 * ImageGalery
 * @author Spell-Master (Omar Pautz)
 * @copyright 2019
 * @version 2.0 (2022)
 *
 * Exibe imagens como forma de galeria.
 * **************************************************
 */

var ImageGalery = function () {

    var $this = {
        galery: document.querySelectorAll('img[data-galery]'),
        images: [],
        open: false
    }, $add = {
        bg: null,
        center: null,
        close: null,
        bottom: null,
        thumb: null
    };

    /**
     * **********************************************
     * @private
     * Mostra ou escode os elementos da galeria.
     * **********************************************
     */
    function toggleHidden() {
        $add.bg.classList.toggle('hidden');
        $add.center.classList.toggle('hidden');
        $add.bottom.classList.toggle('hidden');
        $add.close.classList.toggle('hidden');
    }

    /**
     * **********************************************
     * @private
     * Executa ação para mostrar a galeria.
     * @param {OBJECT} e
     * **********************************************
     */
    function openGalery(e) {
        if (!$this.open) {
            $add.bg.src = e.target.src;
            $add.center.src = e.target.src;
            toggleHidden();
            $this.open = true;
        }
    }

    /**
     * **********************************************
     * @private
     * Executa ação para esconder a galeria.
     * **********************************************
     */
    function closeGalery() {
        if ($this.open) {
            toggleHidden();
            $this.open = false;
        }
    }

    /**
     * **********************************************
     * @private
     * Altera a imagem central e do fundo quando
     *  clicado em alguma minitura inferior.
     * @param {OBJECT} e
     * **********************************************
     */
    function changeOpen(e) {
        if ($this.open) {
            $add.bg.src = e.target.src;
            $add.center.src = e.target.src;
        }
    }

    /**
     * **********************************************
     * @private
     * Cria a imagem de plano de fundo.
     * **********************************************
     */
    function createBg() {
        $add.bg = document.createElement('img');
        $add.bg.id = 'galery-bg';
        $add.bg.classList.add('hidden');
        document.body.appendChild($add.bg);
    }

    /**
     * **********************************************
     * @private
     * Cria a imagem de central.
     * **********************************************
     */
    function createCenter() {
        $add.center = document.createElement('img');
        $add.center.id = 'galery-center';
        $add.center.classList.add('hidden');
        document.body.appendChild($add.center);
    }

    /**
     * **********************************************
     * @private
     * Cria o botão de fechar.
     * **********************************************
     */
    function createClose() {
        $add.close = document.createElement('button');
        $add.close.id = 'galery-close';
        $add.close.title = 'Fechar';
        $add.close.classList.add('hidden');
        $add.close.addEventListener('click', closeGalery, false);
        document.body.appendChild($add.close);
    }

    /**
     * **********************************************
     * @private
     * Cria a barra inferior para as miniaturas.
     * **********************************************
     */
    function createBottom() {
        $add.bottom = document.createElement('div');
        $add.bottom.id = 'galery-bottom';
        $add.bottom.classList.add('hidden');
        document.body.appendChild($add.bottom);
    }

    /**
     * **********************************************
     * @private
     * Cria as miniaturas.
     * @param {OBJECT} image
     * **********************************************
     */
    function createThumb(image) {
        $add.thumb = document.createElement('img');
        $add.thumb.src = image;
        $add.thumb.setAttribute('style', 'height:80px; max-width:' + Math.ceil(document.body.offsetWidth / $this.images.length) + 'px; cursor:pointer');
        $add.thumb.addEventListener('click', changeOpen, false);
        $add.bottom.appendChild($add.thumb);
    }

    /**
     * **********************************************
     * @private
     * Detecta quando a tela "ESCAPE" é clicada
     *  fechando a galeria.
     * @param {OBJECT} e
     * **********************************************
     */
    function keyboard(e) {
        if (e.keyCode === 27) {
            closeGalery();
        }
    }

    /**
     * **********************************************
     * @public
     * Analiza novamente as imagens se alguma estiver
     *  faltando remove ela da memória, se houver
     *  alguma que não está na memória a adiciona.
     * **********************************************
     */
    function reload() {
        $this.galery = document.querySelectorAll('img[data-galery]');

        if ($this.galery.length < $this.images.length) {
            for (var $i = 0; $i < $this.galery.length; $i++) {
                if ($this.galery[$i] !== $this.images[$i]) {
                    $this.images.splice($i, 1);
                    $add.bottom.removeChild($add.bottom.childNodes[$i]);
                }
            }
        } else if ($this.galery.length > $this.images.length) {
            for (var $i = 0; $i < $this.galery.length; $i++) {
                if ($this.galery[$i] !== $this.images[$i] &&  $this.galery[$i].currentSrc !== '') {
                    $this.images.push($this.galery[$i]);
                    createThumb($this.images[$i].src);
                    $this.images[$i].addEventListener('click', openGalery, false);
                }
            }
        }
    }

    /**
     * **********************************************
     * @public
     * Retorna as imagens carregadas.
     * **********************************************
     */
    function elements() {
        if (typeof $this.galery !== undefined && $this.galery !== null) {
            return ($this.galery);
        } else {
            return ({});
        }
    }

    /**
     * **********************************************
     * Adiciona as imagens carregadas na memória.
     * @param {OBJECT} img
     * **********************************************
     */
    $this.galery.forEach(function (img) {
        if (img.currentSrc !== '') {
            $this.images.push(img);
        }
    });

    /**
     * **********************************************
     * Identifica quando a memória possui os mesmos
     *  dados das imagens carregadas.
     * **********************************************
     */
    if ($this.images.length === $this.galery.length) {
        createBg();
        createCenter();
        createClose();
        createBottom();
        for (var $i = 0; $i < $this.images.length; $i++) {
            createThumb($this.images[$i].src);
            $this.images[$i].addEventListener('click', openGalery, false);
        }
        document.addEventListener('keydown', keyboard, false);
    }

    /**
     * **********************************************
     * Acesso público as funções.
     * **********************************************
     */
    this.reload = reload;
    this.elements = elements;
};