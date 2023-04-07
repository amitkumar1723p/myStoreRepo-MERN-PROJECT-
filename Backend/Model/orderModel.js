import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
      trimm: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: Number,
      required: true,
      trim: true,
    },
    contact: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        trim: true,
      },
      Quantity: {
        type: Number,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        required: true,
        trim: true,
      },
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
    trim: true,
  },
  paymentInfo: {
    PaymentId: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
    trim: true,
  },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
    trim: true,
  },
  Gst: {
    type: Number,
    default: 0,
    required: true,
    trim: true,
  },
  shippingCharges: {
    type: Number,
    default: 0,
    required: true,
    trim: true,
  },

  totalPrice: {
    type: Number,
    default: 0,
    required: true,
    trim: true,
  },
  orderStatus: {
    type: String,
    required: true,
    trim: true,
    default: "Processing",
  },
  deleveredAt: {
    type: Date,
    trim: true,
  },
  createdAt: {
    type: Date,
    trim: true,
    default: Date.now,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
