/**
 * **************************************************
 * SlideCarousel
 * @author Spell-Master (Omar Pautz)
 * @copyright 2022
 * @version 1.2 (2023)
 * 
 * Apresentação do tipo carrosel.
 * 
 * @param {STR/OBJ} tgt
 * Elemento da estrutura html que abriga o carrosel.
 * @param {OBJ} options
 * * Opções de execução.
 * - "maxWidth" (INT): largura máxima dos slides.
 * - "autoPlay" (INT/BOLL): Permite que os slides
 *       pulem automaticamente a cada X segundos,
 *       o valor pode ser true ou numero em
 *       segundos.
 * - "enableTouch" (BOLL): Se false/null remove a
 *       capacidade de arrastar para pular os slides.
 * - "enableNav" (BOLL): Se false/null remove os
 *       botões laterais para pular o slide,
 *       o padrão é ativo se não definido.
 * **************************************************
 */
var SlideCarousel = function (tgt, options) {

    options = options || {};

    var $options = {
        maxWidth: options.maxWidth || 1920,
        autoPlay: options.autoPlay,
        enableTouch: options.enableTouch,
        enableNav: options.enableNav
    };
    var $this = {
        target: null,
        item: undefined,
        container: null,
        wrapper: null,
        slides: [],
        length: 0,
        width: 0,
        index: 0,
        onLeft: 0,
        offLeft: 0,
        onGrap: 0,
        offGrap: 0,
        timeOut: 0,
        interval: 0
    };

    /**
     * **********************************************
     * @private
     * Obtem os itens para o slide dentro do alvo.
     * E elimina quaisquer elementos que lá estejam.
     * **********************************************
     */
    function init() {
        while ($this.target.childNodes.length) {
            $this.item = $this.target.firstChild;
            if (typeof $this.item.classList !== 'undefined' && $this.item.classList.contains('slide-item')) {
                $this.slides.push($this.item);
            }
            $this.target.removeChild($this.item);
        }
        $this.length = $this.slides.length;
    }

    /**
     * **********************************************
     * @private
     * Cria o slide corretamente copiando os itens
     *  para dentro.
     * **********************************************
     */
    function createSlide() {
        $this.container = document.createElement('div');
        $this.container.classList.add('slide-container');
        $this.container.setAttribute('style', 'max-width:' + parseInt($options.maxWidth) + 'px');

        $this.wrapper = document.createElement('div');
        $this.wrapper.classList.add('slide-wrapper');

        // Adiciona o último item no início
        $this.wrapper.appendChild($this.slides[$this.length - 1].cloneNode(true));
        // Adiciona todos slides removidos
        $this.slides.forEach(function (e) {
            $this.wrapper.appendChild(e.cloneNode(true));
        });
        // Adiciona o primeiro item no final
        $this.wrapper.appendChild($this.slides[0].cloneNode(true));

        $this.target.appendChild($this.container);
        $this.container.appendChild($this.wrapper);
    }

    /**
     * **********************************************
     * @private
     * Move o slide.
     * 
     * @param {INT} dir
     * Direção do movimento.
     * 1: próximo.
     * -1: anterior.
     * 
     * @param {BOLL} onDrag
     * Se a função é disparada quando segurando o
     *  slide.
     * **********************************************
     */
    function moveSlide(dir, onDrag) {
        $this.wrapper.classList.add('transition');
        if (!onDrag) {
            $this.onLeft = $this.wrapper.offsetLeft;
        }
        if (dir == 1) {
            $this.wrapper.style.left = ($this.onLeft - $this.width) + 'px';
            $this.index++;
        } else if (dir == -1) {
            $this.wrapper.style.left = ($this.onLeft + $this.width) + 'px';
            $this.index--;
        }
        if ($options.autoPlay >= 3) {
            clearTimeout($this.timeOut);
            $this.timeOut = setTimeout(function () {
                moveSlide(1);
            }, $this.interval);
        }
    }

    /**
     * **********************************************
     * @private
     * Cria os botões laterais para alternar entre
     *  os slides.
     * **********************************************
     */
    function createNav() {
        var $prev = document.createElement('button'), $next = document.createElement('button');
        $prev.classList.add('slide-prev');
        $next.classList.add('slide-next');
        $prev.addEventListener('click', prevSlide, false);
        $next.addEventListener('click', nextSlide, false);
        $this.container.appendChild($prev);
        $this.container.appendChild($next);
    }

    /**
     * **********************************************
     * @private
     * Obtem a largura correta do slide.
     * **********************************************
     */
    function slideWidth() {
        return (Math.ceil($this.container.offsetWidth));
    }

    /**
     * **********************************************
     * @private
     * Inicia os eventos de transição e toque.
     * **********************************************
     */
    function startEvents() {
        $this.wrapper.addEventListener('transitionend', checkIndex, false);
        window.addEventListener('resize', slideResize, false);
        if ($options.autoPlay >= 3) {
            document.addEventListener('visibilitychange', visibilityChange, false);
        }

        if ($options.enableTouch !== false || typeof $options.enableTouch === 'undefined') {
            $this.wrapper.addEventListener('mousedown', dragStart, false);
            $this.wrapper.addEventListener('touchstart', dragStart, false);
        }
    }

    /**
     * **********************************************
     * @private
     * Verifica o item atual, se não houver mais
     *  itens para alterar da próxima vez,
     *  move todos os demais para a próxima direção.
     * **********************************************
     */
    function checkIndex() {
        $this.wrapper.classList.remove('transition');
        if ($this.index == -1) {
            $this.wrapper.style.left = -($this.length * $this.width) + 'px';
            $this.index = $this.length - 1;
        } else if ($this.index == $this.length) {
            $this.wrapper.style.left = -(1 * $this.width) + 'px';
            $this.index = 0;
        }
    }

    /**
     * **********************************************
     * @private
     * Redefine a largura e a posição do slide quando
     *  o tamanho da janela é alterada.
     * **********************************************
     */
    function slideResize() {
        $this.width = slideWidth();
        $this.wrapper.setAttribute('style', 'left:-' + $this.width + 'px; width:' + $this.width + 'px');
    }

    /**
     * **********************************************
     * @private
     * Inicia os eventos de movimento e soltura
     *  quando segurado o slide.
     * 
     * @param {OBJ} e
     * Evento disparado
     * **********************************************
     */
    function dragStart(e) {
        e.preventDefault();
        e.stopPropagation();

        $this.onLeft = $this.wrapper.offsetLeft;
        $this.onGrap = (e.clientX || e.pageX || e.touches && e.touches[0].clientX) + window.scrollX;

        if ($options.autoPlay >= 3) {
            clearTimeout($this.timeOut);
        }
        document.addEventListener('mousemove', dragGrap);
        document.addEventListener('touchmove', dragGrap);
        document.addEventListener('mouseup', dragLeave);
        document.addEventListener('touchend', dragLeave);
    }

    /**
     * **********************************************
     * @private
     * Remove os eventos de movimento e soltura
     *  quando soltado o slide.
     * **********************************************
     */
    function dragStop() {
        document.removeEventListener('mouseup', dragLeave);
        document.removeEventListener('touchend', dragLeave);
        document.removeEventListener('mousemove', dragGrap);
        document.removeEventListener('touchmove', dragGrap);
    }

    /**
     * **********************************************
     * @private
     * Obtem o ponto inicial quando segurado o slide.
     * 
     * @param {OBJ} e
     * Evento disparado
     * **********************************************
     */
    function dragGrap(e) {
        e.preventDefault();
        e.stopPropagation();
        $this.offGrap = (e.pageX || e.touches && e.touches[0].pageX) - ($this.onGrap - $this.onLeft);
        $this.wrapper.style.left = $this.offGrap + 'px';
    }

    /**
     * **********************************************
     * @private
     * Obtem o ponto onde o slide foi solto.
     * Se o ponto atual é maior que 100 do ponto
     *  inicial move para o próximo slide.
     * Se o ponto atual é menor que 100 do ponto
     *  inicial move para o slide anterior.
     * **********************************************
     */
    function dragLeave() {
        dragStop();
        $this.offLeft = $this.wrapper.offsetLeft;
        if ($this.offLeft - $this.onLeft < -100) {
            moveSlide(1, true);
        } else if ($this.offLeft - $this.onLeft > 100) {
            moveSlide(-1, true);
        } else {
            $this.wrapper.style.left = ($this.onLeft) + 'px';
        }
    }

    /**
     * **********************************************
     * @private
     * Detecta se o documento está sendo visualizado
     *  para evitar passagens de slides inexistentes.
     * **********************************************
     */
    function visibilityChange() {
        if (document.hidden) {
            clearTimeout($this.timeOut);
        } else {
            $this.timeOut = setTimeout(function () {
                moveSlide(1);
            }, $this.interval);
        }
    }

    $this.target = (tgt.nodeType ? tgt : document.querySelector(tgt));
    if (typeof $this.target === 'undefined' || $this.target === null) {
        console.warn('SlideCarousel.js: ' + tgt + ' indefinido');
    } else {
        init();
        createSlide();
        slideResize();

        if ($options.enableNav !== false || typeof $options.enableNav === 'undefined') {
            createNav();
        }
        if ($options.autoPlay === true || typeof $options.autoPlay === 'number') {
            $options.autoPlay = ($options.autoPlay < 3 ? 3 : $options.autoPlay);
            $this.interval = ($options.autoPlay * 1000);
            $this.timeOut = setTimeout(function () {
                moveSlide(1);
            }, $this.interval);
        }

        startEvents();
    }

    /**
     * **********************************************
     * @public
     * Avança para o próximo slide.
     * **********************************************
     */
    function nextSlide() {
        moveSlide(1);
    }

    /**
     * **********************************************
     * @public
     * Retorna para o slide anterior.
     * **********************************************
     */
    function prevSlide() {
        moveSlide(-1);
    }

    /**
     * **********************************************
     * @public
     * Obtem o elemento alvo com os slides.
     * **********************************************
     */
    function getSlide() {
        return ($this.target);
    }

    /*
     * Adicionar a metodos públicos funções de mudança de slide
     */
    this.next = nextSlide;
    this.prev = prevSlide;
    this.get = getSlide;
};
