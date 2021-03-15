<?php
$return = [];
$clearDiv = '';
if (!empty($_GET)) {
    $return[0] = $_GET['metodo'];
    $clearDiv = 'carregar_post';
} else if (!empty($_POST)) {
    foreach ($_POST as $key => $value) {
        $return[$key] = $value;
    }
    $clearDiv = 'carregar_get';
}
?>
<div style="border: 2px dashed black">
    <pre><?php var_dump($return); ?></pre>
</div>
<script>
    document.getElementById('<?= $clearDiv ?>').innerHTML = null;
</script>
