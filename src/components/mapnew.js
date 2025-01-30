import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet styles
import { useMap } from "react-leaflet"; // Import the map hook
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"; // Geoman styles
import "@geoman-io/leaflet-geoman-free"; // Geoman script
import * as L from "leaflet";

const DrawingMap = () => {
  const [coordinates, setCoordinates] = useState([]);
  const mapRef = useRef();

  // Handle the creation of the drawn polygon and save coordinates
  const handleDrawCreated = (e) => {
    const { layer } = e; // Get the drawn layer (polygon)
    const latLngs = layer.getLatLngs(); // Get the coordinates of the polygon

    setCoordinates(latLngs); // Save coordinates in state
    console.log("Coordinates:", latLngs); // Log coordinates
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      L.marker([51.50915, -0.096112], { pmIgnore: true }).addTo(map);
      layer.options.pmIgnore = false;
      L.PM.reInitLayer(layer);
      L.PM.setOptIn(true);
      // Add Leaflet-Geoman controls after the map is created
      map.pm.addControls({
        position: "topright", // Position of the toolbar
        drawPolygon: true,
        drawCircle: false, // Disable the circle drawing button
        drawRectangle: false, // Disable the rectangle drawing button
        drawPolyline: false, // Disable the polyline drawing button
        drawMarker: false, // Disable the marker drawing button
        editMode: true, // Enable edit mode
        dragMode: true, // Enable drag mode
        removeMode: true, // Enable remove mode
      });

      // Attach event listener to handle drawing completion
      map.on("pm:create", handleDrawCreated); // When a polygon is created, handle its coordinates
    }
  }, []);

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]} // Set initial map center
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      {/* Display the coordinates of the drawn polygon */}
      <div>
        <h3>Building Outline Coordinates:</h3>
        <pre>{JSON.stringify(coordinates, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DrawingMap;
