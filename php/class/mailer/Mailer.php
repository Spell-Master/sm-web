<?php
/**
 * ********************************************
 * @Copyright (c) 2016, Spell Master.
 * @Version 3.0
 * ********************************************
 * @Class Envio de e-mail
 * ********************************************
 * @requires
 * * PHPMailer 5.2
 * * Contants de definição
 * ********************************************
 * * @const MAILTYPE  :
 * Tipo de acesso tls/ssl ao SMTP
 * * @const MAILHOST :
 * Endereço do SMTP
 * * @const MAILPORT :
 * Porta de Acesso
 * * @const MAILUSER :
 * endereço do e-mail que envia
 * * @const MAILPASS :
 * Senha do e-mail que envia
 * * @const NAME     :
 * Nome de quem envia
 * ********************************************
 * @tutorial localhost
 * - Abra o arquivo httpd.conf do apache
 * Habilite o ssl_module
 * - Abra o arquivo php.ini
 * Ative as extensões:
 * php_curl
 * php_openssl
 * php_sockets
 * php_smtp(caso tenha)
 * - NOTA -
 * Caso o SMTP do e-mail que envia tenha
 * segurança de criptografia de dados como é o
 * caso do GMAIL:
 * Acessar: https://myaccount.google.com/security
 * Procure por:
 * "Acesso a aplicativos menos seguros"
 * e libere a autorização.
 * - NOTA 2 -
 * Em localhost no windows alguns softwares
 * anti-virus podem bloquear o acesso SMTP,
 * uma vez que a máquina estará a enviar dados
 * para um local onde o mesmo não pode
 * monitorar.
 * ********************************************
 */

class Mailer {

    private $mailer;
    private $address;
    private $template;
    private $title;
    private $content;
    private $find;
    private $replaces;
    private $sendError;
    private $sendAcept;

    /**
     * ****************************************
     * Construtor, altera o comportamento da
     * class PHPMailer
     * ****************************************
     */
    function __construct() {
        $this->mailer = new PHPMailer;
        $this->mailer->IsSMTP();
        $this->mailer->IsHTML(true);
        $this->mailer->SMTPAuth = true;
        $this->mailer->SMTPSecure = MAILTYPE;
        $this->mailer->Host = MAILHOST;
        $this->mailer->Port = (int) MAILPORT;
        $this->mailer->Username = MAILUSER;
        $this->mailer->Password = MAILPASS;
        $this->mailer->FromName = MAILNAME;
    }

    /**
     * ****************************************
     * Recebe os dados
     * ****************************************
     * @Param {STR} $Address
     * Para quem o e-mail vai ser enviado.
     * @Param {STR} $title
     * Título do e-mail
     * @Param {STR} $html
     * Arquivo que contém o html do e-mail.
     * @Param {ARR} $values
     * Array com as informações que serão
     * enviadas.
     * ****************************************
     */
    public function sendMail($Address, $title, $html, $values = []) {
        $this->address = (string) $Address;
        $this->title = (string) $title;
        $this->template = (string) $html;
        $this->templateDir();
        $this->find = [];
        $this->replaces = [];
        foreach ($values as $key => $value) {
            $this->find[] = '{' . $key . '}';
            $this->replaces[] = $value;
        }
        $this->objectValues();
    }

    /**
     * ****************************************
     * Quando não consegue enviar informa o
     * erro que ocorreu.
     * ****************************************
     */
    public function mailError() {
        return $this->sendError;
    }

    /**
     * ****************************************
     * Informa o e-mail foi enviado.
     * @return (bool)
     * ****************************************
     */
    public function sendStatus() {
        if ($this->sendAcept) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * ****************************************
     * @Method: Checa se o arquivo de template
     * do html existe.
     * @access private
     * ****************************************
     */
    private function templateDir() {
        if (!file_exists($this->template)) {
            die('Erro ao solicitar dados para envio de e-mail');
        }
    }

    /**
     * ****************************************
     * Cria os objetos de envio
     * @access private
     * ****************************************
     */
    private function objectValues() {
        ob_start();
        include($this->template);
        $content = ob_get_clean();
        if (!empty($this->find) && !empty($this->replaces)) {
            $this->content = str_replace($this->find, $this->replaces, $content);
        }
        if ($this->sendValues()) {
            return true;
        }
    }

    /**
     * ****************************************
     * Envia os dados
     * @access private
     * @return Exeption (true/false)
     * ****************************************
     */
    private function sendValues() {
        $this->mailer->AddAddress($this->address);
        $this->mailer->Subject = $this->title;
        $this->mailer->Body = $this->content;
        try {
            $this->mailer->Send();
            $this->sendAcept = true;
        } catch (Exception $e) {
            $this->sendError = "Erro ao enviar e-mail linha: {$e->getCode()}<br/>Arquivo: {$e->getFile()}<br/>Detalhes: {$e->getMessage()}";
            $this->sendAcept = false;
        }
    }
}
