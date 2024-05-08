import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    curp: {
      type: String,
      required: true,
    },
    // birthdate: {
    //   type: Date,
    //   required: true,
    // },
  },
  { timestamps: true }
);
const Client = mongoose.model("Client", clientSchema);
export default Client;
