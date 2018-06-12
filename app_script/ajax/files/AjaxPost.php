
<script src="files/testeb.js"></script>
<pre>
    <?php var_dump($_POST); ?>
</pre>
<div class="margin-top">
    <div class="text-red">
        Esse arquivo foi carregado pelo AjaxPost
    </div>
    <button class="btn-warning" onclick="testeLocal()">Teste de função local</button>
    <button class="btn-warning" onclick="testeA()">Teste de função de arquivo no index</button>
    <button class="btn-warning" onclick="testeB()">Teste de função de arquivo local</button>
</div>
<script>
    function testeLocal() {
        document.getElementById('teste-de-function').innerText = 'Executando função no arquivo aberto pelo ajax.'
                + ' Essa função está escrita no próprio arquivo';
    }
</script>
