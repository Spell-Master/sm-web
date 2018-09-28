<?php
move_uploaded_file($_FILES['enviar']['tmp_name'], 'upload/' . $_FILES['enviar']['name']);
echo "<div class=\"text-red\">Arquivo enviado para o servidor</div>";
echo "<br />FILE INFO:<pre>";
var_dump($_FILES);
