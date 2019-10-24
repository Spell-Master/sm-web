<?php

/**
 * *********************************************
 * * @Class ImageUpload
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2013
 * * @version 3.0 (2019)
 * *********************************************
 * * Classe para envio de imagens
 * *********************************************
 */
class ImageUpload {

    // Atributos do Arquivo enviado
    private $file;
    private $name;
    private $size;
    // Atributos da imagem convertida para a pasta
    private $image;
    private $finalName;
    private $newImage;
    private $imageX;
    private $imageY;
    private $sizeX;
    private $sizeY;
    // Atributo da pasta de armazenamento
    private $folder;
    // Atributos dos Resultados obtidos
    private $result;
    private $exif;

    /**
     * *****************************************
     * @Method: Construtor da classe
     * Se não informar um diretório ou se não existir cria um 
     * por padrão.
     * *****************************************
     */
    function __construct($uploadDir = null) {
        $this->folder = ((string) $uploadDir ? $uploadDir : './upload/');
        if (!file_exists($this->folder) && !is_dir($this->folder)) {
            mkdir($this->folder, 0777);
        }
    }

    /**
     * *****************************************
     * @Method: Obtem os dados pelos parâmetros
     * @param ($file) Informe uma arquivo por
     * Global $_FILE
     * @param ($filename) Informe nome para o
     * arquivo
     * @param ($width) Informe o tamanho da
     * imagem "opcional"
     * *****************************************
     */
    public function sendImage(array $file, $filename, $width = null) {
        $this->file = $file;
        $this->name = (string) $filename;
        $this->size = ((int) $width ? $width : 250);
        $this->getImageType();
    }

    /**
     * *****************************************
     * @Method: Retorna o resultado verdadeiro
     * caso tenha sucesso no upload do arquivo.
     * *****************************************
     */
    public function setResult() {
        return $this->result;
    }

    /**
     * *****************************************
     * @Method: Retorna o nome da imagem como
     * ficou no servidor.
     * *****************************************
     */
    public function getImgName() {
        return $this->finalName;
    }

    /**
     * *****************************************
     * @Method: Retorna dados exif da imagem
     * *****************************************
     */
    public function getExif() {
        return $this->exif;
    }

    /**
     * *****************************************
     * @Method: Obtem o tipo de imagem.
     * @return (bool) Se não for imagem jpg..
     * ou png... retorna falso se true executa
     * o próximo método.
     * *****************************************
     */
    private function getImageType() {
        switch ($this->file['type']) {
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/pjpeg':
                $this->image = @imagecreatefromjpeg($this->file['tmp_name']);
                break;
            case 'image/png':
            case 'image/x-png':
                $this->image = @imagecreatefrompng($this->file['tmp_name']);
                break;
        }
        if (!$this->image) {
            @imagedestroy($this->image);
            $this->result = false;
        } else {
            $this->exif = exif_read_data($this->file['tmp_name']);
            $this->setImageResize();
        }
    }

    /**
     * *****************************************
     * @Method: Redimenciona a imagem caso ela
     * seja maior que o permitido.
     * *****************************************
     */
    private function setImageResize() {
        $this->sizeX = imagesx($this->image);
        $this->sizeY = imagesy($this->image);
        $this->imageX = ($this->size < $this->sizeX ? $this->size : $this->sizeX);
        $this->imageY = ($this->imageX * $this->sizeY) / $this->sizeX;
        $this->newImage = imagecreatetruecolor($this->imageX, $this->imageY);
        imagealphablending($this->newImage, false);
        imagesavealpha($this->newImage, true);
        $this->copyImage();
    }

    /**
     * ************************************************
     * @Method: Copia a imagem do diretório temporário 
     *          Define as dimensões da imagem
     *          Verifica se já existe uma imagem com
     * o mesmo nome e a remove.
     * ************************************************
     */
    private function copyImage() {
        $extension = ['.jpg', '.jpeg', '.pjpeg', '.png', '.x-png'];
        foreach ($extension as $value) {
            if (file_exists($this->folder . $this->name . $value)) {
                unlink($this->folder . $this->name . $value);
            }
        }
        imagecopyresampled($this->newImage, $this->image, 0, 0, 0, 0, $this->imageX, $this->imageY, $this->sizeX, $this->sizeY);
        $this->finalName = strtolower($this->name . strrchr($this->file['name'], '.'));
        $this->createNewImage();
    }

    /**
     * ************************************************
     * @Method: Cria a nova imagem já tratada
     * na pasta de envio.
     * @return (bool) Se houver problemas durante o
     * processo de armazenamento remoto, retorna um
     * resultado falso e não salva a imagem.
     * ************************************************
     */
    private function createNewImage() {
        $this->exifImage();
        switch ($this->file['type']) {
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/pjpeg':
                imagejpeg($this->newImage, $this->folder . $this->finalName);
                $this->result = true;
                break;
            case 'image/png':
            case 'image/x-png':
                imagepng($this->newImage, $this->folder . $this->finalName);
                $this->result = true;
                break;
        }
        imagedestroy($this->image);
        imagedestroy($this->newImage);
    }

    /**
     * ************************************************
     * @Method: Obtem a correta orientação de imagens
     * vindas de IOS.
     * ************************************************
     */
    private function exifImage() {
        if ($this->newImage && $this->exif && isset($this->exif['Orientation'])) {
            $orientation = $this->exif['Orientation'];
            switch ($orientation) {
                case 3:
                case 4: $this->newImage = imagerotate($this->newImage, 180, null);
                    break;
                case 5:
                case 6: $this->newImage = imagerotate($this->newImage, 270, null);
                    break;
                case 7:
                case 8: $this->newImage = imagerotate($this->newImage, 90, null);
                    break;
            }
            if ($orientation == 5 || $orientation == 4 || $orientation == 7) {
                imageflip($this->newImage, IMG_FLIP_HORIZONTAL);
            }
        }
    }

}
