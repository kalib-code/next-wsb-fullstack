import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import prisma from "../../../lib/prisma";
import {setTokenCookie} from "../../../lib/auth-cookies";

export default async function login(req, res) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password  } = req.body;


  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  const { password : hashPassword ,  id, email,role , createAt} = user;

  compare(password, JSON.parse(hashPassword), (err, result) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error");
      return;
    }

    const accessToken = jwt.sign(
      {
        id,
        email,
        role,
        createAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 8  },
    )

    setTokenCookie(res, accessToken);

    if (result) {
      res.json({
        accessToken,
      });
    } else {
      res.statusCode = 401;
      res.end("Error");
    }
  });
}
