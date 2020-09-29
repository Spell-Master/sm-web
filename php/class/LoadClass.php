<?php
/**
 * *********************************************************************
 * @function: Função para auto carregamento de classes
 * *********************************************************************
 * @autor: Spell Master
 * @copyright (c) 2014, Spell Master AND Zeed
 * @vesion: 4.1 2018, Spell Master
 * *********************************************************************
 */

function __autoload($Class) {
    $findDir = [/* Liste aqui todas as pastas que contenham arquivos de classes */
        'mailer',
        'model'
    ];
    $includeDir = null;
    foreach ($findDir as $DirName) {
        $fileClass = FindClass($DirName, $Class);
        if (!$includeDir && file_exists($fileClass) && !is_dir($fileClass)) {
            include_once ($fileClass);
            $includeDir = true;
        }
    }
    if (!$includeDir) {
        die("Erro fatal! Dados cruciais de funcionamento não estão disponíveis" . $fileClass);
    }
}

/**
 * Retorna a string com o diretório e nome do arquivo
 * @param {STR} $dir
 * Informar o diretório de retorno
 * @param {STR} $class
 * Informar o arquivo de retorno
 * @return
 * BASE_DIR\..\class\$dir\$class.php
 */
function FindClass($dir, $class) {
    return (
        __DIR__
        . DIRECTORY_SEPARATOR
            . '..'
        . DIRECTORY_SEPARATOR
            . 'class'
        . DIRECTORY_SEPARATOR
            . $dir
        . DIRECTORY_SEPARATOR
            . $class
            . '.php'
    );
}
