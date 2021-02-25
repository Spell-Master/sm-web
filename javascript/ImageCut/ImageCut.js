/**
 * ****************************************************
 * * @Class ImageCut
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2019
 * * @version 2.0 (2020)
 * ****************************************************
 * * Executa corte de imagens.
 * 
 * 
 * @param {STR} img
 * * #ID da imagem para trabalho.
 * ****************************************************
 */
var ImageCut = function (img) {

    var $imgTarget = document.getElementById(img);
    var $isReady = false;
    var $isCut = false;
    var $limiter;
    var $box;
    var $img;
    var $canvas;
    var $data = {
        ratio: 1.0,
        left: 0,
        top: 0
    };
    var $status = {
        imgLeft: 0,
        imgTop: 0,
        imgWidth: 0,
        imgHeight: 0,
        boxLeft: 0,
        boxTop: 0,
        posX: 0,
        posY: 0
    };
    var $zoom = {
        boxWidth: 0,
        boxHeight: 0,
        imgWidth: 0,
        imgHeight: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };

    if (typeof $imgTarget === 'undefined' && $imgTarget === null) {
        console.error('Não foi possível identificar a imagem para corte');
        return;
    } else {
        $imgTarget.addEventListener('load', initCut, false);
    }

    /**
     * ************************************************
     * @function: Inicia as funções necessárias
     *  
     * @private
     * ************************************************
     * 
     * @param {OBJ} e (Não utilizável)
     * Imagem vinda do elemento #id requisitado
     * ************************************************
     */
    function initCut(e) {
        if (targetSize('w') < 210) {
            console.warn('A imagem de corte deve possuir pelo menos 210 pixel\'s de largura');
        } else if (targetSize('h') < 210) {
            console.warn('A imagem de corte deve possuir pelo menos 210 pixel\'s de altura');
        } else {
            $isReady = true;
            newComponents();
            setProperties();
            insertComponents();
            imgPos(targetSize('w') / 2 - (200 / 2), targetSize('h') / 2 - (200 / 2));
            getEvents();
        }
    }

    /**
     * ************************************************
     * @function: Obtem as dimenções da imagem.
     * 
     * @private
     * ************************************************
     * 
     * @param {STR} size (w ? h)
     * Retorna a largura ou altura da imagem
     * ************************************************
     */
    function targetSize(size) {
        return Math.ceil((size === 'w' ? $imgTarget.offsetWidth : $imgTarget.offsetHeight));
    }

    /**
     * ************************************************
     * @function: Cria os elementos no documento
     * para usos.
     * 
     * @private
     * ************************************************
     */
    function newComponents() {
        $limiter = document.createElement('div');
        $box = document.createElement('div');
        $img = new Image();
        $canvas = document.createElement('canvas');
    }

    /**
     * ************************************************
     * @function: Define as características dos
     * elementos criados.
     * 
     * @private
     * ************************************************
     */
    function setProperties() {
        var $this = {
            w: targetSize('w'),
            h: targetSize('h')
        };
        $imgTarget.classList.add('cut-focus');
        $imgTarget.draggable = false;
        $limiter.classList.add('cut-limiter');
        $limiter.setAttribute('style', 'max-width:' + $this.w + 'px; max-height:' + $this.h + 'px');
        $box.classList.add('cut-box');
        $img.src = $imgTarget.src;
        $img.draggable = false;
        $img.setAttribute('style', 'width:auto; height:auto; max-width:' + $this.w + 'px; max-height:' + $this.h + 'px');
    }

    /**
     * ************************************************
     * @function: Anexa os elementos criados ao
     * documento.
     * 
     * @private
     * ************************************************
     */
    function insertComponents() {
        $imgTarget.parentNode.insertBefore($limiter, $imgTarget.nextSibling);
        $limiter.appendChild($box);
        $box.appendChild($img);
        $limiter.appendChild($imgTarget);
    }

    /**
     * ************************************************
     * @function: Posiciona a imagem criada dentro do
     * limitador.
     * 
     * @private
     * ************************************************
     * 
     * @param {INT} left
     *  Distância a esqueda
     * @param {INT} top
     *  Distância ao topo
     * ************************************************
     */
    function imgPos(left, top) {
        $data.left = -left * $data.ratio;
        $data.top = -top * $data.ratio;
        $img.style.top = -top + 'px';
        $img.style.left = -left + 'px';
    }

    /**
     * ************************************************
     * @function: Obtem os eventos de arraste e
     *  alteração no tamanho da caixa de corte.
     * 
     * @private
     * ************************************************
     */
    function getEvents() {
        $box.addEventListener('mousedown', startEvents, false);
        $box.addEventListener('touchstart', startEvents, false);
        $box.addEventListener('wheel', scrollResize, false);
        document.addEventListener('keypress', keyResize, false);
    }

    /**
     * ************************************************
     * @function: Inicia os eventos de movimento
     *  quando segurada a caixa de corte.
     * 
     * @private
     * ************************************************
     * 
     * @param {OBJ} e
     * Evento disparado
     * ************************************************
     */
    function startEvents(e) {
        e.preventDefault();
        e.stopPropagation();
        currentPos(e);
        document.addEventListener('mousemove', dragMoving);
        document.addEventListener('touchmove', dragMoving);
        document.addEventListener('mouseup', stopEvents);
        document.addEventListener('touchend', stopEvents);
    }

    /**
     * ************************************************
     * @function: Remove os eventos de movimento
     *  quando solta a caixa de corte.
     * 
     * @private
     * ************************************************
     * 
     * @param {OBJ} e
     * Evento disparado
     * ************************************************
     */
    function stopEvents(e) {
        e.preventDefault();
        document.removeEventListener('mouseup', stopEvents);
        document.removeEventListener('touchend', stopEvents);
        document.removeEventListener('mousemove', dragMoving);
        document.removeEventListener('touchmove', dragMoving);
    }

    /**
     * ************************************************
     * @function: Obtem a posição do arraste da caixa
     * de corte.
     * 
     * @private
     * ************************************************
     * 
     * @param {OBJ} e
     * Evento disparado
     * ************************************************
     */
    function dragMoving(e) {
        e.preventDefault();
        e.stopPropagation();
        $status.imgLeft = (e.pageX || e.touches && e.touches[0].pageX) - ($status.posX - $status.boxLeft);
        $status.imgTop = (e.pageY || e.touches && e.touches[0].pageY) - ($status.posY - $status.boxTop);
        $status.imgWidth = ($box.offsetWidth + 3);
        $status.imgHeight = ($box.offsetHeight + 3);
        if ($status.imgLeft < 0) {
            $status.imgLeft = 1;
        } else if ($status.imgLeft > $img.offsetWidth - $status.imgWidth) {
            $status.imgLeft = $img.offsetWidth - $status.imgWidth;
        }
        if ($status.imgTop < 0) {
            $status.imgTop = 1;
        } else if ($status.imgTop > $img.offsetHeight - $status.imgHeight) {
            $status.imgTop = $img.offsetHeight - $status.imgHeight;
        }
        imgPos($status.imgLeft, $status.imgTop);
        boxPos($status.imgLeft, $status.imgTop);
    }

    /**
     * ************************************************
     * @function: Obtem a posição inicial da caixa
     * de corte.
     * 
     * @private
     * ************************************************
     * 
     * @param {OBJ} pos
     * Evento disparado
     * ************************************************
     */
    function currentPos(pos) {
        $status.boxLeft = $box.offsetLeft;
        $status.boxTop = $box.offsetTop;
        $status.posX = (pos.clientX || pos.pageX || pos.touches && pos.touches[0].clientX) + window.scrollX;
        $status.posY = (pos.clientY || pos.pageY || pos.touches && pos.touches[0].clientY) + window.scrollY;
    }

    /**
     * ************************************************
     * @function: Obtem a posição atual da caixa
     * de corte.
     * 
     * @private
     * ************************************************
     * 
     * @param {INT} left
     *  Distância a esqueda
     * @param {INT} top
     *  Distância ao topo
     * ************************************************
     */
    function boxPos(left, top) {
        $box.style.top = top + (200 / 2) + 'px';
        $box.style.left = left + (200 / 2) + 'px';
    }

    /**
     * ************************************************
     * @function: Requisita alteração no tamanho da
     * caixa de corte quando rolado a roda do mouse.
     * 
     * @private
     * ************************************************
     * 
     * @param {OBJ} e
     *  Evento
     * ************************************************
     */
    function scrollResize(e) {
        e.preventDefault();
        imgZoom(e.deltaY);
    }

    /**
     * ************************************************
     * @function: Altera o tamanho da caixa de corte.
     * 
     * @private
     * ************************************************
     * 
     * @param {INT} zoom
     *  Quantidade de fluxo na escala.
     * ************************************************
     */
    function imgZoom(zoom) {
        if ($isReady) {
            $zoom.boxWidth = Math.floor($box.clientWidth + zoom);
            $zoom.boxHeight = Math.floor($box.clientHeight + zoom);
            $zoom.imgWidth = $img.clientWidth;
            $zoom.imgHeight = $img.clientHeight;
            if ($zoom.boxWidth < 50) {
                return;
            } else if ($zoom.boxWidth > $zoom.imgWidth) {
                return;
            }
            $zoom.left = $box.offsetLeft - (zoom / 2);
            $zoom.top = $box.offsetTop - (zoom / 2);
            $zoom.right = $zoom.left + $zoom.boxWidth;
            $zoom.bottom = $zoom.top + $zoom.boxHeight;
            if ($zoom.left < 0) {
                $zoom.left = 0;
            }
            if ($zoom.top < 0) {
                $zoom.top = 0;
            }
            if ($zoom.right > $zoom.imgWidth) {
                return;
            }
            if ($zoom.bottom > $zoom.imgHeight) {
                return;
            }
            $data.ratio = 200 / $zoom.boxWidth;
            boxSize($zoom.boxWidth, $zoom.boxWidth);
            imgPos($zoom.left, $zoom.top);
            boxPos($zoom.left, $zoom.top);
            cutBox();
        }
    }

    /**
     * ************************************************
     * @function: Define o tamanho da caixa de corte.
     * 
     * @private
     * ************************************************
     * 
     * @param {INT} width
     *  Largura.
     * @param {INT} height
     *  Altura.
     * ************************************************
     */
    function boxSize(width, height) {
        $box.style.width = width + 'px';
        $box.style.height = height + 'px';
    }

    /**
     * ************************************************
     * @function: Faz o corte da imagem.
     * 
     * @private
     * ************************************************
     */
    function cutBox() {
        $data.width = $img.width * $data.ratio;
        $data.height = $img.height * $data.ratio;
        $canvas.width = 200;
        $canvas.height = 200;
        $canvas.getContext('2d').drawImage($img, $data.left, $data.top, $data.width, $data.height);
    }

    /**
     * ************************************************
     * @function: Requisita alteração no tamanho da
     * caixa de corte quando pressionado as teclas
     * "+" ou "-".
     * 
     * @private
     * ************************************************
     * 
     * @param {OBJ} e
     *  Evento
     * ************************************************
     */
    function keyResize(e) {
        e.preventDefault();
        switch (String.fromCharCode(e.charCode)) {
            case '+' :
                imgZoom(10);
                break;
            case '-' :
                imgZoom(-10);
                break;
        }
    }

    /**
     * ************************************************
     * @function: Requisita almento no tamanho da
     * caixa de corte.
     * 
     * @public
     * ************************************************
     */
    this.sizePlus = function() {
        imgZoom(10);
    };

    /**
     * ************************************************
     * @function: Requisita redução no tamanho da
     * caixa de corte.
     * 
     * @public
     * ************************************************
     */
    this.sizeMinus = function() {
        imgZoom(-10);
    };

    /**
     * ************************************************
     * @function: Define a imagem de cortada
     * 
     * @public
     * ************************************************
     */
    this.setCut = function() {
        cutBox();
        $getImage = $canvas.toDataURL('image/png', 1.0);
        $isCut = true;
    };

    /**
     * ************************************************
     * @function: Obtem o corte
     * 
     * @public
     * ************************************************
     */
    this.getImage = function() {
        if ($isCut) {
            return ($getImage);
        }
    };
};
