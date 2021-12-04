const express = require("express");
const mongoose = require("mongoose");
const app = express();

// DB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use(express.json({ extended: false }));
// app.post("/auth", (req, res) => res.send("Authentication Routing is working..."));
const empRoute = require("./routes/empRoutes");
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profileRoute");
const postsRoute = require("./routes/postRoute");

app.use("/employees", empRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/posts", postsRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
