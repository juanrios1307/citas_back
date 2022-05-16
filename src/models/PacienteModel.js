// Cargamos el módulo de mongoose
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Paciente = mongoose.model("paciente", {
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
});

module.exports = Paciente;
