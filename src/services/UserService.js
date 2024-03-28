const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {
  genneralAccessToken,
  genneralRefreshToken,
} = require("../services/JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, comfirmPassword, phone } = newUser;

    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });
      if (checkUserEmail !== null) {
        resolve({
          status: "Email exist",
          message: "The email is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        comfirmPassword: hash,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "User",
          message: "Create success",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, comfirmPassword, phone } = userLogin;

    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });
      if (checkUserEmail === null) {
        resolve({
          status: "Email no exist",
          message: "The user is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        checkUserEmail.password
      );

      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "The password or email is incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUserEmail.id,
        isAdmin: checkUserEmail.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUserEmail.id,
        isAdmin: checkUserEmail.isAdmin,
      });

      console.log("access_token", access_token);
      console.log("refresh_token", refresh_token);

      resolve({
        status: "User",
        message: "Login success",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserEmail = await User.findOne({ _id: id });
      if (checkUserEmail === null) {
        resolve({
          status: "Email no exist",
          message: "The user is not defined",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      console.log("updateUser", updateUser);
      resolve({
        status: "User",
        message: "Update success",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserEmail = await User.findOne({ _id: id });
      if (checkUserEmail === null) {
        resolve({
          status: "Email no exist",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "User",
        message: "Delete success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "User",
        message: "Fetch all user",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      if (user === null) {
        resolve({
          status: "Email no exist",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "User",
        message: "Fetch success",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
};
