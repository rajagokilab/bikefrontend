import React, { useState, useEffect } from 'react';
import Bike1 from '../assets/27.png';
import Bike2 from '../assets/5.png';
import Bike3 from '../assets/8.png';
import boy from '../assets/33.png';
import banner from '../assets/banner.png';
import img1 from '../assets/1.jpg';
import img24 from '../assets/24.jpg';
import img34 from '../assets/34.png';
import { useNavigate } from "react-router-dom";

const images = [Bike1, Bike2, Bike3];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="mx-auto p-8 mt-28">
      
      {/* Banner Section */}
      <div className="md:flex items-center justify-between relative bg-white p-8 ">
        <div className="md:w-1/2 flex flex-col justify-center items-center text-center mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#194156] mb-4">
            Buy or Sell Bikes the Smarter Way
          </h1>
          <p className="text-black text-lg mb-6 font-medium">
            Skip the hassle. When you buy a pre-owned bike, you save money while gaining access to a wider variety of models, often already assembled and ready to ride. It's an eco-friendly choice that helps reduce manufacturing waste and supports a circular economy. On the other hand, selling your bike allows you to earn extra cash, declutter your space, and pass on a reliable ride to someone new. Discover verified secondhand bikes at great prices or list your own in minutes.
          </p>
          {/* Navigation Button */}
          <button
            onClick={() => navigate("/buy")} // <-- Navigate to BuyBikes page
            className="bg-[#2a6889] text-white py-3 px-8 rounded-full font-semibold shadow-md hover:bg-[#1f526b] transition-colors duration-300"
          >
            Buy Now
          </button>
        </div>

        <div className="md:w-1/2 flex justify-center items-center relative">
          <div className="w-[300px] sm:w-[400px] md:w-[480px] h-48 sm:h-64 md:h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl relative overflow-hidden"></div>
          <img
            src={images[currentIndex]}
            alt="Cycling banner"
            className={`absolute -top-16 md:-top-20 w-[150%] md:w-[120%] object-contain transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="md:flex items-center justify-between bg-white p-8 mt-8 ">
        <div className="md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <img
            src={boy}
            alt="Smart and sustainable choices"
            className="w-full h-auto object-contain rounded-xl max-w-sm"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#194156] leading-tight mb-4">
            Buying and selling secondhand bikes isn’t just a smart financial decision — it’s a sustainable one.
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            When you buy a pre-owned bike, you save money while gaining access to a wider variety of models, often already assembled and ready to ride. It's an eco-friendly choice that helps reduce manufacturing waste and supports a circular economy. On the other hand, selling your bike allows you to earn extra cash, declutter your space, and pass on a reliable ride to someone new.
          </p>
          <button className="bg-[#2a6889] text-white py-3 px-8 rounded-full font-semibold shadow-md hover:bg-[#1f526b] transition-colors duration-300">
            Read More
          </button>
        </div>
      </div>
       {/* Banner Image Section at the bottom */}
      <div className="mt-8 flex justify-center">
        <img
          src={banner}
          alt="Banner"
          className="w-full  h-auto object-contain rounded-xl"
        />
      </div>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-2xl shadow-xl text-white mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold">Over 15000+ Satisfied Customers</h2>
          </div>
          <div className="flex justify-center md:justify-end gap-8">
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13a4 4 0 11-8 0 4 4 0 018 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.015v1.233a1.996 1.996 0 01-1.99 1.99h-1.02a1.996 1.996 0 01-1.99-1.99v-1.233z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.003 14a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
              <p className="text-3xl font-bold">5000+</p>
              <p className="text-sm">Bike Purchased</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.65 12 2 9.19 8.65 2 9.24 7.46 13.97 5.82 21z" />
              </svg>
              <p className="text-3xl font-bold">4.5</p>
              <p className="text-sm">Average Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3 3v-6m0-6a9 9 0 100 18A9 9 0 0012 3z" />
              </svg>
              <p className="text-3xl font-bold">25+</p>
              <p className="text-sm">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
<section className="max-w-7xl mx-auto p-8 bg-white mt-8">
  <div className="text-center mb-12">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
      Real Stories From our Happy Customer
    </h1>
    <p className="text-gray-600 text-lg">
      Their words drive us forward and inspire others to join the movement.
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden transition-transform transform hover:scale-105">
      <div className="card-bg absolute inset-0 rounded-xl z-0"></div>
      <div className="relative z-10 flex flex-col items-center">
        <img
          className="rounded-lg shadow-md mb-4 w-full h-auto object-cover"
          src={img1}
          alt="Happy customer Sarah M."
        />
        <div className="bg-white p-4 rounded-xl shadow-md w-11/12 text-center -mt-8 relative mb-4">
          <p className="font-bold text-lg text-gray-800">Sarah M. - First-Time Buyer</p>
        </div>
        <p className="text-gray-600 text-center">
          "I was nervous about buying a secondhand bike online, but the whole process was smooth and secure..."
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden transition-transform transform hover:scale-105">
      <div className="card-bg absolute inset-0 rounded-xl z-0"></div>
      <div className="relative z-10 flex flex-col items-center">
        <img
          className="rounded-lg shadow-md mb-4 w-full h-auto object-cover"
          src={img24}
          alt="Happy customer James R."
        />
        <div className="bg-white p-4 rounded-xl shadow-md w-11/12 text-center -mt-8 relative mb-4">
          <p className="font-bold text-lg text-gray-800">James R. - Seller</p>
        </div>
        <p className="text-gray-600 text-center">
          "I had an old mountain bike collecting dust. Listing it took minutes..."
        </p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-xl shadow-lg green-shadow p-6 relative overflow-hidden transition-transform transform hover:scale-105">
      <div className="card-bg absolute inset-0 rounded-xl z-0"></div>
      <div className="relative z-10 flex flex-col items-center">
        <img
          className="rounded-lg shadow-md mb-4 w-full h-auto object-cover"
          src={img1} // reusing first image
          alt="Happy customer Priya K."
        />
        <div className="bg-white p-4 rounded-xl shadow-md w-11/12 text-center -mt-8 relative mb-4">
          <p className="font-bold text-lg text-gray-800">Priya K. - Daily Commuter</p>
        </div>
        <p className="text-gray-600 text-center">
          "This site makes secondhand feel first-class. I found a quality commuter bike..."
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Trusted Riders Section */}
      <section className="max-w-full mx-auto p-8 bg-[#2a6889] rounded-xl shadow-lg mt-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Trusted by Riders Like You</h2>
            <p className="text-lg">
              From smooth sales to great secondhand finds, our community loves the ease, security, and savings we offer. Real riders share real stories — and they keep coming back for more.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <img className="rounded-lg shadow-md w-full h-auto object-cover" 
                      src={img34} // reusing first image

             alt="Rider on a bike" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto p-8 bg-[#e0f2f1] rounded-xl shadow-lg mt-8 text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
            <p className="font-semibold text-lg">1. What happens if a transaction goes wrong?</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
            <p className="font-semibold text-lg">2. Are there any restrictions on what I can sell?</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
            <p className="font-semibold text-lg mb-2">3. What if the bike I buy isn't as described?</p>
            <p className="text-gray-600">We offer buyer protection and dispute resolution to ensure fair outcomes and peace of mind.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
            <p className="font-semibold text-lg">4. How do I know if a bike is in good condition?</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
            <p className="font-semibold text-lg">5. Can I delete my listing after posting?</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
            <p className="font-semibold text-lg">6. Can I sell bike parts or accessories?</p>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Home;
