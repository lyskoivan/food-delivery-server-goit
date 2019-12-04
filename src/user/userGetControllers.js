const path = require("path");
const fs = require("fs");

const userPath = path.join(__dirname, "../", "db", "users", "all-users.json");

const responseSuccess = (status, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(status));
  res.end();
};

const responseWithoutUsers = res => {
  res.writeHead(400, { "Content-type": "application/json" });
  res.write(
    JSON.stringify({
      status: "not found",
      user: []
    })
  );
  res.end();
};

const getUserIdRoute = (req, res) => {
  fs.readFile(userPath, "utf8", (err, data) => {
    try {
      const allUsers = JSON.parse(data);
      const userId = req.params.id;

      const userById = allUsers.find(user => user.id === userId);

      if (userById) {
        const status = {
          status: "success",
          user: userById
        };

        responseSuccess(status, res);
      } else {
        responseWithoutUsers(res);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { getUserIdRoute };
