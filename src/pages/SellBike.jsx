import { useState } from "react";
import axios from "axios";
import CustomDropdown from "../components/CustomDropdown";
import sell1 from '../assets/sell1.png'; 
import hero1 from '../assets/14.png'; 
import bgImage from '../assets/15.png'; 

export default function BikeValuation() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    variant: "",
    year: "",
    kms: "",
    owner: "",
  });

  const [valuation, setValuation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const getPrice = async () => {
    if (!form.brand || !form.model || !form.variant || !form.year || !form.kms || !form.owner) {
      alert("Please fill all fields before getting price.");
      return;
    }

    setLoading(true);
    try {
      // Parse KMs range correctly
      const kmsValue = form.kms.includes("-") ? parseInt(form.kms.split(" - ")[1]) : parseInt(form.kms);

const response = await axios.post("http://localhost:8000/sell/valuation/", {
        brand: form.brand,
        model: form.model,
        variant: form.variant,
        year: parseInt(form.year),
        kms: kmsValue,
        owner: form.owner,
      });

      if (response.data && response.data.price) {
        setValuation(response.data.price);
        setShowModal(true);
      } else {
        alert("Failed to fetch price. Please try again.");
      }
    } catch (err) {
      console.error("Valuation failed:", err);
      alert("Error fetching price. Check console for details.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-28">
      {/* Hero Banner */}
      <header className="h-120 flex flex-col justify-center items-center text-white relative">
        <img
          src={hero1} 
          alt="Bike road"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            "Every bike has another adventure left in it."
          </h1>
          <h2 className="text-lg md:text-2xl">Pass it on to the next rider.</h2>
        </div>
      </header>

      {/* Valuation Form */}
     <main className="flex justify-center py-12">
  <div className="relative max-w-7xl w-full rounded-3xl shadow-2xl overflow-hidden min-h-[400px]">
  {/* Background Image */}
<div className="absolute inset-0">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  ></div>
  <div className="absolute inset-0 bg-white opacity-50"></div>
</div>

    {/* Content */}
    <div className="relative p-6 md:p-10 border border-gray-200 rounded-3xl flex flex-col gap-6 ">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Sell Fast By <span className="text-blue-400">DriveRP</span>
      </h2>

      <div className="flex flex-wrap gap-4" >
        <CustomDropdown
          label="Brand Name"
          items={["Bajaj", "Honda", "Yamaha", "Royal Enfield"]}
          onSelect={(val) => updateForm("brand", val)}
          
        />
        <CustomDropdown
          label="Model"
          items={["Avenger", "Boxer", "Chetak", "CT100", "Discover", "Pulsar"]}
          onSelect={(val) => updateForm("model", val)}
        />
        <CustomDropdown
          label="Variant"
          items={["150CC", "180CC Neon ABS", "220F ABS"]}
          onSelect={(val) => updateForm("variant", val)}
        />
        <CustomDropdown
          label="Year"
          items={["2023", "2022", "2021", "2020", "2019"]}
          onSelect={(val) => updateForm("year", val)}
        />
        <CustomDropdown
          label="KMs Driven"
          items={["1 - 5000", "5001 - 10000", "10001 - 20000", "20001 - 50000", "50001 - 100000"]}
          onSelect={(val) => updateForm("kms", val)}
        />
        <CustomDropdown
          label="Owner"
          items={["1st Owner", "2nd Owner", "3rd Owner"]}
          onSelect={(val) => updateForm("owner", val)}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={getPrice}
          disabled={loading}
          className={`bg-blue-600 text-white px-8 py-3 rounded-full ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Calculating..." : "Get Price"}
        </button>
      </div>
    </div>
  </div>
</main>


      {/* Price Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Estimated Price</h3>
            <p className="text-3xl font-extrabold text-blue-600 mb-6">
              ₹{valuation.toLocaleString()}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* How it Works */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">How it Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
<img src={sell1} alt="Step 1" className="mx-auto mb-4 w-300 h-90"/>
            
        </div>
      </section>
    </div>
  );
}
