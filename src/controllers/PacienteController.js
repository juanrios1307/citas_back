const Controller = {};

const Paciente = require("../models/PacienteModel");

Controller.create = async (req, res) => {
  const { nombre, apellido, cedula, correo, telefono } = req.body;

  const paciente = new Paciente({
    nombre,
    apellido,
    cedula,
    correo,
    telefono,
  });

  await paciente.save();
  res.status(200).json({
    message: "Paciente creado",
  });
};

Controller.edit = async (req, res) => {
  const { id } = req.params; // id del paciente

  Paciente.findByIdAndUpdate(id, { $set: req.body }, function (err) {
    if (err) {
      res.status(203).json({
        status: "error",
        data: "No se ha encontrado el paciente con id: " + id,
      });
    } else {
      // Devolvemos el código HTTP 200.
      res.status(200).json({ status: "ok", data: "Datos actualizados" });
    }
  });
};

Controller.delete = async (req, res) => {
  const { id } = req.params; // id del paciente

  Paciente.findByIdAndRemove(id, function (err, data) {
    if (err || !data) {
      res.status(203).json({
        status: "error",
        data: "No se ha encontrado el paciente con id: " + id,
      });
    } else {
      res.status(200).json({
        status: "ok",
        data: "Se ha eliminado correctamente el paciente con id: " + id,
      });
    }
  });
};

Controller.getAll = async (req, res) => {
  Paciente.find({}, function (err, pacientes) {
    if (err) {
      res.status(203).json({
        status: "error",
        data: "No se han encontrado pacientes ",
      });
    } else {
      // También podemos devolver así la información:
      res.status(200).json({ status: "ok", data: pacientes });
    }
  });
};

Controller.getById = async (req, res) => {
  const { id } = req.params; // id del paciente

  Paciente.findById(id, function (err, paciente) {
    if (err) {
      res.status(203).json({
        status: "error",
        data: "No se ha encontrado el paciente con id: " + paciente,
      });
    } else {
      // También podemos devolver así la información:
      res.status(200).json({ status: "ok", data: paciente });
    }
  }).populate("user");
};

module.exports = Controller;
