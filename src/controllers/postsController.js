import fs from 'fs';
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import gerarDescricaoComGemini from '../services/geminiService.js';

/**
 * **Rota para listar todos os posts:**
 *  - Recupera todos os posts do banco de dados utilizando a função `getTodosPosts`.
 *  - Retorna um JSON com os posts e o status HTTP 200 (sucesso).
 */
export async function listarPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}

/**
 * **Rota para criar um novo post:**
 *  - Extrai os dados do novo post do corpo da requisição.
 *  - Insere o post no banco de dados utilizando `criarPost`.
 *  - Retorna o post criado com status 200 (sucesso).
 *  - Caso ocorra um erro, retorna um erro 500 com uma mensagem.
 */
export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: 'Falha ao criar o post' });
  }
}

/**
 * **Rota para fazer upload de imagem e criar um novo post:**
 *  - Cria um objeto de post com os dados da imagem.
 *  - Insere o post no banco de dados.
 *  - Renomeia a imagem com um nome único baseado no ID do post.
 *  - Move a imagem para a pasta de uploads.
 *  - Retorna o post criado com status 200 (sucesso).
 *  - Caso ocorra um erro, retorna um erro 500 com uma mensagem.
 */
export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: '',
    imgUrl: req.file.originalname,
    alt: ''
  };

  try {
    const postCriado = await criarPost(novoPost);
    const novoNomeImagem = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, novoNomeImagem);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: 'Falha ao fazer upload da imagem' });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    };

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado)
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: 'Falha ao criar o post' });
  }
}

