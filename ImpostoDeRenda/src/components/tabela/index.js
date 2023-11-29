import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone desejado

const TabelaDeDados = () => {
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPerson, setEditedPerson] = useState({ id: '', nome: '', cpf: '', renda: '' });
  const [newPerson, setNewPerson] = useState({ id: '', nome: '', cpf: '', renda: '' }); // Novo estado para adição
  const [isEditing, setIsEditing] = useState(false);

  const tableHead = ['ID', 'Nome', 'CPF', 'Renda'];


  const apiUrl = "http://localhost/pw/calculadoraImpostoDeRenda/controller/pessoa.php";
  React.useEffect(() => {
    getDataFromApi();
  }, []);

// Função para fazer uma solicitação GET para a API
const getDataFromApi = async () => {
  try {
    const response = await fetch("http://localhost/pw/calculadoraImpostoDeRenda/controller/pessoa.php");
    const data = await response.json();
    console.log("Dados recebidos:", data);
    setTableData(data); // Define os dados da API na tabela
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};

// Função para fazer uma solicitação POST para a API
const postDataToApi = async (data) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log("Dados enviados e resposta recebida:", responseData);
    // Faça algo com a resposta recebida, se necessário
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
  }
};

// Função para fazer uma solicitação PUT para a API
const putDataToApi = async (id, newData) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const responseData = await response.json();
    console.log("Dados atualizados e resposta recebida:", responseData);
    // Faça algo com a resposta recebida, se necessário
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
  }
};

// Exemplo de como usar essas funções em seu código:

// Para fazer uma solicitação GET
getDataFromApi();

// Para fazer uma solicitação POST com dados de exemplo
const exemploDadosPost = { nome: "Exemplo", cpf: "12345678900", renda: 2000 };
postDataToApi(exemploDadosPost);

// Para fazer uma solicitação PUT com ID e novos dados de exemplo
const exemploIdParaAtualizar = 1;
const exemploNovosDados = { nome: "Novo Nome", renda: 2500 };
putDataToApi(exemploIdParaAtualizar, exemploNovosDados);


  const handleEdit = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setEditedPerson(tableData[index]);
  };

  const handleInputChange = (text, fieldName) => {
    if (isEditing) {
      const newEditedPerson = { ...editedPerson, [fieldName]: text };
      setEditedPerson(newEditedPerson);
    } else {
      const newPersonData = { ...newPerson, [fieldName]: text };
      setNewPerson(newPersonData);
    }
  };

  const addNewPerson = () => {
    const newPersonData = { ...newPerson };
    setTableData([...tableData, newPersonData]);
    setNewPerson({ id: '', nome: '', cpf: '', renda: '' });

    console.log('Pessoa adicionada:', newPersonData); // Adicionando log no console para pessoa adicionada
  };


  const saveEditedPerson = () => {
    const updatedTableData = [...tableData];
    updatedTableData[editingIndex] = { ...editedPerson };
    setTableData(updatedTableData);
    setEditingIndex(null);
    setIsEditing(false);
    setEditedPerson({ id: '', nome: '', cpf: '', renda: '' });
  };

  const handleDelete = (index) => {
    const deletedPerson = tableData[index];
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);

    console.log('Pessoa excluída:', deletedPerson); // Adicionando log no console para pessoa excluída
  };

  const renderTableRows = () => {
    return tableData.map((rowData, index) => (
      <Row data={[rowData.id, rowData.nome, rowData.cpf, rowData.renda]}>
        <TouchableOpacity onPress={() => handleEdit(index)}>
          <Text>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <Text>Excluir</Text>
        </TouchableOpacity>
      </Row>
    ));
  };
  const renderEditSection = () => {
    return editingIndex !== null && (
      <View style={styles.inputContainer}>
        {Object.keys(tableHead).map((key, index) => (
          <TextInput
            key={index}
            style={styles.input}
            onChangeText={(text) => handleInputChange(text, tableHead[index].toLowerCase())}
            value={editedPerson[tableHead[index].toLowerCase()]}
            placeholder={tableHead[index]}
          />
        ))}
        <TouchableOpacity onPress={saveEditedPerson} style={styles.addButton}>
          <Text style={styles.addButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAddPersonSection = () => {
    return (
      <View style={styles.inputContainer}>
        {Object.keys(tableHead).map((key, index) => (
          <TextInput
            key={index}
            style={styles.input}
            onChangeText={(text) => handleInputChange(text, tableHead[index].toLowerCase())}
            value={newPerson[tableHead[index].toLowerCase()]}
            placeholder={tableHead[index]}
          />
        ))}
        <TouchableOpacity onPress={addNewPerson} style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar Pessoa</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text2} />
        {renderTableRows()}
      </Table>
      {renderEditSection()}
      {renderAddPersonSection()}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, paddingTop: 30 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: '#fff' },
  text2: { margin: 6, color: '#000' },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    padding: 8,
    color: '#fff', // Definindo a cor do texto para branco
  },
  addButton: { backgroundColor: 'blue', padding: 10, borderRadius: 5, margin: 5 },
  addButtonText: { color: 'white', textAlign: 'center' },
  editIcon: {
    color: '#fff',
    position: 'absolute',
    top: 10, // Ajuste a posição do ícone conforme necessário
    right: 10, // Ajuste a posição do ícone conforme necessário
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowContent: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
});

export default TabelaDeDados;

