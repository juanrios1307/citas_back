const Controller = {};

const Cita = require("../models/CitaModel");

Controller.create = async (req, res) => {
  const { paciente, tramite, fecha, lugar, notas, estado } = req.body;

  const cita = new Cita({
    paciente,
    tramite,
    fecha,
    lugar,
    notas,
    estado,
  });

  await cita.save();
  res.status(200).json({
    message: "Cita creada",
  });
};

Controller.edit = async (req, res) => {
  const { id } = req.params; // id de la cita

  Cita.findByIdAndUpdate(id, { $set: req.body }, function (err) {
    if (err) {
      //res.send(err);
      // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
      res.status(203).json({
        status: "error",
        data: "No se ha encontrado la cita con id: " + id,
      });
    } else {
      // Devolvemos el código HTTP 200.
      res.status(200).json({ status: "ok", data: "Datos actualizados" });
    }
  });
};

Controller.delete = async (req, res) => {
  const { id } = req.params; // id de la cita

  Cita.findByIdAndRemove(id, function (err, data) {
    if (err || !data) {
      //res.send(err);
      // Devolvemos el código HTTP 404, de producto no encontrado por su id.
      res.status(203).json({
        status: "error",
        data: "No se ha encontrado la cita con id: " + id,
      });
    } else {
      res.status(200).json({
        status: "ok",
        data: "Se ha eliminado correctamente la cita con id: " + id,
      });
    }
  });
};

Controller.getAll = async (req, res) => {
  Cita.find({ fecha: { $gt: new Date() } }, function (err, citas) {
    if (err) {
      // Devolvemos el código HTTP 404, de producto no encontrado por su id.
      res.status(203).json({
        status: "error",
        data: "No se han encontrado citas ",
      });
    } else {
      // También podemos devolver así la información:
      res.status(200).json({ status: "ok", data: citas });
    }
  })
    .populate("paciente")
    .sort({ fecha: 1 });
};

Controller.getById = async (req, res) => {
  const { id } = req.params; // id de la cita

  Cita.findById(id, function (err, cita) {
    if (err) {
      // Devolvemos el código HTTP 404, de producto no encontrado por su id.
      res.status(203).json({
        status: "error",
        data: "No se ha encontrado la cita con id: " + id,
      });
    } else {
      // También podemos devolver así la información:
      res.status(200).json({ status: "ok", data: cita });
    }
  }).populate("paciente");
};

module.exports = Controller;
