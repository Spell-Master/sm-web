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
     * * @public : Requisita um arquivo e o exibe o
     * mesmo em um local expecífico.
     * * @param {STR} div
     * - Elemento#ID onde o arquivo deve ser aberto.
     * * @param {STR} file
     * - Arquivo que será aberto.
     * ************************************************
     */
    this.open = function (div, file) {
        if (!div) {
            console.log('Parâmetro "div" não expecificado');
        } else if (!file) {
            console.log('Parâmetro "file" não expecificado');
        } else {
            $loadDiv = document.getElementById(div);
            $file = file;
            requestGet();
        }
        return (false);
    };

    /**
     * ************************************************
     * * @public : Requisita um arquivo e o exibe o
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
            console.log('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.log('Parâmetro "file" não expecificado.');
        } else if ($httpRequest instanceof XMLHttpRequest) {
            console.log('Já existe uma requisição de protocolo em andamento.');
        } else {
            $loadDiv = document.getElementById(div);
            $url = (url ? url : null);
            $file = file;
            $vetor = ['send', 70, 555];
            $loadDiv.scrollIntoView({block: 'start', behavior: 'smooth'});
            requestGet();
        }
        return (false);
    };

    /**
     * ************************************************
     * * @public : Requisita um arquivo e o exibe o
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
            console.log('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.log('Parâmetro "file" não expecificado.');
        } else if ($httpRequest instanceof XMLHttpRequest) {
            console.log('Já existe uma requisição de protocolo em andamento.');
        } else {
            $loadDiv = document.getElementById(div);
            $url = (url ? url : null);
            $file = file;
            $vetor = ['pop', 30, 'ccc'];
            requestGet();
        }
        return (false);
    };

    /**
     * ************************************************
     * * @public : Envia os dados de um formulário
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
            console.log('Parâmetro "form" não expecificado.');
        } else if (!div) {
            console.log('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.log('Parâmetro "file" não expecificado.');
        } else if ($httpRequest instanceof XMLHttpRequest) {
            console.log('Já existe uma requisição de protocolo em andamento.');
        } else {
            $form = document.getElementById(form);
            $loadDiv = document.getElementById(div);
            $file = file;
            $head = 'form_id=' + form;
            $form.scrollIntoView({block: 'start', behavior: 'smooth'});

            $vetor = ['form', 80, 555];
            formElements();
            requestForm();
        }
        return (false);
    };

    /**
     * ************************************************
     * * @public : Envia os dados de um formulário
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
            console.log('Parâmetro "form" não expecificado.');
        } else if (!div) {
            console.log('Parâmetro "div" não expecificado.');
        } else if (!file) {
            console.log('Parâmetro "file" não expecificado.');
        } else if ($httpRequest instanceof XMLHttpRequest) {
            console.log('Já existe uma requisição de protocolo em andamento.');
        } else {
            $form = document.getElementById(form);
            $loadDiv = document.getElementById(div);
            $loadDiv.innerHTML = null;
            $file = file;
            $head = 'form_id=' + form;
            $loadDiv.scrollIntoView({block: 'start', behavior: 'smooth'});
            $vetor = ['formSend', 70, 555];
            formElements();
            requestForm();
        }
        return (false);
    };

    /**
     * ************************************************
     * * @private : Requisita os processos para os
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
     * * @private : Requisita os processos para os
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
     * * @private : Inicia o protocolo HttpRequest
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
     * * @private : Solicita funções de acordo com
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
            console.log('Arquivo [' + $file + '] não encontrado!');
        } else if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
            $response = $httpRequest.responseText;
            completeProcess();
        }
    }

    /**
     * ************************************************
     * * @private : Cria diferentes tipos de animações
     * conforme cada método.
     * ************************************************
     */
    function setProgress() {
        var $svg = '<svg class="load-pre" viewBox="25 25 50 50" style="width:' + $vetor[1] + 'px; height:' + $vetor[1] + 'px"><circle class="load-path" cx="50" cy="50" r="20" fill="none" stroke="#' + $vetor[2] + '" stroke-width="4" stroke-miterlimit="10"/></svg>';
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
     * * @private : Exibe o conteúdo da requisição.
     * - Quando existem animações de processo remove
     * primeiro essas animações só então exibe o
     * conteúdo.
     * ************************************************
     */
    function completeProcess() {
        if ($vetor) {
            setTimeout(function () {
                if ($vetor[0] === 'pop') {
                    $loadDiv.scrollIntoView({block: 'start', behavior: 'smooth'});
                    document.body.removeChild($loading);
                } else if ($vetor[0] === 'form' || $vetor[0] === 'formSend') {
                    $loadDiv.scrollIntoView({block: 'start', behavior: 'smooth'});
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
     * * @private: Procura elementos javascript no
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
     * * @private : Localiza os antigos elementos
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
     * * @private : Procura elementos input em
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
                $head += '&' + $form.elements[$i].name + '=' + $form.elements[$i].value;
            }
        }
    }
};

/**
 * ****************************************************
 * @changes : 
 * * 2.0 (spell master)
 * - Adicionado método para validação de formulários.
 * - Corrigido alguns problemas de compatibilidade com
 * os navegadores da microsoft "IE/EDGE".
 * 
 * * 2.1 (spell master)
 * - Modificado monitor de comunicação com o servidor
 * no método GET para melhor adpatação na inclusão
 * de arquivos javascript. O método síncono carrega e 
 * comunica ao navegador que continue analizando, mas
 * permita interatividade com a página.
 * 
 * * 2.2 (Spell Master)
 * - Removido de monitoramento percentual.
 * - Criado animações de carregamento. Não sendo preciso
 * criar os elemento no HTML.
 * - Otimizado os métodos, facilitando o uso.
 * 
 * * 2.3 (Spell Master)
 * - Criado método para upload de arquivos.
 * 
 * * 2.4 (Spell Master)
 * - Re-Adcionado método de carregamento com animação
 * local.
 * 
 * * 2.5 (Spell Master)
 * - Separado em método o encapsulamento dos elementos
 * na header.
 * * Adicionado LOOP para checagem de input RADIO em
 * formulários.
 * 
 * * 3.0 (Spell Master)
 * - Almentado a velocidade para processamento.
 * - Reduzido consumo de banda para carregar.
 * - Removido função de upload.
 * - Renomeado métodos e simplificado seus usos.
 * - Adicionado novo método que usa barra de
 * progresso para monitorar o ajax.
 * - Correção na alteração da codificação do 
 * charset. Agora os dados serão enviados usando
 * a prórpia codificação do arquivo.
 * - Otimizado envio de Posts
 *   + Agora em checkbox e radio caso marcados
 *   o método enviará o conteúdo do value, quando
 *   não marcados os dados não são enviados.
 *   + Correção no caso de input radio, agora o
 *   método dar suporte a quantidade ilimitada de
 *   inputs desse tipo.
 *   
 * * 3.1 (Spell Master)
 * - Corrigido instâncias de variáveis em loop.
 * - Organizado para um padrão em todos métodos,
 * valores de variáveis.
 * - Removido método load.
 * - Adicionado método para formulário formSend.
 * - Renomeado o método "get" para "send"
 * 
 * * 4.0 (Spell Master)
 * - Refeita toda estrutura das funções.
 * - Dividido em métodos separados a
 * responsabilidade de cada funcionabilidade.
 * - Removido compatibilidade com antigos
 * navegadores.
 * - Removido parcialmente a compatibilidade 
 * com os navegadores da microsoft "IE/EDGE".
 * - Almentado a velocidade de processamento.
 * - Alterado as animações de carregamento.
 * - Reduzido bits de consumo no download do
 * javascript.
 * - Corrigido bug no carregamento dinâmico de
 * javascripts minificados.
 * - Corrigido bug na falha de iniciação de
 * javascripts, agora a função respeita a coesa
 * aquisição dos mesmos.
 * ************************************************
 */
