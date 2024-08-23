import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentInfo: {
      type: String,
      required: true,
    },
    items: [
      {
        itemName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
