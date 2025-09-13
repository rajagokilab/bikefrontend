import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BuyBikes() {
  const [allBikes, setAllBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [filters, setFilters] = useState({
    price: [],
    brand: [],
    category: [],
    year: [],
    mileage: [],
    fuel: [],
    color: [],
  });
  const [sort, setSort] = useState("newest");
  const [openSections, setOpenSections] = useState({
    price: true,
    brand: true,
    category: true,
    year: true,
    mileage: true,
    fuel: true,
    color: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Fetch bikes from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/bikes/")
      .then((res) => {
        setAllBikes(res.data);
        setFilteredBikes(res.data);
      })
      .catch((err) => console.error("Failed to fetch bikes:", err));
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let temp = [...allBikes];

    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) {
        temp = temp.filter((bike) =>
          filters[key].some((value) => {
            if (key === "price") {
              const price = bike.price;
              if (value === "<50000") return price < 50000;
              if (value === "50000-100000") return price >= 50000 && price <= 100000;
              if (value === ">100000") return price > 100000;
            } else if (key === "mileage") {
              const mileage = bike.mileage;
              if (value === "<5000") return mileage < 5000;
              if (value === "5000-20000") return mileage >= 5000 && mileage <= 20000;
              if (value === ">20000") return mileage > 20000;
            } else if (key === "year") {
              const year = bike.year;
              if (value === "<2015") return year < 2015;
              if (value === "2015-2019") return year >= 2015 && year <= 2019;
              if (value === "2020-2024") return year >= 2020 && year <= 2024;
            } else {
              return String(bike[key]) === value;
            }
            return false;
          })
        );
      }
    });

    if (sort === "newest") temp.sort((a, b) => b.year - a.year);
    if (sort === "price_low_high") temp.sort((a, b) => a.price - b.price);
    if (sort === "price_high_low") temp.sort((a, b) => b.price - a.price);
    if (sort === "mileage_low_high") temp.sort((a, b) => a.mileage - b.mileage);

    setFilteredBikes(temp);
  }, [filters, sort, allBikes]);

  const handleFilterChange = (category, value, checked) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (checked) updated[category].push(value);
      else updated[category] = updated[category].filter((v) => v !== value);
      return updated;
    });
  };

  return (
    <div className="flex max-w-7xl mx-auto gap-8 p-4 mt-28">
      {/* Sidebar */}
      <aside className="md:w-1/4 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        {[
          { key: "price", title: "Budget", options: [
            { label: "Under ₹50,000", value: "<50000" },
            { label: "₹50,000 - ₹1,00,000", value: "50000-100000" },
            { label: "Over ₹1,00,000", value: ">100000" },
          ]},
          { key: "brand", title: "Brand", options: ["Yamaha","Suzuki","Royal Enfield","OLA","Bajaj","Aprilia"].map(b => ({label:b,value:b})) },
          { key: "category", title: "Category", options: ["Scooter","Motorcycle"].map(c => ({label:c,value:c})) },
          { key: "year", title: "Year", options:[
            { label: "2020 - 2024", value:"2020-2024" },
            { label: "2015 - 2019", value:"2015-2019" },
            { label: "Before 2015", value:"<2015" },
          ]},
          { key: "mileage", title: "Kilometers", options:[
            { label: "Under 5000 km", value:"<5000" },
            { label: "5000 - 20000 km", value:"5000-20000" },
            { label: "Over 20000 km", value:">20000" },
          ]},
          { key: "fuel", title: "Fuel Type", options:["Petrol","Electric"].map(f=>({label:f,value:f})) },
          { key: "color", title: "Color", options:["Blue","Red","Black","White"].map(c=>({label:c,value:c})) },
        ].map(section => (
          <div key={section.key} className="mb-4">
            <button onClick={()=>toggleSection(section.key)}
              className="flex justify-between items-center w-full font-semibold text-gray-800 mb-2">
              {section.title}
              <svg className={`h-5 w-5 transition-transform duration-200 ${openSections[section.key] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {openSections[section.key] && (
              <div className="flex flex-col space-y-2 pl-2">
                {section.options.map(opt=>(
                  <label key={opt.value} className="flex items-center space-x-2">
                    <input type="checkbox" onChange={e=>handleFilterChange(section.key,opt.value,e.target.checked)} />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* Bikes */}
      <main className="md:w-3/4">
        <div className="flex justify-between mb-6">
          <span className="text-gray-600 text-lg font-medium">{filteredBikes.length} Bikes In Tamil Nadu</span>
          <div>
            <select onChange={e=>setSort(e.target.value)} className="border rounded px-3 py-1" value={sort}>
              <option value="newest">Newest First</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
              <option value="mileage_low_high">Mileage: Low to High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBikes.length === 0 ? (
            <p className="text-center col-span-full">No bikes found.</p>
          ) : (
            filteredBikes.map(bike => (
              <Link key={bike.id} to={`/buy/${bike.id}`}>
                <div className="bike-card flex flex-col items-center p-4 bg-[#c2ecef] rounded-xl shadow-md relative">
                  {bike.booked && <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded font-semibold z-10">
                    Booked
                  </div>}
                  <img src={bike.image} alt={bike.model} className="w-full h-64 object-cover rounded mb-2"/>
                  <h3 className="text-lg font-semibold">{bike.year} | {bike.model} | {bike.specs}</h3>
                  <p className="text-gray-500">{bike.mileage} Km • {bike.owner}</p>
                  <p className="text-2xl font-bold text-cyan-600">₹{bike.price.toLocaleString()}</p>
                  <p className="text-gray-500">{bike.location}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
