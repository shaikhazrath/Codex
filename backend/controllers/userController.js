import User from "../model/userModel.js";
import { generateJwt, generateOTP, sendOTP } from "../utils/otpMannager.js";



export const auth = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    let user = await User.findOne({ email: email });
    if(!user){
      const [username,domain] = email.split("@");
      if(domain !=  'anits.edu.in'){
        return res.status(400).json({error:'u need to have a anits collage email to signup'})
      }
      const newUser = new User({ name: username, email });
      const otp = generateOTP()
      sendOTP(email,'register-user',otp)
      newUser.otp = otp;
      newUser.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await newUser.save();
      return res.status(200).json({message:'created new account and otp send successfully',email:email})
    }
    const otp = generateOTP()
    console.log(otp)
    sendOTP(email,'register-user',otp)
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); 
    await user.save();
    return res.status(200).json({ message: "already a user otp send successfully", email });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




export const verifyOTPUser = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(otp)
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        if (!user.otp || user.otp !== otp) {
          return res.status(401).json({ error: "Invalid OTP" });
        }
        const currentTime = new Date();
        if (currentTime > user.otpExpiresAt) {
          return res.status(401).json({ error: "OTP has expired" });
          
        }
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();
        const token = generateJwt(user._id);
        return res.json({ message: "OTP verification successful", user ,token});
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  };
  

