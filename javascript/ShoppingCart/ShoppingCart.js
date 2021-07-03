/**
 * ****************************************************
 * * ShoppingCart
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2021
 * * @version 1.1 (2021)
 * ****************************************************
 * * Carrinho de compras.
 * * Adiciona itens selecionados a um formulário para
 *   envio de dados.
 * 
 * ****************************************************
 * @requires
 * Estrutura HTML
 * <div id="shopping-cart">
 *     <div data-cart=""></div>
 *     <form method="POST" action=""></form>
 * </div>
 * ****************************************************
 */

/**
 * ****************************************************
 * * @param {STR} boxes (opcional)
 * Informe o classificador ".class" dos elementos
 *  checkbox que vão está disponíveis já no
 *  carregamento do script.
 * ****************************************************
 */
var ShoppingCart = function (boxes) {
    var $base = document.getElementById('shopping-cart'), $initBox;
    var $this = {
        text: $base.querySelector('[data-cart=""]'),
        form: $base.getElementsByTagName('form')[0],
        target: null,
        count: 0,
        memory: []
    };
    formInput();

    /**
     * ************************************************
     * Memoriza quaisquer input's já contidos no
     *  formulário de envio.
     * 
     * @private
     * ************************************************
     */
    function formInput() {
        for (var $i = 0; $i < $this.form.children.length; $i++) {
            $this.memory.push($i);
        }
    }

    /**
     * ************************************************
     * Requisita funções quando o checkbox é alterado.
     * - Marcado: Adiciona elemento no carrinho.
     * - Desmarcado: Remove elemento no carrinho.
     * - Atuliza contagem de elementos no carrinho.
     * * @param {OBJ} e
     * Evento disparado.
     * 
     * @private
     * ************************************************
     */
    function changeInput(e) {
        $this.target = e.target;
        if ($this.target.checked) {
            $this.count++;
            insertInput();
        } else {
            $this.count--;
            removeInput();
        }
        updateCount();
    }

    /**
     * ************************************************
     * Adiciona um input no carrinho com os atributos
     *  [name] & [value] idênticos ao checkbox marcado.
     * 
     * @private
     * ************************************************
     */
    function insertInput() {
        var $new = document.createElement('input');
        $new.type = 'hidden';
        $new.name = $this.target.name;
        $new.value = $this.target.value;
        $this.form.appendChild($new);
        $this.memory.push($new);
    }

    /**
     * ************************************************
     * Remove um input com o mesmo valor do checkbox
     *  desmarcado.
     * 
     * @private
     * ************************************************
     */
    function removeInput() {
        for (var $i = 0; $i < $this.memory.length; $i++) {
            if ($this.memory[$i].value == $this.target.value) {
                $this.memory.splice($i, 1);
            }
        }
        var $unLink = $this.form.querySelector('input[value="' + $this.target.value + '"]');
        $this.form.removeChild($unLink);
    }

    /**
     * ************************************************
     * Mostra ou esconde o elemento DIV do carrinho e
     *  mostra o contador de quantos itens estão no
     *  carrinho.
     * 
     * @private
     * ************************************************
     */
    function updateCount() {
        if ($this.count >= 1) {
            $base.classList.add('opened');
        } else {
            $base.classList.remove('opened');
        }
        $this.text.innerText = ($this.count >= 1 ? 'Selecionados (' + $this.count + ')' : null);
    }

    /**
     * ************************************************
     * Quando reiniciado o carrinho desmarca todas as
     *  caixas que enviaram dados.
     * @param {OBJ} e 
     * 
     * @private
     * ************************************************
     */
    function unCheck(e) {
        if (e.checked) {
            e.checked = null;
        }
    }

    /**
     * ************************************************
     * Adiciona ouvinte de eventos para quando a caixa
     *  de seleção é alterada.
     * * @param {OBJ} input
     * input "checkbox" alvo
     * 
     * @public
     * ************************************************
     */
    this.addInput = function (input) {
        if (input.type === 'checkbox' && !input.classList.contains('cart-add')) {
            if (input.checked) {
                input.checked = null;
            }
            input.classList.add('cart-add');
            input.addEventListener('change', changeInput, false);
        }
    };

    /**
     * ************************************************
     * Reinicia o carrinho
     * 
     * @public
     * ************************************************
     */
    this.restart = function () {
        var $delInpt = $this.form.querySelectorAll('input');
        for (var $i = 0; $i < $delInpt.length; $i++) {
            if ($this.memory.includes($delInpt[$i])) {
                $this.form.removeChild($delInpt[$i]);
            }
        }
        document.querySelectorAll('input.cart-add').forEach(unCheck);

        $this.memory.splice(0, $this.memory.length);
        $this.text.innerText = null;
        $this.target = null;
        $this.count = 0;
        $base.classList.remove('opened');
        formInput();
    };

    /**
     * ************************************************
     * Se definido elementos checkbox no carregamento
     * do script adiciona os mesmo as funções.
     * ************************************************
     */
    if (boxes) {
        $initBox = document.getElementsByClassName(boxes);
        for (var $i = 0; $i < $initBox.length; $i++) {
            this.addInput($initBox[$i]);
        }
    }
};
