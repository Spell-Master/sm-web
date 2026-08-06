/**
 * **************************************************
 * * ImageCut
 * @author Spell-Master (Omar Pautz)
 * @copyright 2019
 * @version 3.0 (06/08/2026)
 * 
 * Executa corte de imagens.
 * 
 * **************************************************
 * @param {OBJECT} img
 * Informar uma tag img.
 * **************************************************
 */

var ImageCut = function (img) {

    var $this = {target: img, limiter: null, box: null, copy: null, resize: null, canvas: null, isReady: null, isCut: null, output: ''},
        $target = {w: 0, h: 0},
        $box = {width: 0, height: 0},
        $copy = {left: 0, top: 0},
        $data = {ratio: 0, left: 0, top: 0, width: 0, height: 0},
        $dragBox = {left: 0, top: 0, clientX: 0, clientY: 0},
        $handle = {touchX: 0, touchY: 0, dragX: 0, dragY: 0, absX: 0, absY: 0, value: 0},
        $zoom = {boxW: 0, boxH: 0, imgW: 0, imgH: 0, left: 0, right: 0, top: 0, bottom: 0};

    try {
        if (!$this.target) {
            throw 'ImageCut: Imagem não declarada';
        } else if ($this.target.nodeType !== 1) {
            throw 'ImageCut: Parametro inválido';
        } else if ($this.target.tagName.toLowerCase() !== 'img') {
            throw 'ImageCut: Imagem inválida';
        } else {
            $this.target.addEventListener('load', initCut, false);
        }
    } catch (exception) {
        console.error(exception);
    }

    /**
     * *********************************************
     * * Inicia as funções quando a imagem estiver
     * devidamente carregada.
     * 
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function initCut(e) {
        $this.target.classList.add('imagecut-targert');
        $this.target.draggable = false;
        addComponents();
        globalScale();
        enableEvents();
    }

    /**
     * *********************************************
     * * Inicia as funções quando a imagem estiver
     *  devidamente carregada.
     * 
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function targetSize() {
        $target.width = Math.ceil($this.target.offsetWidth);
        $target.height = Math.ceil($this.target.offsetHeight);
    }

    /**
     * *********************************************
     * * Define o tamanho da imagem copiada de
     *  acordo com a imagem original.
     * *********************************************
     */
    function copySize() {
        $this.copy.style.width = $target.width + 'px';
        $this.copy.style.height = $target.height + 'px';
        $this.copy.style.minWidth = $target.width + 'px';
        $this.copy.style.minHeight = $target.height + 'px';
    }

    /**
     * *********************************************
     * * Define o tamanho da caixa de corte.
     * 
     * @param {INT} w
     * Largura
     * @param {INT} h
     * Altura
     * *********************************************
     */
    function boxSize(w, h) {
        $this.box.style.width = w + 'px';
        $this.box.style.height = h + 'px';
    }

    /**
     * *********************************************
     * * Aciona as funções para criar todos
     *  componetes que serão usados.
     * *********************************************
     */
    function addComponents() {
        createLimiter();
        createBox();
        createCopy();
        createResize();
        createCanvas();
        $this.target.setAttribute('style', 'min-width:250px; min-height:250px');
        $this.limiter.appendChild($this.target);
    }

    /**
     * *********************************************
     * * Cria o recipiente que limita o tamanho das
     *  imagens e alcance de corte.
     * *********************************************
     */
    function createLimiter() {
        $this.limiter = document.createElement('div');
        $this.limiter.classList.add('imagecut-limiter');
        $this.target.parentNode.insertBefore($this.limiter, $this.target);
    }

    /**
     * *********************************************
     * * Cria a caixa de corte.
     * *********************************************
     */
    function createBox() {
        $this.box = document.createElement('div');
        $this.box.classList.add('imagecut-box');
        $this.limiter.appendChild($this.box);
    }

    /**
     * *********************************************
     * * Cria uma cópia da imagem alvo.
     * *********************************************
     */
    function createCopy() {
        $this.copy = new Image();
        $this.copy.src = $this.target.src;
        $this.copy.draggable = false;
        $this.box.appendChild($this.copy);
    }

    /**
     * *********************************************
     * * Cria o bloco de rescala da caixa de corte.
     * *********************************************
     */
    function createResize() {
        $this.resize = document.createElement('div');
        $this.resize.classList.add('imagecut-resize');
        $this.box.appendChild($this.resize);
    }

    /**
     * *********************************************
     * * Cria a tela demarcada que será usada para
     *  extrair a area cortada.
     * *********************************************
     */
    function createCanvas() {
        $this.canvas = document.createElement('canvas');
        $this.canvas.width = 200;
        $this.canvas.height = 200;
    }

    /**
     * *********************************************
     * * Define a escala dos elementos de acordo
     *  com o tamanho atual da imagem alvo.
     *  
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function globalScale(e) {
        targetSize();
        if ($target.width < 250 && $target.height < 250) {
            console.warn('ImageCut: Tamanho da imagem incompatível');
        }
        copySize();
        boxSize(200, 200);
        dataValues();
        positionBox(Math.ceil($copy.left / 2), Math.ceil($copy.top / 2));
        positionCopy(Math.ceil($copy.left / 2), Math.ceil($copy.top / 2));
    }

    /**
     * *********************************************
     * * Obtem os dados de tamanho, posicionamento
     *  da caixa de corte e a cópia 
     *  reposiciona-los.
     * *********************************************
     */
    function dataValues() {
        $box.width = ($this.box.offsetWidth + 3);
        $box.height = ($this.box.offsetHeight + 3);
        $copy.left = $this.copy.offsetWidth - $box.width;
        $copy.top = $this.copy.offsetHeight - $box.height;
        $data.ratio = 200 / $this.box.offsetWidth;
    }

    /**
     * *********************************************
     * * Posiciona a caixa de corte.
     * 
     * @param {INT} left
     * Posição a esqueda do recipiente 
     * @param {INT} left
     * Posição ao topo do recipiente 
     * *********************************************
     */
    function positionBox(left, top) {
        $this.box.style.top = top + (200 / 2) + 'px';
        $this.box.style.left = left + (200 / 2) + 'px';
    }

    /**
     * *********************************************
     * * Posiciona a cópida da imagem.
     * 
     * @param {INT} left
     * Posição a esqueda do recipiente 
     * @param {INT} left
     * Posição ao topo do recipiente 
     * *********************************************
     */
    function positionCopy(left, top) {
        $data.left = -left * $data.ratio;
        $data.top = -top * $data.ratio;
        $this.copy.style.top = -top + 'px';
        $this.copy.style.left = -left + 'px';
    }

    /**
     * *********************************************
     * * Inicia os eventos:
     * - Redimencionar tela.
     * - Rolagem do ponteiro sobte a caixa de corte.
     * - Toque do ponteiro sobte a caixa de corte.
     * - Toque de tela sobte a caixa de corte.
     * - Toque do ponteiro sobte a rescala da caixa
     *  de corte.
     * - Toque de tela sobte a rescala da caixa de
     *  corte.
     * *********************************************
     */
    function enableEvents() {
        window.addEventListener('resize', globalScale, false);

        $this.box.addEventListener('wheel', wheelResize, false);
        $this.box.addEventListener('mousedown', boxTouch, false);
        $this.box.addEventListener('touchstart', boxTouch, false);

        $this.resize.addEventListener('mousedown', resizeTouch, false);
        $this.resize.addEventListener('touchstart', resizeTouch, false);
        $this.isReady = true;
    }

    /**
     * *********************************************
     * * Define a posição inicial do toque na caixa
     *  de corte.
     * Inicia os eventos de arraste e soltura da
     *  caixa.
     *  
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function boxTouch(e) {
        e.preventDefault();
        e.stopPropagation();

        $dragBox.left = $this.box.offsetLeft;
        $dragBox.top = $this.box.offsetTop;
        $dragBox.clientX = (e.clientX || e.pageX || e.touches && e.touches[0].clientX) + window.scrollX;
        $dragBox.clientY = (e.clientY || e.pageY || e.touches && e.touches[0].clientY) + window.scrollY;

        document.addEventListener('mousemove', boxDrag);
        document.addEventListener('touchmove', boxDrag);
        document.addEventListener('mouseup', boxDrop);
        document.addEventListener('touchend', boxDrop);
    }

    /**
     * *********************************************
     * * Define a posição atual do arraste na caixa
     *  de corte acionando a reposição da mesma.
     *  
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function boxDrag(e) {
        e.preventDefault();
        e.stopPropagation();

        $copy.left = (e.pageX || e.touches && e.touches[0].pageX) - ($dragBox.clientX - $dragBox.left);
        $copy.top = (e.pageY || e.touches && e.touches[0].pageY) - ($dragBox.clientY - $dragBox.top);
        $box.width = ($this.box.offsetWidth + 3);
        $box.height = ($this.box.offsetHeight + 3);

        if ($copy.left < 0) {
            $copy.left = 1;
        } else if ($copy.left > $this.copy.offsetWidth - $box.width) {
            $copy.left = $this.copy.offsetWidth - $box.width;
        }
        if ($copy.top < 0) {
            $copy.top = 1;
        } else if ($copy.top > $this.copy.offsetHeight - $box.height) {
            $copy.top = $this.copy.offsetHeight - $box.height;
        }
        positionCopy($copy.left, $copy.top);
        positionBox($copy.left, $copy.top);
    }

    /**
     * *********************************************
     * * Remove eventos de arraste quando a caixa de
     *  corte é solta.
     *  
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function boxDrop(e) {
        e.preventDefault();
        document.removeEventListener('mousemove', boxDrag);
        document.removeEventListener('touchmove', boxDrag);
        document.removeEventListener('mouseup', boxDrop);
        document.removeEventListener('touchend', boxDrop);
    }

    /**
     * *********************************************
     * * Define a posição inicial do toque no
     *  elemento de rescala da caixa de corte.
     * Inicia os eventos de arraste e soltura.
     *  
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function resizeTouch(e) {
        e.preventDefault();
        e.stopPropagation();

        $handle.touchX = e.clientX || e.pageX || e.touches[0].clientX;
        $handle.touchY = e.clientY || e.pageY || e.touches[0].clientY;

        document.addEventListener('mousemove', resizeDrag);
        document.addEventListener('touchmove', resizeDrag);
        document.addEventListener('mouseup', resizeDrop);
        document.addEventListener('touchend', resizeDrop);
    }

    /**
     * *********************************************
     * * Define a posição atual do arraste de
     *  redimencionamento acionando a alteração no
     *   tamanho da caixa de corte.
     *  
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function resizeDrag(e) {
        e.preventDefault();
        e.stopPropagation();

        $handle.dragX = (e.clientX || e.pageX || e.touches[0].clientX) - $handle.touchX;
        $handle.dragY = (e.clientY || e.pageY || e.touches[0].clientY) - $handle.touchY;
        $handle.absX = Math.abs($handle.dragX);
        $handle.absY = Math.abs($handle.dragY);

        if ($handle.absX > $handle.absY) {
            $handle.value = $handle.dragX;
        } else if ($handle.absY > $handle.absX) {
            $handle.value = $handle.dragY;
        } else {
            $handle.value = 0;
        }
        imgZoom($handle.value);
    }

    /**
     * *********************************************
     * * Remove eventos de arraste quando o
     *  redimencionamento é solto.
     *  
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function resizeDrop(e) {
        e.preventDefault();
        document.removeEventListener('mousemove', resizeDrag);
        document.removeEventListener('touchmove', resizeDrag);
        document.removeEventListener('mouseup', resizeDrop);
        document.removeEventListener('touchend', resizeDrop);
    }

    /**
     * *********************************************
     * * Altera o tamanho do corte usando a rolagem
     *  do ponteiro.
     *  
     * @param {OBJ} e
     * Dados do evento
     * *********************************************
     */
    function wheelResize(e) {
        e.preventDefault();
        imgZoom(e.deltaY * $data.ratio);
    }

    /**
     * **********************************************
     * * Altera o tamanho da caixa de corte.
     * 
     * @param {INT} zoom
     *  Quantidade de fluxo na escala.
     * **********************************************
     */
    function imgZoom(zoom) {
        if ($this.isReady) {
            $zoom.boxW = Math.floor($this.box.clientWidth + zoom);
            $zoom.boxH = Math.floor($this.box.clientHeight + zoom);
            $zoom.imgW = $this.copy.clientWidth;
            $zoom.imgH = $this.copy.clientHeight;

            $zoom.left = $this.box.offsetLeft - (zoom / 2);
            $zoom.top = $this.box.offsetTop - (zoom / 2);
            $zoom.right = $zoom.left + $zoom.boxW;
            $zoom.bottom = $zoom.top + $zoom.boxH;

            if ($zoom.left < 0) {
                $zoom.left = 0;
            }
            if ($zoom.top < 0) {
                $zoom.top = 0;
            }
            if ($zoom.boxW < 50 || $zoom.boxH < 50) {
                return;
            } else if ($zoom.boxW > $zoom.imgW || $zoom.boxH > $zoom.imgH) {
                return;
            } else if ($zoom.right > $zoom.imgW) {
                return;
            } else if ($zoom.bottom > $zoom.imgH) {
                return;
            } else {
                $data.ratio = 200 / $zoom.boxW;
                boxSize($zoom.boxW, $zoom.boxW);
                positionCopy($zoom.left, $zoom.top);
                positionBox($zoom.left, $zoom.top);
            }
        }
    }

    /**
     * **********************************************
     * @public
     * * Requisita almento no tamanho da caixa de
     *  corte.
     * **********************************************
     */
    function scalePlus() {
        imgZoom(10);
    }

    /**
     * **********************************************
     * @public
     * Requisita redução no tamanho da caixa de
     *  corte.
     * **********************************************
     */
    function scaleMinus() {
        imgZoom(-10);
    }

    /**
     * **********************************************
     * @public
     * Extrai uma imagem na area da caixa de corte.
     * **********************************************
     */
    function extractCut() {
        $data.width = $this.copy.width * $data.ratio;
        $data.height = $this.copy.height * $data.ratio;
        $this.canvas.getContext('2d').drawImage($this.copy, $data.left, $data.top, $data.width, $data.height);
        $this.output = $this.canvas.toDataURL('image/jpeg', 1.0);
        $this.isCut = true;
    }

    /**
     * **********************************************
     * @public
     * * Obtem o resultado do corte.
     * **********************************************
     */
    function imgCut() {
        if ($this.isCut) {
            return ($this.output);
        }
    }

    this.sizePlus = scalePlus;
    this.sizeMinus = scaleMinus;
    this.setCut = extractCut;
    this.getImage = imgCut;
};
