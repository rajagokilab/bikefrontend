import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
  const [showFilters, setShowFilters] = useState(false);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bikes/`)
      .then((res) => {
        const bikesWithFullImages = res.data.map((bike) => ({
          ...bike,
          image: bike.image
            ? bike.image.startsWith("http")
              ? bike.image
              : `${API_URL}/media/${bike.image}`
            : "https://placehold.co/600x400/003366/ffffff?text=No+Image",
        }));
        setAllBikes(bikesWithFullImages);
        setFilteredBikes(bikesWithFullImages);
      })
      .catch((err) => console.error("Failed to fetch bikes:", err));
  }, []);

  useEffect(() => {
    let temp = [...allBikes];

    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) {
        temp = temp.filter((bike) =>
          filters[key].some((value) => {
            if (key === "price") {
              const price = bike.price;
              if (value === "<50000") return price < 50000;
              if (value === "50000-100000")
                return price >= 50000 && price <= 100000;
              if (value === ">100000") return price > 100000;
            } else if (key === "mileage") {
              const mileage = bike.mileage;
              if (value === "<5000") return mileage < 5000;
              if (value === "5000-20000")
                return mileage >= 5000 && mileage <= 20000;
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
    <div className="max-w-7xl mx-auto p-4 mt-20 lg:mt-28">
      {/* Toggle Filters (mobile only) */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <select
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-3 py-2"
          value={sort}
        >
          <option value="newest">Newest First</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
          <option value="mileage_low_high">Mileage: Low to High</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        {(showFilters || window.innerWidth >= 1024) && (
          <aside className="lg:w-1/4 w-full p-4 lg:p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-lg lg:text-xl font-bold mb-4">Filters</h2>
            {[
              {
                key: "price",
                title: "Budget",
                options: [
                  { label: "Under ₹50,000", value: "<50000" },
                  { label: "₹50,000 - ₹1,00,000", value: "50000-100000" },
                  { label: "Over ₹1,00,000", value: ">100000" },
                ],
              },
              {
                key: "brand",
                title: "Brand",
                options: [
                  "Yamaha",
                  "Suzuki",
                  "Royal Enfield",
                  "OLA",
                  "Bajaj",
                  "Aprilia",
                ].map((b) => ({ label: b, value: b })),
              },
              {
                key: "category",
                title: "Category",
                options: ["Scooter", "Motorcycle"].map((c) => ({
                  label: c,
                  value: c,
                })),
              },
              {
                key: "year",
                title: "Year",
                options: [
                  { label: "2020 - 2024", value: "2020-2024" },
                  { label: "2015 - 2019", value: "2015-2019" },
                  { label: "Before 2015", value: "<2015" },
                ],
              },
              {
                key: "mileage",
                title: "Kilometers",
                options: [
                  { label: "Under 5000 km", value: "<5000" },
                  { label: "5000 - 20000 km", value: "5000-20000" },
                  { label: "Over 20000 km", value: ">20000" },
                ],
              },
              {
                key: "fuel",
                title: "Fuel Type",
                options: ["Petrol", "Electric"].map((f) => ({
                  label: f,
                  value: f,
                })),
              },
              {
                key: "color",
                title: "Color",
                options: ["Blue", "Red", "Black", "White"].map((c) => ({
                  label: c,
                  value: c,
                })),
              },
            ].map((section) => (
              <div key={section.key} className="mb-4">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="flex justify-between items-center w-full font-semibold text-gray-800 mb-2"
                >
                  {section.title}
                  <svg
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openSections[section.key] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {openSections[section.key] && (
                  <div className="flex flex-col space-y-2 pl-2">
                    {section.options.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleFilterChange(
                              section.key,
                              opt.value,
                              e.target.checked
                            )
                          }
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </aside>
        )}

        {/* Bikes */}
        <main className="lg:w-3/4 w-full">
          <div className="hidden lg:flex justify-between mb-6">
            <span className="text-gray-600 text-lg font-medium">
              {filteredBikes.length} Bikes In Tamil Nadu
            </span>
            <select
              onChange={(e) => setSort(e.target.value)}
              className="border rounded px-3 py-1"
              value={sort}
            >
              <option value="newest">Newest First</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
              <option value="mileage_low_high">Mileage: Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredBikes.length === 0 ? (
              <p className="text-center col-span-full">No bikes found.</p>
            ) : (
              filteredBikes.map((bike) => (
                <Link key={bike.id} to={`/buy/${bike.id}`}>
                  <div className="bike-card flex flex-col p-4 bg-[#c2ecef] rounded-xl shadow-md relative hover:shadow-xl transition">
                    {bike.booked && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded font-semibold z-10 text-sm">
                        Booked
                      </div>
                    )}
                    <img
                      src={bike.image}
                      alt={bike.model}
                      className="w-full h-52 sm:h-60 md:h-64 object-cover rounded mb-3"
                    />
                    <h3 className="text-base md:text-lg font-semibold">
                      {bike.year} | {bike.model} | {bike.specs}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {bike.mileage} Km • {bike.owner}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-cyan-600 mt-1">
                      ₹{bike.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{bike.location}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
