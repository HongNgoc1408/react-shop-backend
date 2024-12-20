const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, comfirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !comfirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is email",
      });
    } else if (password !== comfirmPassword) {
      return res.json({
        status: "ERROR",
        message: "The password is equal confirmPassword",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is email",
      });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newReponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    // console.log("refresh_token", refresh_token);
    return res.status(200).json({ ...newReponse, refresh_token });
    // return res.status(200).json({ response });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password} = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is email",
      });
    }
    const response = await UserService.loginAdmin(req.body);
    // console.log("response", response);
    // const { refresh_token, ...newReponse } = response;
    // res.cookie("refresh_token", refresh_token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "strict",
    //   path: "/",
    // });
    // // console.log("refresh_token", refresh_token);
    // return res.status(200).json({ ...newReponse, refresh_token });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  // console.log("req.cookies.refresh_token", req.cookies.refresh_token);
  try {
    const token = req.cookies.refresh_token;
    // console.log("token", token);
    if (!token) {
      return res.status(400).json({
        status: "ERROR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await UserService.getUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  loginAdmin,
  refreshToken,
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
  logoutUser,
};
