const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const {
      paymentDelivery,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
    } = req.body;
    if (
      !paymentDelivery ||
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone
    ) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getDetailsOrder(userId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDetailsOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getAllDetailsOrder(userId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const cancelOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    // console.log("orderId", orderId, req.body);
    const data = req.body;
    // console.log("data", data);
    if (!orderId) {
      return res.status(400).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }
    const response = await OrderService.cancelOrderDetails(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

// const getAllOrder = async (req, res) => {
//   try {
//     console.log("req.body", req);
//     const data = await OrderService.getAllOrder();
//     return res.status(400).json(data);
//   } catch (e) {
//     console.log(e);
//     return res.status(404).json({
//       message: e,
//     });
//   }
// };
const getAllOrder = async (req, res) => {
  try {
    console.log("req.query", req.query); // Sử dụng req.query thay vì req.body
    const data = await OrderService.getAllOrder();
    return res.status(200).json(data); // Sửa status code thành 200 nếu yêu cầu thành công
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error", // Thay vì trả về lỗi cụ thể, bạn có thể trả về một tin nhắn tổng quát
    });
  }
};

module.exports = {
  createOrder,
  getDetailsOrder,
  getAllDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
};
