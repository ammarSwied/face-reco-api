import express from "express";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import cors from 'cors';
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import handleProfile from "./controllers/profile.js";
import handleImage from "./controllers/image.js";
import handleAPI from "./controllers/imageAPI.js";

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
    //   port: 3001,
      password : '4747',
      database : 'facereco' 
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {res.json('You are all set')});

app.post('/signin', (req,res) => { handleSignIn(req, res , db , bcrypt) });

app.post('/register', (req,res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id' , (req,res) => { handleProfile(req, res ,db) });

app.put('/image', (req,res) => { handleImage(req, res, db) });

app.post('/imageURL', (req, res) => { handleAPI(req, res) });

const PORT = process.env.PORT;

app.listen(3001, ()=> {
    console.log(`i am running on port 3001 ${PORT} `);
});