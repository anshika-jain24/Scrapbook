import jwt from 'jsonwebtoken';
import User from '../models/User';

function auth(req, res, next) {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      User.findById(decoded.id)
        .then((user) => {
          if (!user) {
            next(new Error("Invalid Token"))
          }
          req.user = user;
          next();
        })
        .catch((error) => {
          console.error(error);
          next(new Error("Not authorized, token failed"))
        });
    }
    if (!token) {
      next(new Error("Not authorized, token failed"))
  
    }
  }

export default {auth};