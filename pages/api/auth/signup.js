import { hash } from 'bcrypt'
import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'
export default async function signup(req, res) {
  if (!req.body) {
    res.statusCode = 404
    res.end('Error')
    return
  }

  let {  password , username , role } = req.body

  hash(password, 10, async (err, hash) => {

    if (err) {
      res.statusCode = 500
      res.end('Error')
      return
    }

    if(role=== null || role === undefined){
      role = 'user'
    }

    const entries  = await prisma.user.create({
      data: {
        email: username,
        role,
        password: JSON.stringify(hash)
      }
    })

    const { password : dbHashPassword , id, email,role , createAt } = entries

    res.json({
      token: jwt.sign({
        id,
        email,
        role,
        createAt,
      }, process.env.JWT_SECRET,
      )
    })
  })

  
}