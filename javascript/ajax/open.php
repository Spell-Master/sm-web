<div class="padding-all-min bg-light" style="border: 2px dashed #000">
    <div id="resposta" class="bg-white"></div>

    <div class="row-pad">
        <div class="col-dual">
            <div class="card-green block">
                <span class="bold">GET :</span>
                <pre><?php var_dump($_GET); ?></pre>
            </div>
        </div>
        <div class="col-dual">
            <div class="card-blue block">
                <span class="bold">POST :</span>
                <pre><?php var_dump($_POST); ?></pre>
            </div>
        </div>
    </div>
    <div class="margin-all">
       <button class="btn-danger text-white" onclick="removeLoad()">Limpar Local do AJAX</button>
    </div>
</div>

<script type="text/javascript">
    function removeLoad() {
        document.getElementById('carrega-ajax').innerHTML = null;
    }
</script>


