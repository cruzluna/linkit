"use server";
import { TagFormValues } from "@/components/tagFormComponent";
import { prisma } from "../../../prisma/prismaclient";

export async function getTags(clerkId: string) {
  console.log("getTags: SERVER ACTION");
  try {
    const tags = await prisma.user.findFirst({
      where: {
        clerkId: clerkId,
      },
      select: {
        tags: {
          select: {
            id: true,
            skill: true,
          },
        },
      },
    });
    return tags;
  } catch (error: any) {
    console.log("getTags error: ", error);
    return null;
  }
}

export async function deleteTag(tagId: string) {
  console.log("SERVER ACTION: deleteTag");
  try {
    const deleteTag = await prisma.tag.delete({
      where: {
        id: tagId,
      },
    });
    return {
      tag: deleteTag,
      error: "",
    };
  } catch (error: any) {
    console.error("Error deleting tag. ", error);
    return {
      tag: null,
      error: error.message,
    };
  }
}

// TODO: add return type
export async function addTag(clerkId: string, formData: TagFormValues) {
  console.log("SERVER ACTION: addTag");
  try {
    const submitNewTag = await prisma.tag.create({
      data: {
        skill: formData.skill,
        user: {
          connect: {
            clerkId: clerkId,
          },
        },
      },
    });
    return {
      tag: submitNewTag,
      error: "",
    };
  } catch (error: any) {
    console.error("Error adding tag. ", error);
    return {
      tag: null,
      error: error.message,
    };
  }
}
