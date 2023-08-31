/**
 * **************************************************
 * ImageCut
 * @author Spell-Master (Omar Pautz)
 * @copyright 2019
 * @version 2.3 (2023)
 * 
 * Executa corte de imagens.
 * 
 * @param {OBJECT} img
 * Informar uma tag img.
 * **************************************************
 */

var ImageCut = function (img) {

    var $imgTarget = img || {},
        $isReady = false,
        $isCut = false,
        $limiter,
        $box,
        $img,
        $canvas,
        $data = {
            ratio: 1.0,
            left: 0,
            top: 0
        },
        $status = {
            imgLeft: 0,
            imgTop: 0,
            imgWidth: 0,
            imgHeight: 0,
            boxLeft: 0,
            boxTop: 0,
            posX: 0,
            posY: 0
        },
        $zoom = {
            boxWidth: 0,
            boxHeight: 0,
            imgWidth: 0,
            imgHeight: 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        $target = {
            w: 0,
            h: 0
        };

    try {
        if ($imgTarget.nodeType !== 1) {
            throw 'img: forneça um tag <img> corretamente';
        } else if ($imgTarget.tagName.toLowerCase() !== 'img') {
            throw 'img: não é uma tag IMG válida';
        } else {
            $imgTarget.addEventListener('load', initCut, false);
        }
    } catch (exception) {
        console.error(exception);
    }

    /**
     * **********************************************
     * @private
     * Inicia as funções necessárias.
     * **********************************************
     */
    function initCut() {
        $target.w = targetSize('w');
        $target.h = targetSize('h');
        if ($target.w < 250) {
            console.error('A imagem de corte deve possuir pelo menos 250 pixel\'s de largura');
        } else if ($target.h < 250) {
            console.error('A imagem de corte deve possuir pelo menos 250 pixel\'s de altura');
        } else {
            newComponents();
            setProperties();
            insertComponents();
            imgPos($target.w / 2 - (200 / 2), $target.h / 2 - (200 / 2));
            getEvents();
            $isReady = true;
        }
    }

    /**
     * **********************************************
     * @private
     * Obtem as dimenções da imagem.
     * 
     * @param {STR} size (w ? h)
     * Retorna a largura ou altura da imagem.
     * **********************************************
     */
    function targetSize(size) {
        return Math.ceil((size === 'w' ? $imgTarget.offsetWidth : $imgTarget.offsetHeight));
    }

    /**
     * **********************************************
     * @private
     * Cria os elementos no documento para usos.
     * ************************************************
     */
    function newComponents() {
        $limiter = document.createElement('div');
        $box = document.createElement('div');
        $img = new Image();
        $canvas = document.createElement('canvas');
    }

    /**
     * **********************************************
     * @private
     * Define as características dos elementos
     *  criados.
     * **********************************************
     */
    function setProperties() {
        $imgTarget.classList.add('cut-focus');
        $imgTarget.draggable = false;
        $limiter.classList.add('cut-limiter');
        $limiter.setAttribute('style', 'max-width:' + $target.w + 'px; max-height:' + $target.h + 'px');
        $box.classList.add('cut-box');
        $img.src = $imgTarget.src;
        $img.draggable = false;
        $img.setAttribute('style', 'width:auto; height:auto; max-width:' + $target.w + 'px; max-height:' + $target.h + 'px');
    }

    /**
     * ************************************************
     * @private
     * Anexa os elementos criados ao documento.
     * ************************************************
     */
    function insertComponents() {
        $imgTarget.parentNode.insertBefore($limiter, $imgTarget.nextSibling);
        $limiter.appendChild($box);
        $box.appendChild($img);
        $limiter.appendChild($imgTarget);
    }

    /**
     * **********************************************
     * @private
     * Posiciona a imagem criada dentro do limitador.
     * 
     * @param {INT} left
     *  Distância a esqueda.
     * @param {INT} top
     *  Distância ao topo.
     * **********************************************
     */
    function imgPos(left, top) {
        $data.left = -left * $data.ratio;
        $data.top = -top * $data.ratio;
        $img.style.top = -top + 'px';
        $img.style.left = -left + 'px';
    }

    /**
     * **********************************************
     * @private
     * Obtem os eventos de arraste e alteração no
     *  tamanho da caixa de corte.
     * **********************************************
     */
    function getEvents() {
        $box.addEventListener('mousedown', startEvents, false);
        $box.addEventListener('touchstart', startEvents, false);
        $box.addEventListener('wheel', scrollResize, false);
        document.addEventListener('keypress', keyResize, false);
        window.addEventListener('resize', resetSize, false);
    }

    /**
     * **********************************************
     * @private
     * Inicia os eventos de movimento quando
     *  segurada a caixa de corte.
     * 
     * @param {OBJ} e
     * Evento disparado.
     * **********************************************
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
     * **********************************************
     * @private
     * Remove os eventos de movimento quando solta a
     *  caixa de corte.
     * 
     * @param {OBJ} e
     * Evento disparado.
     * **********************************************
     */
    function stopEvents(e) {
        e.preventDefault();
        document.removeEventListener('mouseup', stopEvents);
        document.removeEventListener('touchend', stopEvents);
        document.removeEventListener('mousemove', dragMoving);
        document.removeEventListener('touchmove', dragMoving);
    }

    /**
     * **********************************************
     * @private
     * Obtem a posição do arraste da caixa de corte.
     * 
     * @param {OBJ} e
     * Evento disparado.
     * **********************************************
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
     * **********************************************
     * @private
     * Obtem a posição inicial da caixa de corte.
     * 
     * @param {OBJ} pos
     * Evento disparado.
     * **********************************************
     */
    function currentPos(pos) {
        $status.boxLeft = $box.offsetLeft;
        $status.boxTop = $box.offsetTop;
        $status.posX = (pos.clientX || pos.pageX || pos.touches && pos.touches[0].clientX) + window.scrollX;
        $status.posY = (pos.clientY || pos.pageY || pos.touches && pos.touches[0].clientY) + window.scrollY;
    }

    /**
     * **********************************************
     * @private
     * Obtem a posição atual da caixa de corte.
     * 
     * @param {INT} left
     *  Distância a esqueda.
     * @param {INT} top
     *  Distância ao topo.
     * **********************************************
     */
    function boxPos(left, top) {
        $box.style.top = top + (200 / 2) + 'px';
        $box.style.left = left + (200 / 2) + 'px';
    }

    /**
     * **********************************************
     * @private
     * Requisita alteração no tamanho da caixa de
     *  corte quando rolado a roda do mouse.
     * 
     * @param {OBJ} e
     *  Evento.
     * **********************************************
     */
    function scrollResize(e) {
        e.preventDefault();
        imgZoom(e.deltaY);
    }

    /**
     * **********************************************
     * @private
     * Altera o tamanho da caixa de corte.
     * 
     * @param {INT} zoom
     *  Quantidade de fluxo na escala.
     * **********************************************
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
     * **********************************************
     * @private
     * Define o tamanho da caixa de corte.
     * 
     * @param {INT} width
     *  Largura.
     * @param {INT} height
     *  Altura.
     * **********************************************
     */
    function boxSize(width, height) {
        $box.style.width = width + 'px';
        $box.style.height = height + 'px';
    }

    /**
     * **********************************************
     * @private
     * Faz o corte da imagem.
     * 
     * **********************************************
     */
    function cutBox() {
        $data.width = $img.width * $data.ratio;
        $data.height = $img.height * $data.ratio;
        $canvas.width = 200;
        $canvas.height = 200;
        $canvas.getContext('2d').drawImage($img, $data.left, $data.top, $data.width, $data.height);
    }

    /**
     * **********************************************
     * @private
     * Requisita alteração no tamanho da caixa de
     *  corte quando pressionado as teclas
     *  "+" ou "-".
     * 
     * @param {OBJ} e
     *  Evento.
     * **********************************************
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
     * **********************************************
     * @private
     * Reinicia os tamanhos prefixos dos elementos
     *  para compatibilidade quando o tamanho da tela
     *  é alterado.
     * 
     * @param {OBJ} e
     *  Evento.
     * **********************************************
     */
    function resetSize(e) {
        $img.style.width = targetSize('w') + 'px';
        $img.style.height = targetSize('h') + 'px';
        $status.imgWidth = ($box.offsetWidth + 3);
        $status.imgHeight = ($box.offsetHeight + 3);
        $status.imgLeft = $img.offsetWidth - $status.imgWidth;
        $status.imgTop = $img.offsetHeight - $status.imgHeight;

        $data.ratio = 200 / $box.clientWidth;
        boxSize(200, 200);
        imgPos($status.imgLeft / 2, $status.imgTop / 2);
        boxPos($status.imgLeft / 2, $status.imgTop / 2);
    }

    /**
     * **********************************************
     * @public
     * Requisita almento no tamanho da caixa de
     *  corte.
     * **********************************************
     */
    this.sizePlus = function () {
        imgZoom(10);
    };

    /**
     * **********************************************
     * @public
     * Requisita redução no tamanho da caixa de
     *  corte.
     * **********************************************
     */
    this.sizeMinus = function () {
        imgZoom(-10);
    };

    /**
     * **********************************************
     * @public
     * Define a imagem de cortada.
     * **********************************************
     */
    this.setCut = function () {
        cutBox();
        $getImage = $canvas.toDataURL('image/png', 1.0);
        $isCut = true;
    };

    /**
     * **********************************************
     * @public
     * Obtem o corte.
     * **********************************************
     */
    this.getImage = function () {
        if ($isCut) {
            return ($getImage);
        }
    };

};
