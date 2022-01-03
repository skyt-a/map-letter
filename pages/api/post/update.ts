import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { content, id } = req.body;

  const result = await prisma.post.update({
    where: { id },
    data: {
      content,
    },
  });
  res.json(result);
}
