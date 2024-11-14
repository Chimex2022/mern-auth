import User from "../models/user-model.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res, next) => {
   const { username, email, password } = req.body;
   const hashedPassword = bcryptjs.hashSync(password, 10)
   const newUser = new User({username, email, password: hashedPassword})
   try {
    await newUser.save()
    res.status(201).json({message: "User created successfully"})
    
   } catch (error) {
    next(error)
   }
   
}


export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
   const validUser = await User.findOne({email})
   if(!validUser) return res.status(401).json({message: "Invalid credential"})
   const validPassword = bcryptjs.compareSync(password, validUser.password)
   if(!validPassword) return res.status(401).json({message: "User not found"})
      const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
   const {password:hashedPassword, ...rest} = validUser._doc
      res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
     
  } catch (error) {
    next(error.message)
  }
 
}
