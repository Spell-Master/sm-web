<?php
if (!isset($_POST['input_send']) || empty($_POST['input_send'])) {
    echo ("Nenhum dado recebido para tratamento");
} else {
    $svg = $_POST['input_send'];

    $svgFile = include ('svg-buffer.php');
    $save = time() . ".svg";

    $handle = fopen($save, 'w') or die('Não é possível gerar o arquivo de configuração.'
                    . '<br />Verifique as permissões de acesso as pastas e arquivos no servidor');
    fwrite($handle, $svgFile);
    fclose($handle);
    ?>
    <img src="<?= $save ?>" class="logo" alt="">
    <script>
        document.getElementById('salvar_imagem').style.display = 'none';
        window.modal.showX();
    </script>
    <?php
}
