import { useState } from "react";

export default function CustomDropdown({ label, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(label);

  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
    onSelect(item);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex-1 text-center py-3 border-b md:border-b-0 md:border-r border-gray-300 text-gray-600 font-medium relative cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{selected}</span>

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 bg-white rounded-xl shadow-lg border border-gray-300 z-50 w-full p-4 text-left">
          {/* Search box (only if not KMs/Owner dropdowns) */}
          {label !== "KMs Driven" && label !== "Owner" && (
            <input
              type="text"
              placeholder={`Enter ${label}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
          )}

          <ul className="space-y-1 max-h-40 overflow-y-auto">
            {filteredItems.map((item, index) => (
              <li
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item);
                }}
                className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
