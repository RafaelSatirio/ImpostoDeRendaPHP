document.addEventListener("DOMContentLoaded", function() {
    const pessoaForm = document.getElementById("pessoa-form");
    const resultDiv = document.getElementById("result");

    pessoaForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const renda = parseFloat(document.getElementById("renda").value);
        const cpf = document.getElementById("cpf").value;

        if (!isNaN(renda)) {
            const pessoa = {
                nome: nome,
                renda: renda,
                cpf: cpf
            };

            // Fazer a solicitação POST para a API
            fetch("http://localhost/pw/calculadoraImpostoDeRenda/controller/pessoa.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pessoa),
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                // Exibir a resposta da API
                JSON.stringify(response.status)
                if(JSON.stringify(response.status) == "200"){
                   alert(JSON.stringify(response.message)) 
                     window.location.href = "http://localhost/pw/calculadoraImpostoDeRenda/view/listagem.php";
                }
               
            })
            .catch(function(error) {
                // Tratar erros
               console.log(error)
            });
        } else {
            resultDiv.innerHTML = "A renda deve ser um número válido.";
        }
    });
});
