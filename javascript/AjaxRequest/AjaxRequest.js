/**
 * ****************************************************
 * @Copyright (c) 2017, Spell Master.
 * @version 4.0 (2018)
 * @requires  Navegador compatível com HTML 5
 * ****************************************************
 * @class Executa ajax.
 * ****************************************************
 */
var AjaxRequest = function () {
    var $httpRequest, $loadDiv, $file, $response, $url, $vetor, $loading, $form, $head;

    /**
     * ************************************************
     * * Requisita um arquivo e o exibe o
     * mesmo em um local expecífico.
     * * @param {STR} div
     * - Elemento#ID onde o arquivo deve ser aberto.
     * * @param {STR} file
     * - Arquivo que será aberto.
     * ************************************************
     */
    this.open = function (div, file) {
        if (!div) {
            console.warn('Parâmetro "div" não expecificado');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado');
        } else {
            $loadDiv = document.getElementById(div);
            $file = file;
            requestGet();
        }
        return (false);
    };

    /**
     * ************************************************
     * * Requisita um arquivo e o exibe o
     * mesmo em um local expecífico.
     * - Animação no mesmo local onde o arquivo será
     * aberto.
     * * @param {STR} div
     * - Elemento#ID onde o arquivo deve ser aberto.
     * * @param {STR} file
     * - Arquivo que será aberto.
     * * @param {STR} url (opcional)
     * - Quando informado adicionará a string a barra
     * de navegação.
     * ************************************************
     */
    this.send = function (div, file, url) {
        if (!div) {
            console.warn('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado.');
        } else if ($httpRequest instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição de protocolo em andamento.');
        } else {
            $loadDiv = document.getElementById(div);
            $url = (url ? url : null);
            $file = file;
            $vetor = ['send', 555];
            $loadDiv.scrollIntoView({block: 'start', behavior: 'smooth'});
            requestGet();
        }
        return (false);
    };

    /**
     * ************************************************
     * * Requisita um arquivo e o exibe o
     * mesmo em um local expecífico.
     * - Animação suspensa no canto inferior esqueda da
     * página.
     * * @param {STR} div
     * - Elemento#ID onde o arquivo deve ser aberto.
     * * @param {STR} file
     * - Arquivo que será aberto.
     * * @param {STR} url (opcional)
     * - Quando informado adicionará a string a barra
     * de navegação.
     * ************************************************
     */
    this.pop = function (div, file, url) {
        if (!div) {
            console.warn('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado.');
        } else if ($httpRequest instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição de protocolo em andamento.');
        } else {
            $loadDiv = document.getElementById(div);
            $url = (url ? url : null);
            $file = file;
            $vetor = ['pop', 'ccc'];
            requestGet();
        }
        return (false);
    };

    /**
     * ************************************************
     * * Envia os dados de um formulário
     * para outro arquivo.
     * - Animação cobre o formulário.
     * * @param {STR} form
     * - Elemento#ID do formuário.
     * * @param {STR} div
     * - Elemento#ID onde o arquivo deve ser aberto.
     * * @param {STR} file
     * - Arquivo que será aberto e os dados devem ser
     * enviados.
     * ************************************************
     */
    this.form = function (form, div, file) {
        if (!form) {
            console.warn('Parâmetro "form" não expecificado.');
        } else if (!div) {
            console.warn('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado.');
        } else if ($httpRequest instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição de protocolo em andamento.');
        } else {
            $form = document.getElementById(form);
            $loadDiv = document.getElementById(div);
            $file = file;
            $head = 'form_id=' + form;
            $vetor = ['form', 555];
            formElements();
            requestForm();
        }
        return (false);
    };

    /**
     * ************************************************
     * * Envia os dados de um formulário
     * para outro arquivo.
     * - Animação no local onde o arquivo será aberto.
     * * @param {STR} form
     * - Elemento#ID do formuário.
     * * @param {STR} div
     * - Elemento#ID onde o arquivo deve ser aberto.
     * * @param {STR} file
     * - Arquivo que será aberto e os dados devem ser
     * enviados.
     * ************************************************
     */
    this.formSend = function (form, div, file) {
        if (!form) {
            console.warn('Parâmetro "form" não expecificado.');
        } else if (!div) {
            console.warn('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.warn('Parâmetro "file" não expecificado.');
        } else if ($httpRequest instanceof XMLHttpRequest) {
            console.warn('Já existe uma requisição de protocolo em andamento.');
        } else {
            $form = document.getElementById(form);
            $loadDiv = document.getElementById(div);
            $loadDiv.innerHTML = null;
            $file = file;
            $head = 'form_id=' + form;
            $loadDiv.scrollIntoView({block: 'start', behavior: 'smooth'});
            $vetor = ['formSend', 555];
            formElements();
            requestForm();
        }
        return (false);
    };

    /**
     * ************************************************
     * * Requisita os processos para os
     * métodos de execução padrão via GET.
     * ************************************************
     */
    function requestGet() {
        initXMLHR();
        $httpRequest.addEventListener('readystatechange', responseStatus, false);
        $httpRequest.open('GET', $file, true);
        $httpRequest.send();
    }

    /**
     * ************************************************
     * * Requisita os processos para os
     * métodos de execução de formulários via POST.
     * ************************************************
     */
    function requestForm() {
        initXMLHR();
        $httpRequest.addEventListener('readystatechange', responseStatus, false);
        $httpRequest.open('POST', $file, true);
        $httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        $httpRequest.send($head);
    }

    /**
     * ************************************************
     * * Inicia o protocolo HttpRequest
     * e cria a base de tipo de exibixão quando
     * disponível.
     * ************************************************
     */
    function initXMLHR() {
        $httpRequest = new XMLHttpRequest;
        if ($httpRequest.overrideMimeType) {
            $httpRequest.overrideMimeType('text/html');
        }
        return ($httpRequest);
    }

    /**
     * ************************************************
     * * Solicita funções de acordo com
     * o status da requisição.
     * - Carregando -> Solicita animação de processo. 
     * - Completado -> Armazena a resposta e solicita
     * o completo processamento.
     * ************************************************
     */
    function responseStatus() {
        if ($vetor && ($httpRequest.readyState === 1)) {
            setProgress();
        } else if ($httpRequest.status === 404) {
            console.warn('Arquivo [' + $file + '] não encontrado!');
        } else if ($httpRequest.status === 500) {
            console.warn('Erro na resposta do servidor');
        } else if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
            $response = $httpRequest.responseText;
            completeProcess();
        }
    }

    /**
     * ************************************************
     * * Cria diferentes tipos de animações
     * conforme cada método.
     * ************************************************
     */
    function setProgress() {
        var $svg = '<svg class="load-pre" viewBox="25 25 50 50"><circle class="load-path" cx="50" cy="50" r="20" fill="none" stroke="#' + $vetor[1] + '" stroke-width="4" stroke-miterlimit="10"/></svg>';
        switch ($vetor[0]) {
            case 'send':
                $loadDiv.innerHTML = '<div class="load-local">' + $svg + '</div>';
                break;
            case 'pop':
                $loading = document.createElement('div');
                document.body.appendChild($loading);
                $loading.classList.add('load-pop');
                $loading.innerHTML = '<div class="progress-text">Carregando...</div>' + $svg;
                break;
            case 'form':
                $form.classList.add('form-conter');
                $loading = document.createElement('div');
                $loading.classList.add('load-form');
                $form.appendChild($loading);
                $loading.innerHTML = '<div class="fade-progress">' + $svg + '</div>';
                break;
            case 'formSend':
                $form.classList.add('form-conter');
                $loading = document.createElement('div');
                $loading.classList.add('load-form');
                $form.appendChild($loading);
                $loadDiv.innerHTML = '<div class="load-local">' + $svg + '</div>';
                break;
        }
    }

    /**
     * ************************************************
     * * Exibe o conteúdo da requisição.
     * - Quando existem animações de processo remove
     * primeiro essas animações só então exibe o
     * conteúdo.
     * ************************************************
     */
    function completeProcess() {
        if ($vetor) {
            setTimeout(function () {
                if ($vetor[0] === 'pop') {
                    document.body.removeChild($loading);
                } else if ($vetor[0] === 'form' || $vetor[0] === 'formSend') {
                    for (var $i = 0; $i < $form.elements.length; $i++) {
                        $form.elements[$i].disabled = false;
                    }
                    $form.removeChild($loading);
                }
                $loadDiv.innerHTML = $response;
                $vetor = null;
                $httpRequest = null;
                loadScripts();
                if ($url) {
                    window.history.replaceState(null, null, $url);
                    $url = null;
                }
            }, 1000);
        } else {
            $loadDiv.innerHTML = $response;
            loadScripts();
            $httpRequest = null;
        }
    }

    /**
     * ************************************************
     * * Procura elementos javascript no
     * arquivo aberto pela requisição e realoca os
     * mesmos para correto funcionamento.
     * ************************************************
     */
    function loadScripts() {
        var $j = $response.indexOf('<script', 0), $src, $idxSrc, $endSrc, $strSrc;
        oldScripts();
        while ($j != -1) {
            $src = document.createElement('script');
            $idxSrc = $response.indexOf(' src', $j);
            $j = $response.indexOf('>', $j) + 1;
            if ($idxSrc < $j && $idxSrc >= 0) {
                $j = $idxSrc + 4;
                $endSrc = $response.indexOf('.js', $j) + 3;
                $strSrc = $response.substring($j, $endSrc);
                $strSrc = $strSrc.replace('=', '')
                        .replace(' ', '')
                        .replace('"', '')
                        .replace('"', '')
                        .replace("'", '')
                        .replace("'", '')
                        .replace('>', '');
                $src.src = $strSrc;
            } else {
                $endSrc = $response.indexOf('</script>', $j);
                $strSrc = $response.substring($j, $endSrc);
                $src.text = $strSrc;
            }
            $loadDiv.appendChild($src);
            $j = $response.indexOf('<script', $endSrc);
            $src = null;
        }
    }

    /**
     * ************************************************
     * * Localiza os antigos elementos
     * javascript não funcionais da requisição e limpa
     * eles para melhor leitura de dados pelo
     * navegador.
     * ************************************************
     */
    function oldScripts() {
        var $os = $loadDiv.getElementsByTagName('script'), $k;
        for ($k = $os.length - 1; $k >= 0; $k--) {
            $os[$k].parentNode.removeChild($os[$k]);
        }
    }

    /**
     * ************************************************
     * * Procura elementos input em
     * formulários, a adiciona-os ao cabeçalho da
     * requisição.
     * * @augment : No caso de {input type="checkbox"}
     * quando não marcados seu valor não será enviado
     * pela função.
     * ************************************************
     */
    function formElements() {
        var $i, $checkbox, $radio;
        for ($i = 0; $i < $form.elements.length; $i++) {
            $form.elements[$i].disabled = true;
            if ($form.elements[$i].type === 'checkbox') {
                if ($form.elements[$i].checked) {
                    $checkbox = $form.elements[$i].value;
                    $head += '&' + $form.elements[$i].name + '=' + $checkbox;
                }
            } else if ($form.elements[$i].type === 'radio') {
                if ($form.elements[$i].checked) {
                    $radio = $form.elements[$i].value;
                    $head += '&' + $form.elements[$i].name + '=' + $radio;
                }
            } else {
                $head += '&' + $form.elements[$i].name + '=' + encodeURI($form.elements[$i].value);
            }
        }
    }

    /**
     * ************************************************
     * Codifica o identificador de recurso uniforme em
     * sequências de escape que representam a
     * codificação UTF-8.
     * Escapa todos os caracteres que não são
     * alfabéticos, dígitos ou decimais.
     * @param {STR} str : Valor de entrada do
     * parâmetro URI.
     * ************************************************
     * Entrada: param=%&param_b=valor_b
     * Saída: param &param_b=valor_b
     * ************************************************
     */
    function encodeURI(str) {
        var $encode = encodeURIComponent(str);
        return ($encode.replace(/['()]/g, escape).replace(/\*/g, '%2A').replace(/%(?:7C|60|5E)/g, unescape));
    }
};
