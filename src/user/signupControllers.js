const fs = require("fs");
const path = require("path");

const shortid = require("shortid");

const saveUser = async user => {
  const userPath = path.join(__dirname, "../", "db", "users", "all-users.json");

  await fs.readFile(userPath, (err, data) => {
    if (err) throw err;

    const users = [user, ...JSON.parse(data)];

    const usersInJson = JSON.stringify(users);

    fs.writeFile(userPath, usersInJson, err => {
      if (err) throw err;
    });
  });
};

const signUpRoute = (req, res) => {
  if (req.method !== "POST") return;
  try {
    const user = { id: shortid.generate(), ...req.body };
    if (
      !user ||
      !user.username ||
      !user.password ||
      !user.telephone ||
      !user.email
    ) {
      res.status(400).send("Client Error");
      return;
    }

    saveUser(user);

    res.writeHead(201, { "Content-type": "application/json" });
    res.write(JSON.stringify({ status: "success", user }));
    res.end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { signUpRoute };
