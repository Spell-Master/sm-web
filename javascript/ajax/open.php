<script src="importado.js"></script>
<?php if (isset($_GET) && !empty($_GET)) { ?>
    Aberto pelo método <span class="bold text-red"><?= $_GET['ajax'] ?></span>
    <div class="margin-top">
        <button class="btn-info text-white" onclick="localJS('resposta_get')">Executar javascript Local</button>
        <button class="btn-info text-white" onclick="importadoJS('resposta_get')">Executar javascript Incluído</button>
        <div id="resposta_get" class="padding-all">
        </div>
    </div>
    <?php
} else if (isset($_POST)) {
    echo ("<pre>");
    var_dump($_POST);
    echo ("</pre>");
    ?>
    <div class="margin-top">
        <button class="btn-info text-white" onclick="localJS('resposta_post')">Executar javascript Local</button>
        <button class="btn-info text-white" onclick="importadoJS('resposta_post')">Executar javascript Incluído</button>
        <div id="resposta_post" class="padding-all">
        </div>
    </div>
    <?php
}
?>
<script>
    function localJS(param) {
        document.getElementById(param).innerText = 'Executado função javascript escrita no próprio arquivo';
    }
</script>
