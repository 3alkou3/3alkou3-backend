const jwt = require("jsonwebtoken");

const adminPassword = process.env.ADMIN_PASSWORD;
const secret = process.env.JWT_SECRET;

const createToken = () => {
  return jwt.sign({}, secret);
};

module.exports = {
  loginUser: (req, res) => {
    const { password, username } = req.body;
    if (!password) {
      res.status(401).json({ error: "Missing Password" });
      return;
    }
    if (password == adminPassword && username.toLowerCase() == "admin") {
      const token = createToken();
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  },
  checkToken: async (req, res) => {
    const { token } = req.body;
    try {
      if (!token) {
        throw new Error("No token")
      }
      const decodedToken = jwt.verify(token, secret);
      res.status(200).json({ message: "Authenticated" });
    } catch (error) {
      console.error(error)
      res.status(401).json({ error: "Token verification failed" });
    }
  }
};
