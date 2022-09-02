import { Post } from "@prisma/client";
import { LatLng } from "../../types/googleMap";

export const fetchProjects = async () => {
  const res = await fetch("/api/project", {
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
