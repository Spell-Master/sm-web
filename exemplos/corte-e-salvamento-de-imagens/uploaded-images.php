<?php
$path = 'upload';
$iterator = new FileSystemIterator($path);
foreach ($iterator as $file) {
    ?>
    <img
        class="box-xy-250 line-block vertical-top radius-circle"
        src="<?= $path . '/' . $file->getFilename() ?>"
        alt="imagem"
    />
    <?php
}