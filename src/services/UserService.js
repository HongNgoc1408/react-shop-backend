const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, comfirmPassword } = newUser;
    // console.log(newUser);
    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });
      if (checkUserEmail !== null) {
        resolve({
          status: "ERROR",
          message: "The email is already",
        });
      } else if (password !== comfirmPassword) {
        return res.status(400).json({
          status: "ERROR",
          message: "The password is equal confirmPassword",
        });
      }

      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
      });

      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      } else {
        console.log("Error");
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });
      if (checkUserEmail === null) {
        resolve({
          status: "ERROR",
          message: "The user is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        checkUserEmail.password
      );

      if (!comparePassword) {
        resolve({
          status: "ERROR",
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

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const loginAdmin = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const checkUserEmail = await User.findOne({
        email: email,
      });
      if (checkUserEmail === null) {
        resolve({
          status: "ERROR",
          message: "The user is not defined",
        });
      }
      if (checkUserEmail.isAdmin === false) {
        resolve({
          status: "ERROR",
          message: "User is not authorized.",
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        checkUserEmail.password
      );

      if (!comparePassword) {
        resolve({
          status: "ERROR",
          message: "The password or email is incorrect",
        });
      }

      const access_token = await genneralAccessToken({
        id: checkUserEmail.id,
        isAdmin: checkUserEmail.isAdmin,
      });


      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
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
          status: "ERROR",
          message: "The user is not defined",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      // console.log("updateUser", updateUser);
      resolve({
        status: "OK",
        message: "SUCCESS",
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
          status: "ERROR",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "SUCCESS",
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
        status: "OK",
        message: "SUCCESS",
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
          status: "ERROR",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
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
  loginAdmin,
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
};
