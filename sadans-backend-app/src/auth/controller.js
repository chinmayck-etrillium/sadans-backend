const db = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(403).json({ message: "Username or password empty!" });
  }

  try {
    await db.query(queries.userExists, [username], (error, results) => {
      if (results.rowCount > 0) {
        return res.status(409).json({ message: "Username already exists!" });
      }
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = { username, hashedPassword };

    await db.query(queries.createUser, [username, hashedPassword]);
    const token = jwt.sign(user, process.env.AUTH_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: ` ${username} registered successfully`,
      token,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(403).json({ message: "Username or password empty!" });
  }

  try {
    const user = await db.query(queries.userExists, [username]);

    if (user.rowCount < 1) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.AUTH_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Authenticated successfully!", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  createUser,
  login,
};
