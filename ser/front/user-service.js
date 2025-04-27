const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Para enviar eventos HTTP

const app = express();
app.use(cors());
app.use(express.json());

// Simulação de criação de usuário
app.post('/users', async (req, res) => {
    const { name, email } = req.body;

    // Simula a criação de um usuário
    const newUser = { id: Date.now(), name, email };

    console.log(`Usuário criado: ${JSON.stringify(newUser)}`);

    // Notifica o Serviço de Tarefas sobre o novo usuário
    try {
        await axios.post('http://localhost:4000/tasks', { userId: newUser.id });
        console.log('Notificação enviada ao Serviço de Tarefas.');
    } catch (error) {
        console.error('Erro ao notificar o Serviço de Tarefas:', error.message);
    }

    res.status(201).json(newUser);
});

app.listen(3000, () => {
    console.log('🚀 Serviço de Usuários rodando em http://localhost:3000');
});