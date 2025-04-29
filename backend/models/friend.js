import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  name: { type: String, required: true },
  repaymentPeriod: { type: Number, required: true },
});

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;