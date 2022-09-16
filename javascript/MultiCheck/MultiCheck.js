/**
 * **************************************************
 * Class MultiCheck
 * @author Spell-Master (Omar Pautz)
 * @copyright 2022
 * @version 1.0
 * 
 * Multiplos input para envio em formulário.
 * 
 * @param {OBJECT} options (OPCIONAL)
 * {
 *  addInput: um ou mais inputs para estarem sobre
 *   controle já na iniciação.
 *  maxCheck: quantidade máxima de inputs que podem
 *   ser selecionados.
 *  btnText: texto para ser exibido no botão de
 *   validação do formulário.
 *  btnClass: .class para personalizar o botão de
 *   validação do formulário.
 *  onAction: para onde o formulário deve enviar
 *   seus dados.
 *  onSubmit: função a ser executada substituíndo o
 *   comportamento padrão do formulário.
 * **************************************************
 * }
 */

var MultiCheck = function (options) {

    options = options || {};

    var $options = {
        addInput: options.addInput,
        maxCheck: typeof options.maxCheck === 'number' ? options.maxCheck : 99,
        btnText: typeof options.btnText === 'string' ? options.btnText : 'Enviar',
        btnClass: typeof options.btnClass === 'string' ? options.btnClass : '',
        onAction: typeof options.onAction === 'string' ? options.onAction : '',
        onSubmit: typeof options.onSubmit === 'function' ? options.onSubmit : undefined
    }, $nd = {
        container: null, // caixa principal que abriga os elementos
        score: null, // div de texto para quantos elementos estão no formulário
        btn: null, // div do botão para enviar o formulário
        form: null // formulário de envio
    }, $this = {
        target: undefined, // atual checkbox selecionado
        index: 0, // índice de cada checkbox
        count: 0, // quantos checkbox estão marcados
        added: [] // lista com todos checkbox marcardos
    };

    /**
     * **********************************************
     * @private
     * Submete ou executa função de callback para o
     *  formulário.
     * @param {OBJECT} e 
     * **********************************************
     */
    function sendForm(e) {
        if ($options.onSubmit !== undefined) {
            $options.onSubmit($nd.form);
        } else {
            $nd.form.submit();
        }
    }

    /**
     * **********************************************
     * @private
     * Cria o elemento que abrigará toda estrutura.
     * **********************************************
     */
    function createContainer() {
        $nd.container = document.createElement('div');
        $nd.container.setAttribute('data-multi-check', '');
        document.body.appendChild($nd.container);
    }

    /**
     * **********************************************
     * @private
     * Cria o elemento para contagem de inputs
     *  marcados.
     * **********************************************
     */
    function createScore() {
        $nd.score = document.createElement('div');
        $nd.score.setAttribute('data-line-check', '');
        $nd.score.innerText = 'Selecionados (0)';
        $nd.container.appendChild($nd.score);
    }

    /**
     * **********************************************
     * @private
     * Cria o elemento e o botão para enviar o
     *  formulário.
     * **********************************************
     */
    function createButton() {
        $nd.btn = $nd.score.cloneNode(false);
        $nd.container.appendChild($nd.btn);

        $button = document.createElement('button');
        $button.innerText = $options.btnText;
        $button.className = $options.btnClass;
        $button.style.display = 'none';
        $button.addEventListener('click', sendForm, false);
        $nd.btn.appendChild($button);
    }

    /**
     * **********************************************
     * @private
     * Cria o formulário.
     * **********************************************
     */
    function createForm() {
        $nd.form = document.createElement('form');
        $nd.form.method = 'POST';
        $nd.form.action = $options.onAction;
        $nd.container.appendChild($nd.form);
    }

    /**
     * **********************************************
     * @private
     * Cria um novo input do tipo hidden no
     *  formulário com o valor e o nome do checkbox
     *  marcado.
     * **********************************************
     */
    function newInput() {
        var $new = document.createElement('input');
        $new.setAttribute('data-multi-check', $this.target.dataset.multiCheck);
        $new.type = 'hidden';
        $new.name = $this.target.name;
        $new.value = $this.target.value;
        $nd.form.appendChild($new);
        $this.added.push($new);
        $this.count++;
    }

    /**
     * **********************************************
     * @private
     * Define o input as funções do script
     * @param {OBJECT} ipt
     * Input alvo
     * **********************************************
     */
    function setInput(ipt) {
        if (checkInput(ipt) === true) {
            ipt.checked = false;
            ipt.setAttribute('data-multi-check', $this.index);
            $this.index++;
            ipt.addEventListener('change', inputChange, false);
        }
    }

    /**
     * **********************************************
     * @private
     * Remove o input do formulário igual ao
     *  checkbox desmarcado.
     * **********************************************
     */
    function removeInput() {
        for (var $i = 0; $i < $this.added.length; $i++) {
            if ($this.target.dataset.multiCheck === $this.added[$i].dataset.multiCheck) {
                $nd.form.removeChild($this.added[$i]);
                $this.added.splice($i, 1);
                $this.count--;
            }
        }
    }

    /**
     * **********************************************
     * @private
     * Atualiza o contador de quantos input estão no
     *  formulário.
     * **********************************************
     */
    function defCount() {
        if ($this.count === 1) {
            $nd.container.classList.add('open');
            $button.style.display = 'block';
        } else if ($this.count < 1) {
            $nd.container.classList.remove('open');
            $button.style.display = 'none';
        }
        $nd.score.innerText = 'Selecionados (' + $this.count + ')';
    }

    /**
     * **********************************************
     * @private
     * Verifica o input atual se ele foi marcado ou
     *  não, caso seja adiciona o novo input ao
     *  formulário.
     *  Do contrário remove.
     * @param {OBJECT} e
     * Atual checkbox alterado.
     * **********************************************
     */
    function inputChange(e) {
        $this.target = e.target;
        if ($this.target.checked === true) {
            if ($this.count < $options.maxCheck) {
                newInput();
                defCount();
            } else {
                $this.target.checked = false;
            }
        } else {
            removeInput();
            defCount();
        }
    }

    /**
     * **********************************************
     * @private
     * Verifica se o input pode ser adicionado as
     *  funções do script.
     * @param {OBJECT} el
     * **********************************************
     */
    function checkInput(el) {
        if (el.nodeType !== 1 || el.type !== 'checkbox') {
            console.error('MultiCheck: elemento ' + el + ' não é uma tag "checkbox" válida');
            return (false);
        } else if (el.hasAttribute('data-multi-check') === true) {
            console.error('MultiCheck: elemento ' + el + ' já foi adicionado');
            return (false);
        } else {
            return (true);
        }
    }

    /**
     * **********************************************
     * @public
     * Cria um input do tipo hidden para informações
     *  extra no formulário.
     * @param {OBJECT} data
     * {
     *  name: atributo "name" do input
     *  value: atributo "value" do input
     * }
     * **********************************************
     */
    function addHidden(data) {
        data = data || {};
        if (!data.name) {
            console.error('MultiCheck > addHidden: "name" não definido');
        } else if (!data.value) {
            console.error('MultiCheck > addHidden: "value" não definido');
        } else {
            var $hidden = document.createElement('input');
            $hidden.type = 'hidden';
            $hidden.name = data.name;
            $hidden.value = data.value;
            $nd.form.appendChild($hidden);
        }
    }

    /**
     * **********************************************
     * @public
     * Limpa todos inputs marcados.
     * **********************************************
     */
    function clearAll() {
        var $checkd = document.querySelectorAll('[data-multi-check]:checked'),
            $length = $this.added.length,
            $i = 0,
            $j = 0;
        $nd.container.classList.remove('open');
        $nd.score.innerText = 'Selecionados (0)';

        for (; $i < $length; $i++) {
            $nd.form.removeChild($this.added[$i]);
        }
        for (; $j < $checkd.length; $j++) {
            $checkd[$j].checked = false;
        }
        $this.count = 0;
        $this.added.splice(0, $length);
    }

    /**
     * **********************************************
     * @public
     * Adiciona um ou mais input ao script.
     * @param {OBJECT} input
     * Input alvo
     * **********************************************
     */
    function addInput(input) {
        if (input.nodeType === 1) {
            setInput(input);
        } else {
            for (var $i = 0; $i < input.length; $i++) {
                setInput(input[$i]);
            }
        }
    }

    createContainer();
    createScore();
    createButton();
    createForm();

    if (typeof $options.addInput !== 'undefined') {
        addInput($options.addInput);
    }

    /**
     * **********************************************
     * Acesso aos métodos públicos
     * **********************************************
     */
    this.addInput = addInput;
    this.addHidden = addHidden;
    this.clearAll = clearAll;
};