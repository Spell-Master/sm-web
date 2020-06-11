/**
 * ****************************************************
 * * @Class AjaxRequest
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2018
 * * @version 4.1 (2020)
 * ****************************************************
 * * Executa Asynchronous Javascript and Xml
 * ****************************************************
 */

var AjaxRequest = function () {
    var $this = {
        'http': null,
        'loadID': null,
        'file': null,
        'response': null,
        'url': null,
        'form': null,
        'head': null,
        'loading': null,
        'vetor': [null]
    };

    /**
     * ************************************************
     * @Method: Requisita um arquivo e o exibe o
     *  mesmo em um local expecífico.
     *  
     * @public
     * ************************************************
     * 
     * @param {STR} inId
     *  Elemento#ID onde o arquivo deve ser aberto.
     * @param {STR} file
     *  Arquivo que será aberto.
     * ************************************************
     */
    function open(inId, file) {
        if (!inId) {
            console.warn('Parâmetro "inId" não expecificado');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado');
        } else {
            $this.loadID = document.getElementById(inId);
            $this.file = file;
            requestGet();
        }
        return (false);
    }

    /**
     * ************************************************
     * @Method: Requisita um arquivo e o exibe o mesmo
     *   em um local expecífico.
     *  Animação de progresso no local onde o arquivo
     *  será aberto.
     *  
     * @public
     * ************************************************
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
     *  
     * ************************************************
     */
    function send(inId, file, url) {
        if (!inId) {
            console.warn('Parâmetro "inId" não expecificado.');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado.');
        } else if ($this.http instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição de protocolo em andamento.');
        } else {
            $this.loadID = document.getElementById(inId);
            $this.url = (url ? url : null);
            $this.file = file;
            $this.vetor = ['send', 555];
            requestGet();
        }
        return (false);
    }

    /**
     * ************************************************
     * @Method: Requisita um arquivo e o exibe o mesmo
     *  em um local expecífico.
     *  Animação suspensa no canto inferior esquerdo
     *  da página.
     *  
     * @public
     * ************************************************
     * 
     * @param {STR} inId
     *  Elemento#ID onde o arquivo deve ser aberto.
     * @param {STR} file
     *  Arquivo que será aberto.
     *  
     * @param {STR} url (opcional)
     *  Quando informado adicionará a string a barra
     *  de navegação.
     *  
     * ************************************************
     */
    function pop(inId, file, url) {
        if (!inId) {
            console.warn('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado.');
        } else if ($this.http instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição de protocolo em andamento.');
        } else {
            $this.loadID = document.getElementById(inId);
            $this.url = (url ? url : null);
            $this.file = file;
            $this.vetor = ['pop', 'ccc'];
            requestGet();
        }
        return (false);
    }

    /**
     * ************************************************
     * @Method: Envia os dados de um formulário para
     *  outro arquivo.
     *  Animação cobre o formulário.
     *  
     *  @public
     * ************************************************
     * @param {STR} form
     *  Elemento#ID do formuário.
     *  
     * @param {STR} inId
     *  Elemento#ID onde o arquivo deve ser aberto.
     *  
     * @param {STR} file
     *  Arquivo que será aberto e os dados devem ser
     *  enviados.
     * ************************************************
     */
    function form(form, inId, file) {
        if (!form) {
            console.warn('Parâmetro "form" não expecificado.');
        } else if (!inId) {
            console.warn('Parâmetro "inId" não expecificado.');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado.');
        } else if ($this.http instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição de protocolo em andamento.');
        } else {
            $this.form = document.getElementById(form);
            $this.loadID = document.getElementById(inId);
            $this.file = file;
            $this.head = 'form_id=' + form;
            $this.vetor = ['form', 555];
            formElements();
            requestForm();
        }
        return (false);
    }

    /**
     * ************************************************
     * @Method: Envia os dados de um formulário para
     *  outro arquivo.
     *  Animação no local onde o arquivo será aberto.
     *  
     * @public
     * ************************************************
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
     * 
     * ************************************************
     */
    function formSend(form, inId, file) {
        if (!form) {
            console.warn('Parâmetro "form" não expecificado.');
        } else if (!inId) {
            console.warn('Parâmetro "inId" não expecificado.');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado.');
        } else if ($this.http instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição de protocolo em andamento.');
        } else {
            $this.form = document.getElementById(form);
            $this.loadID = document.getElementById(inId);
            $this.loadID.innerHTML = null;
            $this.file = file;
            $this.head = 'form_id=' + form;
            $this.loadID.scrollIntoView({block: 'start', behavior: 'smooth'});
            $this.vetor = ['formSend', 555];
            formElements();
            requestForm();
        }
        return (false);
    }

    /**
     * ************************************************
     * @Method: Requisita os processos para os
     *  métodos de execução padrão via GET.
     *  
     * @private
     * ************************************************
     */
    function requestGet() {
        initXMLHR();
        $this.http.addEventListener('readystatechange', responseStatus, false);
        $this.http.open('GET', $this.file, true);
        $this.http.send();
    }

    /**
     * ************************************************
     * @Method: Requisita os processos para os
     *  métodos de execução de formulários via POST.
     *  
     * @private
     * ************************************************
     */
    function requestForm() {
        initXMLHR();
        $this.http.addEventListener('readystatechange', responseStatus, false);
        $this.http.open('POST', $this.file, true);
        $this.http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        $this.http.send($this.head);
    }

    /**
     * ************************************************
     * @Method: Inicia o protocolo HttpRequest e cria
     *  a base de tipo de exibição quando disponível.
     *  
     * @private
     * ************************************************
     */
    function initXMLHR() {
        $this.http = new XMLHttpRequest;
        if ($this.http.overrideMimeType) {
            $this.http.overrideMimeType('text/html');
        }
        return ($this.http);
    }

    /**
     * ************************************************
     * @Method: Solicita funções de acordo com o
     *  status da requisição.
     * 
     *  - Carregando -> Solicita animação de processo. 
     *  - Completado -> Armazena a resposta e solicita
     *    o completo processamento.
     *  
     * @private
     * ************************************************
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
     * ************************************************
     * @Method: Cria diferentes tipos de animações
     *  conforme cada método.
     * 
     * @private
     * ************************************************
     */
    function setProgress() {
        var $svg = '<svg \n\
                        class="load-pre" \n\
                        viewBox="25 25 50 50">\n\
                            <circle \n\
                                class="load-path" \n\
                                cx="50" \n\
                                cy="50" r="20" \n\
                                fill="none" \n\
                                stroke="#' + $this.vetor[1] + '" \n\
                                stroke-width="4" \n\
                                stroke-miterlimit="10" \n\
                            />\n\
                    </svg>';
        switch ($this.vetor[0]) {
            case 'send':
                $this.loadID.innerHTML = '<div class="load-local">' + $svg + '</div>';
                break;
            case 'pop':
                $this.loading = document.createElement('div');
                document.body.appendChild($this.loading);
                $this.loading.classList.add('load-pop');
                $this.loading.innerHTML = '<div class="progress-text">Carregando...</div>' + $svg;
                break;
            case 'form':
                $this.form.classList.add('form-conter');
                $this.loading = document.createElement('div');
                $this.loading.classList.add('load-form');
                $this.form.appendChild($this.loading);
                $this.loading.innerHTML = '<div class="fade-progress">' + $svg + '</div>';
                break;
            case 'formSend':
                $this.form.classList.add('form-conter');
                $this.loading = document.createElement('div');
                $this.loading.classList.add('load-form');
                $this.form.appendChild($this.loading);
                $this.loadID.innerHTML = '<div class="load-local">' + $svg + '</div>';
                break;
        }
    }

    /**
     * ************************************************
     * @Method: Exibe o conteúdo da requisição.
     *  Quando existem animações de processo remove
     *  primeiro essas animações só então exibe o
     *  conteúdo.
     * 
     * @private
     * ************************************************
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
     * ************************************************
     * @Method: Procura elementos javascript no
     *  arquivo aberto pela requisição e realoca os
     *  mesmos para correto funcionamento.
     * 
     * @private
     * ************************************************
     */
    function loadScripts() {
        var $j = $this.response.indexOf('<script', 0), $src, $idxSrc, $endSrc, $strSrc;
        oldScripts();
        while ($j != -1) {
            $src = document.createElement('script');
            $idxSrc = $this.response.indexOf(' src', $j);
            $j = $this.response.indexOf('>', $j) + 1;
            if ($idxSrc < $j && $idxSrc >= 0) {
                $j = $idxSrc + 4;
                $endSrc = $this.response.indexOf('.js', $j) + 3;
                $strSrc = $this.response.substring($j, $endSrc);
                $strSrc = $strSrc.replace('=', '')
                        .replace(' ', '')
                        .replace('"', '')
                        .replace('"', '')
                        .replace("'", '')
                        .replace("'", '')
                        .replace('>', '');
                $src.src = $strSrc;
            } else {
                $endSrc = $this.response.indexOf('</script>', $j);
                $strSrc = $this.response.substring($j, $endSrc);
                $src.text = $strSrc;
            }
            $this.loadID.appendChild($src);
            $j = $this.response.indexOf('<script', $endSrc);
            $src = null;
        }
    }

    /**
     * ************************************************
     * @Method: Localiza os antigos elementos
     *  javascript não funcionais da requisição e limpa
     *  eles para melhor leitura de dados pelo
     *  navegador.
     * 
     * @private
     * ************************************************
     */
    function oldScripts() {
        var $os = $this.loadID.getElementsByTagName('script'), $k;
        for ($k = $os.length - 1; $k >= 0; $k--) {
            $os[$k].parentNode.removeChild($os[$k]);
        }
    }

    /**
     * ************************************************
     * @Method: Procura elementos input em formulários
     *  e adiciona eles no cabeçalho da requisição.
     * 
     * @augment: No caso de {input type="checkbox"} ou
     *  {input type="radio"}
     *  quando não marcados seu valor não será enviado
     *  pela função.
     * 
     * @private
     * ************************************************
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
     * ************************************************
     * @Method: Codifica o identificador de recurso
     *  uniforme em sequências de escape que
     *  representam a codificação UTF-8.
     *  Escapa todos os caracteres que não são
     *  alfabéticos, dígitos ou decimais.
     * 
     * ************************************************
     * 
     * @param {STR} str
     * Valor de entrada do parâmetro URI.
     * 
     * @public
     * ************************************************
     */
    function encodeURI(str) {
        var $encode = encodeURIComponent(str);
        return ($encode.replace(/['()]/g, escape).replace(/\*/g, '%2A').replace(/%(?:7C|60|5E)/g, unescape));
    }

    /**
     * ************************************************
     * @return {OBJ}
     * Métodos públicos
     * ************************************************
     */
    this.open = open;
    this.send = send;
    this.pop = pop;
    this.form = form;
    this.formSend = formSend;
    this.encodeURI = encodeURI;
};
