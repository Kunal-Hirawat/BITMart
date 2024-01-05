import mongoose from "mongoose";
const userSchema =  mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
      // validate: {
      //     validator: function(value) {
      //         // Check if the value is exactly 10 characters and consists only of digits
      //         return /^\d{10}$/.test(value);
      //     },
      //     message:  'not a valid contact number. It should be 10 digits long and consist only of digits.',
      // },
    

    },
    address:{
        type: {},
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema)
export default User