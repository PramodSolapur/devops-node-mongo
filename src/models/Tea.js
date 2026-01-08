import mongoose from 'mongoose';

const teaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true },
);

const Tea = mongoose.model('Tea', teaSchema);

export default Tea;
