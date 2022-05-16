// Cargamos el módulo de mongoose
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Cita = mongoose.model("cita", {
  paciente: { type: Schema.ObjectId, ref: "paciente" },
  tramite: { type: String, required: true },
  fecha: { type: Date, required: true },
  lugar: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaEdicion: { type: Date, default: Date.now },
  notas: { type: String },
  estado: { type: String },
});

module.exports = Cita;
