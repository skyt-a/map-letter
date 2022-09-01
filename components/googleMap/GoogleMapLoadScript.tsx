import { LoadScript } from "@react-google-maps/api";

console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
console.log(process.env.GOOGLE_MAP_API_KEY);

const GoogleMapLoadScript = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}>
      {children}
    </LoadScript>
  );
};

export { GoogleMapLoadScript };
