import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import step1 from '../../assets/step1.png';
import step2 from '../../assets/step2.png';
import step3 from '../../assets/step3.png';
const images = [step1, step2, step3];
import { useNavigate } from "react-router-dom";

const BuyDetails = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const navigate = useNavigate();
  const handleBuyNow = () => {
  // Pass the bike id as a query param or state
  navigate("/payment", { state: { bikeId: bike.id, price: bike.price } });
};

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/bikes/${id}/`)
      .then((res) => setBike(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!bike)
    return <p className="p-6 text-gray-500">Loading bike details...</p>;

  return (
    <main className="flex flex-col items-center p-4 mt-28">
      {/* Product Image and Details Container */}
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-8">
        {/* Left Side: Main Image and Thumbnails */}
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <div className="relative rounded-xl overflow-hidden mb-4">
            <img
              src={bike.image || "https://placehold.co/600x400/003366/ffffff?text=No+Image"}
              alt={bike.model}
              className="w-full h-auto object-cover rounded-xl shadow-md"
            />
            {/* Logo on top-right */}
            <div className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow-sm">
              <img
                src="https://placehold.co/40x40/000000/ffffff?text=RP"
                alt="DriveRP"
                className="w-10 h-10 object-cover"
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 md:space-x-4 overflow-x-auto justify-center">
            {bike.images && bike.images.length > 0 ? (
              bike.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${bike.model} ${i + 1}`}
                  className="w-20 h-auto rounded-lg border-2 border-transparent cursor-pointer hover:border-blue-500"
                />
              ))
            ) : (
              <img
                src={bike.image || "https://placehold.co/100x70/c0c0c0/000000?text=No+Image"}
                alt={bike.model}
                className="w-20 h-auto rounded-lg border-2 border-transparent"
              />
            )}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f526b]">
            {bike.year} | {bike.model} | {bike.specs}
          </h1>
          <p className="text-md text-gray-600">
            {bike.mileage}Km • {bike.owner}
          </p>

          <div className="flex items-center space-x-2 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">{bike.location}</span>
          </div>

          <button className="bg-[#24b8d0] text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-[#1e92d7] transition-colors duration-300">
            Book Test Ride <br />
            <span className="text-xs font-normal">
              (₹1000/- Refundable for Next Three Days)
            </span>
          </button>

          <p className="text-sm text-gray-500">Interested in Buying this Bike?</p>

<button
  onClick={handleBuyNow}
  className="bg-[#1f526b] text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-[#153a4a] transition-colors duration-300"
>
  Buy Now
</button>

        </div>
      </div>

      {/* Bike Overview Section */}
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#1f526b] mb-6">Bike Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Brand</span>
            <span className="font-semibold">{bike.brand}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Category</span>
            <span className="font-semibold">{bike.category}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Fuel</span>
            <span className="font-semibold">{bike.fuel}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Color</span>
            <span className="font-semibold">{bike.color}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Kilometers</span>
            <span className="font-semibold">{bike.mileage} Km</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Warranty</span>
            <span className="font-semibold">{bike.warranty || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Insurance</span>
            <span className="font-semibold">{bike.insurance || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Registration No</span>
            <span className="font-semibold">{bike.registration_no}</span>
          </div>
        </div>
      </div>

      {/* Book This Bike Section */}
<div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8 mb-8">
  <h2 className="text-2xl font-bold text-center text-[#1f526b] mb-8">
    Book This Bike in 3 Easy Steps
  </h2>
  <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
    {/* Step 1 */}
    <div className="flex flex-col items-center text-center">
      <img
        src={images[0]}
        alt="Choose Your Bike"
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 object-contain"
      />
      <h3 className="text-lg font-bold">Choose Your Bike</h3>
    </div>
    {/* Arrow 1 */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-gray-400 rotate-90 md:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
    {/* Step 2 */}
    <div className="flex flex-col items-center text-center">
      <img
        src={images[1]}
        alt="Book a Test Ride"
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 object-contain"
      />
      <h3 className="text-lg font-bold">Book & Take Test ride</h3>
    </div>
    {/* Arrow 2 */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-gray-400 rotate-90 md:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
    {/* Step 3 */}
    <div className="flex flex-col items-center text-center">
      <img
        src={images[2]}
        alt="Payment & Delivery"
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 object-contain"
      />
      <h3 className="text-lg font-bold">Payment & Immediate Delivery</h3>
    </div>
  </div>
</div>
      {/* Bike Specification Section */}
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#1f526b] mb-6">Bike Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-8 text-gray-700">
          <div className="flex flex-col border-b pb-2">
            <span className="font-medium text-gray-500">Chassis No</span>
            <span className="font-semibold mt-1">{bike.chassis_no}</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <span className="font-medium text-gray-500">Engine No</span>
            <span className="font-semibold mt-1">{bike.engine_no}</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <span className="font-medium text-gray-500">Owner</span>
            <span className="font-semibold mt-1">{bike.owner}</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <span className="font-medium text-gray-500">Service History</span>
            <span className="font-semibold mt-1">{bike.service_history}</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <span className="font-medium text-gray-500">Price</span>
            <span className="font-semibold mt-1">
              ₹{bike.price?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BuyDetails;
