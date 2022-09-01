import { Post } from "@prisma/client";
import { LatLng } from "../../types/googleMap";

export const fetchPost = async () => {
  return new Promise<[Post[], LatLng]>((resolve, reject) => {
    const onSuccess = async (position) => {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      if (!latitude || !longitude) {
        reject();
      }
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      });
      const data = await res.json();
      resolve([data as Post[], { lng: longitude, lat: latitude }]);
    };
    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 30000,
    };
    navigator.geolocation.getCurrentPosition(onSuccess, reject, options);
  });
};
