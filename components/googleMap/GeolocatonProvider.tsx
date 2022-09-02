import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LatLon = { lat: number; lng: number };
type GeoLocationContext = { geolocationLatlon?: LatLon };
export const GeoLocationContext = createContext<GeoLocationContext>({
  geolocationLatlon: undefined,
});

/**
 * Geolocation APIから現在位置情報を取得、提供するプロバイダ
 */
const GeolocationProvider = ({ children }) => {
  const [geolocationLatlon, setGeolocationLatlon] = useState<LatLon>();
  const contextValue = useMemo(
    () => ({ geolocationLatlon }),
    [geolocationLatlon]
  );
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position?.coords ?? {};
        if (longitude && latitude) {
          setGeolocationLatlon({
            lng: longitude,
            lat: latitude,
          });
        }
      });
      setIsMounted(true);
    }
  }, [isMounted]);
  return (
    <GeoLocationContext.Provider value={contextValue}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export default GeolocationProvider;
