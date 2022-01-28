import express from 'express';

import { cadastrarClasse } from '../controllers/cadastrarClasse';

import { listarAllClasses } from '../controllers/listarAllClasses';

import { listarUmaClasse } from '../controllers/listarUmaClasse';

import { atualizarClasse } from '../controllers/atualizarClasse';

import { cadastrarComment } from '../controllers/cadastrarComments';

import { deletarClasse } from '../controllers/deletarClasse';

import { deletarComment } from '../controllers/deletarComment';

import { listarAllComments } from '../controllers/listarAllComments';

const router = express.Router();

router.post('/', cadastrarClasse);

router.post('/comments', cadastrarComment);

router.get('/', listarAllClasses);

router.get('/comments', listarAllComments);

router.get('/:id', listarUmaClasse);

router.put('/:id', atualizarClasse);

router.delete('/:id', deletarClasse);

router.delete('/comments/:id', deletarComment);

export default router;
