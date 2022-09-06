/**
 * **************************************************
 * Class ShoppingCart
 * @author Spell-Master (Omar Pautz)
 * @copyright 2021
 * @version 2.0 (2022)
 * 
 * Carrinho de compras.
 * 
 * @param {OBJECT} options
 * * 'action': Atributo action para o formulário.
 * * 'sendText': Texto para o botão de envio.
 * * 'maxCheck': Quantidade máxima de itens que podem
 * ser selecionados.
 * * 'submit': Função a ser executada quando a
 * quando o formulário é submetido.
 * **************************************************
 */

var ShoppingCart = function (options) {

    options = options || {};

    var $options = {
        action: typeof options.action === 'string' ? options.action : '',
        sendText: typeof options.sendText === 'string' ? options.sendText : 'Enviar',
        maxCheck: typeof options.maxCheck === 'number' ? options.maxCheck : 99,
        submit: typeof options.submit === 'function' ? options.submit : undefined
    }, $boxOpen = {
        open: null, // div para mostrar o botão de abrir e quantidade de selecionados
        text: null, // div para mostrar a quantidade de selecionados
        btn: null, //  button ao para abrir
        submit: null // botão para enviar formulário
    }, $boxCart = {
        cart: null, // div para abrigar a lista e o carrinho
        btn: null, // botão para fechar
        container: null, // lista dos itens selecionados
        form: null, // formulário
        submit: null // botão para enviar formulário
    }, $this = {
        tgt: undefined, // atual checkbox
        memory: [], // memorizar os checkbox adcionados
        index: 0, // índice do checkbox adcionado
        count: 0, // contagem dos selecionados
        open: false // abrir ou fechar carrinho
    };

    /**
     * **********************************************
     * @private
     * Abre ou fecha a lista de itens do carrinho.
     * **********************************************
     */
    function toggleCart() {
        $boxOpen.open.classList.toggle('open');
        $boxCart.cart.classList.toggle('open');
        $this.open = ($this.open === true ? false : true);
    }

    /**
     * **********************************************
     * @private
     * Cria a estrutura inicial que abre e mostra
     *  quantos itens estão selecionados.
     * **********************************************
     */
    function createOpen() {
        $boxOpen.open = document.createElement('div');
        $boxOpen.open.setAttribute('data-shopping-open', '');

        $boxOpen.text = document.createElement('div');
        $boxOpen.text.classList.add('count-cart');
        $boxOpen.text.innerText = 'Selecionados (0)';
        $boxOpen.open.appendChild($boxOpen.text);

        $boxOpen.submit = document.createElement('button');
        $boxOpen.submit.classList.add('cart-submit');
        $boxOpen.submit.title = $options.sendText;
        $boxOpen.submit.addEventListener('click', sendForm, false);
        $boxOpen.open.appendChild($boxOpen.submit);

        $boxOpen.btn = document.createElement('button');
        $boxOpen.btn.classList.add('cart-open');
        $boxOpen.btn.title = 'Abrir Carrinho';
        $boxOpen.btn.addEventListener('click', toggleCart, false);
        $boxOpen.open.appendChild($boxOpen.btn);

        document.body.appendChild($boxOpen.open);
    }

    /**
     * **********************************************
     * @private
     * Cria a estrutura do carrinho lista e
     *  formulário.
     * **********************************************
     */
    function createCart() {
        $boxCart.cart = document.createElement('div');
        $boxCart.cart.setAttribute('data-shopping-cart', '');

        $boxCart.btn = document.createElement('button');
        $boxCart.btn.classList.add('cart-close');
        $boxCart.btn.innerText = 'X';
        $boxCart.btn.title = 'Fechar Carrinho';
        $boxCart.btn.addEventListener('click', toggleCart);
        $boxCart.cart.appendChild($boxCart.btn);

        $boxCart.container = document.createElement('div');
        $boxCart.container.classList.add('cart-container');
        $boxCart.cart.appendChild($boxCart.container);

        $boxCart.form = document.createElement('form');
        $boxCart.form.method = 'POST';
        $boxCart.form.action = $options.action;
        $boxCart.container.appendChild($boxCart.form);

        $boxCart.submit = $boxOpen.submit.cloneNode(true);
        $boxCart.submit.innerText = $options.sendText;
        $boxCart.submit.addEventListener('click', sendForm, false);
        $boxCart.container.appendChild($boxCart.submit);

        document.body.appendChild($boxCart.cart);
    }

    /**
     * **********************************************
     * @private
     * Cria um novo input sempre quando um checkbox
     *  é marcado.
     * **********************************************
     */
    function createInput() {
        for (var $i = 0; $i < $this.memory.length; $i++) {
            if ($this.tgt.dataset.cartAdd == $this.memory[$i].index) {
                var $new = {
                    input: document.createElement('input'),
                    item: document.createElement('div'),
                    name: document.createElement('div'),
                    remove: document.createElement('button')
                };
                $new.input.type = 'hidden';
                $new.input.setAttribute('data-cart-add', $this.memory[$i].index);
                $new.input.name = $this.tgt.name;
                $new.input.value = $this.tgt.value;
                $boxCart.form.appendChild($new.input);

                $new.item.classList.add('cart-add');
                $new.item.setAttribute('data-cart-add', $this.memory[$i].index);
                $boxCart.container.insertBefore($new.item, $boxCart.submit);

                $new.name.classList.add('cart-name');
                $new.name.innerText = $this.memory[$i].name;
                $new.item.appendChild($new.name);

                $new.remove.classList.add('cart-remove');
                $new.remove.setAttribute('data-cart-add', $this.memory[$i].index);
                $new.remove.title = 'Remover';
                $new.remove.addEventListener('click', removeItem, false);
                $new.item.appendChild($new.remove);
            }
        }
    }

    /**
     * **********************************************
     * @private
     * Remove o input e o item relacionado
     *  sempre quando um checkbox é desmarcado.
     * **********************************************
     */
    function removeInput() {
        var $ipt = $boxCart.form.querySelector('input[data-cart-add="' + $this.tgt.dataset.cartAdd + '"]'),
            $itm = $boxCart.container.querySelector('div[data-cart-add="' + $this.tgt.dataset.cartAdd + '"]');
        if ($this.count >= 1) {
            $itm.classList.add('remove');
        }
        setTimeout(function () {
            $boxCart.form.removeChild($ipt);
            $boxCart.container.removeChild($itm);
        }, 500);
    }

    /**
     * **********************************************
     * @private
     * Remove o input e o item relacionado
     *  sempre quando clicado no botão da lixeira.
     * @param {OBJECT} e 
     * **********************************************
     */
    function removeItem(e) {
        $this.tgt = e.target;
        for (var $i = 0; $i < $this.memory.length; $i++) {
            if ($this.tgt.dataset.cartAdd == $this.memory[$i].index) {
                $this.memory[$i].input.checked = null;
                removeInput();
                $this.count--;
                updateCount();
            }
        }
    }

    /**
     * **********************************************
     * @private
     * Altera o contador de itens selecionados.
     * **********************************************
     */
    function updateCount() {
        if ($this.count < 1) {
            $boxOpen.open.classList.remove('open');
            $boxCart.cart.classList.remove('open');
            $this.open = false;
        } else if ($this.count >= 1 && $this.open === false) {
            $boxOpen.open.classList.add('open');
        } else {
            $boxOpen.open.classList.remove('open');
        }
        $boxOpen.text.innerText = 'Selecionados (' + $this.count + ')';
    }

    /**
     * **********************************************
     * @private
     * Detecta quando um input é alterado.
     * @param {OBJECT} e 
     * **********************************************
     */
    function changeInput(e) {
        $this.tgt = e.target;
        if ($this.tgt.checked === true) {
            if ($this.count < $options.maxCheck) {
                createInput();
                $this.count++;
                updateCount();
            } else {
                $this.tgt.checked = false;
            }
        } else if ($this.tgt.checked === false) {
            removeInput();
            $this.count--;
            updateCount();
        }
    }

    /**
     * **********************************************
     * @private
     * Submete ou executa função de callback para o
     *  formulário.
     * @param {OBJECT} e 
     * **********************************************
     */
    function sendForm(e) {
        if ($options.submit !== undefined) {
            $options.submit($boxCart.form);
        } else {
            $boxCart.form.submit();
        }
    }

    /**
     * **********************************************
     * @public
     * Adiciona o gerenciamento para algum input;
     * @param {OBJECT} data {
     *  input: input a ser gerenciado
     *  text: texto de exibição do input
     * }
     * **********************************************
     */
    function addInput(data) {
        data = data || {};
        if (!data.input) {
            console.error('ShoppingCart > addInput: "input" não definido');
        } else if (data.input.nodeType !== 1 || data.input.type !== 'checkbox') {
            console.error('ShoppingCart > addInput: "input" não é um elemento checkbox válido');
        } else if (!data.input.classList.contains('cart-add')) {
            if (data.input.checked) {
                data.input.checked = false;
            }
            data.input.classList.add('cart-add');
            data.input.setAttribute('data-cart-add', $this.index);
            data.input.addEventListener('change', changeInput, false);
            $this.memory.push({
                input: data.input,
                index: $this.index,
                name: data.text || data.input.name
            });
            $this.index++;
        }
    }

    /**
     * **********************************************
     * @public
     * Cria e adiciona input global ao formulário.
     * @param {OBJECT} data {
     *  name: atributo name para o input
     *  value: atributo value para o input
     * }
     * **********************************************
     */
    function setExtra(data) {
        data = data || {};
        if (!data.name) {
            console.error('ShoppingCart > setExtra: "name" não definido');
        } else if (!data.value) {
            console.error('ShoppingCart > setExtra: "value" não definido');
        } else {
            var $hidden = document.createElement('input');
            $hidden.type = 'hidden';
            $hidden.name = data.name;
            $hidden.value = data.value;
            $boxCart.form.appendChild($hidden);
        }
    }

    /**
     * **********************************************
     * @public
     * Remove os input adicinados por checkbox do
     *  carrinho.
     * **********************************************
     */
    function clearAll() {
        for (var $i = 0; $i < $this.memory.length; $i++) {
            if ($this.memory[$i].input.checked === true) {
                $this.tgt = $this.memory[$i].input;
                $this.memory[$i].input.checked = false;
                removeInput();
                $this.count--;
                updateCount();
            }
        }
    }

    /**
     * **********************************************
     * Acesso aos métodos públicos.
     * **********************************************
     */
    this.addInput = addInput;
    this.setExtra = setExtra;
    this.clearAll = clearAll;

    createOpen();
    createCart();
};
