import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { latitude, longitude, publishedAt } = req.body;

  const result = await prisma.post.create({
    data: {
      latitude,
      longitude,
      publishedAt,
    },
  });
  res.json(result);
}
