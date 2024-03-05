import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authimage from "../assets/authimage.jpg";
const Auth = () => {
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [otpStatus, setOtpStatus] = useState(false);

  const [error, setError] = useState();
  const navigate = useNavigate();
  const handelSendOtp = async () => {
    try {
      await axios.post("http://localhost:9000/user/auth", {
        email,
      });
      setOtpStatus(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:9000/user/verify", {
        email,
        otp,
      });
      console.log(response.data.user.isAdmin);

      localStorage.setItem("token", response.data.token);
      if (response.data.user.isAdmin) {
        navigate("/admin");

        window.location.reload();
      } else {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <div className="  bg-gradient-to-r from-[#E6DADA] to-[#274046] h-screen w-full flex items-center justify-center">
      <div className=" bg-gradient-to-r from-[#cbd6cb] to-[#ffffff] h-5/6 w-4/6 rounded-2xl flex justify-between">
        <div className=" flex  pt-40 pl-10 flex-col gap-10 w-1/2">
          <div>
            <h1 className="font-bold text-xl  ">COdex</h1>
          </div>
          <div>
            <h1 className=" text-4xl font-bold">Wellcome!</h1>
            {error ? (
              <h1 className=" text-md font-medium text-red-400">{error}</h1>
            ) : (
              <h5 className=" text-md font-medium text-gray-700">
                Please enter collage email below
              </h5>
            )}
          </div>

          <div className="flex flex-col w-5/6 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-md font-medium  outline-none"
            />
            <button
              onClick={handelSendOtp}
              className="bg-black text-white font-medium px-3 py-4 rounded-md hover:bg-gray-950"
            >
              {otpStatus ? "Resend" : "Get opt"}
            </button>

            {otpStatus && (
              <>
                <input
                  type="number"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-4 rounded-md font-medium  outline-none"
                />
                <button
                  onClick={verifyOtp}
                  className="bg-black text-white font-medium px-3 py-4 rounded-md hover:bg-gray-950"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>

        <div className="h-full w-1/2 flex justify-center items-center p-5">
          <img
            src={authimage}
            className=" h-full w-auto rounded-xl rounded-bl-[7rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
