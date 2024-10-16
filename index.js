const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const sequelize = require("./utils/database");

const userRoutes = require("./routes/user");
const ticketRoutes = require("./routes/tickets");
const teamRoutes = require("./routes/teams");
const categoryRoutes = require("./routes/category");

const requestLogger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandling");

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
// Database connection
sequelize.sync().then(() => {
  console.log("Database connected");
});

// Middleware
app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Help-Desk APis 101!");
});
app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
