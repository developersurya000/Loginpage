import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secretkey=process.env.SECRET_KEY
export function generatetoken(data){
    const token=jwt.sign(
        {id:data.id,email:data.email,name:data.name}
        ,secretkey,{expiresIn:'1h'})
    return token
}