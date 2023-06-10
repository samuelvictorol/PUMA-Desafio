const fs = require('fs');
const path = require('path');

const getAllUsers = (_req, res) => {
    const favUsersDB = require('../data/db.json')
    return res.status(200).json(favUsersDB)
}

const addUser = (req, res) => {
    console.log("req body:\n" + req.body)
    const newUser = req.body;
    const dbPath = path.join(__dirname, '../data/db.json');
    const favUsersDB = require(dbPath);
  
    // Adiciona o novo usuário à lista de usuários favoritos
    favUsersDB.push(newUser);
  
    // Atualiza o arquivo db.json com a nova lista de usuários favoritos
    fs.writeFileSync(dbPath, JSON.stringify(favUsersDB));
  
    // Retorna uma resposta de sucesso
    res.status(201).json({ message: 'Usuário adicionado com sucesso' });
}

module.exports = {
    getAllUsers,
    addUser
}