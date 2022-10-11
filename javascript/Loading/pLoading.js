/**
 * **************************************************
 * pLoading
 * @author Spell-Master (Omar Pautz)
 * @copyright 2018
 * @version 1.0 (2022)
 * 
 * Animações para espera de progressos.
 * **************************************************
 */

var pLoading = pLoading || {};

(function () {
    'use strict';

    var $this = {
        init: null,
        method: null,
        loading: null,
        img: null,
        svg: null,
        circle: null,
        bar: null,
        width: null
    }, $options = {
        tgt: undefined,
        color: undefined,
        size: undefined,
        bg: undefined,
        vetor: undefined,
        img: undefined
    };

    /**
     * **********************************************
     * Verifica se uma string é um código #hex para
     *  cores RGB.
     * @param {STRING} hex
     * Texto para verificação.
     * **********************************************
     */
    function colorCheck(hex) {
        return (hex.match(/^#(?:[A-Fa-f0-9]{3}){1,2}$/gm) ? true : false);
    }

    /**
     * **********************************************
     * Converte uma string em código #hex de
     *  cores RGB para RGB Alpha.
     * @param {STRING} hex
     * Texto para converter.
     * **********************************************
     */
    function rgba(hex) {
        return ('rgba(' + parseInt(hex.slice(1, 3), 16) + ',' + parseInt(hex.slice(3, 5), 16) + ',' + parseInt(hex.slice(5, 7), 16) + ',.5)');
    }

    /**
     * **********************************************
     * Define os dados de opções para um padrão
     *  aceito.
     * @param {OBJECT} opt
     * Objeto contendo as opções definidas.
     * 
     * {
     *  tgt: Elemento para adicionar a  animação.
     *  size: Altura e largura a imagem de animação.
     *  color: Cor da imagem de animação.
     *  bg: Cor do fundo que cobre o alvo.
     *  img: Imagem para usar como animação.
     * }
     * **********************************************
     */
    function defaults(opt) {
        $options.tgt = (typeof opt.target !== 'undefined' && opt.target.nodeType === 1 ? opt.target : document.body);
        $options.size = (typeof opt.size === 'number' ? opt.size : 50);
        $options.color = (typeof opt.color === 'string' && colorCheck(opt.color) ? opt.color : '#555555');
        $options.bg = (typeof opt.bg === 'string' && colorCheck(opt.bg) ? rgba(opt.bg) : null);
        $options.img = opt.img;
        $this.init = true;
    }

    /**
     * **********************************************
     * Cria elemento de tag img para abrigar a
     *  animação.
     * **********************************************
     */
    function imgCreate() {
        $this.loading = document.createElement('div');
        $this.img = document.createElement('img');
        $this.img.src = $options.img;
        $this.img.setAttribute('width', $options.size);
        $this.loading.classList.add('p-loading-bg');
        $this.loading.appendChild($this.img);
    }

    /**
     * **********************************************
     * Cria elemento de tag svg para animação pré
     *  definida.
     * **********************************************
     */
    function svgCreate() {
        $this.loading = document.createElement('div');
        $this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        $this.circle = '<circle cx="50" cy="50" r="20" fill="none" stroke="' + $options.color + '" stroke-width="3" stroke-miterlimit="10" />';

        $this.svg.innerHTML = $this.circle;
        $this.svg.setAttribute('viewBox', '25 25 50 50');
        $this.svg.setAttribute('width', $options.size);
        $this.loading.classList.add('p-loading-bg');
        $this.loading.appendChild($this.svg);
    }

    /**
     * **********************************************
     * Cria elemento de tag div para animação de
     *  barra de progresso.
     * **********************************************
     */
    function barCreate() {
        $this.loading = document.createElement('div');
        $this.loading.classList.add('p-loading-bg');

        $this.bar = document.createElement('div');
        $this.bar.classList.add('p-loading-bar');

        if ($options.tgt.tagName.toLowerCase() === 'body') {
            $this.bar.style.position = 'fixed';
        } else {
            $options.tgt.classList.add('p-loading-conter');
            $this.bar.style.position = 'absolute';
        }
        $this.bar.style.backgroundColor = $options.color;

        $this.loading.appendChild($this.bar);
    }

    /**
     * **********************************************
     * Adiciona a animação criada no alvo.
     * **********************************************
     */
    function addLoading() {
        if ($options.bg !== null) {
            $options.tgt.classList.add('p-loading-conter');
            $this.loading.style.backgroundColor = $options.bg;
        }
        $options.tgt.insertBefore($this.loading, $options.tgt.firstChild);
    }

    /**
     * **********************************************
     * Remove a animação criada no alvo.
     * **********************************************
     */
    function removeLoading() {
        $options.tgt.removeChild($this.loading);
        if ($options.bg !== null) {
            $options.tgt.classList.remove('p-loading-conter');
        }
        for (var $t in $this) {
            $this[$t] = null;
        }
        for (var $o in $options) {
            $options[$o] = undefined;
        }
    }

    /**
     * **********************************************
     * Animação por imagem.
     * 
     * @funcion add
     * Adiciona a imagem de progresso.
     * @param {OBJECT} options
     * Opções de execução.
     * 
     * @funcion remove
     * Remove a imagem de progresso.
     * **********************************************
     */
    pLoading.image = {
        add: function (options) {
            if (typeof options === 'object' && $this.init === null) {
                defaults(options);
                imgCreate();
                addLoading();
            }
        }, remove: function () {
            if ($this.init === true) {
                removeLoading();
            }
        }
    };

    /**
     * **********************************************
     * Animação por vetorial.
     * 
     * @funcion add
     * Cria a imagem de progresso.
     * @param {OBJECT} options
     * Opções de execução.
     * 
     * @funcion remove
     * Remove a imagem de progresso.
     * **********************************************
     */
    pLoading.circle = {
        add: function (options) {
            if (typeof options === 'object' && $this.init === null) {
                defaults(options);
                svgCreate();
                addLoading();
            }
        }, remove: function () {
            if ($this.init === true) {
                removeLoading();
            }
        }
    };

    /**
     * **********************************************
     * Animação por barra.
     * 
     * @funcion add
     * Cria a barra de progresso.
     * @param {OBJECT} options
     * Opções de execução.
     * 
     * @funcion update
     * Altera a largura da barra de progresso.
     * @param {INTEGER} width
     * Porcentagem da largura.
     * 
     * @funcion remove
     * Remove a barra de progresso.
     * **********************************************
     */
    pLoading.bar = {
        add: function (options) {
            if (typeof options === 'object' && $this.init === null) {
                defaults(options);
                barCreate();
                addLoading();
            }
        }, update: function (width) {
            if ($this.init === true) {
                if (width < 1) {
                    $this.width = 0;
                } else if (width > 100) {
                    $this.width = 100;
                } else {
                    $this.width = width;
                }
                $this.bar.style.width = $this.width + '%';
            }
        }, remove: function () {
            if ($this.init === true) {
                $this.bar.classList.add('hide');
                setTimeout(function () {
                    removeLoading();
                }, 1000);
            }
        }
    };

}());
