
import {getTokenCookie}  from '../../../lib/auth-cookies'
import Iron from '@hapi/iron'
import { decode } from 'jsonwebtoken';
import prisma from '../../../lib/prisma';



import {  NextResponse } from 'next/server'

export async function middleware(req) {
    

const auth = req.headers.get('authorization')

const token = auth.split(' ')[1]

console.log(process.env.JWT_SECRET )


if(!auth){
  return new Response(' you are not authorize to access please login in first', {
    status: 401,
  })
}

  const decoded = decode(token )

  //TODO: create a middleware to check if the user is exist in the database
  //by axios call for user api to be created 

  // console.log(user)
  //   if(!decode.role === 'user'){
  //     return new Response('no username exist please register', {
  //       status: 401,
  //     })
  //   }

     return NextResponse.next()


  // })


  







   
}