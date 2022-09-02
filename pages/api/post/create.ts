import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { latitude, longitude, publishedAt, content, title } = req.body;

  const result = await prisma.post.create({
    data: {
      latitude,
      longitude,
      publishedAt,
      content,
      title,
    },
  });
  res.json(result);
}
