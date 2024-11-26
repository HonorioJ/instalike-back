import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from '../controllers/postsController.js';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
}); //Essa poha aqui é só configuração de armazenamento pro Windows. Sem isso, o arquivo vem com o nome todo fodido (Se não estiver usando Linux ou Mac)

const upload = multer({ dest: './uploads', storage})

const routes = (app) => {
  app.use(express.json());
    // **Habilita o middleware para analisar corpos de requisições JSON:**
    // - Permite que o Express entenda e processe dados enviados no formato JSON nas requisições.
  app.use(cors(corsOptions))
  app.get('/posts', listarPosts);
  //Rota para buscar um post
  app.post('/posts', postarNovoPost)
  //Rota para criar um post
  app.post('/upload', upload.single('imagem'), uploadImagem)
  //Rota para atualizar um post
  app.put('/upload/:id', atualizarNovoPost)
}

export default routes;