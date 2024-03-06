const express = require('express');
const cors = require('cors');
const logger = require('./util/logger');
const userService = require('./service/userService');
const profileRouter = require('./routes/profileRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`${req.method} request at ${req.url}`);
    next();
});
app.use('/profiles', profileRouter);

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if(!username || !password || !email) return res.status(400).json({message: "You must provide a username, password, and email"});
    const data = await userService.registerUser(username, password, email);
    if(data) return res.status(201).json({message: `User ${username} created`, data});
    else return res.status(400).json({message: `User ${username} already exists`});
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password) return res.status(400).json({message: "You must provide a username and password"});
    const token = await userService.loginUser(username, password);
    if(!token) return res.status(400).json({message: "Username and/or password incorrect"});
    return res.status(200).json({message: "User logged in successfully", token});
});


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});