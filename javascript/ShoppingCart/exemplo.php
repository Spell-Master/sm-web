<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ShoppingCart</title>

        <script src="ShoppingCart.js?ran=<?= time() ?>" type="text/javascript"></script>
        <link href="ShoppingCart.css?ran=<?= time() ?>" rel="stylesheet" type="text/css"/>
        <style>
            .alinhamento {
                text-align: center
            }
            .bloco {
                width: 30%;
                display: inline-block;
                vertical-align: top;
                margin: 10px 1px;
                border: 1px solid #000
            }
            .imagem {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <?php
        if (isset($_POST) && !empty($_POST)) {
            echo ("<pre>");
            var_dump($_POST);
            echo ("</pre>");
        }
        ?>

        Outro valor
        <input
            type="checkbox"
            name="caixa_qualquer"
            value="qualquer coisa"
            class="alvo"
            />

        <div class="alinhamento">
            <div class="bloco">
                <img src="imagens/banana.jpg" alt="banana" class="imagem" />
                <input type="checkbox" name="caixa_a" value="banana" class="alvo" />
            </div>
            <div class="bloco">
                <img src="imagens/laranja.jpg" alt="laranja" class="imagem" />
                <input type="checkbox" name="caixa_b" value="laranja" class="alvo" />
            </div>
            <div class="bloco">
                <img src="imagens/maçã.jpg" alt="maçã" class="imagem" />
                <input type="checkbox" name="caixa_c" value="maçã" class="alvo" />
            </div>
            <div class="bloco">
                <img src="imagens/melancia.jpg" alt="melancia" class="imagem" />
                <input type="checkbox" name="caixa_d" value="melancia" class="alvo" />
            </div>
            <div class="bloco">
                <img src="imagens/pera.jpg" alt="pera" class="imagem" />
                <input type="checkbox" name="caixa_e" value="pera" class="alvo" />
            </div>
        </div>


        <hr />
        Adicionar Elemento existente
        <input type="checkbox" name="externo" value="caixa externa" class="extra" />
        <button onclick="adcionarExtra()">Ativar</button>

        <hr />
        Criar e adicionar elemento
        <button onclick="criarNovo()">Ativar</button>


        <div id="shopping-cart">
            <div data-cart=""></div>
            <form method="POST" action="">
                <button type="submit">Enviar</button>
            </form>
        </div>


        <script>
            var shop = new ShoppingCart('alvo');

            function adcionarExtra() {
                var extra = document.querySelector('input.extra');
                shop.addInput(extra);
            }

            function criarNovo() {
                var novo = document.createElement('input');
                novo.type = 'checkbox';
                novo.value = 'Criado por função';
                novo.name = 'criado[]';
                document.body.appendChild(novo);
                shop.addInput(novo);
            }
        </script>
    </body>
</html>
