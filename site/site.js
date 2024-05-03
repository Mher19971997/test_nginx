const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = mongoose.model("User", { username: String, password: String });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Website server is running on port ${PORT}`);
});
