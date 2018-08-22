/**
 * ****************************************************
 * @Copyright (c) 2016, Spell Master.
 * @Version: 1.0
 * ****************************************************
 * @class Executa sistema de ancoração de divisores.
 * ****************************************************
 * @param propriety : Executar funções em apenas
 * elementos ID expecificado. 
 * ****************************************************
 **/

var Accordion = function (propriety) {
    var $parent = propriety ? document.getElementById(propriety) : document;
    var $aB = $parent.getElementsByClassName('acc-button');
    var $aC = $parent.getElementsByClassName('acc-container');
    var $aN = $aC.length;
    var $i, $node, $height;

    /*
     * Localiza os elementos
     */
    for ($i = 0; $i < $aN; $i++) {
        $aB[$i].addEventListener('click', openItens($i));
    }

    /**
     * ************************************************
     * @function : Expande o item designado
     * @param p : ìndice do elemento para expandir
     * ************************************************
     */
    this.openItem = function (p) {
        var $n;
        if (p) {
            var $n = parseInt(p - 1);
        } else {
            var $n = 0;
        }
        $aC[$n].style.height = 'auto';
    };

    /**
     * ************************************************
     * @function : Expande o contrai os itens
     * @param tgt : ìndice do elemento atual para
     * expandir
     * ************************************************
     */
    function openItens(tgt) {
        return function () {
            $node = $aC[tgt].cloneNode(true);
            $node.setAttribute('style', 'height:auto; visibility:hidden');
            $aC[tgt].parentNode.appendChild($node);

            $height = heightV($node);
            $aC[tgt].setAttribute('style', 'height:' + $height);
            $aC[tgt].parentNode.removeChild($node);
            if (heightV($aC[tgt], 'height') == $height) {
                $aC[tgt].style.height = '0';
            } else {
                closeItens();
                $aC[tgt].style.height = $height;
            }
        };
    }

    /**
     * ************************************************
     * @function : Contrai os itens
     * ************************************************
     */
    function closeItens() {
        for ($i = 0; $i < $aN; $i++) {
            $aC[$i].style.height = '0';
        }
    }

    /**
     * ************************************************
     * @function : Obtem a altura atual de cada
     * elemento
     * @param item : Elemento expandido atual 
     * ************************************************
     */
    function heightV(item) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(item, null).getPropertyValue('height');
        } else {
            return item.currentStyle['height'];
        }
    }
};