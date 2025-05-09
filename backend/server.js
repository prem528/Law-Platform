const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const userRoutes = require("./routes/userRoutes");
const caseRoutes = require("./routes/caseRoutes");



app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Server is alive!");
});

app.use("/api/users", userRoutes);
app.use("/api/cases", caseRoutes);


// change the layout of the dashboard

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

