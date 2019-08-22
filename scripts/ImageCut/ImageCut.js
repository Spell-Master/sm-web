/**
 * ****************************************************
 * @Copyright (c) 2019, Omar Pautz "Spell Master".
 * @version 1.0
 * @requires
 * * Navegador compatível com HTML 5
 * * CSS TYPE 3
 * ****************************************************
 * @info
 * Executa corte de imagens
 * ****************************************************
 * @param {DOM} img
 * * #ID da imagem para trabalho.
 * ****************************************************
 */

var ImageCut = function (img) {
    if (!img) {
        console.warn('Identificador da imagem não expecificado para "ImageCut"');
    } else {
        var $img = document.getElementById(img),
                $isCut = null,
                $target,
                $newImg,
                $base,
                $container,
                $box,
                $canvas,
                $getImage,
                $data = {
                    width: 200,
                    height: 200,
                    copyW: 0,
                    copyH: 0,
                    cutLeft: 0,
                    cutTop: 0,
                    ratio: 1.0,
                    offsetLeft: 0,
                    offsetTop: 0,
                    scrollX: 0,
                    scrollY: 0,
                    axisX: 0,
                    axisY: 0,
                    posL: 0,
                    posT: 0,
                    posW: 0,
                    posH: 0
                };
        $img.addEventListener('load', imgTarget, false);

        this.setCut = setCut;
        this.getImage = getImage;

        /**
         * ************************************************
         * * Obtem a imagem de trabalho
         * @param {OBJ} e
         * ************************************************
         */
        function imgTarget(e) {
            $target = e.target;
            newComponents();
        }

        /**
         * ************************************************
         * * Cria os componentes de uso
         * ************************************************
         */
        function newComponents() {
            $newImg = new Image();
            $base = document.createElement('div');
            $container = document.createElement('div');
            $box = document.createElement('div');
            $canvas = document.createElement('canvas');
            setProperties();
        }

        /**
         * ************************************************
         * * Adiciona as propiedades para os componentes
         * ************************************************
         */
        function setProperties() {
            $target.draggable = false;
            $target.classList.add('cut-focus');
            $base.classList.add('cut-base');
            $newImg.src = $target.src;
            $newImg.draggable = false;
            $container.classList.add('cut-container');
            $box.classList.add('cut-box');
            insertComponents();
        }

        /**
         * ************************************************
         * * Adiciona os componetes ao documento
         * ************************************************
         */
        function insertComponents() {
            $img.parentNode.insertBefore($base, $img.nextSibling);
            $container.appendChild($box);
            $target.parentNode.appendChild($container);
            $container.appendChild($newImg);
            $container.appendChild($target);
            $box.appendChild($newImg);
            $base.appendChild($container);
            targetScale();
            getEvents();
        }

        /**
         * ************************************************
         * * Ajusta o tamanho da imagem para manejo
         * correto das posições.
         * ************************************************
         */
        function targetScale() {
            $target.setAttribute('style', 'max-width:100% ; min-width:200px; min-height:200px;');
            copyScale();
        }

        /**
         * ************************************************
         * * Ajusta o tamanho da cópia da imagem de acordo
         * com a imagem original.
         * ************************************************
         */
        function copyScale() {
            $data.copyW = $target.offsetWidth;
            $data.copyH = $target.offsetHeight;
            $newImg.setAttribute('style', 'width: ' + $data.copyW + 'px; height:' + $data.copyH + 'px');
            copyPos($data.copyW / 2 - (200 / 2), $data.copyH / 2 - (200 / 2));
        }

        /**
         * ************************************************
         * * Reposiciona a cópia da imagem sobreposta
         * @param {INT} left
         * Posição esquerda 
         * @param {INT} top
         * Posição superior
         * ************************************************
         */
        function copyPos(left, top) {
            $data.cutLeft = -left * $data.ratio;
            $data.cutTop = -top * $data.ratio;
            $newImg.style.top = -top + 'px';
            $newImg.style.left = -left + 'px';
        }

        /**
         * ************************************************
         * * Detecta e inicia os eventos quando clicado
         * por cursor ou por toque
         * ************************************************
         */
        function getEvents() {
            $box.addEventListener('mousedown', startEvents, false);
            $box.addEventListener('touchstart', startEvents, false);
            window.addEventListener('resize', copyScale, false);
        }

        /**
         * ************************************************
         * * Detecta e inicia eventos de movimentos com
         * cursor pressionado ou arraste.
         * @param {OBJ} e
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
         * * Detecta e encerra eventos de movimentos com
         * cursor souto ou arraste encerrado.
         * @param {OBJ} e
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
         * * Obtem a posição do cursor em relação ao
         * tamanho da caixa central.
         * @param {OBJ} e
         * ************************************************
         */
        function currentPos(e) {
            $data.offsetLeft = $box.offsetLeft;
            $data.offsetTop = $box.offsetTop;
            $data.scrollX = (e.clientX || e.pageX || e.touches && e.touches[0].clientX) + window.scrollX;
            $data.scrollY = (e.clientY || e.pageY || e.touches && e.touches[0].clientY) + window.scrollY;
        }

        /**
         * ************************************************
         * * Movimenta a imagem sobreposta com relação
         * a posição do cursor.
         * @param {OBJ} e
         * ************************************************
         */
        function dragMoving(e) {
            e.preventDefault();
            e.stopPropagation();
            $data.axisX = e.pageX || e.touches && e.touches[0].pageX;
            $data.axisY = e.pageY || e.touches && e.touches[0].pageY;
            $data.posL = $data.axisX - ($data.scrollX - $data.offsetLeft);
            $data.posT = $data.axisY - ($data.scrollY - $data.offsetTop);
            $data.posW = $box.offsetWidth;
            $data.posH = $box.offsetHeight;
            if ($data.posL < 0) {
                $data.posL = 0;
            } else if ($data.posL > $newImg.offsetWidth - $data.posW) {
                $data.posL = $newImg.offsetWidth - $data.posW;
            }
            if ($data.posT < 0) {
                $data.posT = 0;
            } else if ($data.posT > $newImg.offsetHeight - $data.posH) {
                $data.posT = $newImg.offsetHeight - $data.posH;
            }
            copyPos($data.posL, $data.posT);
            cutPos($data.posL, $data.posT);
        }

        /**
         * ************************************************
         * * Reposiciona o bloco de corte.
         * @param {INT} left
         * Posição esquerda
         * @param {INT} top
         * Posição superior
         * ************************************************
         */
        function cutPos(left, top) {
            $box.style.top = top + (200 / 2) + 'px';
            $box.style.left = left + (200 / 2) + 'px';
        }

        /**
         * ************************************************
         * * Faz o corte da imagem.
         * ************************************************
         */
        function setCut() {
            $newImg.crossOrigin = 'anonymous';
            $data.width = $newImg.width * $data.ratio;
            $data.height = $newImg.height * $data.ratio;
            $canvas.width = 200;
            $canvas.height = 200;
            $canvas.getContext('2d').drawImage($newImg, $data.cutLeft, $data.cutTop, $data.width, $data.height);
            $getImage = $canvas.toDataURL('image/png', 1.0);
            $isCut = true;
        }

        /**
         * ************************************************
         * * Obtem o corte.
         * ************************************************
         */
        function getImage() {
            if (!$isCut) {
                return (false);
            } else {
                return ($getImage);
            }
        }

    }
};
