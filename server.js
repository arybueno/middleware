const express = require('express')

const app = express()
const porta = 3001

app.use(express.json())

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

app.post('/tarefas', (req, res) => {
    const { titulo } = req.body

    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: titulo,
        concluida: false
    }

    tarefas.push(novaTarefa)

    res.status(201).json(novaTarefa)
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})