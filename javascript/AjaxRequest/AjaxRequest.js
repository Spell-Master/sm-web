/**
 * **************************************************
 * * @Class AjaxRequest
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2018
 * * @version 4.1 (2021)
 * **************************************************
 * * Executa Asynchronous Javascript and Xml
 * **************************************************
 */

var AjaxRequest = function () {
    var $this = {
        http: null,
        loadID: null,
        file: null,
        response: null,
        url: null,
        form: null,
        head: null,
        loading: null,
        vetor: [null],
        exception: null
    };

    /**
     * **********************************************
     * @public
     * Requisita um arquivo e o exibe o mesmo em um
     *  local expecífico.
     *
     * @param {STR} inId
     *  Elemento#ID onde o arquivo deve ser aberto.
     * @param {STR} file
     *  Arquivo que será aberto.
     * **********************************************
     */
    function open(inId, file) {
        $this.loadID = document.getElementById(inId);
        $this.file = file;
        try {
            if (!inId) {
                throw 'Parâmetro "inId" não expecificado';
            } else if (!file) {
                throw 'Parâmetro "file" não expecificado';
            } else if (!isReady($this.loadID)) {
                throw 'Elemento "#' + inId + '" não encontrado';
            } else if ($this.http instanceof XMLHttpRequest) {
                throw 'Já existe uma requisição de protocolo em andamento.';
            } else {
                requestGet();
            }
        } catch (exception) {
            $this.exception = exception;
            ExceptionReturn();
        }
        return (false);
    }

    /**
     * **********************************************
     * @public
     * Requisita um arquivo e o exibe o mesmo em um
     *  local expecífico.
     *  Animação de progresso no local onde o arquivo
     *  será aberto.
     *
     * @param {STR} inId
     *  Elemento#ID onde o arquivo deve ser aberto.
     *
     * @param {STR} file
     *  Arquivo que será aberto.
     *
     * @param {STR} url (opcional)
     *  Quando informado adicionará a string a barra
     *  de navegação.
     * **********************************************
     */
    function send(inId, file, url) {
        $this.loadID = document.getElementById(inId);
        $this.url = (url ? url : null);
        $this.file = file;
        $this.vetor = ['send', 555];
        try {
            if (!inId) {
                throw 'Parâmetro "inId" não expecificado';
            } else if (!file) {
                throw 'Parâmetro "file" não expecificado';
            } else if (!isReady($this.loadID)) {
                throw 'Elemento "#' + inId + '" não encontrado';
            } else if ($this.http instanceof XMLHttpRequest) {
                throw 'Já existe uma requisição de protocolo em andamento.';
            } else {
                requestGet();
            }
        } catch (exception) {
            $this.exception = exception;
            ExceptionReturn();
        }
        return (false);
    }

    /**
     * **********************************************
     * @public
     * Requisita um arquivo e o exibe o mesmo em um
     *  local expecífico.
     *  Animação suspensa no canto inferior esquerdo
     *  da página.
     *
     * @param {STR} inId
     *  Elemento#ID onde o arquivo deve ser aberto.
     * @param {STR} file
     *  Arquivo que será aberto.
     *
     * @param {STR} url (opcional)
     *  Quando informado adicionará a string a barra
     *  de navegação.
     * **********************************************
     */
    function pop(inId, file, url) {
        $this.loadID = document.getElementById(inId);
        $this.url = (url ? url : null);
        $this.file = file;
        $this.vetor = ['pop', 'ccc'];
        try {
            if (!inId) {
                throw 'Parâmetro "inId" não expecificado';
            } else if (!file) {
                throw 'Parâmetro "file" não expecificado';
            } else if (!isReady($this.loadID)) {
                throw 'Elemento "#' + inId + '" não encontrado';
            } else if ($this.http instanceof XMLHttpRequest) {
                throw 'Já existe uma requisição de protocolo em andamento.';
            } else {
                requestGet();
            }
        } catch (exception) {
            $this.exception = exception;
            ExceptionReturn();
        }
        return (false);
    }

    /**
     * **********************************************
     *  @public
     * Envia os dados de um formulário para outro
     *  arquivo.
     *  Animação cobre o formulário.
     *
     * @param {STR} form
     *  Elemento#ID do formuário.
     *
     * @param {STR} inId
     *  Elemento#ID onde o arquivo deve ser aberto.
     *
     * @param {STR} file
     *  Arquivo que será aberto e os dados devem ser
     *  enviados.
     * **********************************************
     */
    function form(form, inId, file) {
        $this.form = document.getElementById(form);
        $this.loadID = document.getElementById(inId);
        $this.file = file;
        $this.head = 'form_id=' + form;
        $this.vetor = ['form', 555];
        try {
            if (!form) {
                throw 'Parâmetro "form" não expecificado.';
            } else if (!inId) {
                throw 'Parâmetro "inId" não expecificado';
            } else if (!file) {
                throw 'Parâmetro "file" não expecificado';
            } else if (!isReady($this.form)) {
                throw 'Elemento "#' + form + '" não encontrado';
            } else if (!isReady($this.loadID)) {
                throw 'Elemento "#' + inId + '" não encontrado';
            } else if ($this.http instanceof XMLHttpRequest) {
                throw 'Já existe uma requisição de protocolo em andamento.';
            } else {
                formElements();
                requestForm();
            }
        } catch (exception) {
            $this.exception = exception;
            ExceptionReturn();
        }
        return (false);
    }

    /**
     * **********************************************
     * @public
     * Envia os dados de um formulário para outro
     *  arquivo.
     *  Animação no local onde o arquivo será aberto.
     *
     * @param {STR} form
     *  Elemento#ID do formuário.
     *
     * @param {STR} inId
     *  Elemento#ID onde o arquivo deve ser aberto.
     *
     * @param {STR} file
     *  Arquivo que será aberto e os dados devem ser
     *  enviados.
     * **********************************************
     */
    function formSend(form, inId, file) {
        $this.form = document.getElementById(form);
        $this.loadID = document.getElementById(inId);
        $this.file = file;
        $this.head = 'form_id=' + form;
        $this.vetor = ['formSend', 555];
        try {
            if (!form) {
                throw 'Parâmetro "form" não expecificado.';
            } else if (!inId) {
                throw 'Parâmetro "inId" não expecificado';
            } else if (!file) {
                throw 'Parâmetro "file" não expecificado';
            } else if (!isReady($this.form)) {
                throw 'Elemento "#' + form + '" não encontrado';
            } else if (!isReady($this.loadID)) {
                throw 'Elemento "#' + inId + '" não encontrado';
            } else if ($this.http instanceof XMLHttpRequest) {
                throw 'Já existe uma requisição de protocolo em andamento.';
            } else {
                $this.loadID.innerHTML = null;
                formElements();
                requestForm();
            }
        } catch (exception) {
            $this.exception = exception;
            ExceptionReturn();
        }
        return (false);
    }

    /**
     * **********************************************
     * @private
     * Codifica o identificador de recurso uniforme
     *  em sequências de escape que representam a
     *  codificação UTF-8.
     *  Escapa todos os caracteres que não são
     *  alfabéticos, dígitos ou decimais.
     * 
     * @param {STR} str
     * Valor de entrada do parâmetro URI.
     * **********************************************
     */
    function encodeURI(str) {
        var $encode = encodeURIComponent(str);
        return ($encode.replace(/['()]/g, escape).replace(/\*/g, '%2A').replace(/%(?:7C|60|5E)/g, unescape));
    }

    /**
     * **********************************************
     * @private
     * Requisita os processos para os métodos de
     *   execução padrão via GET.
     * **********************************************
     */
    function requestGet() {
        initXMLHR();
        $this.http.addEventListener('readystatechange', responseStatus, false);
        $this.http.open('GET', $this.file, true);
        $this.http.send();
    }

    /**
     * **********************************************
     * @private
     * Requisita os processos para os métodos de
     *  execução de formulários via POST.
     * **********************************************
     */
    function requestForm() {
        initXMLHR();
        $this.http.addEventListener('readystatechange', responseStatus, false);
        $this.http.open('POST', $this.file, true);
        $this.http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        $this.http.send($this.head);
    }

    /**
     * **********************************************
     * @private
     * Inicia o protocolo HttpRequest e cria a base
     *  de tipo de exibição quando disponível.
     * **********************************************
     */
    function initXMLHR() {
        $this.http = new XMLHttpRequest;
        if ($this.http.overrideMimeType) {
            $this.http.overrideMimeType('text/html');
        }
        return ($this.http);
    }

    /**
     * **********************************************
     * @private
     * Solicita funções de acordo com o status da
     *  requisição.
     *  - Carregando -> Solicita animação de
     *   processo. 
     *  - Completado -> Armazena a resposta e
     *   solicita o completo processamento.
     * **********************************************
     */
    function responseStatus() {
        if ($this.vetor && ($this.http.readyState === 1)) {
            setProgress();
        } else if ($this.http.status === 404) {
            console.warn('Arquivo [' + $this.file + '] não encontrado!');
        } else if ($this.http.status === 500) {
            console.warn('Erro na resposta do servidor');
        } else if (($this.http.readyState === 4) && ($this.http.status === 200)) {
            $this.response = $this.http.responseText;
            completeProcess();
        }
    }

    /**
     * **********************************************
     * @private
     * Cria diferentes tipos de animações conforme
     *  cada método.
     * **********************************************
     */
    function setProgress() {
        var $svg = '<svg class="load-pre" viewBox="25 25 50 50"><circle class="load-path" cx="50" cy="50" r="20" fill="none" stroke="#' + $this.vetor[1] + '" stroke-width="4" stroke-miterlimit="10" /></svg>';
        switch ($this.vetor[0]) {
            case 'send':
                $this.loadID.innerHTML = '<div class="load-local">' + $svg + '</div>';
                break;
            case 'pop':
                $this.loading = document.createElement('div');
                $this.loading.classList.add('load-pop');
                $this.loading.innerHTML = '<div class="progress-text">Carregando...</div>' + $svg;
                document.body.appendChild($this.loading);
                break;
            case 'form':
                $this.loading = document.createElement('div');
                $this.form.classList.add('form-conter');
                $this.loading.classList.add('load-form');
                $this.loading.innerHTML = '<div class="fade-progress">' + $svg + '</div>';
                $this.form.appendChild($this.loading);
                break;
            case 'formSend':
                $this.loading = document.createElement('div');
                $this.form.classList.add('form-conter');
                $this.loading.classList.add('load-form');
                $this.loadID.innerHTML = '<div class="load-local">' + $svg + '</div>';
                $this.form.appendChild($this.loading);
                break;
        }
    }

    /**
     * **********************************************
     * @private
     * Exibe o conteúdo da requisição.
     *  Quando existem animações de processo remove
     *  primeiro essas animações só então exibe o
     *  conteúdo.
     * **********************************************
     */
    function completeProcess() {
        if ($this.vetor[0]) {
            setTimeout(function () {
                if ($this.vetor[0] === 'pop') {
                    document.body.removeChild($this.loading);
                } else if ($this.vetor[0] === 'form' || $this.vetor[0] === 'formSend') {
                    for (var $i = 0; $i < $this.form.elements.length; $i++) {
                        $this.form.elements[$i].disabled = false;
                    }
                    $this.form.removeChild($this.loading);
                }
                $this.loadID.innerHTML = $this.response;
                $this.vetor = [null];
                $this.http = null;
                loadScripts();
                if ($this.url) {
                    window.history.replaceState(null, null, $this.url);
                    $this.url = null;
                }
            }, 1000);
        } else {
            $this.loadID.innerHTML = $this.response;
            loadScripts();
            $this.http = null;
        }
    }

    /**
     * **********************************************
     * @private
     * Procura elementos javascript no arquivo
     *  aberto pela requisição e realoca os mesmos
     *  para correto funcionamento.
     * **********************************************
     */
    function loadScripts() {
        var $script = $this.loadID.getElementsByTagName('script'), $i, $newScript;
        for ($i = $script.length - 1; $i >= 0; $i--) {
            $newScript = document.createElement('script');
            if ($script[$i].src) {
                $newScript.src = $script[$i].src;
            } else {
                $newScript.text = $script[$i].text;
            }
            $this.loadID.appendChild($newScript);
            $script[$i].parentNode.removeChild($script[$i]);
        }
    }

    /**
     * **********************************************
     * @private
     * Procura elementos input em formulários
     *  e adiciona eles no cabeçalho da requisição.
     * 
     * @augment: No caso de {input type="checkbox"}
     *  ou {input type="radio"} quando não marcados
     *   seu valor não será enviado pela função.
     * **********************************************
     */
    function formElements() {
        var $i, $checkbox, $radio;
        for ($i = 0; $i < $this.form.elements.length; $i++) {
            $this.form.elements[$i].disabled = true;
            if ($this.form.elements[$i].type === 'checkbox') {
                if ($this.form.elements[$i].checked) {
                    $checkbox = $this.form.elements[$i].value;
                    $this.head += '&' + $this.form.elements[$i].name + '=' + $checkbox;
                }
            } else if ($this.form.elements[$i].type === 'radio') {
                if ($this.form.elements[$i].checked) {
                    $radio = $this.form.elements[$i].value;
                    $this.head += '&' + $this.form.elements[$i].name + '=' + $radio;
                }
            } else {
                $this.head += '&' + $this.form.elements[$i].name + '=' + encodeURI($this.form.elements[$i].value);
            }
        }
    }

    /**
     * **********************************************
     * @private
     * Verifica se algum objeto está pronto para uso.
     * @param {OBJ} obj
     * Objeto para analizar. 
     * **********************************************
     */
    function isReady(obj) {
        return ((typeof obj !== 'undefined' && obj !== null) ? true : false);
    }

    /**
     * **********************************************
     * @private
     * Exibe alerta de console quando algo der errado
     * redefinindo todos dados para nada.
     * **********************************************
     */
    function ExceptionReturn() {
        console.warn($this.exception);
        $this.http = null;
        $this.exception = null;
        $this.vetor = [null];
    }

    /**
     * **********************************************
     * @return {OBJ}
     * Métodos públicos
     * **********************************************
     */
    this.open = open;
    this.send = send;
    this.pop = pop;
    this.form = form;
    this.formSend = formSend;
};
