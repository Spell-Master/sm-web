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
        return (this);
    };
    $_.objectHTML = objectHTML;
    $_.objectMethods = objectHTML.prototype;

    /**
     * **********************************************
     * @private
     * Busca pelos elementos no documento.
     * 
     * @param {STRING/OBJECT} strObj
     * Elemento alvo para anexar ao script.
     * **********************************************
     */
    function $_(strObj) {
        var $push = [], $i = 0;
        try {
            if (strObj instanceof objectHTML) {
                return (strObj);
            } else if (strObj.nodeType || strObj === window || strObj === document) {
                return (new objectHTML([strObj]));
            } else if ($_.isExists(strObj[0].nodeType)) {
                for (; $i < strObj.length; $i++) {
                    $push.push(strObj[$i]);
                }
            } else if (typeof strObj === 'string') {
                $push = $_.getAll(strObj.trim());
            }
            if ($push.length >= 1) {
                return (new objectHTML($push));
            }
        } catch (exception) {
            return (undefined);
        }
    }

    /**
     * *************************************
     * @private
     * Função auxiliar para o métodos:
     * - value
     * 
     * @param {OBJECT} obj
     * Informar o elemento para retorno de
     *  valor.
     *  
     * @return {STRING} Valor do elemento.
     * *************************************
     */
    function getValue(obj) {
        if (obj.type === 'checkbox' && obj.checked === false) {
            return ('');
        } else if (obj.type === 'radio' && obj.checked === false) {
            return ('');
        } else {
            return (obj.value);
        }
    }

    /**
     * *************************************
     * @private
     * Função auxiliar para os métodos:
     * - append
     * - prepend
     * - before
     * - after
     * 
     * @param {STRING/OBJECT} strObj
     * Informar o elemento que será anexo.
     * 
     * @returns {ARRAY}
     * Lista de elementos a serem anexos ou
     *  os que foram criados.
     * *************************************
     */
    function attSupport(strObj) {
        var $arr = [], $i = 0;
        if (strObj instanceof objectHTML) {
            $arr = strObj;
        } else if (strObj.length && strObj[0].nodeType) {
            for (; $i < strObj.length; $i++) {
                $arr.push(strObj[$i]);
            }
        } else {
            $arr.push($_.create(strObj));
        }
        return ($arr);
    }

    /**
     * **********************************************
     * @public
     * Adiciona função com vincluo a jsd.
     * 
     * @param {FUNCTION/OBJECT} fncObj
     * Informar uma função.
     * **********************************************
     */
    $_.addFunction = function (fncObj) {
        var $name = '', $prop = fncObj;
        for (var $def in $_) {
            if ($def === $prop.name) {
                console.warn('A função ' + $def + ' já existe');
                break;
            } else {
                if (typeof $prop === 'function') {
                    $_[$prop.name] = $prop;
                    break;
                } else if (typeof fncObj === 'object') {
                    for ($name in $prop) {
                        $_[$name] = $prop[$name];
                    }
                    break;
                }
            }
        }
    };

    /**
     * **********************************************
     * @public
     * Adiciona métodos com vincluo aos elementos.
     * 
     * @param {FUNCTION/OBJECT} fncObj
     * Informar uma função.
     * **********************************************
     */
    $_.addMethod = function (fncObj) {
        var $prop = fncObj, $name = '';
        for (var $def in $_.objectMethods) {
            if ($def === $prop.name) {
                console.warn('O método ' + $def + ' já existe');
                break;
            } else {
                if (typeof $prop === 'function') {
                    $_.objectMethods[$prop.name] = $prop;
                    break;
                } else if (typeof fncObj === 'object') {
                    for ($name in $prop) {
                        $_.objectMethods[$name] = $prop[$name];
                    }
                    break;
                }
            }
        }
    };

    /**
     * **********************************************
     * @public
     * Removendo índices duplicados de array.
     * 
     * @param {ARRAY} arr
     * Informar o array.
     * **********************************************
     */
    $_.arrayFilter = function (arr) {
        var $arr = [], $i = 0;
        for (; $i < arr.length; $i++) {
            if ($_.isExists(arr[$i]) && $arr.indexOf(arr[$i]) === -1) {
                $arr.push(arr[$i]);
            }
        }
        return ($arr);
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
        var $newArr = [], $i = 0;
        if ($_.isArray(arrA) && $_.isArray(arrB)) {
            $_.each(arrA, function (val) {
                $newArr[$i] = val;
                $i++;
            });
            $_.each(arrB, function (val) {
                $newArr[$i] = val;
                $i++;
            });
            return ($_.arrayFilter($newArr));
        }
    };

    /**
     * **********************************************
     * @private
     * Cria elementos.
     * 
     * @param {OBJECT} obj
     * Elemento para ser criado.
     * **********************************************
     */
    $_.create = function (obj) {
        var $create = undefined, $prop = {}, $dt = {};
        if (obj.nodeType) {
            return (obj);
        } else if ($_.isString(obj)) {
            $create = document.createElement('div');
            $create.innerHTML = obj;
            return ($create.firstChild);
        } else if ($_.isExists(obj.tagName)) {
            $create = document.createElement(obj.tagName);
            for (var $prop in obj) {
                if ($prop !== 'tagName' && obj[$prop] !== obj.tagName) {
                    $create[$prop] = obj[$prop];
                }
                if ($prop === 'data') {
                    for ($dt in obj[$prop]) {
                        $create.setAttribute('data-' + obj[$prop].name, obj[$prop].value);
                    }
                }
            }
            return ($create);
        }
        return (undefined);
    };

    /**
     * *****************************************
     * Executa um loop sobre objetos ou arrays
     * definindo um chamanda de função por trás
     * da execução a cada volta do loop.
     *  
     * @param {OBJECT/ARRAY} objArr
     * Objeto ou array para executar o loop.
     *  
     * @param {FUNCTION} callback
     * Função a se executada a cada volta do
     *  loop.
     * *****************************************
     */
    $_.each = function (objArr, callback) {
        if ($_.isDefined(objArr) && $_.isDefined(callback)) {
            for (var $i in objArr) {
                if (callback.call(objArr[$i], objArr[$i], $i) === false) {
                    break;
                }
            }
        } else {
            return (objArr);
        }
    };

    /**
     * *****************************************
     * Recarrega tags "javascript" realocando-as
     *  novamente no mesmo local.
     * 
     * @param {OBJECT/STRING} objStr
     * Elemento no documento para busca e
     *  realocamento de javascript.
     * *****************************************
     */
    $_.evalSrc = function (objStr) {
        var $this = $_(objStr)[0], $old = $this.getElementsByTagName('script'), $new = {}, $i = 0;
        if ($old.length) {
            for (; $i < $old.length; $i++) {
                $new = document.createElement('script');
                ($old[$i].src !== '' ? $new.src = $old[$i].src : null);
                ($old[$i].text !== '' ? $new.text = $old[$i].text : null);
                ($old[$i].type !== '' ? $new.type = $old[$i].text : null);
                if ($this === $old[$i].parentNode) {
                    $this.replaceChild($new, $old[$i]);
                }
            }
        }
    };

    /**
     * **********************************************
     * @public
     * Busca por quaisquer elementos que se enquadre
     * no documento.
     * 
     * @param {STRING} str
     * Informar o valor da busca.
     * **********************************************
     */
    $_.getAll = function (str) {
        return (new objectHTML(document.querySelectorAll(str)));
    };

    /**
     * **********************************************
     * @public
     * Busca por elementos pelo atributo "class" no
     * documento.
     * 
     * @param {STRING} str
     * Informar o valor da busca.
     * **********************************************
     */
    $_.getClass = function (str) {
        return (new objectHTML(document.getElementsByClassName(str)));
    };

    /**
     * **********************************************
     * @public
     * Busca por elementos pelo atributo "id" no
     * documento.
     * 
     * @param {STRING} str
     * Informar o valor da busca.
     * **********************************************
     */
    $_.getID = function (str) {
        return (new objectHTML([document.getElementById(str)]));
    };

    /**
     * **********************************************
     * @public
     * Busca por elementos pelo atributo "name" no
     * documento.
     * 
     * @param {STRING} str
     * Informar o valor da busca.
     * **********************************************
     */
    $_.getName = function (str) {
        return (new objectHTML(document.getElementsByName(str)));
    };

    /**
     * **********************************************
     * @public
     * Busca por elementos pela "tag" no documento.
     * 
     * @param {STRING} str
     * Informar o valor da busca.
     * **********************************************
     */
    $_.getTag = function (str) {
        return (new objectHTML(document.getElementsByTagName(str)));
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
        return (Array.isArray(arr) ? true : false);
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é um booleano.
     * 
     * @param {ANYTHING} any
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isBoolean = function (any) {
        return (typeof any === 'boolean' ? true : false);
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor está definido.
     * 
     * @param {ANYTHING} any
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isDefined = function (any) {
        return (typeof any === 'undefined' ? false : true);
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor existe.
     * 
     * @param {ANYTHING} any
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isExists = function (any) {
        return (typeof any !== 'undefined' && any !== null ? true : false);
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é uma função.
     * 
     * @param {ANYTHING} any
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isFunction = function (any) {
        return (typeof any === 'function' ? true : false);
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é um inteiro.
     * 
     * @param {ANYTHING} any
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isInt = function (any) {
        return (typeof any === 'number' && !isNaN(any)) ? true : false;
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é um objeto.
     * 
     * @param {ANYTHING} any
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isObject = function (any) {
        return (typeof any === 'object' && $_.isArray(any) === false ? true : false);
    };

    /**
     * **********************************************
     * @public
     * Verifica se o valor é uma string.
     * 
     * @param {ANYTHING} any
     * Informar o valor para verificação.
     * **********************************************
     */
    $_.isString = function (any) {
        return (typeof any === 'string' ? true : false);
    };

    /**
     * **********************************************
     * @public
     * Une dois objetos em um.
     * 
     * @param {OBJECT} objA
     * Informar um objeto.
     * 
     * @param {OBJECT} objB
     * Informar outro objeto.
     * **********************************************
     */
    $_.objectMerge = function (objA, objB) {
        for (var $name in objB) {
            objA[$name] = objB[$name];
        }
        return (objA);
    };

    // ==============================================
    // = MÉTODOS
    // ==============================================
    var $methods = {
        /**
         * *****************************************
         * Obtem o indice na instancia dos objetos.
         * 
         * @param {INTERGER} int
         * Informar o índice o object-array.
         * *****************************************
         */
        index: function (int) {
            if (!$_.isDefined(int)) {
                return (undefined);
            } else if (int > this.length) {
                return (undefined);
            } else {
                return ($_(this[int]));
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
                    if (callback.call(this[$i], $_(this[$i]), $i) === false) {
                        break;
                    }
                }
            }
        },
        /**
         * *****************************************
         * Compara se o elemento é igual ao mesmo
         *  elemento com a finalidade de impedir a
         *  repetição/duplicação de instâncias de
         *  objetos.
         *  
         * @param {OBJECT/STRING} objStr
         * Informar o que comparar
         * *****************************************
         */
        same: function (objStr) {
            var $str = $_.isString(objStr), $equal = $_(objStr), $i = 0;
            if ($_.isExists($equal)) {
                if ($str && this[0].matches) {
                    return (this[0].matches(objStr));
                } else {
                    for (; $i < $equal.length; $i++) {
                        if (this[0] === $equal[$i]) {
                            return (true);
                        }
                    }
                }
            }
            return (false);
        },

        /* Elementos relacionados */
        related: {
            /**
             * *************************************
             * Obtem o primeiro filho do elemento
             *  da instância.
             * *************************************
             */
            child: function () {
                return ($_(this[0].children[0]));
            },
            /**
             * *************************************
             * Obtem o primeiro elemento depois do
             *  elemento da instância.
             * *************************************
             */
            next: function () {
                if (!$_.isDefined(this[0].nextElementSibling)) {
                    return (undefined);
                } else {
                    return ($_(this[0].nextElementSibling));
                }
            },
            /**
             * *************************************
             * Obtem o primeiro elemento antes do
             *  elemento da instância.
             * *************************************
             */
            prev: function () {
                if (!$_.isDefined(this[0].previousElementSibling)) {
                    return (undefined);
                } else {
                    return ($_(this[0].previousElementSibling));
                }
            },
            /**
             * *************************************
             * Obtem o primeiro parente do elemento
             *  da instância.
             * *************************************
             */
            parent: function () {
                return ($_(this[0].parentNode));
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) internos ao
             *  elemento da instância.
             * 
             * @param {STRING} str
             * Informar o elemento para procurar.
             * *************************************
             */
            find: function (str) {
                var $target = this[0].querySelectorAll(str), $nodeList = [], $i = 0;
                if (!$_.isDefined($target)) {
                    return (undefined);
                } else if (str instanceof objectHTML) {
                    return (str);
                } else {
                    for (; $i < $target.length; $i++) {
                        $nodeList.push($target[$i]);
                    }
                    return ($_($nodeList));
                }
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) filhos do
             *  elemento da instância.
             * 
             * @param {STRING/OBJECT} strObj (opcional)
             * Informar o elemento para procurar.
             * Se não informado retorna todos
             *  filhos diretos.
             * *************************************
             */
            childAll: function (strObj) {
                var $child = this[0].children, $nodeList = [], $i = 0;
                if (!$_.isDefined($child)) {
                    return (undefined);
                } else if (strObj instanceof objectHTML) {
                    return (strObj);
                } else {
                    for ($i = 0; $i < $child.length; $i++) {
                        if (strObj) {
                            if ($_($child[$i]).same(strObj)) {
                                $nodeList.push($child[$i]);
                            }
                        } else {
                            $nodeList.push($child[$i]);
                        }
                    }
                    return ($_($nodeList));
                }
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) depois do
             *  elemento da instância.
             * 
             * @param {STRING/OBJECT} strObj (opcional)
             * Informar o elemento para procurar.
             * Se não informado retorna todos
             *  elementos posteriores.
             * *************************************
             */
            nextAll: function (strObj) {
                var $current = this[0].nextElementSibling, $target = null, $nodeList = [];
                if (!$_.isDefined($current)) {
                    return (undefined);
                } else if (strObj instanceof objectHTML) {
                    return (strObj);
                } else {
                    while ($current) {
                        $target = $current;
                        if (strObj) {
                            if ($_($target).same(strObj)) {
                                $nodeList.push($target);
                            }
                        } else {
                            $nodeList.push($target);
                        }
                        $current = $target.nextElementSibling;
                    }
                    return ($_($nodeList));
                }
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) antes do
             *  elemento da instância.
             * 
             * @param {STRING/OBJECT} strObj (opcional)
             * Informar o elemento para procurar.
             * Se não informado retorna todos
             *  elementos anteriores.
             * *************************************
             */
            prevAll: function (strObj) {
                var $current = this[0].previousElementSibling, $target = null, $nodeList = [];
                if (!$_.isDefined($current)) {
                    return (undefined);
                } else if (strObj instanceof objectHTML) {
                    return (strObj);
                } else {
                    while ($current) {
                        $target = $current;
                        if (strObj) {
                            if ($_($target).same(strObj)) {
                                $nodeList.push($target);
                            }
                        } else {
                            $nodeList.push($target);
                        }
                        $current = $target.previousElementSibling;
                    }
                    return ($_($nodeList));
                }
            },
            /**
             * *************************************
             * Obtem o(s) elemento(s) parentes do
             *  elemento da instância.
             * 
             * @param {STRING/OBJECT} strObj (opcional)
             * Informar o elemento para procurar
             * Se não informado retorna todos
             *  parentes.
             * *************************************
             */
            parentAll: function (strObj) {
                var $current = this[0].parentNode, $target = null, $nodeList = [];
                if (!$_.isDefined($current)) {
                    return (undefined);
                } else if (strObj instanceof objectHTML) {
                    return (strObj);
                } else {
                    while ($current && $current !== document) {
                        $target = $current;
                        if (strObj) {
                            if ($_($target).same(strObj)) {
                                $nodeList.push($target);
                            }
                        } else {
                            $nodeList.push($target);
                        }
                        $current = $target.parentNode;
                    }
                    return ($_($nodeList));
                }
            }
        }, // elements

        /* Métodos de anexos */
        attachment: {
            /**
             * *************************************
             * Adiciona elemento depois do elemento
             *  da instância.
             * 
             * @param {STRING/OBJECT} strObj
             * Informar o elemento para adicionar.
             * *************************************
             */
            after: function (strObj) {
                if ($_.isExists(strObj)) {
                    var $after = attSupport(strObj), $i = 0;
                    for (; $i < $after.length; $i++) {
                        this[0].parentNode.insertBefore($after[$i], this[0].nextSibling);
                    }
                    $_.evalSrc(this[0].parentNode); // too much recursion
                }
            },
            /**
             * *************************************
             * Adiciona elemento antes do elemento
             *  da instância.
             * 
             * @param {STRING/OBJECT} strObj
             * Informar o elemento para adicionar.
             * *************************************
             */
            before: function (strObj) {
                if ($_.isExists(strObj)) {
                    var $before = attSupport(strObj), $i = 0;
                    for (; $i < $before.length; $i++) {
                        this[0].parentNode.insertBefore($before[$i], this[0]);
                    }
                    $_.evalSrc(this[0].parentNode);
                }
            },
            /**
             * *************************************
             * Adiciona elemento dentro do elemento
             *  da instância.
             * 
             * @param {STRING/OBJECT} strObj
             * Informar o elemento para adicionar.
             * *************************************
             */
            append: function (strObj) {
                if ($_.isExists(strObj)) {
                    var $append = attSupport(strObj), $i = 0;
                    for (; $i < $append.length; $i++) {
                        this[0].appendChild($append[$i]);
                    }
                    $_.evalSrc(this[0]);
                }
            },
            /**
             * *************************************
             * Adiciona elemento dentro do elemento
             *  da instância, antes de qualquer
             *  outro elemento interno.
             * 
             * @param {STRING/OBJECT} strObj
             * Informar o elemento para adicionar.
             * *************************************
             */
            prepend: function (strObj) {
                if ($_.isExists(strObj)) {
                    var $prepend = attSupport(strObj), $i = 0;
                    for (; $i < $prepend.length; $i++) {
                        this[0].insertBefore($prepend[$i], this[0].firstChild);
                    }
                    $_.evalSrc(this[0]);
                }
            },
            /**
             * *************************************
             * Limpa/remove conteúdo interno do(s)
             *  elemento(s) da instância.
             *  
             * @param {STRING} strObj
             * Alvo para eliminar.
             * Se não informado limpa todo conteúdo
             *  interno.
             * *************************************
             */
            clear: function (strObj) {
                var $target = undefined, $i, $j;
                for ($i = 0; $i < this.length; $i++) {
                    if (strObj) {
                        $target = $_(this[$i]).childAll(strObj);
                        for ($j = 0; $j < $target.length; $j++) {
                            $target[$j].parentNode.removeChild($target[$j]);
                        }
                    } else {
                        while (this[$i].childNodes.length) {
                            this[$i].removeChild(this[$i].firstChild);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Remove o elemento da instância
             *  no documento.
             * *************************************
             */
            remove: function () {
                for (var $i = 0; $i < this.length; $i++) {
                    if ($_.isExists(this[$i].parentNode) && /^(body|html)$/i.test(this[0].tagName) === false) {
                        this[$i].parentNode.removeChild(this[$i]);
                    }
                }

            }
        }, // attachment

        /* Métodos de escrita */
        write: {
            /**
             * *************************************
             * Escreve HTML no elemento.
             * 
             * @param {STRING} str (opcional)
             * Informar o HTML a escrever.
             * Se não informado retorna a estrutura
             *  HTML no elemento.
             * *************************************
             */
            html: function (str) {
                var $length = this.length, $i = 0;
                if ($_.isDefined(str)) {
                    for (; $i < $length; $i++) {
                        this[$i].innerHTML = str;
                        $_.evalSrc(this[$i]);
                    }
                } else {
                    return (this[0].innerHTML);
                }
            },
            /**
             * *************************************
             * Escreve texto no elemento.
             * 
             * @param {STRING} str (opcional)
             * Informar o texto a escrever
             * Se não informado retorna o texto
             *  contido no elemento.
             * *************************************
             */
            text: function (str) {
                var $length = this.length, $i = 0;
                if ($_.isDefined(str)) {
                    for (; $i < $length; $i++) {
                        this[$i].innerText = str;
                    }
                } else {
                    return (this[0].innerText);
                }
            }
        }, // write

        /* Métodos de atributos */
        attributes: {
            /**
             * *************************************
             * Obtem valor do(s) atributo(s) no
             *  elemento.
             * 
             * @param {STRING} str (opcional)
             * Informar o atributo a obter o valor.
             * Se não informado retorna array com
             *  todos atributos presentes.
             * *************************************
             */
            attr: function (str) {
                var $attr = this[0].attributes, $i = 0, $attrs = {}, $accept = false;
                for (; $i < $attr.length; $i++) {
                    if ($_.isString(str)) {
                        if (str === $attr[$i].nodeName) {
                            $attrs = $attr[$i].nodeValue;
                            $accept = true;
                        }
                    } else {
                        $attrs[$attr[$i].nodeName] = $attr[$i].nodeValue;
                        $accept = true;
                    }
                }
                return ($accept ? $attrs : undefined);
            },
            /**
             * *************************************
             * Define/criar atributos no elemento.
             * 
             * @param {OBJECT} obj
             * Informar o atributo e seu valor a
             *  ser criado.
             * *************************************
             */
            setAttr: function (obj) {
                var $this = this, $i = 0;
                if ($_.isObject(obj)) {
                    for (; $i < $this.length; $i++) {
                        for (var $x in obj) {
                            $this[$i].setAttribute($x, obj[$x]);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Remove atributos no elemento.
             * 
             * @param {STRING} str (opcional)
             * Informar o nome do atributo a ser
             *  removido.
             * *************************************
             */
            removeAttr: function (str) {
                var $attr = $_.isString(str), $this = this, $i = 0;
                for (; $i < $this.length; $i++) {
                    if ($attr) {
                        $this[$i].removeAttribute(str);
                    } else {
                        while ($this[$i].attributes.length) {
                            $this[$i].removeAttribute($this[$i].attributes[0].nodeName);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Define elemento como marcado.
             * 
             * @param {BOOLEAN} bool (opcional)
             * Informar true para desabilitar e
             *  false para habilitar.
             * *************************************
             */
            checked: function (bool) {
                var $bool = typeof bool, $this = this, $i = 0;
                if ($bool === 'undefined') {
                    return (this[0].checked ? true : false);
                } else {
                    for (; $i < $this.length; $i++) {
                        if ($bool === 'boolean') {
                            $this[$i].checked = (bool ? true : false);
                        } else if (bool === 'toggle') {
                            $this[$i].checked = (this[0].checked ? false : true);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Desabilita elemento.
             * 
             * @param {BOOLEAN} bool (opcional)
             * Informar true para desabilitar e
             *  false para habilitar.
             * *************************************
             */
            disable: function (bool) {
                var $bool = typeof bool, $this = this, $i = 0;
                if ($bool === 'undefined') {
                    return (this[0].disabled ? true : false);
                } else {
                    for (; $i < $this.length; $i++) {
                        if ($bool === 'boolean') {
                            if (bool) {
                                $this[$i].setAttribute('disabled', 'true');
                            } else {
                                $this[$i].removeAttribute('disabled');
                            }
                        } else if (bool === 'toggle') {
                            $this[$i].disabled = (this[0].disabled ? false : true);
                        }
                    }
                }
            }
        }, // attributes

        /* Metodos de classificador */
        classifier: {
            /**
             * *************************************
             * Adiciona na propriedade de "class"
             *  do elemento novos valores.
             * 
             * @param {STRING} str
             * Informar o(s) valor(es) separados por
             *  espaço.
             * *************************************
             */
            addClass: function (str) {
                if ($_.isString(str)) {
                    var $add = str.split(' '), $i, $j;
                    for ($i = 0; $i < this.length; $i++) {
                        for ($j = 0; $j < $add.length; $j++) {
                            this[$i].classList.add($add[$j]);
                        }
                    }
                }
            },
            /**
             * *************************************
             * Remove na propriedade de "class"
             *  do elemento valores.
             * 
             * @param {STRING} str (opcional)
             * Informar o(s) valor(es) separados por
             *  espaço.
             * Se não informado remove tudo.
             * *************************************
             */
            removeClass: function (str) {
                var $remove = ($_.isString(str) ? str.split(' ') : false), $i, $j;
                for ($i = 0; $i < this.length; $i++) {
                    if ($remove) {
                        for ($j = 0; $j < $remove.length; $j++) {
                            this[$i].classList.remove($remove[$j]);
                        }
                    } else {
                        this[$i].className = '';
                    }
                }
            },
            /**
             * *************************************
             * Verifica se na propriedade "class"
             *  do(s) elemento(s) possui o valor.
             * 
             * @param {STRING} str (opcional)
             * Informar o valor.
             * Se não informado retorna o todos os
             *  valores quando eles existirem.
             * *************************************
             */
            classList: function (str) {
                if (this[0].className === '') {
                    return (undefined);
                } else if (!$_.isDefined(str)) {
                    return (this[0].classList);
                } else {
                    return (this[0].classList.contains(str));
                }
            },
            /**
             * *************************************
             * Redefine a propriedade "class" do
             *  elemento.
             * 
             * @param {STRING} str (opcional)
             * Informar o valor.
             * Se não informado retorna o valor do
             *  atributo.
             * *************************************
             */
            className: function (str) {
                if ($_.isString(str)) {
                    this[0].className = str;
                } else {
                    return (this[0].className);
                }
            },
            /**
             * *************************************
             * Adiciona ou remove valor na
             * propriedade "class" do elemento.
             * 
             * @param {STRING} str
             * Informar o(s) valor(es) separados por
             *  espaço.
             * Nota!
             * Se houver mais de um valor em "x"
             * e o elemento já possuir algum desses
             *  valores aquele que exite é retirado
             *  e os demais adicionados.
             * *************************************
             */
            toggleClass: function (str) {
                if ($_.isString(str)) {
                    var $toggle = str.split(' '), $i, $j;
                    for ($i = 0; $i < this.length; $i++) {
                        for ($j = 0; $j < $toggle.length; $j++) {
                            this[$i].classList.toggle($toggle[$j]);
                        }
                    }
                }
            }
        }, // classifier

        /* Metodos de formatos para estilo */
        styles: {
            /**
             * *************************************
             * Verifica ou define estilo para o
             *  elemento da intância.
             * 
             * @param {STRING/OBJECT} strObj
             * Qual propriedade computada.
             * Se não informado retorna todo estilo
             *  computado.
             * Se string retorna o valor do estilo
             *  compuado.
             * Se objeto define o estilo inline.
             * *************************************
             */
            css: function (strObj) {
                var $this = this, $prop = {}, $i;
                if ($_.isString(strObj)) {
                    return (window.getComputedStyle($this[0], null).getPropertyValue(strObj));
                } else if ($_.isObject(strObj)) {
                    for ($i = 0; $i < $this.length; $i++) {
                        for ($prop in strObj) {
                            $this[$i].style[$prop] = strObj[$prop];
                        }
                    }
                } else {
                    return (window.getComputedStyle($this[0], null));
                }
            },
            /**
             * *************************************
             * Verifica ou define a altura para o
             *  elemento da intância.
             * 
             * @param {BOOLEAN/STRING} boolStr
             * Se não informado retorna a altura
             *  ocupada.
             * Se não informado como "true" retorna
             *  a altura ocupada junto a suas
             *  margens.
             * Se não informado como "texto" define
             *  a altura.
             * *************************************
             */
            height: function (boolStr) {
                if ($_.isString(boolStr)) {
                    for (var $i = 0; $i < this.length; $i++) {
                        this[$i].style.height = boolStr;
                    }
                } else if (boolStr === true) {
                    var $css = this.css();
                    return (this[0].offsetHeight
                            + parseFloat($css.getPropertyValue('margin-top'))
                            + parseFloat($css.getPropertyValue('margin-bottom')));
                } else {
                    return (this[0].offsetHeight);
                }
            },
            /**
             * *************************************
             * Verifica ou define a largura para o
             *  elemento da intância.
             * 
             * @param {BOOLEAN/STRING} boolStr (opcional)
             * Se não informado retorna a largura
             *  ocupada.
             * Se não informado como "true" retorna
             *  a largura ocupada junto a suas
             *  margens.
             * Se não informado como "texto" define
             *  a largura.
             * *************************************
             */
            width: function (boolStr) {
                if ($_.isString(boolStr)) {
                    for (var $i = 0; $i < this.length; $i++) {
                        this[$i].style.width = boolStr;
                    }
                } else if (boolStr === true) {
                    var $css = this.css();
                    return (this[0].offsetWidth
                            + parseFloat($css.getPropertyValue('margin-right'))
                            + parseFloat($css.getPropertyValue('margin-left')));
                } else {
                    return (this[0].offsetWidth);
                }
            },
            /**
             * *************************************
             * Obtem a correta posição do elemento
             *  da intância no documento.
             * *************************************
             */
            position: function () {
                var $this = this[0],
                        $body = document.body,
                        $rect = $this.getBoundingClientRect(),
                        $top = $this.clientTop || $body.clientTop || 0,
                        $left = $this.clientLeft || $body.clientLeft || 0,
                        $scrollTop = $this === window ? window.scrollY : $this.scrollTop,
                        $scrollLeft = $this === window ? window.scrollX : $this.scrollLeft;
                return ({
                    top: ($rect.top + $scrollTop) - $top,
                    left: ($rect.left + $scrollLeft) - $left
                });
            }
        }, // styles

        /* Metodos de definição de valores */
        values: {
            /**
             * *************************************
             * Obtem os dados do dataset.
             * 
             * @param {STRING} str (opcional)
             * Informar o dataset.
             * Se não informado retorna todos os
             *  dados do dataset no elemento.
             * *************************************
             */
            data: function (str) {
                var $target = '', $match = null, $dataSet = this[0].dataset;
                if ($_.isString(str)) {
                    $match = str.split('-');
                    $target = ($match[0] === 'data' ? str.substr(str.lastIndexOf('data-') + 5) : str).toLowerCase();
                    for (var $dt in $dataSet) {
                        if ($dt.toLowerCase() === $target) {
                            return ($dataSet[$dt]);
                        }
                    }
                } else {
                    return ($dataSet);
                }
            },
            /**
             * *************************************
             * Obtem os dados do dataset.
             * 
             * @param {OBJECT} obj
             * Informar dataset's e seus valores.
             * *************************************
             */
            setData: function (obj) {
                if ($_.isObject(obj)) {
                    var $this = this, $prop = {}, $i;
                    for ($i = 0; $i < $this.length; $i++) {
                        for ($prop in obj) {
                            $this[$i].setAttribute('data-' + $prop, obj[$prop]);
                        }
                    }
                }
            },

            /**
             * *************************************
             * Alterar o índice no elemento cujo a
             *  tag for um "select".
             * 
             * @param {INTERGER} int (opcional)
             * Informar o índice das opções
             *  disponíveis.
             * Se não informado retorna o índice
             *  selecionado no(s) elemento(s).
             * *************************************
             */
            selectIndex: function (int) {
                var $selected = parseInt(int), $i = 0, $options = 0;
                if (this[0].tagName.toLowerCase() === 'select') {
                    if ($_.isInt($selected) && $selected >= 1) {
                        for (; $i < this.length; $i++) {
                            $options = this[$i].childElementCount;
                            this[$i].selectedIndex = ($selected > $options ? this[$i].selectedIndex : $selected);
                        }
                    } else {
                        return (this[0].selectedIndex);
                    }
                }
            },
            /**
             * *************************************
             * Define o valor no elemento.
             * 
             * @param {STRING} str (opcional)
             * Informar o valor a definir.
             * Se não informado retorna o valor
             *  contido no elemento(s).
             * *************************************
             */
            value: function (str) {
                if ($_.isDefined(str)) {
                    for (var $i = 0; $i < this.length; $i++) {
                        this[$i].value = str;
                    }
                } else if (this[0].tagName.toLowerCase() === 'form') {
                    var $elements = this[0].elements, $i = 0, $arr = [];
                    for (; $i < $elements.length; $i++) {
                        $arr.push({name: $elements[$i].name, value: getValue($elements[$i])});
                    }
                    return ($arr);
                } else {
                    return (getValue(this[0]));
                }
            },
            /**
             * *************************************
             * Retorna os elementos contidos em
             *  formulário.
             * *************************************
             */
            formElements: function () {
                if (this[0].tagName.toLowerCase() === 'form') {
                    return ($_(this[0].elements));
                }
            },
            /**
             * *************************************
             * Cria um cabeçalho URI com os valores
             * dos elementos contidos em
             *  formulário.
             * *************************************
             */
            serialize: function () {
                if (this[0].tagName.toLowerCase() === 'form') {
                    var $elements = this[0].elements, $i = 0, $arr = [];
                    for (; $i < $elements.length; $i++) {
                        if ($elements[$i].name === '' || $elements[$i].disabled === true) {
                            continue;
                        } else {
                            $arr.push(encodeURIComponent($elements[$i].name) + '=' + encodeURIComponent(getValue($elements[$i])));
                        }
                    }
                    return ($arr.join('&'));
                }
            }
        }, // values

        /* Métodos de eventos */
        events: {
            /**
             * *************************************
             * Adiciona ouvinte de evento no
             *  elemento.
             * 
             * @param {STRING} type
             * Qual ação que aciona a função.
             * 
             * @param {FUNCTION} fnc
             * Função ouvinte.
             * 
             * @param {BOOLEAN} cap
             * Utilizar ou não user-capture.
             * *************************************
             */
            on: function (type, fnc, cap) {
                var $this = this, $i = 0, $name = '', $type = (type || '').toString().toLowerCase(), $insert = true;
                for (; $i < $this.length; $i++) {
                    $this[$i].event = $this[$i].event || {};
                    if ($type.length >= 1 && $_.isFunction(fnc)) {
                        for ($name in $this[$i].event) {
                            if ($name === $type) {
                                console.warn('addEventListener já está definido como');
                                $insert = false;
                                break;
                            }
                        }
                        if ($insert) {
                            $this[$i].event[$type] = fnc;
                            $this[$i].addEventListener($type, fnc, (cap === true ? true : false));
                        }
                    }
                }
            },
            /**
             * *************************************
             * Remove ouvinte de evento no elemento.
             * 
             * @param {STRING} type
             * Qual ouvinte ou função para remover.
             * *************************************
             */
            off: function (type) {
                var $this = this, $i = 0, $name = '', $function = (type || '').toString(), $type = $function.toLowerCase();
                for (; $i < $this.length; $i++) {
                    $this[$i].event = $this[$i].event || {};
                    for ($name in $this[$i].event) {
                        if ($type.length >= 1) {
                            if ($type === $name || $function === $this[$i].event[$name].name) {
                                $this[0].removeEventListener($name, $this[$i].event[$name], false);
                                delete $this[$i].event[$name];
                            }
                        } else {
                            $this[$i].removeEventListener($name, $this[$i].event[$name], false);
                            delete $this[$i].event[$name];
                        }
                    }
                }
            },
            /**
             * *************************************
             * Executa ouvinte de evento no
             *  elemento.
             * 
             * @param {STRING} type
             * Qual é o tipo de situação para
             *  ativar a função.
             * *************************************
             */
            trigger: function (type) {
                var $this = this, $i = 0, $name = '', $event = '', $type = (type || '').toString().toLowerCase();
                for (; $i < $this.length; $i++) {
                    $this[$i].event = $this[$i].event || {};
                    for ($name in $this[$i].event) {
                        if ($type.length >= 1) {
                            if ($name === $type) {
                                $event = $type;
                            }
                        } else {
                            $event = $name;
                        }
                        $this[$i].dispatchEvent(new Event($event, {bubbles: true, cancelable: true}));
                    }
                }
            }
        } // events

    }; // $methods

    /*
     * **********************************************
     * Define os métodos para os objetos HTML
     * **********************************************
     */
    Object.keys($methods).forEach(function (e) {
        if (typeof $methods[e] === 'function') {
            $_.objectMethods[e] = $methods[e];
        } else if (typeof $methods[e] === 'object') {
            for (var key in $methods[e]) {
                $_.objectMethods[key] = $methods[e][key];
            }
        }
    });

    /*
     * **********************************************
     * Expande novos métodos para eventos sobre os
     *  objetos HTML.
     * Executa através de events.on()
     * **********************************************
     */
    $_.each([
        // Mouse
        'click', 'dblclick', 'auxclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'contextmenu',
        // Teclado
        'keydown', 'keypress', 'keyup',
        // Foco
        'blur', 'focus', 'focusin', 'focusout',
        // Form
        'change', 'reset', 'select', 'submit',
        // Toque
        'touchstart', 'touchend', 'touchcancel', 'touchmove',
        // Tela cheia
        'fullscreenchange', 'fullscreenerror',
        // Área de transferencia
        'copy', 'cut', 'paste',
        // Outros
        'load', 'unload', 'cancel', 'error', 'scroll', 'resize'
    ], function (value) {
        $_.objectMethods[value] = function (fnc) {
            this.on(value, fnc);
        };
    });

    window.jsd = $_;
}());
