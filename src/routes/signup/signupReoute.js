const path = require("path");
const fs = require("fs");

const saveUser = user => {
  const userPath = path.join(
    __dirname,
    "../../",
    "db",
    "users",
    `${user.username}.json`
  );
  fs.writeFile(userPath, JSON.stringify(user), function(err) {
    if (err) throw err;
  });
};

const signUpRoute = async (req, res) => {
  if (req.method === "POST") {
    let body = "";
    await req.on("data", function(data) {
      body = body + data;
    });

    const parseUser = JSON.parse(body);

    if (
      parseUser &&
      parseUser.username &&
      parseUser.password &&
      parseUser.telephone &&
      parseUser.email
    ) {
      saveUser(parseUser);

      const serverRes = {
        status: "success",
        user: parseUser
      };
      res.writeHead(201, { "Content-type": "application/json" });
      res.write(JSON.stringify(serverRes));
      res.end();
    }
    res.writeHead(400, { "Content-type": "text/plain" });
    res.write("Client Error");
    res.end();
  }
};

module.exports = signUpRoute;
