/**
 * ****************************************************
 * @Copyright (c) 2020, Spell Master.
 * @version 1.0
 * @requires Navegador compatível com HTML 5
 * @requires CSS type 3 (++)
 * 
 * @param {STR/DOM} box
 * #ID do elemento que contenha a galeria de imagens.
 * ****************************************************
 * @class Exibe imagens como forma de galeria.
 * ****************************************************
 */

var ImageGalery = function (box) {

    var $box = document.getElementById(box), $img;
    var $this = {
        'backGround': null,
        'galeryBox': null,
        'boxImg': null,
        'thumb': null,
        'close': null,
        'parent': null
    };

    createBg();
    createBox();
    createThumb();
    createX();

    $img = $box.querySelectorAll('img');
    $img.forEach(setMod);

    /**
     * ************************************************
     * * Cria o plano de fundo
     * ************************************************
     */
    function createBg() {
        $this.backGround = document.createElement('img');
        $this.backGround.classList.add('galery-background');
        document.body.appendChild($this.backGround);
    }

    /**
     * ************************************************
     * * Cria a caixa central da imagem
     * ************************************************
     */
    function createBox() {
        $this.galeryBox = document.createElement('div');
        $this.boxImg = document.createElement('img');
        $this.galeryBox.classList.add('galery-box');
        $this.boxImg.classList.add('galery-image');
        document.body.appendChild($this.galeryBox);
        $this.galeryBox.appendChild($this.boxImg);
    }

    /**
     * ************************************************
     * * Cria a caixa de minituras da galeria
     * ************************************************
     */
    function createThumb() {
        $this.thumb = document.createElement('div');
        $this.thumb.classList.add('thumb-background');
        document.body.appendChild($this.thumb);
    }
    
    /**
     * ************************************************
     * * Cria o botão de fechar
     * ************************************************
     */
    function createX() {
        $this.close = document.createElement('a');
        $this.close.classList.add('galery-x');
        $this.close.title = 'Fechar';
        document.body.appendChild($this.close);
        $this.close.addEventListener('click', closeGalery, false);
    }

    /**
     * ************************************************
     * * Define eventos de click em todas as imagens
     * para abertua da galeria.
     * * Adiciona evento de click ao documento para
     * fechar a galeria.
     * * @param {OBJ} e
     * ************************************************
     */
    function setMod(e) {
        e.addEventListener('click', openLight, false);
        e.addEventListener('click', setBg, false);
        document.addEventListener('keypress', keyboard, false);
    }

    /**
     * ************************************************
     * * Abre a galeria
     * * @param {OBJ} e
     * ************************************************
     */
    function openLight(e) {
        $this.parent = e.target.parentNode;
        setTumbs();
        showBoxes();
    }

    /**
     * ************************************************
     * * Mostra os elementos
     * ************************************************
     */
    function showBoxes() {
        $this.backGround.classList.toggle('active');
        $this.galeryBox.classList.toggle('active');
        $this.thumb.classList.toggle('active');
        $this.close.classList.toggle('active');
    }

    /**
     * ************************************************
     * * Cria as miniaturas da galeria
     * ************************************************
     */
    function setTumbs() {
        var $tumb = $this.parent.getElementsByTagName('img'), $tImg;
        for (var $i = 0; $i < $tumb.length; $i++) {
            $tImg = document.createElement('img');
            $tImg.src = $tumb[$i].src;
            $tImg.classList.add('thumb');
            $this.thumb.appendChild($tImg);
            $tImg.addEventListener('click', setBg, false);
        }
    }

    /**
     * ************************************************
     * * Define a atual imagem clicada
     * @param {OBJ} e
     * ************************************************
     */
    function setBg(e) {
        $this.backGround.src = e.target.src;
        $this.boxImg.src = e.target.src;
    }

    function closeGalery() {
        $this.backGround.src = null;
        $this.boxImg.src = null;
        $this.thumb.innerHTML = null;
        var $clearT = $this.thumb.getElementsByTagName('img'), $i;
        for ($i = 0; $i < $clearT.length; $i++) {
            if ($clearT[$i].parentNode) {
                $clearT[$i].parentNode.removeChild($clearT[$i]);
            }
        }
        showBoxes();
    }

    /**
     * ************************************************
     * * Fecha a galeria caso a tela "escape" é
     * pressionada.
     * @param {OBJ} e
     * ************************************************
     */
    function keyboard(e) {
        if (e.keyCode == 27) {
            closeGalery();
        }
    }
};
