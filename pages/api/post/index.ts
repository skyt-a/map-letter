import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude);
  const query = await prisma.$queryRaw<{ id: number }[]>`SELECT id FROM "Post"`;
  const result = await prisma.post.findMany({
    where: { id: { in: query.map((q) => q.id) } },
  });
  res.json(result);
}
