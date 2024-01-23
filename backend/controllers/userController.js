import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/auth_util.js";
import JWT from "jsonwebtoken";

export const registerContoller = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      password,
      address,
      securityQuestion,
      securityAnswer,
    } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!contact) {
      return res.send({ message: "Contact is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!securityQuestion) {
      return res.send({ message: "Security Question is required" });
    }
    if (!securityAnswer) {
      return res.send({ message: "Security Answer is required" });
    }

    //checking if user already exists

    const userexists = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (userexists) {
      return res.status(200).send({
        success: false,
        message: "User Already Exists. Please Login",
      });
    }

    //hashing the password
    const hashedPassword = await hashPassword(password);
    const hashedAnswer = await hashPassword(securityAnswer);

    //saving user
    const user = new userModel({
      name,
      email,
      contact,
      password: hashedPassword,
      address,
      securityQuestion,
      securityAnswer: hashedAnswer,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User Registration Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error!!!. Please Try Again",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, contact, password } = req.body;

    //checking if email/contact and password are entered

    if (!email || !contact || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email/contact or password",
      });
    }

    const user = await userModel.findOne({ contact, email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    //checking if password is correct or not

    const correctPassword = await comparePassword(password, user.password);
    if (!correctPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //extracting token

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        contact: user.contact,
        address: user.address,
        role: user.role,
        securityQuestion: user.securityQuestion,
        securityAnswer: user.securityAnswer,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error!!!. Please Try Again",
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, securityAnswer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Please Enter Email" });
    }
    if (!securityAnswer) {
      return res.status(400).send({ message: "Please Enter Answer" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "Please Enter New Password" });
    }
    const hashedAnswer = await hashPassword(securityAnswer);
    const user = await userModel.findOne(
      { email: email },
      { securityAnswer: hashedAnswer }
    );
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Answer to the security question is wrong",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error!!!. Please Try Again",
    });
  }
};

export const getSecurityQuestionController = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send({ message: "Please Enter Email" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No User found for this email id",
      });
    }
    return res.status(200).send({
      success: true,
      securityQuestion: user.securityQuestion,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error!!!. Please Try Again",
    });
  }
};

export const checkSecurityAnswerController = async (req, res) => {
  try {
    const { email, securityAnswer } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Please Enter Email" });
    }
    if (!securityAnswer) {
      return res.status(400).send({ message: "Please Enter Answer" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Answer to the security question is wrong",
      });
    }
    const correctAnswer = await comparePassword(
      securityAnswer,
      user.securityAnswer
    );
    if (!correctAnswer) {
      return res.status(404).send({
        success: false,
        message: "Answer to the security question is wrong",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Correct Answer",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error!!!. Please Try Again",
    });
  }
};

export const testController = async (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password) {
      return res.json({ error: "Passsword is required" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating profile",
      error,
    });
  }
};

export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      success: true,
      usersCount: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting users",
    });
  }
};

//delete user controller
export const deleteUserController = async (req, res) => {
  try {
    const user = await userModel.find({ email: req.params.email });
    if (user[0].role === 1) {
      return res.status(500).send({
        success: false,
        message: "Cannot Delete Admin",
      });
    }
    await userModel.findOneAndDelete({ email: req.params.email });
    return res.status(200).send({
      success: true,
      message: "User Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error,
    });
  }
};
