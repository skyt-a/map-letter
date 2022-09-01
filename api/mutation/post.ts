import { format } from "date-fns";

export const createPost = async ({ title, lat, lng, content }) => {
  const body = {
    title,
    latitude: lat,
    longitude: lng,
    content,
    publishedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  };
  await fetch("/api/post/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const updatePost = async ({ id, title, content }) => {
  const body = {
    id,
    title,
    content,
  };
  await fetch("/api/post/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
