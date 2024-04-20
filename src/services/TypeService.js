const Type = require("../models/TypeModel");

const createType = (newType) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newType;
    try {
      const checkType = await Type.findOne({
        name: name,
      });
      if (checkType !== null) {
        resolve({
          status: "ERROR",
          message: "The type of type is already",
        });
      }
      const newType = await Type.create({
        name,
      });
      if (newType) {
        resolve({
          status: "OK",
          message: "Create Success",
          data: newType,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateType = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkType = await Type.findOne({
        _id: id,
      });
      if (checkType === null) {
        resolve({
          status: "ERROR",
          message: "The type is not defined",
        });
      }

      const updatedType = await Type.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "Update success",
        data: updatedType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteType = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkType = await Type.findOne({
        _id: id,
      });
      if (checkType === null) {
        resolve({
          status: "ERROR",
          message: "The type is not defined",
        });
      }

      await Type.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getType = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const type = await Type.findOne({
        _id: id,
      });
      if (type === null) {
        resolve({
          status: "ERROR",
          message: "The type is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "Fetch type",
        data: type,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Type.find();
      resolve({
        status: "OK",
        message: "Fetch all type",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createType,
  updateType,
  deleteType,
  getType,
  getAllType,
};
