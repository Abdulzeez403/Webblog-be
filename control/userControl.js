const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 const UserSchema = require("../models/userSchema")

const RegisterUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body;
  //Check if the input is empty
  if (!username || !email || !password) {
    res.send(400);
    throw Error("All Field must be filled!");
  }

  //Check whether the user already exist!
  const User = await UserSchema.findOne({ email });
  if (User) {
    res.send(400);
    throw Error("The user is already exist!");
  }
  // Hash Password!
    const hashpassword = await bcrypt.hash(password, 10);
    console.log(hashpassword);

  const userInfo = await UserSchema.create({
    username,
    email,
    password:hashpassword
  });
  res.status(200).send(userInfo);
  console.log(userInfo);
});

const LoginUser = asyncHandler(async(req, res, next) => {
  const {email, password} = req.body;

  // //Check if the input is empty
  // if (!(email, password)) {
  //   res.status(400);
  //   throw Error("All Field must be filled!");
  // }

  const user = UserSchema.findOne({ email });
  if (user &&( bcrypt.compare(password, user.password))) {
    let accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15days" }
    );
    res.status(200).send({accesstoken});
  } else {
    res.status(401);
    throw new Error("email or password is wrong");
  }
});

const CurrentUser = (async(req,res)=>{
    res.send({message: "The current user!"})
})

module.exports = {
    RegisterUser,
    LoginUser,
    CurrentUser
}
