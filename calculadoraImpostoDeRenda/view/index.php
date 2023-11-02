<!DOCTYPE html>
<html>
<head>
    <title>imposto de renda</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <h1>Imposto de renda</h1>
    <form id="pessoa-form">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required><br><br>

        <label for="nome">cpf:</label>
        <input type="text" id="cpf" name="cpf" required><br><br>

        <label for="renda">Renda:</label>
        <input type="number" id="renda" name="renda" required><br><br>

        <button type="submit">Criar Pessoa</button>
    </form>

    <div id="result"></div>

    <script src="../controller/post.js"></script>
</body>
</html>
