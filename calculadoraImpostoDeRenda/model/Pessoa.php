<?php
class Pessoa {
    private $id;
    private $nome;
    private $cpf;
    private $renda;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function getCpf() {
        return $this->cpf;
    }

    public function setCpf($cpf) {
        $this->cpf = $cpf;
    }

    public function getRenda() {
        return $this->renda;
    }

    public function setRenda($renda) {
        $this->renda = $renda;
    }
}
?>
