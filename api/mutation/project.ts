import { format } from "date-fns";

export const createProject = async ({ title, content }) => {
  const body = {
    title,
    content,
    publishedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  };
  await fetch("/api/project/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const updateProject = async ({ id, title, content }) => {
  const body = {
    id,
    title,
    content,
  };
  await fetch("/api/project/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
