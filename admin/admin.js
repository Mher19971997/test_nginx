const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = mongoose.model("User", { username: String, password: String });

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.send("User created successfully");
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  await User.findByIdAndUpdate(id, { username, password });
  res.send("User updated successfully");
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.send("User deleted successfully");
});

app.listen(3000, () => {
  console.log("Admin server is running on port 3000");
});
