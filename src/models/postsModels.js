import 'dotenv/config';
import { ObjectId } from 'mongodb'; // Importa a classe ObjectId do pacote MongoDB
import conectarAoBanco from '../config/dbConfig.js' // Importa a função de conexão com o banco

// **Conecta ao banco de dados:**
// - `conectarAoBanco`: Função personalizada para estabelecer a conexão com o banco MongoDB, 
//   definida em `../config/dbConfig.js`.
// - `process.env.STRING_CONEXAO`: Obtém a string de conexão do banco de dados a partir de uma variável de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// **Obtém todos os posts:**
// - `db.collection('posts')`: Seleciona a coleção 'posts' dentro do banco de dados.
// - `find()`: Método do MongoDB para encontrar documentos que correspondem a um filtro (neste caso, todos os documentos).
// - `toArray()`: Transforma o cursor de resultados em um array de documentos JavaScript.
export async function getTodosPosts() {
  const db = conexao.db('imersao-instabytes');
  const colecao = db.collection('posts');
  return colecao.find().toArray()
}

// **Cria um novo post:**
// - `insertOne()`: Método do MongoDB para inserir um único documento em uma coleção.
export async function criarPost(novoPost) {
  const db = conexao.db('imersao-instabytes');
  const colecao = db.collection('posts');
  return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db('imersao-instabytes');
  const colecao = db.collection('posts');
  const objID = ObjectId.createFromHexString(id); // Converte a string do ID para um ObjectId do MongoDB
  return colecao.updateOne( // Atualiza um único documento
    {_id: new ObjectId(objID)}, // Filtro: busca pelo documento com o ID especificado
    {$set:novoPost} // Atualização: substitui os campos existentes pelos novos valores
  )
}