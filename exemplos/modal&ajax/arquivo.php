<?php
if (!empty($_GET)) {
    $return = $_GET['metodo'];
} else if (!empty($_POST)) {
    $return = [];
    foreach ($_POST as $key => $value) {
        $return[$key] = $value;
    }
}
?>
<div class="padding-all-min bg-light" style="border: 2px dashed #000">
    <div class="card-blue block">
        <pre><?php var_dump($return); ?></pre>
    </div>
</div>

<script>
    window.proto.showX();
</script>