const express = require('express')

const app = express()
const porta = 3001

app.use(express.json())

function autenticacao(req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ erro: 'Não autorizado' })
    }
    next()
}

function validarTitulo(req, res, next) {
    if (!req.body.titulo) {
        return res.status(400).json({ erro: 'Campo titulo é obrigatório' })}
    next()
}

function logger(req, res, next) {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
    next()
}

  const tarefas = [
    { id: 1, titulo: 'faze tarefa', concluida: false },
    { id: 2, titulo: 'come', concluida: true },
    { id: 3, titulo: 'dumi', concluida: false }
]
app.get('/', (req, res) => {
    res.send('API de Tarefas no ar')
})

app.get('/tarefas', (req, res) => {
    const concluida = req.query.concluida

    if (concluida === 'true') {
     const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida === true)
        return res.json(tarefasConcluidas)
    }
    res.json(tarefas)
})

app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id)

    const tarefa = tarefas.find(t => t.id === id)
    if (!tarefa) {
     return res.status(404).json({ erro: 'Tarefa não encontrada' })
    }

    res.json(tarefa)
})
app.post(
    '/tarefas',
    [autenticacao, validarTitulo, logger],
    (req, res) => {
        const { titulo } = req.body
        const novaTarefa = {
            id: tarefas.length + 1,
            titulo: titulo,
            concluida: false
        }

        tarefas.push(novaTarefa)

        res.status(201).json(novaTarefa)
    }
)

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})