const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("./helpers/database");

app.set("port", 5000);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// Routes
app.use("/api/paciente", require("./routers/PacienteRoute"));
app.use("/api/cita", require("./routers/CitaRoute"));

//Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server on port", app.get("port"));
});
