<?php
require_once'../dao/PessoaDao.php';
require_once'../model/Pessoa.php';

$pessoaAPI = new PessoaAPI();
$pessoa = new Pessoa();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
   echo json_encode($pessoaAPI->getAllPessoas());
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $pessoa->setNome($data->nome);
    $pessoa->setCpf($data->cpf);
    $pessoa->setRenda($data->renda);
   echo json_encode($pessoaAPI->createPessoa($pessoa));
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

  
    $pessoa->setNome($data->nome);
    $pessoa->setCpf($data->cpf);
    $pessoa->setRenda($data->renda);
    $pessoa->setId($data->id);


    $result = $pessoaAPI->updatePessoa($pessoa);

    if ($result) {
        
        http_response_code(200); 
        echo json_encode(array("message" => "Pessoa alterada com sucesso."));
    } else {
       
        http_response_code(500); 
        echo json_encode(array("message" => "Falha na alteração da pessoa."));
    }

}elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));

    
    $pessoa->setId($data->id);

    // Exclua a pessoa do banco de dados
    $result = $pessoaAPI->deletePessoa($pessoa);

    if ($result) {
        
        http_response_code(200); 
        echo json_encode(array("message" => "Pessoa excluída com sucesso."));
    } else {
       
        http_response_code(500); 
        echo json_encode(array("message" => "Falha na exclusão da pessoa."));
    }

} else {
    http_response_code(405); // Método não permitido
    echo json_encode(array("message" => "Método não permitido."));
}
?>
