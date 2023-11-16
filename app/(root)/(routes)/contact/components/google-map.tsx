"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const GoogleMapComp = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_API_KEY!,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "400px",
        height: "400px",
      }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  );
};

export default GoogleMapComp;
