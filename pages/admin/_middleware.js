

import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req ,{ nextauth: { token } }) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
)