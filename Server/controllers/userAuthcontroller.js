const jwtToken = require("../util/jwtutil");
const crypto = require("crypto");
const connection = require("../database/dataconn");

const userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  connection.query(
    "SELECT username,email,password FROM userAuth WHERE email = ? AND password = ?",
    [email, hashedPassword],
    async (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ error: "500", message: "Internal server error" });
      } else if (results.length === 0) {
        res
          .status(401)
          .json({ error: "401", message: "User not found please signup" });
      } else if (results[0].email !== email) {
        res.status(401).json({ error: "401", message: "Incorrect email" });
      } else if (results[0].password !== hashedPassword) {
        res.status(401).json({ error: "401", message: "Incorrect password" });
      } else {
        let jwttoken = await jwtToken(results[0].username);

        res.cookie("jwt_access", jwttoken.tokenval, {
            httpOnly: true,
            secure: true,
          })
          .json({ message: `welcome ${results[0].username}` });
      }
    }
  );
};

const userSignup = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  let hashedPassword;
  if (!username && !password && !email) {
    return res
      .status(400)
      .json({
        error: "400",
        message: "username, email, password, field required",
      });
  } else if (!email) {
    res.status(400).json({ error: "400", message: "Email is required" });
  } else if (!username) {
    res.status(400).json({ error: "400", message: "Username is required" });
  } else if (!password) {
    res.status(400).json({ error: "400", message: "Password is required" });
  }

  const emailRegex =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "400", message: "This email address is not valid" });
  }

  if (password.length < 8 || password.length > 12) {
    res
      .status(400)
      .json({
        error: "400",
        message: "Password must be between 8 and 12 characters",
      });
  } else {
    hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
  }

  const sql =
    "INSERT INTO userAuth (email, username, password) VALUES (?, ?, ?, ?)";
  const sqlcheck =
    "SELECT username, email FROM userAuth WHERE username = ? OR email = ?";
  connection.query(sqlcheck, [username, email], function (err, result) {
    if (err) {
      console.log(err.message);
    } else if (result.length > 0) {
      if (result[0].username === username) {
        return res.status(409).json({ error: "Username already taken" });
      }
      if (result[0].email === email) {
        return res
          .status(409)
          .json({ error: "Email address already registered" });
      }
    } else {
      connection.query(
        sql,
        [email, username, hashedPassword],
        function (err, result) {
          if (err) {
            console.log(err.message);
            return res
              .status(400)
              .json({ error: "400", message: "Failed to Register" });
          } else {
            return res.json({ message: "User created successfully" });
          }
        }
      );
    }
  });
};

module.exports = { userLogin, userSignup };
