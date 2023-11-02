var table = document.getElementById('pessoa-table').getElementsByTagName('tbody')[0];

document.addEventListener("DOMContentLoaded", function() {
    localStorage.clear()
    let url = "http://localhost/pw/calculadoraImpostoDeRenda/controller/pessoa.php";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.status === 200) {
                // Limpe o conteúdo atual da tabela
                table.innerHTML = '';

                // Preencha a tabela com os dados da API
             // ...

// Preencha a tabela com os dados da API
data.data.forEach(function (pessoa) {
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cellActionEdit = row.insertCell(4);
    var cellActionDelete = row.insertCell(5);

    // Adicione o ícone de edição
    var editIcon = document.createElement('i');
    editIcon.className = 'fas fa-pencil-alt edit-icon';
    cellActionEdit.appendChild(editIcon);

    // Adicione o ícone de exclusão
    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt delete-icon';
    cellActionDelete.appendChild(deleteIcon);
    
    cellActionDelete.className = 'delete-cell'
    cellActionEdit.className = 'edit-cell';

    cell1.innerHTML = pessoa.id;
    cell2.innerHTML = pessoa.nome;
    cell3.innerHTML = pessoa.cpf;
    cell4.innerHTML = pessoa.renda;

    editIcon.addEventListener('click', function () {
        var rowIndex = row.rowIndex;
        var pessoa = data.data[rowIndex - 1];

        localStorage.setItem('pessoaToEdit', JSON.stringify(pessoa));

        window.location.href = 'edit.php'; 
    });


// Adicione um evento de clique ao ícone de exclusão
deleteIcon.addEventListener('click', function () {
    // Obtenha os dados da pessoa que deseja excluir
    var rowIndex = row.rowIndex;
    var pessoa = data.data[rowIndex - 1];

    // Exiba uma caixa de diálogo de confirmação
    var confirmDelete = confirm("Tem certeza de que deseja excluir esta pessoa?");

    // Verifique se o usuário confirmou a exclusão
    if (confirmDelete) {

        localStorage.setItem('pessoaToDelete', JSON.stringify(pessoa));
        window.location.href = 'delete.php'; 

    }
    // Caso contrário, não faça nada e mantenha os dados intactos
});
});
            } else {
                console.error("Falha ao obter os dados da API.");
            }
        })
        .catch(function (error) {
            console.error(error);
        });
});
