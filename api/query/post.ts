import { Post } from "@prisma/client";
import { LatLng } from "../../types/googleMap";

export const fetchPost = async () => {
  const res = await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({
    //   latitude,
    //   longitude,
    // }),
  });
  const data = await res.json();
  return data;
};
