import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapSelectorProps {
  onLocationSelect: (location: string) => void;
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

const containerStyle = {
  width: '100%',
  height: '300px'
};

export const MapSelector = ({ onLocationSelect }: MapSelectorProps) => {
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });
    
    // Convert coordinates to address using Geocoding service
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === 'OK' && results?.[0]) {
          onLocationSelect(results[0].formatted_address);
        }
      }
    );
  }, [onLocationSelect]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        onClick={handleMapClick}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};