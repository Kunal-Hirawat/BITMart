import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    photo:{
        type: Buffer,
        contentType : String,
    }

  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema)
export default User