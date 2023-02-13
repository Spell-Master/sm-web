<?php
$values = [];
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    foreach ($_GET as $a => $get) {
        $values[$a] = $get;
    }
} else {
    foreach ($_POST as $b => $post) {
        $values[$b] = $post;
    }
}
?>
<div class="card padding-all">
    <p>Protocolo enviado: <?= $_SERVER['REQUEST_METHOD'] . ' em ' . date('Y-m-d H:i:s') ?></p>
    <p>Dados enviados:</p>
    <pre class="language-php"><code><?php var_dump($values); ?></code></pre>
</div>
<script>
    Prism.highlightElement(jsd('.language-php').child()[0]);
</script>
