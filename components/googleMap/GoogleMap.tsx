import { GoogleMap } from "@react-google-maps/api";
import { FC, useCallback, useRef } from "react";

const GoogleMapWrapper: FC<unknown> = ({ children }) => {
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onLoad={onMapLoad}
    >
      {children}
    </GoogleMap>
  );
};

export { GoogleMapWrapper as GoogleMap };

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};
