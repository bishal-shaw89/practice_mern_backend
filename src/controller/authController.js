const bcrypt = require("bcrypt");
const User = require("../models/User");

const authController = {};

// Register a new user
authController.register = async (req, res) => {
  try {
    const { name, email, password, role, vehicles } = req.body;

    //check if the user already exsists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    //Hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      vehicles,
    });
    await user.save();

    res.status("201").json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status("500").json({ message: "Internal server error" });
  }
};

module.exports = authController;
