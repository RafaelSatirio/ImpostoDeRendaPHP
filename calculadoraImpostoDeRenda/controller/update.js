document.addEventListener("DOMContentLoaded", function () {
    // Recupere os dados da pessoa do localStorage
    var pessoaToEdit = JSON.parse(localStorage.getItem('pessoaToEdit'));

    if (pessoaToEdit) {
        var editModal = document.getElementById('editModal');
        var modalContent = editModal.querySelector('.modal-content');

        // Preencha o modal com os dados da pessoa
        modalContent.innerHTML = `
            <h2>Editar Pessoa</h2>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" value="${pessoaToEdit.nome}">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" value="${pessoaToEdit.cpf}">
            <label for "renda">Renda:</label>
            <input type="text" id="renda" value="${pessoaToEdit.renda}">
            <button id="saveChanges">Salvar Alterações</button>
        `;

        // Exiba o modal
        editModal.style.display = 'block';

        // Adicione um evento de clique ao botão "Salvar Alterações"
        var saveChangesButton = modalContent.querySelector('#saveChanges');
        saveChangesButton.addEventListener('click', function () {
            // Obtenha os dados atualizados da pessoa a partir do modal
            var updatedNome = document.getElementById('nome').value;
            var updatedCpf = document.getElementById('cpf').value;
            var updatedRenda = document.getElementById('renda').value;
        
            // Recupere os dados da pessoa a ser atualizada do localStorage
            var pessoaToEdit = JSON.parse(localStorage.getItem('pessoaToEdit'));
        
            console.log(pessoaToEdit)
            // Atualize os dados da pessoa
            pessoaToEdit.nome = updatedNome;
            pessoaToEdit.cpf = updatedCpf;
            pessoaToEdit.renda = updatedRenda;
        
            // Faça a solicitação para atualizar os dados no backend
            var url = "http://localhost/pw/calculadoraImpostoDeRenda/controller/pessoa.php"; // Substitua pela URL correta
            fetch(url, {
                method: 'PUT', // Use PUT para atualizar os dados
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pessoaToEdit), // Envie os dados da pessoa atualizados
            })
            .then(function (response) {
                if (JSON.stringify(response.status) == "200") {
                    console.log(JSON.stringify(response))
                   alert("Dados atualizados com sucesso");
                    window.location.href = "http://localhost/pw/calculadoraImpostoDeRenda/view/listagem.php";

                } else {
                    alert("Falha ao atualizar os dados");
                }
            })
            .catch(function (error) {
                console.error(error);
            });
        
            // Feche o modal
            editModal.style.display = 'none';
        });
    }
});
