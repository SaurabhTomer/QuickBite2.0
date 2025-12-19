import jwt from "jsonwebtoken";

//is Auth middleware
const isAuth = async (req, res, next) => {
  try {
    //fetch token
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }

    // decode token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
      return res.status(400).json({ message: "token not verify" });
    }

    // add user id in user id
    req.userId = decodeToken.userId;
    
    next();
  } catch (error) {
    return res.status(500).json({ message: "isAuth error" });
  }
};

export default isAuth;
