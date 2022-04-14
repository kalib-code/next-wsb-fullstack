import Head from "next/head"
import Link from "next/link"
import axios from "axios"

const instance = axios.create()




export default function Home() {

  const login = async (email,password) => {  
    const response = await instance.post("/api/auth/login", {
      username: email,
      password: password,
    })
    console.log(response)
  }
 return (
   <>
   <Head>
     <title>NextAuth</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <nav>
      <button 
        onClick={() => {
         login("kalibuas@gmail.com","Saltedasin123!@#");
        }}
      >
        Login
      </button>
      <button>
      Sign Out
      </button>
    </nav>
   </>
 )
}
