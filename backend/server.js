import express from 'express'
import { database } from './db.js';
import { generatetoken } from './jwt.js';  //token created now have to send it to cookies and verify
const app = express();
import cookieparser from 'cookie-parser'
app.use(cookieparser());
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());
app.listen(3030, () => {
    console.log("server started");
    console.log(secretkey)

})
const db = database()
const secretkey = process.env.SECRET_KEY;

app.get('/', (req, res) => {
    db.query('select * from register', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    db.query("select * from register where email=?", [email], (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data.length > 0) {
                return res.json({ status: "Email already exists!" })
            } else {
                db.query("insert into register (name,email,password) values (?,?,?)", [name, email, password], (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        return res.json({ status: "success!" })
                    }
                })
            }
        }
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('select id, name, email, password from register where email=?', [email], (err, data) => {
        if (err) {
            return res.json({ status: "error in selecting data" })
        } else {
            if (data.length === 0) {
                return res.json({ status: "credentials does not exist! create an account?" })
            } else {
                if (data[0].password === password) {
                    const token = generatetoken({ id: data[0].id, email: data[0].email,name:data[0].name })

                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 3600000,
                        sameSite: 'none'
                    });

                    return res.json({ status: "login success!" })
                } else {
                    return res.json({ status: "invalid! password" })
                }
            }
        }
    })
})

app.post('/checkemail', (req, res) => {
    const email = req.body.email
    db.query('select email from register where email=?', [email], (err, data) => {
        if (err) {
            return res.json({ status: 'error in finding data' })
        } else {
            if (data.length === 0) {
                return res.json({ status: "email does not exist!" })
            } else {
                db.query('select id from register where email=?', [email], (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        return res.send({ status: "success!", id: data[0].id, status2: "email found..." })
                    }
                })
            }
        }
    })
})

app.put('/resetpass', (req, res) => {
    const { id, password } = req.body;
    db.query('update register set password=? where id=?', [password, id], (err, data) => {
        if (err) {
            res.json({ status: "try after sometime!" })
        }
        else {
            res.json({ status: "password reset success!" })
        }
    })
})

const verifytoken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.json({ message: "you are not authorized! to see my dashboard.." })
    } else {
        jwt.verify(token, secretkey,(err,decoded)=>{
            if(err){
                res.json({message: "invalid token!"})
            }else{
                req.name=decoded.name
                req.email=decoded.email
                next()
            }
        })
    }
}

app.get('/checktoken', verifytoken, (req, res) => {
    
    res.json({status:'success',name:req.name})
})

app.get('/logout',(req,res)=>{
    res.clearCookie("token")
    res.json({status:"success"})
})