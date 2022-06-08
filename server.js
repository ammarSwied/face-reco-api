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
      connectString : process.env.DATABASE_URL,
      ssl: true,
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

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`i am running on port ${PORT} `);
});