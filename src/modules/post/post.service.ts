import type { Post } from "@prisma/client";
import { prisma } from "../../core/prisma/prisma";
import type { PostCreateDto } from "./post.dto";

export const PostService = {
  create: async (dto: PostCreateDto, authorId: number) => {
    const post = await prisma.post.create({
      data: {
        ...dto,
        authorId: authorId,
        content: dto.content as import("@prisma/client").Prisma.InputJsonValue,
      },
    });
    return post;
  },
  getAll: async (): Promise<Post[]> => {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return posts;
  },
  getById: async (id: number): Promise<Post | null> => {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  },
};
