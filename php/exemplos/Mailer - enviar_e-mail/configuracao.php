<?php

$conf = [
    /*
     * Conexão com o servidor SMTP
     */
    'mailType' => 'tls', // Tipo de criptografia de acesso ('tls'/'sll')
    'mailHost' => 'smtp.gmail.com', // Endereço de acesso
    'mailPort' => 587, // Porta de acesso
    'mailUser' => '????@gmail.com', // Endereço do usuário
    'mailPass' => '????', // Senha do usuário

    /* Limitar caracteres */
    'mailName' => 'Spell-Master', // Nome do website ou pessoa etc... (Qual o nome de quem está enviando o email?)
    'minMail' => 12, // Quantidade mínima de caracteres no e-mail
    'maxMail' => 50, // Quantidade máxima de caracteres no e-mail
    'minText' => 10, // Quantidade mínima de caracteres no texto de envio
    'maxText' => 10000 // Quantidade máxima de caracteres no e-mail
];

