<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link href="ImageCut.css" rel="stylesheet" type="text/css"/>
        <script src="ImageCut.js" type="text/javascript"></script>
        <title></title>
        <style>
            html, body {
                margin: 0; padding: 0
            }
        </style>
    </head>
    <body>
        <div id="resultado"></div>
        <img src="phone.jpg" id="alvo-do-corte" alt="cortar imagem"/>
        <button onclick="cortar()">CORTAR</button>

        <script>
            var cut = new ImageCut('alvo-do-corte');

            var resultado = document.getElementById('resultado');
            var corte;

            function cortar() {
                var resultado = document.getElementById('resultado');
                var corte;
                window.cut.setCut();
                corte = document.createElement('img');
                corte.alt = 'exemplo';
                corte.src = window.cut.getImage();
                resultado.appendChild(corte);
            }
        </script>
    </body>
</html>
