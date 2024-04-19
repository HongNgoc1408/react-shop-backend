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
    const orderId = req.body.orderId;
    // console.log("data", orderId);
    const data = req.body.orderItems;
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

const deleteOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The orderId is required",
      });
    }

    const response = await OrderService.deleteOrderDetails(orderId);

    if (response.status === "ERROR") {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in deleteOrderDetails:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "An unexpected error occurred while deleting the order",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    console.log("req.query", req.query);
    const data = await OrderService.getAllOrder();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { isDelivered, isPaid } = req.body;
    console.log("req.body", req.body);

    // Input validation
    if (!isDelivered || typeof isDelivered !== "string") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const validStatusValues = [
      "Wait for confirmation",
      "Confirmed",
      "Order is being delivered",
      "The order has been delivered",
      "Cancelled",
    ];

    if (!validStatusValues.includes(isDelivered)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (typeof isPaid !== "boolean") {
      return res.status(400).json({ message: "Invalid isPaid value" });
    }
    // Call the service function to update the order
    const updatedOrder = await OrderService.updateOrder(orderId, {
      isDelivered,
      isPaid,
    });

    // Send response to the client
    return res.status(200).json(updatedOrder);
  } catch (error) {
    // Handle errors
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getDetailsOrder,
  getAllDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
  updateOrder,
  deleteOrderDetails,
  // deleteOrder,
};
