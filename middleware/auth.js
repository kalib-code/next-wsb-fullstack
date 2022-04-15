import { promisify } from 'util';
import prisma from '../lib/prisma';

const withProtect = (handler) => {
  return async (req, res) => {
    // Get token and check if it exists

    console.log("test")
    let token;

    if (req.cookies && req.cookies.app_accessToken) {
      token = req.cookies.app_accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to get access.',
      });
    }

    // try {
    //   // Verify token
    //   const decoded = await promisify(jwt.verify)(
    //     token,
    //     process.env.JWT_SECRET
    //   );

    //   // Check if user exists with refresh token
    //   const currentUser = await User.findById(decoded.id);
    //   if (!currentUser) {
    //     return res.status(401).json({
    //       success: false,
    //       message: 'The user belonging to this token no longer exist.',
    //     });
    //   }

    //   // Grant access to protected route
    //   req.user = currentUser;

    //   return handler(req, res);
    // } catch (error) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Please log in to get access.',
    //   });
    // }
  };
};

export default withProtect;