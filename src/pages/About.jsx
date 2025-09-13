import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';// adjust the path based on your folder structure
import a1 from '../assets/2.png';
import a2 from '../assets/31.jpg';
import a3 from '../assets/10.png';
import a4 from '../assets/11.png';
import a5 from '../assets/6.png';
import a6 from '../assets/8.png';

const AboutUs = () => {
  return (
    <div className="p-4">
      {/* Navbar */}
      <Navbar />

      {/* About Us Section */}
      <section className=" mx-auto p-8 bg-white mt-28">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 w-full">
            <div className="md:w-1/2">
              <img
                className=" mb-4 w-full h-auto object-cover"
                src={a1}
                alt="Two people on a bike"
              />
            </div>
          <div className="md:w-1/2 text-center md:text-left">
<h2 className="text-3xl font-bold mb-6 text-[#1f526b] text-center">About Us</h2>
  <div className="font-semibold text-gray-600 text-2xl space-y-4 leading-relaxed text-center">
    <p>
      At Drive RP, we're passionate about making cycling accessible and sustainable for everyone.
    </p>
    <p>
      We specialize in connecting buyers and sellers of quality secondhand bikes, creating a trusted marketplace where affordability meets reliability.
    </p>
    <p>
      Whether you're looking to sell your used bike or find your next ride at a great price, we're here to make the process easy, transparent, and secure.
    </p>
    <p>
      Ride smarter, shop sustainably — with us.
    </p>
  </div>
</div>

          </div>
        </div>

        {/* Our Mission */}
<div
      className="relative w-full h-48 md:h-64 lg:h-80 mt-8 rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${a2})` }}
    >
          <div className="absolute inset-0  bg-opacity-40 flex items-start justify-center">
            <div className="text-center text-black">
              <h3 className="text-6xl font-bold">Our Mission</h3>
              <p className="mt-2 text-lg max-w-lg mx-auto">
                Our mission is to make cycling more accessible, affordable,
                and sustainable by creating a trusted marketplace for
                secondhand bikes.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mt-8 space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col items-center justify-center text-center mt-12 px-4">
  <h3 className="text-3xl font-bold text-[#1f526b] mb-6">Our Approach</h3>
  <div className="max-w-3xl space-y-4 text-xl text-black leading-relaxed font-semibold ">
    <p>
      We believe buying or selling a secondhand bike should be simple, safe, and stress-free.
    </p>
    <p>
      Our approach is centered around trust, quality, and convenience. Every bike listed goes
      through a basic verification process to ensure it meets our standards.
    </p>
    <p>
      We offer honest pricing, responsive customer support, and a community-driven platform
      that values both sellers and buyers.
    </p>
    <p>
      Whether you’re upgrading your ride or giving your old bike a second life, we’re here
      to guide every step of the journey.
    </p>
  </div>
</div>
          <div className="md:w-1/2 flex flex-wrap justify-center md:justify-end gap-4">
            <img
              className="rounded-lg shadow-md w-1/3 md:w-2/5 lg:w-1/2 h-auto object-cover"
              src={a3}
              alt="A group of people with bikes"
            />
            <img
              className="rounded-lg shadow-md w-1/3 md:w-2/5 lg:w-1/4 h-auto object-cover"
src={a4}              alt="A rider on a bike"
            />
            <img
              className="rounded-lg shadow-md w-1/3 md:w-2/5 lg:w-1/4 h-auto object-cover"
src={a5}              alt="A rider on a bike"
            />
            <img
              className="rounded-lg shadow-md w-1/3 md:w-2/5 lg:w-1/2 h-auto object-cover"
src={a6}              alt="A group of people"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
