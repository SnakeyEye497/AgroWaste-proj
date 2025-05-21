import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { geocodeAddress } from "../../utils/geolocation"; // Ensure correct path
import { getUserLocation } from "../../utils/location"; // Ensure correct path
import buyersData from "../../utils/buyers"; // Ensure correct path

console.log("NearByBuyers Component Rendered");

// Function to fetch buyers (dummy data)
const fetchBuyers = async () => {
  return buyersData;
};

const containerStyle = { width: "100%", height: "500px" };
const defaultCenter = { lat: 28.7041, lng: 77.1025 }; // Default to New Delhi

const NearByBuyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const loadBuyers = async () => {
      try {
        const buyersData = await fetchBuyers();
        console.log("Fetched Buyers:", buyersData);

        // Ensure geocoding only runs if needed
        const buyersWithCoords = await Promise.all(
          buyersData.map(async (buyer) => {
            if (buyer.lat && buyer.lng) {
              return buyer; // Skip geocoding if lat/lng exist
            }

            try {
              console.log(`Geocoding address: ${buyer.address}`);
              const location = await geocodeAddress(buyer.address);
              if (!location) {
                console.warn(`Geocoding failed for: ${buyer.address}`);
                return null;
              }
              return { ...buyer, lat: location.lat, lng: location.lng };
            } catch (geoError) {
              console.error(`Geocoding error for ${buyer.address}:`, geoError);
              return null;
            }
          })
        );

        const validBuyers = buyersWithCoords.filter(Boolean);
        console.log("Buyers with Coordinates:", validBuyers);
        setBuyers(validBuyers);
      } catch (error) {
        console.error("Error fetching buyers:", error);
      }
    };

    const loadUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    loadBuyers();
    loadUserLocation();
  }, []);

  return (
    <LoadScript googleMapsApiKey='AIzaSyATOhR0TqqNBvlQiOknqKgAWjimLnDLevc'>
      <GoogleMap mapContainerStyle={containerStyle} center={userLocation || defaultCenter} zoom={12}>
        {buyers.map((buyer) => (
          <Marker key={buyer.id} position={{ lat: buyer.lat, lng: buyer.lng }} label={buyer.name} />
        ))}
        {userLocation && <Marker position={userLocation} label="You" />}
      </GoogleMap>
    </LoadScript>
  );
};

export default NearByBuyers;