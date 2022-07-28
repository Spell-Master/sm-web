/**
 * **************************************************
 * * @Class objectHTML
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2022
 * * @version 1.0 "BETA"
 * ****************************************************
 * Simplifica o acesso a funções corriqueiras do
 *  javascript.
 * ****************************************************
 */

var jsd = jsd || {};

(function () {
    'use strict';

    /**
     * **********************************************
     * Anexa todos elementos ao script adicionando
     * os métodos para cada um.
     * 
     * @param {ARRAY} arr
     * Array DOM elements
     * **********************************************
     */
    var objectHTML = function (arr) {
        var $this = this, $i = 0;
        for (; $i < arr.length; $i++) {
            $this[$i] = arr[$i];
        }
        $this.length = arr.length;
        return this;
    };
    $_.objectMethods = objectHTML.prototype;
    $_.objectHTML = objectHTML;

    /**
     * **********************************************
     * @private
     * Busca pelos elementos no documento.
     * 
     * @param {STRING/OBJECT} tgt
     * Elemento(s) alvo para anexar ao script.
     * **********************************************
     */
    function $_(tgt) {
        var $nodes = [];
        if (tgt instanceof objectHTML) {
            return tgt;
        } else if (tgt.nodeType || tgt === window || tgt === document) {
            $nodes.push(tgt);
        } else if ($_.isString(tgt)) {
            $_.each(document.querySelectorAll(tgt.trim()), function (index, value) {
                if (value.nodeType) {
                    $nodes.push(value);
                }
            });
        }
        if ($nodes.length >= 1) {
            return new objectHTML($nodes);
        }
    }

    /**
     * **********************************************
     * @private
     * Encontra elementos internos a outro.
     * 
     * @param {OBJECT} node
     * Objeto para buscar elementos internos.
     * 
     * @param {STRING} find
     * Elemento para ser encontrado.
     * **********************************************
     */
    function allIn(node, find) {
        var $context = null, $nodes = [], $i = 0;
        if ($_.isDefined((node || document).querySelectorAll)) {
            $context = (node || document).querySelectorAll(find || '*');
        }
        for (; $i < $context.length; $i++) {
            $nodes.push($context[$i]);
        }
        return $_.arrayFilter($nodes);
    }

    /**
     * **********************************************
     * @private
     * Cria elementos.
     * 
     * @param {STRING/OBJECT} node
     * Elemento para ser criado.
     * **********************************************
     */
    function createNode(node) {
        var $node = node, $temp = null, $add = [], $i = 0;
        if ($_.isString($node)) {
            $temp = document.createElement('div');
            $temp.innerHTML = $node;
            $add.push($temp.firstChild);
        } else if ($node instanceof objectHTML) {
            for (; $i < $node.length; $i++) {
                $add.push($node[$i]);
            }
        } else {
            $add.push($node);
        }
        return ($add);
    }

    // ==============================================
    // = FUNÇÕES EXTRAS
    // ==============================================

    /**
     * **********************************************
     * @public
     * Verifica se o valor existe.
     * 
     * @param {ANYTHING} val
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isExists = function (val) {
        return (typeof val !== 'undefined' && val !== null) ? true : false;
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor está definido.
     * 
     * @param {ANYTHING} val
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isDefined = function (val) {
        return typeof val === 'undefined' ? false : true;
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é uma função.
     * 
     * @param {ANYTHING} val
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isFunction = function (val) {
        return typeof val === 'function' ? true : false;
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é um objeto.
     * 
     * @param {ANYTHING} val
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isObject = function (val) {
        return typeof val === 'object' ? true : false;
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é uma string.
     * 
     * @param {ANYTHING} val
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isString = function (val) {
        return typeof val === 'string' ? true : false;
    };

    /**
     * **********************************************
     * @public
     * Verifica se o navegador é um modelo de
     *  dispositível móvel.
     * **********************************************
     */
    $_.isMobile = function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é uma array.
     * 
     * @param {ARRAY} arr
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isArray = function (arr) {
        return Array.isArray(arr) ? true : false;
    };

    /**
     * **********************************************
     * @public
     * Filtra o array removendo índices duplicados.
     * 
     * @param {ARRAY} arr
     * Informar o array.
     * **********************************************
     */
    $_.arrayFilter = function (arr) {
        var $array = [], $i = 0;
        for (; $i < arr.length; $i++) {
            if ($array.indexOf(arr[$i]) === -1) {
                $array.push(arr[$i]);
            }
        }
        return $array;
    };

    /**
     * **********************************************
     * @public
     * Vefifica o índice de um array.
     * 
     * @param {ARRAY} array
     * Informar o array.
     * 
     * @param {STRING/OBJECT} key
     * Informar a chave do índice.
     * **********************************************
     */
    $_.indexOf = function (array, key) {
        var $i = 0, $length = array.length;
        for (; $i < $length; $i++) {
            if (array[$i] === key) {
                return $i;
            }
        }
        return -1;
    };

    /**
     * **********************************************
     * @public
     * Une duas arrays em uma.
     * 
     * @param {ARRAY} arrA
     * Informar um array.
     * 
     * @param {ARRAY} arrB
     * Informar outro array.
     * **********************************************
     */
    $_.arrayMerge = function (arrA, arrB) {
        var $length = +arrB.length, $j = 0, $i = arrA.length;
        for (; $j < $length; $j++) {
            arrA[$i++] = arrB[$j];
        }
        arrA.length = $i;
        return arrA;
    };

    /**
     * **********************************************
     * @public
     * Converte em texto o tamanho de dados.
     * 
     * @param {INTERGER} sz
     * Informar valor para conversão.
     * **********************************************
     */
    $_.sizeName = function (sz) {
        var $path = ['Bit\'s', 'KB\'s', 'MB\'s', 'GB\'s', 'TB\'s'], $comb = (sz > 0 ? Math.floor(Math.log(sz) / Math.log(1024)) : 0);
        if ($comb < 5) {
            return parseFloat((sz / Math.pow(1024, $comb)).toFixed(2)) + ' ' + $path[$comb];
        } else {
            return 'Maior que 1 Peta-byte';
        }
    };

    /**
     * *****************************************
     * Executa um loop sobre objetos ou arrays
     * definindo um chamanda de função por trás
     * da execução a cada volta do loop.
     *  
     * @param {OBJECT/ARRAY} obj
     * Objeto ou array para executar o loop.
     *  
     * @param {FUNCTION} callback
     * Função a se executada a cada volta do
     *  loop.
     * *****************************************
     */
    $_.each = function (obj, callback) {
        if ($_.isDefined(obj) && $_.isDefined(callback)) {
            for (var $i in obj) {
                if (callback.call(obj[$i], $i, obj[$i]) === false) {
                    break;
                }
            }
        } else {
            return (obj);
        }
    };

    /**
     * *****************************************
     * Codifica uma string para parâmetros
     *  corretos de uso em uma URL
     *  Escapa todos os caracteres que não são
     *  alfabéticos, dígitos ou decimais.
     * 
     * @param {STRING} str
     * String para ser transformada em URI válida.
     * *****************************************
     */
    $_.urlScapes = function (str) {
        var $encode = encodeURIComponent(str);
        return ($encode.replace(/['()]/g, escape).replace(/\*/g, '%2A').replace(/%(?:7C|60|5E)/g, unescape));
    };

    /**
     * *****************************************
     * Recarrega tags "javascript" realocando-as
     *  novamente no mesmo local.
     * 
     * @param {OBJ} objHTML
     * Objeto HTML para busca e realocamento
     *  de javascript.
     * *****************************************
     */
    $_.updateScript = function (objHTML) {
        var $oldScript = objHTML.getElementsByTagName('script'), $i = 0, $newScript;

        for (; $i < $oldScript.length; $i++) {
            $newScript = document.createElement('script');
            if ($oldScript[$i].src) {
                $newScript.src = $oldScript[$i].src;
            } else {
                $newScript.text = $oldScript[$i].text;
            }
            if ($oldScript[$i].type) {
                $newScript.type = $oldScript[$i].type;
            }
            objHTML.replaceChild($newScript, $oldScript[$i]);
        }
    };

    // ==============================================
    // = MÉTODOS
    // ==============================================

    var methods = {
        /**
         * *****************************************
         * Obtem o indice na instancia dos objetos.
         * 
         * @param {INTERGER} idx
         * Informar o índice o object-array.
         * *****************************************
         */
        index: function (idx) {
            var $length = this.length, $index;
            if (!$_.isDefined(idx)) {
                return this;
            } else if (idx > $length - 1) {
                return undefined;
            } else if (idx < 0) {
                $index = $length + idx;
                if ($index < 0) {
                    return undefined;
                } else {
                    return new objectHTML([this[$index]]);
                }
            } else {
                return new objectHTML([this[idx]]);
            }
        },

        /**
         * *****************************************
         * Compara se o elemnto é igual ao mesmo
         *  elemento com a finalidade de impedir a
         *  repetição/duplicação de instâncias de
         *  objetos.
         *  
         * @param {OBJECT/STRING} compare
         * Informar o que comparar
         * *****************************************
         */
        is: function (compare) {
            var $type = typeof compare, $equal = [], $i = 0;
            if (!this[0] || $type === 'undefined') {
                return false;
            } else if (compare === document) {
                return this[0] === document;
            } else if (compare === window) {
                return this[0] === window;
            } else if ($type === 'string' && this[0].matches) {
                return this[0].matches(compare);
            } else if ($type === 'string') {
                $equal = $_(compare);
                for (; $i < $equal.length; $i++) {
                    if ($equal[$i] === this[0]) {
                        return true;
                    }
                }
                return false;
            } else if (compare.nodeType || compare instanceof objectHTML) {
                $equal = compare.nodeType ? [compare] : compare;
                for (; $i < $equal.length; $i++) {
                    if ($equal[$i] === this[0]) {
                        return true;
                    }
                }
                return false;
            }

        },

        /**
         * *****************************************
         * Executa um loop interando uma função de
         *  chamada a ele.
         * 
         * @param {FUNCTION} callback
         * Função a se executada a cada volta do
         *  loop.
         * *****************************************
         */
        each: function (callback) {
            if ($_.isFunction(callback)) {
                for (var $i = 0; $i < this.length; $i++) {
                    if (callback.call(this[$i], $i, this[$i]) === false) {
                        break;
                    }
                }
                return this;
            }
        },

        /* Métodos de buscas de elementos */
        elements: {
            /**
             * *************************************
             * Obtem o primeiro elemento antes do
             *  elemento da instância.
             * *************************************
             */
            prev: function () {
                if (!$_.isDefined(this[0].previousElementSibling)) {
                    return undefined;
                } else {
                    for (var $i = 0; $i < this.length; $i++) {
                        return new objectHTML([this[$i].previousElementSibling]);
                    }
                }
            },
            /**
             * *************************************
             * Obtem o primeiro elemento depois do
             *  elemento da instância.
             * *************************************
             */
            next: function () {
                if (!$_.isDefined(this[0].nextElementSibling)) {
                    return undefined;
                } else {
                    for (var $i = 0; $i < this.length; $i++) {
                        return new objectHTML([this[$i].nextElementSibling]);
                    }
                }
            },
            /**
             * *************************************
             * Obtem o primeiro filho do elemento
             *  da instância.
             * *************************************
             */
            child: function () {
                var $child = [], $i = 0;
                for (; $i < this.length; $i++) {
                    $child.push(this[$i].children[0]);
                }
                return new objectHTML($child);
            },
            /**
             * *************************************
             * Obtem o primeiro parente do elemento
             *  da instância.
             * *************************************
             */
            parent: function () {
                var $parent = [], $i = 0;
                for (; $i < this.length; $i++) {
                    $parent.push(this[$i].parentNode);
                }
                return new objectHTML($parent);
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) antes do
             *  elemento da instância.
             * 
             * @param {STRING/OBJECT} tgt (opcional)
             * Informar o elemento para procurar.
             * Se não informado retorna todos
             *  elementos anteriores.
             * *************************************
             */
            prevAll: function (tgt) {
                var $current = this[0], $before = null, $nodeList = [];
                if (!$_.isDefined($current) || !$_.isDefined($current.previousElementSibling)) {
                    return undefined;
                } else if (tgt && !$_.isDefined($_(tgt))) {
                    return undefined;
                } else if (tgt instanceof objectHTML) {
                    return tgt;
                } else {
                    while ($current.previousElementSibling) {
                        $before = $current.previousElementSibling;
                        if (tgt) {
                            if ($_($before).is(tgt)) {
                                $nodeList.push($before);
                                break;
                            }
                        } else {
                            $nodeList.push($before);
                        }
                        $current = $before;
                    }
                    return new objectHTML($_.arrayFilter($nodeList));
                }
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) depois do
             *  elemento da instância.
             * 
             * @param {STRING/OBJECT} tgt (opcional)
             * Informar o elemento para procurar.
             * Se não informado retorna todos
             *  elementos posteriores.
             * *************************************
             */
            nextAll: function (tgt) {
                var $current = this[0], $next = null, $nodeList = [];
                if (!$_.isDefined($current) || !$_.isDefined($current.nextElementSibling)) {
                    return undefined;
                } else if (tgt && !$_.isDefined($_(tgt))) {
                    return undefined;
                } else if (tgt instanceof objectHTML) {
                    return tgt;
                } else {
                    while ($current.nextElementSibling) {
                        $next = $current.nextElementSibling;
                        if (tgt) {
                            if ($_($next).is(tgt)) {
                                $nodeList.push($next);
                                break;
                            }
                        } else {
                            $nodeList.push($next);
                        }
                        $current = $next;
                    }
                    return new objectHTML($_.arrayFilter($nodeList));
                }
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) filhos do
             *  elemento da instância.
             * 
             * @param {STRING/OBJECT} tgt (opcional)
             * Informar o elemento para procurar.
             * Se não informado retorna todos
             *  filhos diretos.
             * *************************************
             */
            childAll: function (tgt) {
                var $child = this[0].children, $nodeList = [], $i = 0, $j = 0;
                if (!$_.isDefined($child)) {
                    return undefined;
                } else if (tgt instanceof objectHTML) {
                    return tgt;
                } else {
                    for (; $i < this.length; $i++) {
                        $child = this[$i].children;
                        while ($child) {
                            for ($j = 0; $j < $child.length; $j++) {
                                if (tgt) {
                                    if ($_($child[$j]).is(tgt)) {
                                        $nodeList.push($child[$j]);
                                        break;
                                    }
                                } else {
                                    $nodeList.push($child[$j]);
                                }
                            }
                            $child = $child.children;
                        }
                    }
                    return new objectHTML($_.arrayFilter($nodeList));
                }
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) parentes do
             *  elemento da instância.
             * 
             * @param {STRING/OBJECT} tgt (opcional)
             * Informar o elemento para procurar
             * Se não informado retorna todos
             *  parentes.
             * *************************************
             */
            parentAll: function (tgt) {
                var $parent = this[0].parentNode, $nodeList = [], $i = 0;
                if (!$_.isDefined($parent)) {
                    return undefined;
                } else if (tgt instanceof objectHTML) {
                    return tgt;
                } else {
                    for (; $i < this.length; $i++) {
                        $parent = this[$i].parentNode;
                        while ($parent) {
                            if (tgt) {
                                if ($_($parent).is(tgt)) {
                                    $nodeList.push($parent);
                                    break;
                                }
                            } else {
                                $nodeList.push($parent);
                            }
                            $parent = $parent.parentNode;
                        }
                    }
                    return new objectHTML($_.arrayFilter($nodeList));
                }
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) internos ao
             *  elemento da instância.
             * 
             * @param {STRING} tgt
             * Informar o elemento para procurar.
             * Se não informado retorna todos
             *  elementos internos, filhos diretos
             *  ou não.
             * *************************************
             */
            find: function (tgt) {
                if (tgt instanceof objectHTML) {
                    return tgt;
                } else {
                    var $nodeList = allIn(this[0], (tgt || false));
                    if ($nodeList.length < 1) {
                        return undefined;
                    } else {
                        return new objectHTML($nodeList);
                    }
                }
            }
        },

        /* Métodos para adicionar e remover */
        addRemove: {
            /**
             * *************************************
             * Adiciona elemento dentro do(s)
             *  elemento(s) da instância, por
             *  argumento.
             * *************************************
             */
            append: function () {
                var $args = arguments[0], $newNode = null, $i = 0, $j = 0;
                if (arguments.length >= 1) {
                    for (; $i < this.length; $i++) {
                        $newNode = createNode($args);
                        for ($j = 0; $j < $newNode.length; $j++) {
                            if ($_.isDefined($newNode[$j].tagName)) {
                                this[$i].appendChild($newNode[$j]);
                                $_.updateScript(this[$i]);
                            }
                        }
                    }
                }
            },
            /**
             * *************************************
             * Adiciona elemento dentro do(s)
             *  elemento(s) da instância, por
             *  argumento, antes de qualquer outro
             *  elemento interno que tenha.
             * *************************************
             */
            prepend: function () {
                var $args = arguments[0], $newNode = null, $i = 0, $j = 0;
                if (arguments.length >= 1) {
                    for (; $i < this.length; $i++) {
                        $newNode = createNode($args);
                        for ($j = 0; $j < $newNode.length; $j++) {
                            if ($_.isDefined($newNode[$j].tagName)) {
                                this[$i].insertBefore($newNode[$j], this[$i].firstChild);
                                $_.updateScript(this[$i]);
                            }
                        }
                    }
                }
            },
            /**
             * *************************************
             * Adiciona elemento fora do(s)
             *  elemento(s) da instância, por
             *  argumento, antes do(s) mesmo(s).
             * *************************************
             */
            before: function () {
                var $args = arguments[0], $newNode = null, $i = 0, $j = 0;
                if (arguments.length >= 1) {
                    for (; $i < this.length; $i++) {
                        $newNode = createNode($args);
                        for ($j = 0; $j < $newNode.length; $j++) {
                            if ($_.isDefined($newNode[$j].tagName)) {
                                this[$i].parentNode.insertBefore($newNode[$j], this[$i]);
                                $_.updateScript(this[$i].parentNode);
                            }
                        }
                    }
                }
            },
            /**
             * *************************************
             * Adiciona elemento fora do(s)
             *  elemento(s) da instância, por
             *  argumento, depois do(s) mesmo(s).
             * *************************************
             */
            after: function () {
                var $args = arguments[0], $newNode = null, $i = 0, $j = 0;
                if (arguments.length >= 1) {
                    for (; $i < this.length; $i++) {
                        $newNode = createNode($args);
                        for ($j = 0; $j < $newNode.length; $j++) {
                            if ($_.isDefined($newNode[$j].tagName)) {
                                this[$i].parentNode.insertBefore($newNode[$j], this[$i].nextSibling);
                                $_.updateScript(this[$i].parentNode);
                            }
                        }
                    }
                }
            },
            /**
             * *************************************
             * Limpa/remove conteúdo interno do(s)
             *  elemento(s) da instância.
             *  
             * @param {OBJECT/STRING} tgt
             * Alvo para eliminar.
             * Se não informado limpa todo conteúdo
             *  interno.
             * *************************************
             */
            clear: function (tgt) {
                var $child = this[0].childNodes, $target = null, $i = 0;
                if ($child.length) {
                    $target = (tgt ? $_(tgt) : false);
                    if (!$_.isDefined($target)) {
                        return false;
                    } else if ($target) {
                        for (; $i < $target.length; $i++) {
                            $target[$i].parentNode.removeChild($target[$i]);
                        }
                    } else {
                        while ($child.length) {
                            this[0].removeChild(this[0].firstChild);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Remove o(s) elemento(s) da instância
             *  no documento.
             * *************************************
             */
            remove: function () {
                for (var $i = 0; $i < this.length; $i++) {
                    if (this[$i].parentNode) {
                        this[$i].parentNode.removeChild(this[$i]);
                    }
                }
            }
        },

        /* Métodos de escrita */
        write: {
            /**
             * *************************************
             * Escreve HTML no(s) elemento(s).
             * 
             * @param {STRING} setHtml (opcional)
             * Informar o HTML a escrever.
             * Se não informado retorna a estrutura
             *  HTML no(s) elemento(s).
             * *************************************
             */
            html: function (setHtml) {
                if (!$_.isDefined(setHtml)) {
                    return this[0].innerHTML;
                } else if (this.length > 1) {
                    for (var $i = 0; $i < this.length; $i++) {
                        this[$i].innerHTML = setHtml;
                        $_.updateScript(this[$i]);
                    }
                } else {
                    this[0].innerHTML = setHtml;
                    $_.updateScript(this[0]);
                }
            },
            /**
             * *************************************
             * Escreve texto no(s) elemento(s).
             * 
             * @param {STRING} setText (opcional)
             * Informar o texto a escrever
             * Se não informado retorna o texto
             *  contido no(s) elemento(s).
             * *************************************
             */
            text: function (setText) {
                if (!$_.isDefined(setText)) {
                    return this[0].innerText;
                } else if (this.length > 1) {
                    for (var $i = 0; $i < this.length; $i++) {
                        this[$i].innerText = setText;
                    }
                } else {
                    this[0].innerText = setText;
                }
            }
        },

        /* Métodos de formulário */
        forms: {
            /**
             * *************************************
             * Obtem todos valores de elementos que
             *  possuam o atriburo "name" cujo a
             *  tag que se encontram dentro seja um
             *  "form".
             * 
             * Criando um cabeçalho URI com os
             *  valores.
             * *************************************
             */
            serialize: function () {
                if (this[0].tagName.toLowerCase() === 'form') {
                    var $uri = '_jsd_protocol_id=' + new Date().getTime(), $i = 0, $value = '';
                    for (; $i < this[0].elements.length; $i++) {
                        if (this[0].elements[$i].disabled === true) {
                            continue;
                        } else if (this[0].elements[$i].type === 'checkbox' && this[0].elements[$i].checked === false) {
                            $value = '';
                        } else if (this[0].elements[$i].type === 'radio' && this[0].elements[$i].checked === false) {
                            $value = '';
                        } else {
                            $value = this[0].elements[$i].value;
                        }
                        $uri += '&' + this[0].elements[$i].name + '=' + $_.urlScapes($value);
                    }
                    return $uri;
                }
            },
            /**
             * *************************************
             * Define o valor no(s) elemento(s).
             * 
             * @param {STRING} setValue (opcional)
             * Informar o valor a definir.
             * Se não informado retorna o valor
             *  contido no(s) elemento(s).
             * *************************************
             */
            value: function (setValue) {
                if (!$_.isDefined(setValue)) {
                    if (this[0].disabled === true) {
                        return '';
                    } else if (this[0].type === 'checkbox' && this[0].checked === false) {
                        return '';
                    } else if (this[0].type === 'radio' && this[0].checked === false) {
                        return '';
                    } else {
                        return this[0].value ? this[0].value : '';
                    }
                } else if (this.length > 1) {
                    for (var $i = 0; $i < this.length; $i++) {
                        this[$i].value = setValue;
                    }
                } else {
                    this[0].value = setValue;
                }
            },

            /**
             * *************************************
             * Alterar o índice no(s) elemento(s)
             *  cujo a tag for um "select".
             * 
             * @param {INTERGER} idx (opcional)
             * Informar o índice das opções
             *  disponíveis.
             * Se não informado retorna o índice
             *  selecionado no(s) elemento(s).
             * *************************************
             */
            selectedIndex: function (idx) {
                if (this[0].tagName.toLowerCase() === 'select') {
                    var $count = this[0].childElementCount, $index = (idx > $count ? $count : idx), $i = 0;
                    if (!$_.isDefined(idx)) {
                        return this[0].selectedIndex;
                    } else if (this.length > 1) {
                        for (; $i < this.length; $i++) {
                            this[$i].selectedIndex = $index;
                        }
                    } else {
                        this[0].selectedIndex = $index;
                    }
                }
            }
        },

        /* Métodos de atributos e propriedades */
        properties: {
            /**
             * *************************************
             * Verifica se na propriedade "class"
             *  do(s) elemento(s) possui o valor.
             * 
             * @param {STRING} cl (opcional)
             * Informar o valor.
             * Se não informado retorna o todos os
             *  valores quando eles existirem.
             * *************************************
             */
            classList: function (cl) {
                if (this[0].className === '') {
                    return undefined;
                } else if (!$_.isDefined(cl)) {
                    return this[0].classList;
                } else {
                    return this[0].classList.contains(cl);
                }
            },
            /**
             * *************************************
             * Adiciona valor na propriedade "class"
             *  do(s) elemento(s).
             * 
             * @param {STRING} cl
             * Informar o(s) valor(es) separados por
             *  espaço.
             * *************************************
             */
            addClass: function (cl) {
                if ($_.isDefined(cl) && cl !== '') {
                    var $add = cl.split(' '), $i = 0, $j = 0;
                    for (; $i < this.length; $i++) {
                        for ($j = 0; $j < $add.length; $j++) {
                            this[$i].classList.add($add[$j]);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Adiciona ou remove valor na
             *  propriedade "class" do(s)
             *  elemento(s).
             * 
             * @param {STRING} cl
             * Informar o(s) valor(es) separados por
             *  espaço.
             * 
             * Nota!
             * Se houver mais de um valor em "cl"
             * e o elemento já possuir algum desses
             *  valores aquele que exite é retirado
             *  e os demais adicionados.
             * *************************************
             */
            toggleClass: function (cl) {
                if ($_.isDefined(cl) && cl !== '') {
                    var $toggle = cl.split(' '), $i = 0, $j = 0;
                    for (; $i < this.length; $i++) {
                        for ($j = 0; $j < $toggle.length; $j++) {
                            this[$i].classList.toggle($toggle[$j]);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Remove valor na propriedade "class"
             *  do(s) elemento(s).
             * 
             * @param {STRING} cl (opcional)
             * Informar o(s) valor(es) separados por
             *  espaço.
             * Se não informado remove tudo.
             * *************************************
             */
            removeClass: function (cl) {
                if ($_.isDefined(cl) && cl !== '') {
                    var $remove = cl.split(' '), $i = 0, $j = 0;
                    for (; $i < this.length; $i++) {
                        for ($j = 0; $j < $remove.length; $j++) {
                            this[$i].classList.remove($remove[$j]);
                        }
                    }
                } else {
                    for (var $k = 0; $k < this.length; $k++) {
                        this[$k].className = '';
                    }
                }
            },
            /**
             * *************************************
             * Obterm valor do(s) atributo(s) no(s)
             *  elemento(s).
             * 
             * @param {STRING} attr (opcional)
             * Informar o atributo a obter o valor.
             * Se não informado retorna arrays
             * com todos atributos presentes.
             * *************************************
             */
            attr: function (attr) {
                var $i = 0, $j = 0, $attr = null, $attrs = [];
                if ($_.isDefined(attr)) {
                    for (; $i < this.length; $i++) {
                        $attr = this[$i].getAttribute(attr);
                        $attrs.push($attr);
                    }
                } else {
                    for (; $i < this.length; $i++) {
                        $attr = this[$i].attributes;
                        for ($j = 0; $j < $attr.length; $j++) {
                            $attrs.push([$attr[$j].nodeName, $attr[$j].nodeValue]);
                        }
                    }
                }
                return $attrs;
            },
            /**
             * *************************************
             * Define/criar atributos no(s)
             *  elemento(s).
             * 
             * @param {STRING/OBJECT} attr
             * Quando string, informar o atributo a
             * ser criado.
             * Quando objeto, informar o atributo e
             * seu valor a ser criado.
             * 
             * @param {STRING} val (opcional)
             * Somente válido quando "attr" é um
             *  string.
             * Informar o valor do atributo "attr"
             *  a ser criado.
             * Se não informado e "attr" for string
             *  o atribut não terá valor.
             * *************************************
             */
            setAttr: function (attr, val) {
                var $i = 0;
                if ($_.isString(attr) && $_.isString(val)) {
                    for (; $i < this.length; $i++) {
                        this[$i].setAttribute(attr, val);
                    }
                } else if ($_.isObject(attr)) {
                    for (; $i < this.length; $i++) {
                        for (var name in attr) {
                            this[$i].setAttribute(name, attr[name]);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Remove atributos no(s) elemento(s).
             * 
             * @param {STRING/ARRAY} attr
             * Quando string, informar o nome do
             *  atributo a ser removido.
             * Quando array, informar em cada índice
             *  o nome do atributo a ser removido.
             * *************************************
             */
            removeAttr: function (attr) {
                var $i = 0, $j;
                if ($_.isString(attr)) {
                    for (; $i < this.length; $i++) {
                        this[$i].removeAttribute(attr);
                    }
                } else if ($_.isArray(attr)) {
                    for (; $i < this.length; $i++) {
                        for ($j = 0; $j < attr.length; $j++) {
                            this[$i].removeAttribute(attr[$j]);
                        }
                    }
                } else {
                    while (this[$i].attributes.length) {
                        this[$i].removeAttribute(this[$i].attributes[0].nodeName);
                    }
                }
            }
        },

        /* Métodos de eventos */
        events: {
            /**
             * *************************************
             * Adiciona evento no elemento.
             * 
             * @param {STRING} type
             * Qual é o tipo de situação que
             *  dispara a função.
             * 
             * @param {FUNCTION} listener
             * Função ouvinte que será disparada.
             * *************************************
             */
            on: function (type, listener) {
                var $this = this, $type = type, $listener = listener, $i = 0, $insert = true;
                if ($_.isString($type) && $_.isFunction($listener)) {
                    for (; $i < $this.length; $i++) {
                        if (!$_.isDefined($this[$i].eventListener)) {
                            $this[$i].eventListener = [];
                        }
                        $_.each($this[$i].eventListener, function (index, value) {
                            if ($type == value.type && $listener == value.listener) {
                                $insert = false;
                            }
                        });
                        if ($insert) {
                            $this[$i].eventListener.push({
                                type: $type,
                                listener: $listener
                            });
                            $this[$i].addEventListener($type, $listener, false);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Remove eventos adicionados no
             *  elemento.
             * 
             * @param {STRING} type (opcional)
             * Qual é o tipo de situação que
             *  dispara a função.
             * 
             * @param {FUNCTION} listener (opcional)
             * Função ouvinte que é disparada.
             * 
             * NOTA:
             * Quando informado "type" e "listener"
             * A função ouvinte do requisito de
             *  disparo é removida.
             * Quando informado "type" e não o
             *  "listener" todas funções ouvintes do
             *  requisito de disparo são removidas.
             * Quando não informado "type" e nem o
             *  "listener" todas funções ouvintes
             *  são removidas.
             * *************************************
             */
            off: function (type, listener) {
                var $this = this, $type = type, $listener = listener, $i = 0, $indexKey = [], $j = 0;
                for (; $i < $this.length; $i++) {
                    if ($_.isArray($this[$i].eventListener)) {
                        $_.each($this[$i].eventListener, function (index, value) {
                            if ($type == value.type && $listener == value.listener) {
                                $this[$i].removeEventListener($type, $listener, false);
                                $indexKey.push(index);
                            } else if ($type == value.type && !$listener) {
                                $this[$i].removeEventListener($type, value.listener, false);
                                $indexKey.push(index);
                            } else if (!$type) {
                                $this[$i].removeEventListener(value.type, value.listener, false);
                                $indexKey.push(index);
                            }
                        });
                        $j = $indexKey.length;
                        if ($j < $this[$i].eventListener.length) {
                            while ($j--) {
                                $this[$i].eventListener.splice($indexKey[$j], 1);
                            }
                        } else {
                            delete $this[$i].eventListener;
                        }
                    }
                }
            },
            /**
             * *************************************
             * Aciona eventos adicionados no
             *  elemento.
             * 
             * @param {STRING} type
             * Qual é o tipo de situação que
             *  dispara a função.
             * *************************************
             */
            trigger: function (type) {
                var $this = this, $type = type, $i = 0, $event = false;
                for (; $i < $this.length; $i++) {
                    if ($_.isArray($this[$i].eventListener)) {
                        $_.each($this[$i].eventListener, function (index, value) {
                            if ($type == value.type) {
                                $event = $type;
                            }
                        });
                        if ($event) {
                            $this[$i].dispatchEvent(new Event($event, {bubbles: true, cancelable: true}));
                        }
                    }
                }
            }

        }
    };

    /*
     * **********************************************
     * Define os métodos para os objetos HTML
     * **********************************************
     */
    Object.keys(methods).forEach(function (e) {
        if (typeof methods[e] === 'function') {
            $_.objectMethods[e] = methods[e];
        } else if (typeof methods[e] === 'object') {
            for (var key in methods[e]) {
                $_.objectMethods[key] = methods[e][key];
            }
        }
    });

    /**
     * **********************************************
     * Expande novos métodos para eventos sobre os
     *  objetos HTML.
     * Executa as funções:
     *  "events.on()
     *  "events.trigger()"
     * 
     * @param {INTEGER} index 
     * @param {OBJECT} value 
     * **********************************************
     */
    $_.each(('click dblclick blur focus focusin focusout resize scroll '
            + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '
            + 'change select submit keydown keypress keyup contextmenu').split(' '),
            function (index, value) {
                $_.objectMethods[value] = function (fnc) {
                    if ($_.isFunction(fnc)) {
                        return this.on(value, fnc);
                    } else {
                        return this.trigger(value);
                    }
                };
            });

    jsd = $_;
}());
