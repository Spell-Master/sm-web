<!DOCTYPE html>
<?php
/*
 * Envio de e-mail's usando PHP, HTML, JavaScript. Com a class PHPMailer
 */
require ('configuracao.php');

?>
<html>
    <head>
        <title>Enviar E-MAIL</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="../../../css/sm-default.css" rel="stylesheet" type="text/css"/>
        <link href="../../../javascript/AjaxRequest/AjaxRequest.css" rel="stylesheet" type="text/css"/>
        <script src="../../../javascript/AjaxRequest/AjaxRequest.js" type="text/javascript"></script>

        <script src="funcoes.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="container padding-all-prop">
            <h1 class="align-center">Enviar e-mail</h1>
            <hr class="border-bottom border-light" />

            <div id="validar-resultado" class="zoom-in hide"></div>

            <form method="POST" id="enviar-mail" action="">
                <div class="row-pad">
                    <div class="col-threequarter">
                        <p class="margin-left list">Informe o endereço de e-mail:</p>
                        <div class="shadow">
                            <input type="text" name="mail" id="mail" maxlength="<?= $conf['maxMail'] ?>" class="input-default" placeholder="Para quem deve ser enviado?" />
                        </div>
                    </div>
                    <div class="col-quarter">
                        <p>&nbsp;</p>
                        <button class="btn-default button-block shadow-on-hover">Enviar E-Mail</button>
                    </div>

                    <div class="col-single">
                        <p class="margin-left list">Conteúdo como mensagem:</p>
                        <div class="shadow">
                            <textarea name="conteudo" id="conteudo" maxlength="<?= $conf['maxText'] ?>" class="input-default box-y-250"></textarea>
                        </div>
                    </div>
                </div>
            </form>

            <blockquote class="quote-red text-dark-red margin-top-high">
                <p class="font-medium">Importante!</p>
                <p>Este é apenas um exemplo simples para execução da class <span class="bold">Mailer</span>
                    que usa como matrix a class <span class="bold">PHPMailer</span>.</p>
                <p>Para coesa utilização desse recurso é necessário a implementação
                    de filtragens mais detalhadas para o fluxo de dados que serão
                    usados.</p>
                <p>Preferi não entrar nesse assunto durante o código do exemplo
                    para não complicar e desviar da parte da execução.</p>
                <p>Para o entendimento leia as explicações contidas no arquivo:</p>
                <p class="italic"><?= __DIR__ . DIRECTORY_SEPARATOR ?><span class="bold">enviar.php</span></p>
            </blockquote>
        </div>

        <script>
            exemplo.salvar([
                '<?= $conf['minMail'] ?>',
                '<?= $conf['maxMail'] ?>',
                '<?= $conf['minText'] ?>',
                '<?= $conf['maxText'] ?>'
            ]);
        </script>
    </body>
</html>
