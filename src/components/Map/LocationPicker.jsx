import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet marker icon issue with React/Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

function ChangeMapView({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude == null || longitude == null) return;

    map.setView([latitude, longitude], map.getZoom());
  }, [latitude, longitude, map]);

  return null;
}

function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
}) {
  // Default position only used when adding a new venue.
  // Change this to whatever default location makes sense for your app.
  const defaultPosition = [22.3039, 70.8022];

  const position =
    latitude != null && longitude != null
      ? [latitude, longitude]
      : defaultPosition;

  const handleLocationSelect = async (lat, lng) => {
    try {
      // Immediately update coordinates/marker
      onLocationChange({
        latitude: lat,
        longitude: lng,
        address: null,
      });

      // Reverse geocode using OpenStreetMap Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );

      const result = await response.json();

      onLocationChange({
        latitude: lat,
        longitude: lng,
        address: result.display_name || "",
      });
    } catch (error) {
      console.error("Reverse geocoding failed:", error);

      // Coordinates are still valid even if address lookup fails
      onLocationChange({
        latitude: lat,
        longitude: lng,
        address: null,
      });
    }
  };

  return (
    <div>
      <MapContainer
        center={position}
        zoom={15}
        style={{
          height: "350px",
          width: "100%",
          borderRadius: "8px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler
          onLocationSelect={handleLocationSelect}
        />

        <ChangeMapView
          latitude={latitude}
          longitude={longitude}
        />

        {latitude != null && longitude != null && (
          <Marker position={[latitude, longitude]} />
        )}
      </MapContainer>

      <small className="text-muted d-block mt-1">
        Click anywhere on the map to select the venue location.
      </small>
    </div>
  );
}

export default LocationPicker;