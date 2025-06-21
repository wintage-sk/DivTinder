const jwt = require("jsonwebtoken")
const {User}=require("../model/user")

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Token is not provided");
    }

    const decodeToken = await jwt.verify(token, "DivTinderSatheesh@2");

    const { _id } = decodeToken;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(`Auth error: ${err.message}`);
  }
};

module.exports = { userAuth };
