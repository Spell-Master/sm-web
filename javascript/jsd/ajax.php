<?php
$return = [];

if (!empty($_GET)) {
    foreach ($_GET as $a => $get) {
        $return[$a] = $get;
    }
} else if (!empty($_POST)) {
    foreach ($_POST as $b => $post) {
        $return[$b] = $post;
    }
}
?>
<pre><?php var_dump($return); ?></pre>
