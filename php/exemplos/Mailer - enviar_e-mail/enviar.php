<?php
/*
 * var_dump($_POST);
 * 
 * array(3) {
 *  ["form_id"]=> string(11) "enviar-mail"
 *  ["mail"]=> string(17) "exemplo@exemplo.com"
 *  ["conteudo"]=> string(26) "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
 * } 
 */

/*
 * Requisitando as configurações
 */
require_once (__DIR__ . DIRECTORY_SEPARATOR . 'configuracao.php');

/*
 * Constants que a class "Mailer" usa
 * O ideal que isso não fique aqui e sim em um arquivo a parte e seja requisitado por esse arquivo aqui
 */
defined('MAILNAME') || define('MAILNAME', $conf['mailName']);
defined('MAILTYPE') || define('MAILTYPE', $conf['mailType']);
defined('MAILHOST') || define('MAILHOST', $conf['mailHost']);
defined('MAILPORT') || define('MAILPORT', $conf['mailPort']);
defined('MAILUSER') || define('MAILUSER', $conf['mailUser']);
defined('MAILPASS') || define('MAILPASS', $conf['mailPass']);

/*
 * Requisitando a função LoadClass
 * para evitar ficar inclundo arquivos de classe use essa função mágica.
 * onde a mesma faz com os dados de uma classe estejam disponíveis bastando apenas instanciar a classe.
 * Para mais informação leia class/LoadClass.php
 */
require_once (__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class' . DIRECTORY_SEPARATOR . 'LoadClass.php');

/*
 * Aplicar o filtro padrão "FILTER_DEFAULT" em todos índices da super global $_POST
 * requer a classe "model/GlobalFilter"
 */
$post = GlobalFilter::filterPost(); // O método mágico "LoadClass" faz com que não seja necessário incluir o arquivo "GlobalFilter.php"

try {
    /*
     * Verificando trapaças que podem ser feitas
     * Isso só irá acontecer caso alguém usar o inspetor do browser e alterar o name do input
     */
    if (!isset($post->mail)) {
        throw new Exception('$_POST[\'mail\'] não foi definido', 1);
    } else if (!isset($post->conteudo)) {
        throw new Exception('$_POST[\'conteudo\'] não foi definido', 1);
    } else {
        $mail = trim($post->mail);
        $conteudo = trim($post->conteudo);

        /*
         * Requisitando a classe LenMaxMin
         * Esse é uma classe padrão para verificação de quantidade de caracteres em uma string
         * própria para validação POST.
         * Poupa trabalho ao ter que verificar mímimo e náximo, "ela já faz isso"
         * Para mais informações leia: class/model/LenMaxMin.php
         */
        $len = new LenMaxMin(); // O método mágico "LoadClass" faz com que não seja necessário incluir o arquivo "LenMaxMin.php"

        /*
         * IMPORTANTE!
         * Verificando dados.
         * Mesmo sendo feito no javascript aqui no lado do servidor também deve ser verificado!
         * Alguém mal intencionado pode usar o inspetor do browser para editar o javascript
         * e fugir da verificação. Mas irá quebrar a cara pois a verificação é feita aqui no servidor também ^.^
         */
        if (empty($mail)) {
            throw new Exception('Informe o endereço de e-mail', 2);
        } else if ($len->strLen($mail, $conf['minMail'], $conf['maxMail'], 'recebidor do e-mail')) {
            throw new Exception($len->getAnswer(), 2);
        } else if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('e-mail inválido', 2);
        } else if (empty($conteudo)) {
            throw new Exception('Informe a mensagem de envio', 2);
        } else if ($len->strLen($conteudo, $conf['minText'], $conf['maxText'], 'mensagem de envio')) {
            throw new Exception($len->getAnswer(), 2);
        } else if ($mail == MAILUSER) {
            throw new Exception('Não é aconselhável o rementente ser o mesmo que o recebido'
            . '<p>Use um e-mail diferente do que está na configuração</p>', 2);
        }
        //
        else {
            /*
             * Requisitando a classe Mailer
             * Graças ao método mágico LoadClass não precisamos incluir o Mailer.php nem PHPMailer.php nem smtp.php
             */
            $mailer = new Mailer();

            /*
             * Liste quaisquer informações que vão ser enviadas em índices de array
             */
            $enviar_dados = [
                'DATA' => date('Y-m-d'),
                'HORARIO' => date('H:i:s'),
                'MENSAGEM' => mb_convert_encoding(htmlentities($conteudo), 'UTF-8', 'ASCII')
            ];
            /*
             * Indicando o arquivo .HTML que terá o layout do e-mail
             * Esse arquivo pode ser personalizado como qualquer documento html
             * MAS "NÃO!!!!" INCLUA AQUIVOS CSS OU JAVASCRIPT NELES.
             * As personalizações do layout podem ser feitas usando código inline:
             * style="........ "
             * O que manda mesmo no arquivo html é sua criatividade
             */
            $html = __DIR__ . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'design_de_envio.html';

            /*
             * Enviando o e-mail
             * Informando:
             * Parâmetro 1 = e-mail de quem vai receber
             * Parâmetro 2 = título do e-mail (Evite acentuações e qualquer caractere expecial)
             * Parâmetro 3 = arquivo html do design do e-mail
             * Parâmetro 3 = array com as informações que serão enviadas
             */
            $mailer->sendMail($mail, 'Exemplo', $html, $enviar_dados);

            /*
             * Essa verificação apenas dar para saber se foi aceita a conexão
             * Não dar para saber se de fato algo foi enviado, pois nenhum smtp
             * retorna confirmação de recebimento.
             * Isso somente servirá como depuração do seu próprio código
             */
            if ($mailer->sendStatus()) {
                ?>
                <div class="alert-success">
                    E-mail enviado para <?= htmlentities($mail) ?>
                </div>
                <script>document.getElementById('validar-resultado').classList.remove('hide');</script>
                <?php
            } else {
                throw new Exception($mailer->mailError(), 1);
            }
        }
    }
} catch (Exception $e) {
    switch ($e->getCode()) {
        case 1: // retorno 1 para depuração de erros
            /*
             * Registar LOG de erros com as informações:
             * $e->getMessage();
             * $e->getLine();
             */
            break;
        case 2: // retorno 2 para erros de postagem
            echo ("<script>exemplo.erro(`{$e->getMessage()}`);</script>");
            break;
    }
}
