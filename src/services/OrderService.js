const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentDelivery,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
      isPaid,
      paidAt,
      email,
    } = newOrder;
    try {
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              seller: +order.amount,
            },
          },
          { new: true }
        );
        // console.log("productData", productData);
        if (productData) {
          const createdOrder = await Order.create({
            orderItems,
            shippingAddress: {
              fullName,
              address,
              city,
              phone,
            },
            paymentDelivery,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user: user,
            isPaid,
            paidAt,
            isDelivered: "Wait for confirmation",
          });
          if (createdOrder) {
            return {
              status: "OK",
              message: "SUCCESS",
            };
          }
        } else {
          return {
            status: "OK",
            message: "ERROR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        resolve({
          status: "ERROR",
          message: `Product with id ${newData.join(
            ","
          )} not enough product countInStock`,
        });
      }
      resolve({
        status: "OK",
        message: `SUCCESS`,
      });
    } catch (e) {
      // console.log("e", e);
      reject(e);
    }
  });
};

const getDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};
const getAllDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

const cancelOrderDetails = async (id) => {
  try {
    const order = await Order.findById(id);

    if (!order) {
      return {
        status: "ERR",
        message: "The order is not defined",
      };
    }

    for (const item of order.orderItems) {
      // Lấy thông tin sản phẩm từ đơn hàng
      const product = await Product.findById(item.product);

      if (!product) {
        throw new Error(`Product with ID ${item.product} not found`);
      }

      // Cập nhật số lượng đã bán và số lượng tồn kho của sản phẩm
      await Product.findOneAndUpdate(
        { _id: item.product },
        {
          $inc: {
            countInStock: item.amount,
            seller: -item.amount,
          },
        }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { isDelivered: "Cancelled" },
      { new: true }
    );

    if (!updatedOrder) {
      return {
        status: "ERR",
        message: "Failed to update order status",
      };
    }

    return {
      status: "OK",
      message: "Order successfully canceled",
      data: updatedOrder,
    };
  } catch (error) {
    console.error("Error canceling order:", error);
    throw error;
  }
};

const updateOrder = async (orderId, updatedData) => {
  console.log("updatedData", updatedData);
  try {
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return { status: "ERR", message: "Order not found" };
    }

    const { isDelivered, isPaid } = updatedData;
    if (
      ![
        "Wait for confirmation",
        "Confirmed",
        "Order is being delivered",
        "The order has been delivered",
        "Cancelled",
      ].includes(isDelivered)
    ) {
      return { status: "ERR", message: "Invalid status" };
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { isDelivered, isPaid },
      { new: true }
    );

    if (!updatedOrder) {
      return { status: "ERR", message: "Failed to update order" };
    }

    return {
      status: "OK",
      message: "Order updated successfully",
      data: updatedOrder,
    };
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

const deleteOrderDetails = async (id) => {
  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return {
        status: "ERR",
        message: "The order is not defined",
      };
    }

    return {
      status: "OK",
      message: "Order delete successfully",
      data: order,
    };
  } catch (error) {
    console.error("Error in deleteOrderDetails:", error);
    throw error;
  }
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();
      // console.log("allOrder", allOrder);
      resolve({
        success: true,
        data: allOrder,
      });
    } catch (e) {
      console.error(e);
      resolve({
        success: false,
        error: "Failed to fetch orders",
      });
    }
  });
};

module.exports = {
  createOrder,
  getDetailsOrder,
  getAllDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
  updateOrder,
  deleteOrderDetails,
};
