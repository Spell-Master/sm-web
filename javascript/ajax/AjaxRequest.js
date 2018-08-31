/**
 * ************************************************
 * @Copyright (c) 2017, Spell Master.
 * @Version: 3.0
 * @Requisitos: Navegador compatível com HTML 5
 * ****************************************************
 * @class Executa ajax.
 * ****************************************************
 */

var AjaxRequest = function () {

    /**
     * ************************************************
     * * GLOBAL VAR
     * ************************************************
     */
    var $httpRequest, $loadDiv, $loading, $form, $head;

    /**
     * ************************************************
     * @function : Abre um arquivo ou uma Url em um 
     * elemento a escolha.
     * 
     * @param div : #Id do elemento onde o ajax será
     * executado
     * @param url : URL ou arquivo "com extenção"
     * para ser aberto
     * contidos devem ser executados?
     * ************************************************
     */
    this.open = function (div, url) {
        initXMLHR();
        $loadDiv = document.getElementById(div);
        $httpRequest.onreadystatechange = function () {
            if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
                $loadDiv.innerHTML = $httpRequest.responseText;
                appendjS($httpRequest.responseText);
            }
        };
        $httpRequest.open('GET', url, true);
        $httpRequest.send();
        return false;
    };

    /**
     * ************************************************
     * @function : Abre um arquivo ou uma Url em um 
     * elemento a escolha, com a possibiliade de
     * alterar o endereço na barra de navegação.
     * Executa uma animação de progresso no mesmo local
     * até que sincronização seja concluída.
     * 
     * @param div : #Id do elemento onde o ajax e a
     * animação serão executados.
     * @param url : URL ou arquivo "com extenção"
     * para ser aberto.
     * @param http : (opcional) Texto para
     * substituir o endereço na barra de navegação.
     * ************************************************
     */
    this.get = function (div, url, http) {
        initXMLHR();
        $loading = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE70lEQVR4Xu2bjZHUMAyFdRUAFQAVwFUAVwFQAVwFQAVwFQAVABUAFcBVAFQAHXBUAPPtWDuO1n9xnKwT0MzO7u0ljvUkPcm29kT+cTlZSP+7InJHRG6JyH33TL67bp7/U0R4fXPvl+7zbNOcE4AHIvLQKYziU+SjiPD6JCJXUway97YGAIs+FZEnztot56pjvRORN608oxUAqvizgFvPAQJjfhGRC/de/YwWAGDxlwsqbpXFIwAC7hgtUwCAxN6KCO/HFnjh3PHEqLnUAgC5obxl8dDDfzs3hdlxWybLZ18YByAhS16MT9YYK3jD8zFEWQPAKxEh1lOC0srcvNcIoAAEhHpvxACAe1YKwlgAsDoTigmKv3avlukKr4BnHhcCAQiEhPW0g9vHAJBTHiJC+ZaK2wkDBG5e4hHM43ZuPqUAgP6LCPrfnVdk0S60XsllhCBzupa5OBsOJQDg8lg/JO8dH8xp9ZiOkCb8crMAhNPYNTkAeMjnCNvj8ljhmAJRkllyGYPKMUjcOQC+RvI8BEMs9iClIDwK1QkpAGJx34PlLfCAQLynwiFIijEAYFusbwsdVmPk5h6FcCUcUsR4EAoxAHBvm3Nhe9byxyC8UsCJcwq1lJAa9+uGEABY/0dgBKorEO5dmGOqTiBz7Yu5EAAUM6zwfImyaIdoxAzoT3XvBSEAfpnYp7xl0J5d39ohFML+NXsvsABAcB/MaD2yfs7xcl6AMW8wiAUghBwXrsn6Cg5VIvuSMdnVMhYA6/4DwsjB3tn/UyU8U93p5gNAHiX3+xKsnjpTNDYdahgMGpNdGPgAhHJorlTuHYtcSjz1FbTpj0MJPcToXdHY/FLLeO459wGwaK2R/S0QoazmX3PhA2BXfmuOf1USD2Y5H5NLH4A/5qq1lL658LR6+dcnAVhr/reApAC4SnnA2jOAApECYFAJ2gv/OQAoDPzNhK0AkKoFBhxgL9wKAKlMcJaqA9hKXnKvP8fmU/7PuoBCTz2cJT6V72AxZKumraRBHziU1kPa3fe+B9jVE6esoLYlIRwG23o+AHYToecd4FqjUBoPTqst0bFbqnvr+12T2qd1dh/LfXQadJJYAOyKcEtESPwfhLQFwG6KrGk3OOdwkPzBWWYo128xDIh9bcAcABUCwO4M9XQQmrNyamMkeJIdAoC9NNDSooHPHCSsVUh92llyoEOs3LVF0Zq9gLwf3dpL1fuWC7L9Nh26CIak8ot2qqUAsIsIBmGbbC1CRiPtJTd2cys+WxesJRS0a0TZP2q0HADciAtpDw6VFIuk3leJnG9y8pNt0iwBAAZFYc0KvYNARxt6pRo69x5RAgAX2/aTXkFAeTZzi9t4SgHoHQRiHrdH+VFtPGMACIHAd8cmRm3b147VUVlqLAAMDidALn5zIn8DxNJ9BLTykKmqF201AAACLkeR4fcSoTzfMZm5BTenG4ziDLLLsn1sQrUA6HiQDRbwGxSpIAGi+S+8XMcHizUAYHw+V/1URhWYCoCOg8JMxj9XwCOwDG03HLXXCjFOzyJgE37EOs9q0rLXCgANC9yRyYVaVgGDeoIX4KCI5QyUBUQszGf9GQ3jAyJgNu1RbgmAb2Gspa9cT3/KMwAJSxNmk1x9Lg4ocWu1pL5DoLa9nYMK9Qz1Ev2BVckzqq+ZywOqJ7T0jf8BWBrx3p73Fz7CAs0clL73AAAAAElFTkSuQmCC" alt="loading" class="spinner opacity" height="60px"/>';
        $loadDiv = document.getElementById(div);
        $loadDiv.innerHTML = '<div class="padding-all-high align-center">' + $loading + '</div>';
        $httpRequest.onreadystatechange = function () {
            if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
                setTimeout(function () {
                    if (http) {
                        window.history.replaceState(null, null, http);
                    }
                    $loadDiv.innerHTML = $httpRequest.responseText;
                    appendjS($httpRequest.responseText);
                }, 1000);
            }
        };
        $httpRequest.open('GET', url, true);
        $httpRequest.send();
        return false;
    };

    /**
     * ************************************************
     * @function : Abre um arquivo ou uma Url em um 
     * elemento a escolha, com a possibiliade de
     * alterar o endereço na barra de navegação.
     * Executa uma animação de progresso até que o
     * ajax seja concluído.
     * 
     * @param div : #Id do elemento onde o ajax será
     * executado
     * @param url : URL ou arquivo "com extenção"
     * para ser aberto
     * @param http : (opcional) Texto para
     * substituir o endereço na barra de navegação.
     * ************************************************
     */
    this.pop = function (div, url, http) {
        initXMLHR();
        var $popUp = document.createElement('div');
        document.body.appendChild($popUp);
        $loading = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAE1klEQVR42mL8//8/w0gGAAHEQid7DIBYH4gVgNgBSUwATd0DKL4ApQ9C2TQDAAHESMMU4A/EAVAPK1Bo1gYo3gjEH6jpSIAAonYAgGI0H4gTqOBpXGABEE+kVsoACCAGUABQAQsAcT0Qv/9PP7AfiB0odTtAAFHD8/l09jg6mA/ECuS6HyCAKMkCoEJsPpQeaAAqFxKh5QRJACCAyA2AAKjnBYhQ+xGID0Dz7AGoYy9gKTsMoOWGAtR8fTLLh0JSCkqAACIn2fQTkSw/APECIA6gsFxJAOIDJGaJ81C9RNkDEECkOmo+ER5vIMUBRGIFaICSEggGxJgNEEDU9DwtPI4tIIhNEe+JcQ9AABFrcQMeiy4QG9pUxAXQ1EZxdgAIIGIsS8BjwQI6xDouDAr0B0QGAk5zAAKIGEve40nyDAOMBaApkBCYgMsMgAAiZMF5HAYmDALPkxoIWGskgAAiJ983DCLPIwfCA3IKRYAAwlfaYkv6Gwah55Gz6wdSswJAAOEybAGO0l5gEAcArHYgBFD6DQABhCv2sQGHQe55GCbUTliArB4ggLAZMIGUUnQQYgVSUgFAAGEz4D2W5q3AEAoABiKazfBUABBATFh6eeg9vAnUHoaiA2ggYrgODAACCFsAMGAJgKEGHkDHD/EN3YGG7RgAAogJV8hAwcIhGPvIA6n4AHh0GiCAmNBGeARINGQoBwA4sgECiAk9RIZRAHyAzivgywYGAAGEHADow9gHh8HEzwFC45oAAYSeBUjRPBQAobkDBYAAQg4AfhI1D5VsgLcgBAggfCngwwjIAgwAAYQ8LI4+Pi44TAIB37j/B4AAwhcAjMNkBhzvxAdAADExjHAAEEBMaDM4wxHgq84PAgQQ0zAr9UntGDUABBATgcnP4QAOQCdOP6KldpDYAYAAYsJTZQgMo1SwAOof0MSpI5QNEmMACCAmtC7kcEwB6I07lIgGCCB8KcBhGAYARqoGCCD09QGgVCCP1BIUHEaeN4D6CSWlAwQQE57ur8AwywYOWLI5A0AAMWEpLJBBwnBO/iAAEEDYlsgMx2wQwIBYgIkCAAIIWztgAlqoJQyT/I+1oQcQQNhSgAA0tPiRUoTiEM/7CliyNxgABBATjkEE5FSgMMRTQQMuz4MAQADhWyaHXhYoMgzNCZILDHgGdwECCF9fIAEtW8wfgvnegYHAyDZAABGaY5swiFeGELNqhOASWoAAIsawC2irLAyGQACsJ3aRJkAAETMiFIDUlQRlhf2DvIU4H+peoiZ1AAKImAB4AM1LQyEQ5kMbbkTXWgABRMpiaQNoj5EfqWZwHCQjSaBIWQ/1vAMptRVAAJEyKHoBS0o4PwjaCAbQFPkQqcdHNAAIIHKXoKCvy1s/QKtI8ildwgMQQJRUMxOwrMPLp5PHHaCLOD9QuCSfASCAKHVIAJYFiveBOJ5GKcIfulcItmZRgVIzAQKIWg5rwLJI8T10ib09FRZA9kMDFrZekWpL9gACiJrb5mBd5wKkPgT6aNMFKAYVVBexFFgG0FrGAcqGbaMBgYPQTs0CapagAAFEq42TAUiYnwJzLkKr3gnYhrOoAQACiJY7R5FjFRmDUgr6hqiPSCnjAgPqBiuaAoAAokcADGoAEEAjfnYYIIBGfAAABBgAAKahgJWV8PUAAAAASUVORK5CYII=" alt="loading" class="spinner opacity"/>';
        $popUp.innerHTML = '<div class="loading"><div class="text-prog">Carregando</div>' + $loading + '<div class="float-clear"></div></div>';
        $loadDiv = document.getElementById(div);
        $httpRequest.onreadystatechange = function () {
            if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
                setTimeout(function () {
                    if (http) {
                        window.history.replaceState(null, null, http);
                    }
                    appendjS($httpRequest.responseText);
                    $loadDiv.innerHTML = $httpRequest.responseText;
                    document.body.removeChild($popUp);
                }, 1000);
            }
        };
        $httpRequest.open('GET', url, true);
        $httpRequest.send();
        return false;
    };

    /**
     * ************************************************
     * @function : Abre um arquivo ou uma Url em um 
     * elemento a escolha, com a possibiliade de
     * alterar o endereço na barra de navegação.
     * Mostra uma barra que indica progresso de leitura
     * do arquivo que será aberto.
     * 
     * @param div : #Id do elemento onde o ajax será
     * executado
     * @param url : URL ou arquivo "com extenção"
     * para ser aberto
     * @param http : (opcional) Texto para
     * substituir o endereço na barra de navegação.
     * ************************************************
     */
    this.load = function (div, url, http) {
        $loading = 0;
        initXMLHR();
        var $progress = document.createElement('div');
        $progress.classList.add('progress');
        document.body.appendChild($progress);

        $httpRequest.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
                $loading = (e.loaded / e.total) * 100;
                $progress.style.width = $loading + '%';
            }
        }, true);
        $loadDiv = document.getElementById(div);

        $httpRequest.onreadystatechange = function () {
            if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
                setTimeout(function () {
                    if (http) {
                        window.history.replaceState(null, null, http);
                    }
                    appendjS($httpRequest.responseText);
                    $loadDiv.innerHTML = $httpRequest.responseText;
                    document.body.removeChild($progress);
                }, 1000);
            }
        };
        $httpRequest.open('GET', url, true);
        $httpRequest.send();
        return false;
    };

    /**
     * ************************************************
     * @function : Requisita a validação de um
     * formulário a partir de outro arquivo.
     * Executa uma animação de progresso cobrindo todo
     * o local até que a requisição seja concluída.
     * 
     * @param form : #Id do formulário de dados.
     * @param div : #Id do elemento onde o ajax será
     * executado.
     * @param file : Arquivo "com extenção" para ser
     * aberto
     * ************************************************
     */
    this.form = function (form, div, file) {
        initXMLHR();
        $form = document.getElementById(form);
        $head = 'form_id=' + form;
        $form.style.position += 'relative';

        $httpRequest.open('POST', file, true);
        formElements();

        var $loadingImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE70lEQVR4Xu2bjZHUMAyFdRUAFQAVwFUAVwFQAVwFQAVwFQAVABUAFcBVAFQAHXBUAPPtWDuO1n9xnKwT0MzO7u0ljvUkPcm29kT+cTlZSP+7InJHRG6JyH33TL67bp7/U0R4fXPvl+7zbNOcE4AHIvLQKYziU+SjiPD6JCJXUway97YGAIs+FZEnztot56pjvRORN608oxUAqvizgFvPAQJjfhGRC/de/YwWAGDxlwsqbpXFIwAC7hgtUwCAxN6KCO/HFnjh3PHEqLnUAgC5obxl8dDDfzs3hdlxWybLZ18YByAhS16MT9YYK3jD8zFEWQPAKxEh1lOC0srcvNcIoAAEhHpvxACAe1YKwlgAsDoTigmKv3avlukKr4BnHhcCAQiEhPW0g9vHAJBTHiJC+ZaK2wkDBG5e4hHM43ZuPqUAgP6LCPrfnVdk0S60XsllhCBzupa5OBsOJQDg8lg/JO8dH8xp9ZiOkCb8crMAhNPYNTkAeMjnCNvj8ljhmAJRkllyGYPKMUjcOQC+RvI8BEMs9iClIDwK1QkpAGJx34PlLfCAQLynwiFIijEAYFusbwsdVmPk5h6FcCUcUsR4EAoxAHBvm3Nhe9byxyC8UsCJcwq1lJAa9+uGEABY/0dgBKorEO5dmGOqTiBz7Yu5EAAUM6zwfImyaIdoxAzoT3XvBSEAfpnYp7xl0J5d39ohFML+NXsvsABAcB/MaD2yfs7xcl6AMW8wiAUghBwXrsn6Cg5VIvuSMdnVMhYA6/4DwsjB3tn/UyU8U93p5gNAHiX3+xKsnjpTNDYdahgMGpNdGPgAhHJorlTuHYtcSjz1FbTpj0MJPcToXdHY/FLLeO459wGwaK2R/S0QoazmX3PhA2BXfmuOf1USD2Y5H5NLH4A/5qq1lL658LR6+dcnAVhr/reApAC4SnnA2jOAApECYFAJ2gv/OQAoDPzNhK0AkKoFBhxgL9wKAKlMcJaqA9hKXnKvP8fmU/7PuoBCTz2cJT6V72AxZKumraRBHziU1kPa3fe+B9jVE6esoLYlIRwG23o+AHYToecd4FqjUBoPTqst0bFbqnvr+12T2qd1dh/LfXQadJJYAOyKcEtESPwfhLQFwG6KrGk3OOdwkPzBWWYo128xDIh9bcAcABUCwO4M9XQQmrNyamMkeJIdAoC9NNDSooHPHCSsVUh92llyoEOs3LVF0Zq9gLwf3dpL1fuWC7L9Nh26CIak8ot2qqUAsIsIBmGbbC1CRiPtJTd2cys+WxesJRS0a0TZP2q0HADciAtpDw6VFIuk3leJnG9y8pNt0iwBAAZFYc0KvYNARxt6pRo69x5RAgAX2/aTXkFAeTZzi9t4SgHoHQRiHrdH+VFtPGMACIHAd8cmRm3b147VUVlqLAAMDidALn5zIn8DxNJ9BLTykKmqF201AAACLkeR4fcSoTzfMZm5BTenG4ziDLLLsn1sQrUA6HiQDRbwGxSpIAGi+S+8XMcHizUAYHw+V/1URhWYCoCOg8JMxj9XwCOwDG03HLXXCjFOzyJgE37EOs9q0rLXCgANC9yRyYVaVgGDeoIX4KCI5QyUBUQszGf9GQ3jAyJgNu1RbgmAb2Gspa9cT3/KMwAJSxNmk1x9Lg4ocWu1pL5DoLa9nYMK9Qz1Ev2BVckzqq+ZywOqJ7T0jf8BWBrx3p73Fz7CAs0clL73AAAAAElFTkSuQmCC" alt="loading" class="spinner opacity" height="60px"/>';
        $loading = document.createElement('div');
        $loading.innerHTML = '<div class="loading-wrap">' + $loadingImg + '</div>';
        $form.appendChild($loading);

        $loadDiv = document.getElementById(div);
        $loadDiv.innerHTML = null;

        $httpRequest.onreadystatechange = function () {
            if (($httpRequest.readyState === 4) && ($httpRequest.status === 200)) {
                for (var $i = 0; $i < $form.elements.length; $i++) {
                    $form.elements[$i].disabled = false;
                }
                setTimeout(function () {
                    $loadDiv.innerHTML = $httpRequest.responseText;
                    appendjS($httpRequest.responseText);
                    $form.removeChild($loading);
                    $form.style.position = null;
                }, 1000);
            }
        };
        $httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        $httpRequest.send($head);
        return false;
    };

    /**
     * ************************************************
     * @function : Inicia o protocolo XMLHTTP
     * ************************************************
     */
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

    /**
     * ************************************************
     * @function : Busca por todos javascripts
     * inseridos na requisição e incorpora eles ao DOM.
     * @param srcData : Conteúdo lido pelo response
     * ou seja dados para buscar
     * ************************************************
     */
    function appendjS(srcData) {
        var $coutSrc = srcData.indexOf('<script', 0);
        removeOldSrc();
        while ($coutSrc != -1) {
            var $newSrc = document.createElement('script');
            var $src = srcData.indexOf(' src', $coutSrc);
            $coutSrc = srcData.indexOf('>', $coutSrc) + 1;
            if ($src < $coutSrc && $src >= 0) {
                $coutSrc = $src + 4;
                var $endSrc = srcData.indexOf('.', $coutSrc) + 4;
                var $stringSrc = srcData.substring($coutSrc, $endSrc);
                $stringSrc = $stringSrc.replace("=", "").replace(" ", "").replace("\"", "").replace("\"", "").replace("\'", "").replace("\'", "").replace(">", "");
                $newSrc.src = $stringSrc;
            } else {
                $endSrc = srcData.indexOf('</script>', $coutSrc);
                $stringSrc = srcData.substring($coutSrc, $endSrc);
                $newSrc.text = $stringSrc;
            }
            $loadDiv.appendChild($newSrc);
            $coutSrc = srcData.indexOf('<script', $endSrc);
            $newSrc = null;
        }

    }

    /**
     * ************************************************
     * @function Depois de completado, limpar o DOM
     * removendo dados entigos de script não
     * funcionais.
     * ************************************************
     */
    function removeOldSrc() {
        var $oldScript = $loadDiv.getElementsByTagName('script'), $cns;
        for ($cns = $oldScript.length - 1; $cns >= 0; $cns--) {
            $oldScript[$cns].parentNode.removeChild($oldScript[$cns]);
        }
        return;
    }

    /**
     * ************************************************
     * @function : Detecta todos input do tipo Name
     * de um formulário e insere seus values para
     * serem eviados.
     * ************************************************
     */
    function formElements() {
        for (var $i = 0; $i < $form.elements.length; $i++) {
            $form.elements[$i].disabled = true;
            if ($form.elements[$i].type == 'checkbox') {
                if ($form.elements[$i].checked) {
                    var $checkbox = $form.elements[$i].value;
                    $head += '&' + $form.elements[$i].name + '=' + $checkbox;
                }
            } else if ($form.elements[$i].type == 'radio') {
                if ($form.elements[$i].checked) {
                    var $radio = $form.elements[$i].value;
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
 * * 2.3 (Spell Master)
 * - Criado método para upload de arquivos.
 * * 2.4 (Spell Master)
 * - Re-Adcionado método de carregamento com animação
 * local.
 * * 2.5 (Spell Master)
 * - Separado em método o encapsulamento dos elementos
 * na header.
 * * Adicionado LOOP para checagem de input RADIO em
 * formulários.
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
 * ************************************************
 */
