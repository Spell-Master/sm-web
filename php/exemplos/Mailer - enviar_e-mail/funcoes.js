/* 
 * Create on: 2020-09-29 03:12:57
 * By: Spell Master
 */

const LENGTH = {};
var exemplo = exemplo || {};

(function () {
    'use strict';
    exemplo = (function () {

        /*
         * Essa função vai localizar o formulário no documento,
         * Definir os dados de caracteres para que sejam checados antes do back-end
         * pois isso é muito agradável para os usuários, uma vez que em caso de erro não precizem
         * esperar uma requisição pela resposta.
         * Vai adicionar o evento para validar o formulário sem atualizar a página.
         */
        var salvarFormulario = function (caracteres) {
            var formulario = document.getElementById('enviar-mail');
            LENGTH.minMail = parseInt(caracteres[0]);
            LENGTH.maxMail = parseInt(caracteres[1]);
            LENGTH.minText = parseInt(caracteres[2]);
            LENGTH.maxText = parseInt(caracteres[3]);
            formulario.addEventListener('submit', enviarDados, false);
        };

        /*
         * Essa função vai checar se todos os campos estão corretos.
         * Só então ela vai se torna um prototipo do AjaxRequest.js
         * para submeter o formulário por AJAX.
         */
        var enviarDados = function (e) {
            e.preventDefault();
            var mail = document.getElementById('mail').value.trim(),
                conteudo = document.getElementById('conteudo').value.trim();
            try {
                if (!mail) {
                    throw 'Informe o endereço de e-mail';
                } else if (mail.length < LENGTH.minMail) {
                    throw 'O e-mail precisa ter pelo menos ' + LENGTH.minMail + ' caracteres';
                } else if (mail.length > LENGTH.maxMail) {
                    throw 'O e-mail precisa ter menos de ' + LENGTH.maxMail + ' caracteres';
                } else if (!mail.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{3})$/)) {
                    throw 'O e-mail não é válido';
                } else if (!conteudo) {
                    throw 'Informe o conteúdo';
                } else if (conteudo.length < LENGTH.minText) {
                    throw 'O conteúdo precisa ter pelo menos ' + LENGTH.minText + ' caracteres';
                } else if (conteudo.length > LENGTH.maxText) {
                    throw 'O conteúdo precisa ter menos de ' + LENGTH.maxText + ' caracteres';
                } else {
                    enviarDados.prototype = new AjaxRequest(); // prototipo definido
                    // form('ID do Fomuário', 'ID do local de validar', 'caminho e nome do arquivo que vai receber')
                    enviarDados.prototype.form('enviar-mail', 'validar-resultado', 'enviar.php');
                }
            } catch (err) {
                informarErro(err);
            }
            return (false);
        };


        var informarErro = function (texto) {
            var resultado = document.getElementById('validar-resultado');
            resultado.innerHTML = '<div class="alert-danger"><p class="bold">Erro</p>' + texto + '</div>';
            resultado.classList.remove('hide');
            setTimeout(function () {
                resultado.innerHTML = null;
                resultado.classList.add('hide');
            }, 3000);
        };

        return {
            salvar: salvarFormulario,
            erro: informarErro
        };
    }());
}());
