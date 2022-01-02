import { GoogleMap, Marker } from "@react-google-maps/api";
import { FC } from "react";

const GoogleMapWrapper: FC<unknown> = ({ children }) => {
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
      {children}
    </GoogleMap>
  );
};

export { GoogleMapWrapper as GoogleMap };

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};
