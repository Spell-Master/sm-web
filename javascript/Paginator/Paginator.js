/**
 * ****************************************************
 * @Copyright (c) 2020, Spell Master.
 * @version 1.0
 * @requires  Navegador compatível com HTML 5
 * ****************************************************
 * @class Realiza paginação de elementos
 * ****************************************************
 * @param {STR} targetItem
 * Informar quais são os alvos da paginação dentro
 * div#ID "paginator"
 * @param {INT} maxItens
 * Informar qual a quantidade máxima de itens a ser
 * exibida por vez
 * ****************************************************
 */

var Paginator = function (targetItem, maxItens) {
    if (!targetItem || !maxItens) {
        console.error('Parâmetros de iniciação necessários para paginação não definidos');
    } else {
        var $this = {
            itens: document.getElementsByClassName(targetItem),
            limit: parseInt(maxItens),
            offset: 0,
            rows: 0,
            amount: 0
        };


        /**
         * ****************************************
         * * Define os dados de quais elementos
         *   são os alvos da paginação.
         * @param {INT} rows (Opcional)
         * Informar numero de linha inicial.
         * ****************************************
         */
        function setData(rows) {
            $this.rows = (rows ? parseInt(rows) : 1);
            $this.offset = ($this.rows * $this.limit) - $this.limit;
            hidenItens();
            navLinks();
            showItens();
        }

        /**
         * ****************************************
         * * Cria o HTML para o links de navegação
         *   entre os elementos.
         * ****************************************
         */
        function navLinks() {
            var $below = $this.rows - 1;
            var $above = $this.rows + 1;
            var $length = $this.itens.length;
            if ($length > $this.limit) {
                $this.amount = Math.ceil($length / $this.limit);
                $this.linksHtml = '<ul class="paginator">';
                if ($this.rows != 1) {
                    $this.linksHtml += '<li><a title="Primeira Página" data-paginator="1" class="paginator-link"> &lt; </a></li>';
                }
                for ($below; $below <= $this.rows - 1; $below++) {
                    if ($below >= 1) {
                        $this.linksHtml += '<li><a title="Página' + $below + '" data-paginator="' + $below + '" class="paginator-link">' + $below + '</a></li>';
                    }
                }
                $this.linksHtml += '<li class="current"><a>' + $this.rows + '</a></li>';
                for ($above; $above <= $this.rows + 1; $above++) {
                    if ($above <= $this.amount) {
                        $this.linksHtml += '<li><a title="Página ' + $above + '" data-paginator="' + $above + '" class="paginator-link">' + $above + '</a></li>';
                    }
                }
                if ($this.amount != $below) {
                    $this.linksHtml += '<li><a title="Última Página" data-paginator="' + $this.amount + '" class="paginator-link"> &gt; </a></li>';
                }
                $this.linksHtml += '<li><a class="amount">' + $this.rows + '/ ' + $this.amount + '</a></li>';
                $this.linksHtml += "</ul>";
                document.querySelectorAll('[data-paginator]').forEach(attachLinks);
            }
        }

        /**
         * ****************************************
         * * Oculta os elmentos que não fazem
         *   parte da coluna de itens atual.
         * ****************************************
         */
        function hidenItens() {
            for (var i = 0; i < $this.itens.length; i++) {
                $this.itens[i].style.display = 'none';
            }
        }

        /**
         * ****************************************
         * * Mostra os elementos que fazem parte da
         *   coluna de itens atual.
         * ****************************************
         */
        function showItens() {
            var $count = $this.offset;
            var $delimiter = $this.offset + $this.limit;
            for (var i = $count; i < $delimiter; i++) {
                if (typeof $this.itens[i] !== 'undefined' && $this.itens[i] !== null) {
                    $this.itens[i].style.display = 'block';
                }
                $count++;
            }
        }

        /**
         * ****************************************
         * * Anexa o links de navegação aos
         *   elementos responsável por abrigar-los.
         * * Adiciona evento de click a cada link
         * @param {OBJ} e 
         * ****************************************
         */
        function attachLinks(e) {
            e.innerHTML = $this.linksHtml;
            document.querySelectorAll('[data-paginator]').forEach(setClick);
        }

        /**
         * ****************************************
         * * Inicia o evento de click em cada link
         *   da navegação.
         * @param {OBJ} e 
         * ****************************************
         */
        function setClick(e) {
            e.addEventListener('click', changePage, false);
        }

        /**
         * ****************************************
         * * Altera a coluna de itens atual pelo
         *   atributo data de cada link de
         *   navegação.
         * @param {OBJ} e 
         * ****************************************
         */
        function changePage(e) {
            var $key = (e.target).dataset.paginator;
            if ($key !== 'undefined') {
                setData($key);
            }
        }

        /**
         * ****************************************
         * * Inicia o processo de paginação.
         * ****************************************
         */
        this.init = setData;
    }
};