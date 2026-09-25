const express = require('express')

const app = express()
const porta = 3000

const tarefas = [
    { id: 1, titulo: 'faze tarefa', concluida: false },
    { id: 2, titulo: 'come', concluida: true },
    { id: 3, titulo: 'dumi', concluida: false }
]

app.get('/', (req, res) => {
    res.send('API de Tarefas no ar')
})

app.get('/tarefas', (req, res) => {
    res.json(tarefas)
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})