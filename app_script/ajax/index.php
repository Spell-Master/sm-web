<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="../../lib/prism/prism.js" type="text/javascript"></script>
        <script src="AjaxRequest.js" type="text/javascript"></script>
        <script src="files/teste.js" type="text/javascript"></script>

        <link href="../../lib/prism/prism.css" rel="stylesheet" type="text/css"/>
        <link href="../../lib/sm-default.css" rel="stylesheet" type="text/css"/>
        <link href="AjaxRequest.css" rel="stylesheet" type="text/css"/>
        <title>Requisições Ajax</title>
    </head>
    <body>
        <div class="container padding-all font-medium">
            <h1>Execução de Ajax</h1>
            <blockquote class="blockquote">
                Estes são métodos definitivos de sincronização ajax usnado javascript nativo.
            </blockquote>
            <p class="font-large">Utilização</p>
            <p class="font-default">Insira o arquivo AjaxRequests.js no cabeçalho da página.</p>
            <pre class="language-html"><code>&lt;script src="AjaxRequest.js" type="text/javascript"&gt;&lt;/script&gt;</code></pre>
            <p class="font-default">Insira o arquivo AjaxRequests.css no cabeçalho da página.</p>
            <pre class="language-html"><code>&lt;link href="AjaxRequest.css" rel="stylesheet" type="text/css"/&gt;</code></pre>
            <blockquote class="blockquote-red">Confira no final desse documento esses arquivos</blockquote>
            <p class="font-default">Insira o objeto da AjaxRequests no final da página (antes do fechamento da tag &lt;body&gt;).</p>
            <pre class="language-html"><code>&lt;script&gt;var Ajax = new AjaxRequest();&lt;/script&gt;</code></pre>

            <hr class="border-bottom border-dark" />

            <p class="font-large margin-top-high">Exemplos de execução:</p>
            <div style="border: 1px dotted" class="border-green padding-all">
                <div id="teste"></div>
            </div>
            <div id="teste-de-function"></div>

            <button class="btn-default" onclick="return Ajax.AjaxOpen('teste', 'files/AjaxOpen.php')">Método AjaxOpen</button>
            <button class="btn-default" onclick="return Ajax.AjaxGet('teste', 'files/AjaxGet.php')">Método AjaxGet</button>
            <pre class="language-html"><code>&lt;button class="btn-default" onclick="return Ajax.AjaxOpen('teste', 'files/AjaxOpen.php')"&gt;Método AjaxOpen&lt;/button&gt;
&lt;button class="btn-default" onclick="return Ajax.AjaxGet('teste', 'files/AjaxGet.php')"&gt;Método AjaxGet&lt;/button&gt;
</code></pre>

            <div class="margin-top border-all border-red padding-all">
                <form method="POST" id="fomulario" onsubmit="return Ajax.AjaxPost('fomulario', 'teste', 'files/AjaxPost.php');">
                    <p>Execução em formulários</p>
                    <blockquote class="blockquote-yellow">
                        Em formulário a animação irá cobrir o form até que a requisição esteja completa.
                        <p>A borda vermelha representa os limites do elemento DOM do</p>
                    </blockquote>
                    <div class="form-line font-medium">
                        <div class="float-left">
                            <button class="btn-danger" type="submit">AjaxPost</button>
                        </div>
                        <div class="over">
                            <input class="input-default" type="text" name="input_text" maxlength="30" placeholder="digite alguma coisa"/>
                        </div>
                    </div>
                </form>
            </div>
            <pre class="language-html"><code>&lt;form method="POST" id="fomulario" onsubmit="return Ajax.AjaxPost('fomulario', 'teste', 'files/AjaxPost.php');"&gt;
    &lt;div class="form-line font-medium"&gt;
        &lt;div class="float-left"&gt;
            &lt;button class="btn-danger" type="submit">AjaxPost&lt;/button&gt;
        &lt;/div&gt;
        &lt;div class="over"&gt;
            &lt;input class="input-default" type="text" name="input_text" maxlength="30" placeholder="digite alguma coisa"/&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/form&gt;</code></pre>

            <div class="margin-top-high bg-light padding-all font-default">
                <p class="bold">AjaxOpen</p>
                É o método simplificado do ajax, ele só irá rarregar os dados onde informado.
                <p>Precisa de 2 parâmetros obrigatórios</p>
                <pre class="language-javascript"><code>AjaxGet(divID, urlFile)</code></pre>
                <p class="list margin-left"><span class="text-blue">divID</span>
                    Você deve informar o elemento #ID de onde os dados devem ser carregados.
                </p>
                <p class="list margin-left"><span class="text-blue">urlFile</span>
                    Você deve informar o arquivo com a extenção (.html, .htm, .php, .phtml, .asp etc...)
                    Sendo possível carregar urls ou arquivos externos ao servidor, desde-que o que seja carregado
                    não haja segurança de uso pelo servidor onde ele se encontra.
                </p>

                <hr class="border-bottom border-dark"/>
                <p class="bold">AjaxGet</p>
                Faz o mesmo que o método anterior, mas exibe uma animação em popup na tela enquanto o arquivo
                e seus dados ainda não foram carregado pelo navegador.
                <p>Precisa de 2 parâmetros obrigatórios e 1 opcional</p>
                <pre class="language-javascript"><code>AjaxGet(divID, urlFile, urlReplace)</code></pre>
                <p class="list margin-left"><span class="text-blue">divID</span>
                    Você deve informar o elemento #ID de onde os dados devem ser carregados.
                </p>
                <p class="list margin-left"><span class="text-blue">urlFile</span>
                    Você deve informar o arquivo com a extenção (.html, .htm, .php, .phtml, .asp etc...)
                    Sendo possível carregar urls ou arquivos externos ao servidor, desde-que o que seja carregado
                    não haja segurança de uso pelo servidor onde ele se encontra.
                </p>
                <p class="list margin-left"><span class="text-blue">urlReplace</span>
                    Sendo opcional (você pode informar ou não). Isso vai fazer com que o endereço da barra do
                    navegador altere com o valor informado.
                </p>
                <hr class="border-bottom border-dark"/>
                <p class="bold">AjaxPost</p>
                Usado para envio de formulários. Altomaticamente esse método busca todos elementos "name" do form
                e evia-os para o arquivo solicitado.
                <p>Precisa de 3 parâmetros obrigatórios</p>
                <pre class="language-javascript"><code>AjaxPost(formID, divID, requestFile)</code></pre>
                <p class="list margin-left"><span class="text-blue">formID</span>
                    Você deve informar o elemento #ID do formulário onde será buscado os dados.
                </p>
                <p class="list margin-left"><span class="text-blue">divID</span>
                    Você deve informar o elemento #ID de onde os dados devem ser carregados.
                </p>
                <p class="list margin-left"><span class="text-blue">requestFile</span>
                    Você deve informar o arquivo com a extenção (.html, .htm, .php, .phtml, .asp etc...) onde os
                    dados devem ser enviados.
                </p>
            </div>
            <div class="margin-top-high">
                <p class="font-large">AjaxRequest.js</p>
                <pre class="language-javascript"><code>/**
 * ****************************************************
 * @Copyright (c) 2017, Spell Master.
 * @Version: 2.2
 * @Requisitos: Navegador compatível com HTML 5
 * ****************************************************
 * @class Executa ajax.
 * ****************************************************
 * @changes : 
 * * 2.0 (spell master)
 * - Adicionado método para validação de formulários.
 * - Corrigido problemas de compatibilidade com os
 * navegadores da microsoft "IE/EDGE".
 * * 2.1 (spell master)
 * - Modificado monitor de comunicação com o servidor
 * no método GET para melhor adpatação na inclusão
 * de arquivos javascript. O método síncono carrega e 
 * comunica ao navegador que continue analizando, mas
 * permita interatividade com a página.
 * * 2.2 (Spell Master)
 * - Removido de monitoramento percentual.
 * - Criado animações de carregamento. Não sendo preciso
 * criar os elemento no HTML.
 * - Otimizado os métodos, facilitando o uso.
 * ****************************************************
 **/

var AjaxRequest = function () {
    var $httpRequest, $loadDiv, $loading, $loadingImg, $frm, $head;

    /** ****************************************************
     * @function : Abre um arquivo ou uma Url em um 
     * elemento a escolha.
     * 
     * @param divID : #Id do elemento onde o ajax será
     * executado
     * @param urlFile : URL ou arquivo "com extenção" para
     * ser aberto
     ** ****************************************************/
    this.AjaxOpen = function (divID, urlFile) {
        initXMLHR();
        $loadDiv = document.getElementById(divID);
        $httpRequest.onreadystatechange = function () {
            if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
                $loadDiv.innerHTML = $httpRequest.responseText;
                $scripts = unescape($httpRequest.responseText);
                appendjS($scripts);
            }
        };
        $httpRequest.open('GET', urlFile, true);
        $httpRequest.send();
        return false;
    };

    /** ****************************************************
     * @function : Abre um arquivo ou uma Url em um 
     * elemento a escolha, com a possibiliade de alterar
     * o endereço na barra de navegação.
     * Executa uma animação de progresso até que o ajax seja
     * concluído.
     * 
     * @param divID : #Id do elemento onde o ajax será
     * executado
     * @param urlFile : URL ou arquivo "com extenção" para
     * ser aberto
     * @param urlReplace : (opcional) Texto para substituir
     * o endereço na barra de navegação.
     ** ****************************************************/
    this.AjaxGet = function (divID, urlFile, urlReplace) {
        initXMLHR();
        createProgress('get');
        $loadDiv = document.getElementById(divID);
        $httpRequest.onload = function () {
            if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
                window.setTimeout(function () {
                    if (urlReplace) {
                        window.history.replaceState(null, null, urlReplace);
                    }
                    removeProgress('get');
                    $loadDiv.innerHTML = $httpRequest.responseText;
                    $scripts = unescape($httpRequest.responseText);
                    appendjS($scripts);
                }, 1000);
            }
        };
        $httpRequest.open('GET', urlFile, true);
        $httpRequest.send();

        return false;
    };

    /** ****************************************************
     * @function : Requisita a validação de um formulário
     * a partir de outro arquivo.
     * Executa uma animação de progresso cobrindo todo o
     * local até que o ajax seja concluído.
     * 
     * @param formID : #Id do formulário de dados.
     * @param divID : #Id do elemento onde o ajax será
     * executado.
     * @param requestFile : Arquivo "com extenção" para
     * ser aberto
     ** ****************************************************/
    this.AjaxPost = function (formID, divID, requestFile) {
        initXMLHR();
        $frm = document.getElementById(formID);
        $head = "form_id=" + formID;
        $frm.style.position += 'relative';

        for (i = 0; i &lt; $frm.elements.length; i++) {
            $frm.elements[i].disabled = true;
            if ($frm.elements[i].type == "checkbox") {
                if ($frm.elements[i].checked) {
                    $frm.elements[i].value = 1;
                } else {
                    $frm.elements[i].value = 0;
                }
            }
            $head += "&" + $frm.elements[i].name + "=" + escape($frm.elements[i].value);
        }
        $httpRequest.open('POST', requestFile, true);
        createProgress('post');
        $loadDiv = document.getElementById(divID);
        $httpRequest.onload = function () {
            if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
                for (i = 0; i &lt; $frm.elements.length; i++) {
                    if ($frm.elements[i].type == "checkbox") {
                        $frm.elements[i].checked = false;
                    }
                    if ($frm.elements[i].type == "password") {
                        $frm.elements[i].value = "";
                    }
                    $frm.elements[i].disabled = false;
                }
                window.setTimeout(function () {
                    $loadDiv.innerHTML = $httpRequest.responseText;
                    $scripts = unescape($httpRequest.responseText);
                    appendjS($scripts);
                    removeProgress('post');
                }, 1000);
            }
        };
        $httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        $httpRequest.send($head);
        return false;
    };

    // **************************************************//
    // * Private Methods
    // **************************************************//

    /******************************************************
     * @function Method : createProgress()
     * ****************************************************
     * @data: Cria animação de carregamento
     * @param type tipo de efeito 
     ******************************************************/
    function createProgress(type) {
        $loading = document.createElement('div');
        if (type === 'get') {
            document.body.appendChild($loading);
            $loadingImg = '&lt;img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAE1klEQVR42mL8//8/w0gGAAHEQid7DIBYH4gVgNgBSUwATd0DKL4ApQ9C2TQDAAHESMMU4A/EAVAPK1Bo1gYo3gjEH6jpSIAAonYAgGI0H4gTqOBpXGABEE+kVsoACCAGUABQAQsAcT0Qv/9PP7AfiB0odTtAAFHD8/l09jg6mA/ECuS6HyCAKMkCoEJsPpQeaAAqFxKh5QRJACCAyA2AAKjnBYhQ+xGID0Dz7AGoYy9gKTsMoOWGAtR8fTLLh0JSCkqAACIn2fQTkSw/APECIA6gsFxJAOIDJGaJ81C9RNkDEECkOmo+ER5vIMUBRGIFaICSEggGxJgNEEDU9DwtPI4tIIhNEe+JcQ9AABFrcQMeiy4QG9pUxAXQ1EZxdgAIIGIsS8BjwQI6xDouDAr0B0QGAk5zAAKIGEve40nyDAOMBaApkBCYgMsMgAAiZMF5HAYmDALPkxoIWGskgAAiJ983DCLPIwfCA3IKRYAAwlfaYkv6Gwah55Gz6wdSswJAAOEybAGO0l5gEAcArHYgBFD6DQABhCv2sQGHQe55GCbUTliArB4ggLAZMIGUUnQQYgVSUgFAAGEz4D2W5q3AEAoABiKazfBUABBATFh6eeg9vAnUHoaiA2ggYrgODAACCFsAMGAJgKEGHkDHD/EN3YGG7RgAAogJV8hAwcIhGPvIA6n4AHh0GiCAmNBGeARINGQoBwA4sgECiAk9RIZRAHyAzivgywYGAAGEHADow9gHh8HEzwFC45oAAYSeBUjRPBQAobkDBYAAQg4AfhI1D5VsgLcgBAggfCngwwjIAgwAAYQ8LI4+Pi44TAIB37j/B4AAwhcAjMNkBhzvxAdAADExjHAAEEBMaDM4wxHgq84PAgQQ0zAr9UntGDUABBATgcnP4QAOQCdOP6KldpDYAYAAYsJTZQgMo1SwAOof0MSpI5QNEmMACCAmtC7kcEwB6I07lIgGCCB8KcBhGAYARqoGCCD09QGgVCCP1BIUHEaeN4D6CSWlAwQQE57ur8AwywYOWLI5A0AAMWEpLJBBwnBO/iAAEEDYlsgMx2wQwIBYgIkCAAIIWztgAlqoJQyT/I+1oQcQQNhSgAA0tPiRUoTiEM/7CliyNxgABBATjkEE5FSgMMRTQQMuz4MAQADhWyaHXhYoMgzNCZILDHgGdwECCF9fIAEtW8wfgvnegYHAyDZAABGaY5swiFeGELNqhOASWoAAIsawC2irLAyGQACsJ3aRJkAAETMiFIDUlQRlhf2DvIU4H+peoiZ1AAKImAB4AM1LQyEQ5kMbbkTXWgABRMpiaQNoj5EfqWZwHCQjSaBIWQ/1vAMptRVAAJEyKHoBS0o4PwjaCAbQFPkQqcdHNAAIIHKXoKCvy1s/QKtI8ildwgMQQJRUMxOwrMPLp5PHHaCLOD9QuCSfASCAKHVIAJYFiveBOJ5GKcIfulcItmZRgVIzAQKIWg5rwLJI8T10ib09FRZA9kMDFrZekWpL9gACiJrb5mBd5wKkPgT6aNMFKAYVVBexFFgG0FrGAcqGbaMBgYPQTs0CapagAAFEq42TAUiYnwJzLkKr3gnYhrOoAQACiJY7R5FjFRmDUgr6hqiPSCnjAgPqBiuaAoAAokcADGoAEEAjfnYYIIBGfAAABBgAAKahgJWV8PUAAAAASUVORK5CYII=" alt="loading" class="spinner"/&gt;';
            $loading.innerHTML = '&lt;div class="loading"&gt;&lt;div class="text-prog"&gt;Carregando&lt;/div&gt;' + $loadingImg + '&lt;div class="float-clear"&gt;&lt;/div&gt;&lt;/div&gt;';
        } else if (type === 'post') {
            $frm.appendChild($loading);
            $loadingImg = '&lt;img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE70lEQVR4Xu2bjZHUMAyFdRUAFQAVwFUAVwFQAVwFQAVwFQAVABUAFcBVAFQAHXBUAPPtWDuO1n9xnKwT0MzO7u0ljvUkPcm29kT+cTlZSP+7InJHRG6JyH33TL67bp7/U0R4fXPvl+7zbNOcE4AHIvLQKYziU+SjiPD6JCJXUway97YGAIs+FZEnztot56pjvRORN608oxUAqvizgFvPAQJjfhGRC/de/YwWAGDxlwsqbpXFIwAC7hgtUwCAxN6KCO/HFnjh3PHEqLnUAgC5obxl8dDDfzs3hdlxWybLZ18YByAhS16MT9YYK3jD8zFEWQPAKxEh1lOC0srcvNcIoAAEhHpvxACAe1YKwlgAsDoTigmKv3avlukKr4BnHhcCAQiEhPW0g9vHAJBTHiJC+ZaK2wkDBG5e4hHM43ZuPqUAgP6LCPrfnVdk0S60XsllhCBzupa5OBsOJQDg8lg/JO8dH8xp9ZiOkCb8crMAhNPYNTkAeMjnCNvj8ljhmAJRkllyGYPKMUjcOQC+RvI8BEMs9iClIDwK1QkpAGJx34PlLfCAQLynwiFIijEAYFusbwsdVmPk5h6FcCUcUsR4EAoxAHBvm3Nhe9byxyC8UsCJcwq1lJAa9+uGEABY/0dgBKorEO5dmGOqTiBz7Yu5EAAUM6zwfImyaIdoxAzoT3XvBSEAfpnYp7xl0J5d39ohFML+NXsvsABAcB/MaD2yfs7xcl6AMW8wiAUghBwXrsn6Cg5VIvuSMdnVMhYA6/4DwsjB3tn/UyU8U93p5gNAHiX3+xKsnjpTNDYdahgMGpNdGPgAhHJorlTuHYtcSjz1FbTpj0MJPcToXdHY/FLLeO459wGwaK2R/S0QoazmX3PhA2BXfmuOf1USD2Y5H5NLH4A/5qq1lL658LR6+dcnAVhr/reApAC4SnnA2jOAApECYFAJ2gv/OQAoDPzNhK0AkKoFBhxgL9wKAKlMcJaqA9hKXnKvP8fmU/7PuoBCTz2cJT6V72AxZKumraRBHziU1kPa3fe+B9jVE6esoLYlIRwG23o+AHYToecd4FqjUBoPTqst0bFbqnvr+12T2qd1dh/LfXQadJJYAOyKcEtESPwfhLQFwG6KrGk3OOdwkPzBWWYo128xDIh9bcAcABUCwO4M9XQQmrNyamMkeJIdAoC9NNDSooHPHCSsVUh92llyoEOs3LVF0Zq9gLwf3dpL1fuWC7L9Nh26CIak8ot2qqUAsIsIBmGbbC1CRiPtJTd2cys+WxesJRS0a0TZP2q0HADciAtpDw6VFIuk3leJnG9y8pNt0iwBAAZFYc0KvYNARxt6pRo69x5RAgAX2/aTXkFAeTZzi9t4SgHoHQRiHrdH+VFtPGMACIHAd8cmRm3b147VUVlqLAAMDidALn5zIn8DxNJ9BLTykKmqF201AAACLkeR4fcSoTzfMZm5BTenG4ziDLLLsn1sQrUA6HiQDRbwGxSpIAGi+S+8XMcHizUAYHw+V/1URhWYCoCOg8JMxj9XwCOwDG03HLXXCjFOzyJgE37EOs9q0rLXCgANC9yRyYVaVgGDeoIX4KCI5QyUBUQszGf9GQ3jAyJgNu1RbgmAb2Gspa9cT3/KMwAJSxNmk1x9Lg4ocWu1pL5DoLa9nYMK9Qz1Ev2BVckzqq+ZywOqJ7T0jf8BWBrx3p73Fz7CAs0clL73AAAAAElFTkSuQmCC" alt="loading" class="spinner" height="60px"/&gt;';
            $loading.innerHTML = '&lt;div class="loading-wrap"&gt;' + $loadingImg + '&lt;/div&gt;';
        }
    }

    /******************************************************
     * @function Method : createProgress()
     * ****************************************************
     * @data: Remove animação de carregamento
     * @param type tipo de efeito 
     ******************************************************/
    function removeProgress(type) {
        if (type === 'get') {
            document.body.removeChild($loading);
        } else if (type === 'post') {
            $frm.removeChild($loading);
            $frm.style.position = null;
        }
    }

    /******************************************************
     * @function Method : initXMLHR()
     * ****************************************************
     * @data: Inicia o protocolo XMLHTTP
     ******************************************************/
    function initXMLHR() {
        $httpRequest = null;
        if (window.XMLHttpRequest) {
            $httpRequest = new XMLHttpRequest();
            if ($httpRequest.overrideMimeType) {
                $httpRequest.overrideMimeType('text/html');
            }
        } else if (window.ActiveXObject) {
            try {
                $httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    $httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) {
                    $httpRequest = true;
                }
            }
        }
    }

    /******************************************************
     * @function Method : appendjS()
     * ****************************************************
     * @param script : Obter os dados de script da página
     * @data : Busca por todos javascripts inseridos na
     *         requisição e incorpora eles ao DOM.
     ******************************************************/
    function appendjS(script) {
        var $src;
        var $endSrc;
        var $newSrc;
        var $stringSrc;
        var $coutSrc;
        $coutSrc = script.indexOf('&lt;script', 0);
        removeOldSrc();
        while ($coutSrc != -1) {
            $newSrc = document.createElement('script');
            $src = script.indexOf(' src', $coutSrc);
            $coutSrc = script.indexOf('&gt;', $coutSrc) + 1;
            if ($src &lt; $coutSrc && $src &gt;= 0) {
                $coutSrc = $src + 4;
                $endSrc = script.indexOf('.', $coutSrc) + 4;
                $stringSrc = script.substring($coutSrc, $endSrc);
                $stringSrc = $stringSrc.replace("=", "").replace(" ", "").replace("\"", "").replace("\"", "").replace("\'", "").replace("\'", "").replace("&gt;", "");
                $newSrc.src = $stringSrc;
            } else {
                $endSrc = script.indexOf('&lt;/script&gt;', $coutSrc);
                $stringSrc = script.substring($coutSrc, $endSrc);
                $newSrc.text = $stringSrc;
            }
            $loadDiv.appendChild($newSrc);
            $coutSrc = script.indexOf('&lt;script', $endSrc);
            $newSrc = null;
        }
    }

    /******************************************************
     * @function Method : appendjS()
     * ****************************************************
     * @data: Depois de completado, limpar o DOM removendo
     *        dados entigos de script não funcionais.
     ******************************************************/
    function removeOldSrc() {
        var $oldScript = $loadDiv.getElementsByTagName('script'), cns;
        for (cns = $oldScript.length - 1; cns &gt;= 0; cns--) {
            $oldScript[cns].parentNode.removeChild($oldScript[cns]);
        }
        return;
    }
};</code></pre>
            </div>
            <div class="margin-top-high">
                <p class="font-large">AjaxRequest.css</p>
                <pre class="language-css"><code>/**
 * ****************************************************
 * @Copyright (c) 2017, Spell Master.
 * @Version: 2.2
 * @Requisitos: Navegador compatível com HTML 5
 * ****************************************************
 * @class Executa ajax.
 * ****************************************************
 * @changes : 
 * * 2.0 (spell master)
 * - Adicionado método para validação de formulários.
 * - Corrigido problemas de compatibilidade com os
 * navegadores da microsoft "IE/EDGE".
 * * 2.1 (spell master)
 * - Modificado monitor de comunicação com o servidor
 * no método GET para melhor adpatação na inclusão
 * de arquivos javascript. O método síncono carrega e 
 * comunica ao navegador que continue analizando, mas
 * permita interatividade com a página.
 * * 2.2 (Spell Master)
 * - Removido de monitoramento percentual.
 * - Criado animações de carregamento. Não sendo preciso
 * criar os elemento no HTML.
 * - Otimizado os métodos, facilitando o uso.
 * ****************************************************
 **/

.loading {
    background-color: #222222;
    padding: 15px 35px;
    min-width: 260px;
    position: fixed;
    bottom: 40px;
    left: 40px;
    box-shadow: 1px 0 16px rgba(0,0,0,0.5);
    z-index: 999;
    animation: loadingeffect 1s
}

.loading > .text-prog {
    float: left;
    line-height: 40px;
    padding-right: 10px;
    font-size: 20px;
    color: #efefef;
}

.loading > img {
    float: right;
    height: 40px;
}

.spinner {
    animation: spin 1s infinite linear
}

.loading-wrap {
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.5);
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

@keyframes spin {
    from {transform: rotate(0deg)}
    to {transform:rotate(360deg)}
}

@keyframes loadingeffect {
    from {bottom: -80px}
    to {bottom: 40px}
}

@media (max-width: 360px) {
    .loading {
        width: 98%;
        left: 1%;
    }
}</code></pre>
            </div>
        </div>
        <script>var Ajax = new AjaxRequest();</script>
    </body>
</html>
