const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Array para armazenar as tarefas (simulação de banco de dados)
let tasks = [];

// Endpoint para receber notificações de novos usuários
app.post('/tasks', (req, res) => {
    const { userId } = req.body;

    // Cria uma tarefa padrão para o novo usuário
    const newTask = {
        id: Date.now(),
        userId,
        description: 'Complete sua primeira tarefa!',
        completed: false
    };

    tasks.push(newTask);
    console.log(`Tarefa criada para o usuário ${userId}: ${JSON.stringify(newTask)}`);

    res.status(201).json(newTask);
});

// Endpoint para listar todas as tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.listen(4000, () => {
    console.log('🚀 Serviço de Tarefas rodando em http://localhost:4000');
});