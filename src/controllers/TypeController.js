const TypeService = require("../services/TypeService");

const createType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const response = await TypeService.createType(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateType = async (req, res) => {
  try {
    const typeId = req.params.id;
    const data = req.body;
    if (!typeId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The typeId is required",
      });
    }
    const response = await TypeService.updateType(typeId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteType = async (req, res) => {
  try {
    const typeId = req.params.id;
    if (!typeId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The typeId is required",
      });
    }
    const response = await TypeService.deleteType(typeId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getType = async (req, res) => {
  try {
    const typeId = req.params.id;
    if (!typeId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The typeId is required",
      });
    }
    const response = await TypeService.getType(typeId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await TypeService.getAllType(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createType,
  updateType,
  deleteType,
  getType,
  getAllType,
};
