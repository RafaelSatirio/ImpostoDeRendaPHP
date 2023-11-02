<?php
require_once('db.php');
require_once('../model/Pessoa.php');

class PessoaAPI {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function getAllPessoas() {
        $query = "SELECT id, nome, cpf, renda FROM pessoa";
        $statement = $this->conn->prepare($query);
        $statement->execute();
    
        $pessoas = $statement->fetchAll(PDO::FETCH_ASSOC);
    
        if ($pessoas) {
            return array("status" => 200, "data" => $pessoas);
        } else {
            return array("status" => 400, "message" => "Nenhuma pessoa encontrada.");
        }
    }

    public function createPessoa($pessoa) {
      $query = "INSERT INTO pessoa (nome,cpf,renda) VALUES (?,?,?)";
      $statement = $this->conn->prepare($query);
      $nome = $pessoa->getNome();
      $cpf = $pessoa->getCpf();
      $renda = $pessoa->getRenda();
  

      $statement->bindParam(1, $nome);
      $statement->bindParam(2, $cpf);
      $statement->bindParam(3, $renda);
      $query_execute = $statement->execute();

        if ($query_execute) {
            return array("status" => 200,"message" => "Pessoa criada com sucesso.");
        } else {
            return array("status" => "400.","message" => "falha ao criar a pessoa.");
        }
    }
    public function updatePessoa($pessoa) {
        $query = "UPDATE pessoa SET nome = ?, cpf = ?, renda = ? WHERE id = ?";
        $statement = $this->conn->prepare($query);
        
        $nome = $pessoa->getNome();
        $cpf = $pessoa->getCpf();
        $renda = $pessoa->getRenda();
        $id = $pessoa->getId(); 
    
        $statement->bindParam(1, $nome);
        $statement->bindParam(2, $cpf);
        $statement->bindParam(3, $renda);
        $statement->bindParam(4, $id);
    
        $query_execute = $statement->execute();
    
        if ($query_execute) {
            return true; // Pessoa excluída com sucesso
        } else {
            return false; // Falha na exclusão da pessoa
        }
    }

    public function deletePessoa($pessoa) {
        $query = "DELETE FROM pessoa WHERE id = ?";
        $statement = $this->conn->prepare($query);
        $id = $pessoa->getId();
        $statement->bindParam(1, $id);
        $query_execute = $statement->execute();
    
        if ($query_execute) {
            return true; // Pessoa excluída com sucesso
        } else {
            return false; // Falha na exclusão da pessoa
        }
    }
    
    
}
?>
