const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log(req.cookies);

  try {
    if (!token) {
      return res.status(403).json({ message: "Login failed, token missing!" });
    }

    const isValidToken = jwt.verify(token, process.env.AUTH_SECRET);

    if (!isValidToken) {
      res.status(403).json({ message: "No token in the header!" });
    }

    next();
  } catch (error) {
    console.error("Error: ", error);
    res.clearCookie("access_token");
    return res.status(500).json({ message: "Invalid token!" });
  }
};

module.exports = {
  authUser,
};
