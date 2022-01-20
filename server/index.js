const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const sequelize = require('./sequelize')
const bcrypt = require('bcrypt');

// Middleware
app.use(express.json())
app.use(cors());

// endpoints
app.post('/register', async (req, res)=> {
    const{username, name, password,} = req.body;
    const checkUser = await sequelize.query(
        `SELECT * FROM users WHERE username = '${username}'`
    )
    if(checkUser[1].rowCount !== 0){
        res.status(500).send('Username already exists')
    } else {
        const salt = bcrypt.genSaltSync(10)
        const passHash = bcrypt.hashSync(password, salt)
        await sequelize.query(`
            INSERT INTO users (name, username, password)
            VALUES(
                '${name}', 
                '${username}', 
                '${passHash}'
            )
        `)
        const userInfo = await sequelize.query (`
            SELECT id, username, name FROM users WHERE username = '${username}'
        `)
        res.status(200).send(userInfo)
    }
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))