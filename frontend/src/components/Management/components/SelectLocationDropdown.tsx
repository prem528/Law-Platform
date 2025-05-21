import { useState, useEffect } from "react";

interface Location {
  country: string;
  state: string;
  district: string;
}

interface LocationDropdownProps {
  onLocationChange?: (location: Location) => void;
}

const LocationDropdown = ({ onLocationChange }: LocationDropdownProps) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const locationData: Record<string, Record<string, string[]>> = {
    India: {
      Maharashtra: ["Pune", "Mumbai"],
      Karnataka: ["Bangalore", "Mysore"],
    },
    USA: {
      California: ["Los Angeles", "San Francisco"],
      Texas: ["Houston", "Dallas"],
    },
  };

  useEffect(() => {
    if (onLocationChange) {
      onLocationChange({
        country: selectedCountry,
        state: selectedState,
        district: selectedDistrict,
      });
    }
  }, [selectedCountry, selectedState, selectedDistrict, onLocationChange]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedDistrict("");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Country */}
      <div>
        {/* <label className="block text-sm text-gray-600 mb-1">Country</label> */}
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Country --</option>
          {Object.keys(locationData).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      {selectedCountry && (
        <div>
          {/* <label className="block text-sm text-gray-600 mb-1">State</label> */}
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select State --</option>
            {Object.keys(locationData[selectedCountry]).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* District */}
      {selectedState && (
        <div>
          {/* <label className="block text-sm text-gray-600 mb-1">District</label> */}
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select District --</option>
            {locationData[selectedCountry][selectedState].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
