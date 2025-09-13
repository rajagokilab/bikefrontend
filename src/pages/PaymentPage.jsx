import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { FaCreditCard, FaGooglePay, FaAmazon } from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import confirmImg from "../assets/4.gif";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { price } = location.state || {};
    const navigate = useNavigate(); // <-- add this

  const [amount, setAmount] = useState(price || 0);
  const [method, setMethod] = useState("credit-card");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);

  useEffect(() => {
    if (price) setAmount(price);
  }, [price]);

  const handlePayment = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setShowLoginModal(true);
    } else {
      setShowConfirmed(true);
    }
  };

  const paymentIcons = {
    "credit-card": <FaCreditCard size={24} />,
    "gpay": <FaGooglePay size={24} />,
    "netbanking": <FaCreditCard size={24} />,
    "paytm": <SiPaytm size={24} />,
    "phonepe": <SiPhonepe size={24} />,
    "amazonpay": <FaAmazon size={24} />,
  };

  const grandTotal = amount + Math.round(amount * 0.1) + 1000;
  const { number } = useSpring({ from: { number: 0 }, to: { number: grandTotal }, config: { duration: 1000 } });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row gap-8">
        
        {/* Payment Methods */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Payment Method</h2>
          <div className="space-y-3">
            {Object.keys(paymentIcons).map((m) => (
              <label
                key={m}
                className={`
                  flex justify-between items-center p-3 border rounded-lg cursor-pointer
                  transition-all duration-500 ease-in-out
                  ${method === m ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105" : "hover:bg-gray-50"}
                `}
              >
                <div className="flex items-center gap-3">
                  {paymentIcons[m]}
                  <span className="capitalize">{m.replace("-", " ")}</span>
                </div>
                <input
                  type="radio"
                  name="payment-method"
                  value={m}
                  checked={method === m}
                  onChange={() => setMethod(m)}
                  className="accent-white"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
          <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6 rounded-2xl shadow-xl space-y-4">
            
            <div className="flex justify-between items-center p-2 rounded-lg hover:shadow-md transition-all duration-300">
              <span className="text-gray-600 font-medium">Subtotal:</span>
              <span className="font-semibold text-gray-800">Rs. {amount}</span>
            </div>

            <div className="flex justify-between items-center p-2 rounded-lg hover:shadow-md transition-all duration-300">
              <span className="text-gray-600 font-medium">GST (10%):</span>
              <span className="font-semibold text-gray-800">Rs. {Math.round(amount * 0.1)}</span>
            </div>

            <div className="flex justify-between items-center p-2 rounded-lg hover:shadow-md transition-all duration-300">
              <span className="text-gray-600 font-medium">Test Drive:</span>
              <span className="font-semibold text-gray-800">Rs. 1000</span>
            </div>

            <hr className="border-dashed border-gray-300 my-2" />

            <div className="flex justify-between items-center font-bold text-lg text-blue-700">
              <span>Grand Total:</span>
              <animated.span>{number.to(n => `Rs. ${Math.round(n)}`)}</animated.span>
            </div>

            <button
              onClick={handlePayment}
              className="mt-4 w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition transform duration-300 animate-pulse-once"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p>You need to log in to proceed!</p>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

     {/* Booking Confirmed Modal */}
{showConfirmed && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className={`bg-white p-8 rounded-2xl text-center w-80 relative
                  transform scale-100 animate-pop-up`}
    >
      <img
        src={confirmImg}
        alt="Booking Confirmed"
        className="w-60 mx-auto -mt-8 mb-6 animate-bounce-slow"
      />
      <h2 className="text-2xl font-bold text-blue-800 mb-2">Booking Confirmed</h2>
      <p className="text-md text-gray-700">The Bike is Yours. Enjoy Your Journey!</p>
       <button
              onClick={() => {
                setShowConfirmed(false);
                navigate("/"); // <-- navigate to home
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-105"
            >
              OK
            </button>
    </div>
  </div>
)}


      {/* Animations CSS */}
      <style>
        {`
          @keyframes pulse-once {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(59, 130, 246, 0.5); }
            50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(59, 130, 246, 0.7); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
          }
          .animate-pulse-once { animation: pulse-once 0.6s ease-in-out forwards; }

          @keyframes pop-up {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop-up { animation: pop-up 0.5s ease-out forwards; }

          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow { animation: bounce-slow 1.5s infinite; }
        `}
      </style>
    </div>
  );
};

export default PaymentPage;
