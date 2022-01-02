import { LoadScript } from "@react-google-maps/api";

const GoogleMapLoadScript = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}>
      {children}
    </LoadScript>
  );
};

export { GoogleMapLoadScript };
