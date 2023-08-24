"use server";
import { LinkFormValues } from "@/components/linkFormComponent";
import { prisma } from "../../../prisma/prismaclient";
import { isValidURL } from "@/utils/utils";

export async function getLinks(clerkId: string) {
  console.log("getLinks: SERVER ACTION");
  const user = await prisma.user.findFirst({
    where: {
      clerkId: clerkId,
    },
    select: {
      links: {
        select: {
          id: true,
          title: true,
          iconName: true,
          url: true,
          enabled: true,
        },
      },
    },
  });

  return user;
}

export async function addLink(clerkId: string, formData: LinkFormValues) {
  try {
    const submitNewLink = await prisma.link.create({
      data: {
        title: formData.title,
        iconName: isValidURL(formData.url)
          ? new URL(formData.url).hostname
          : formData.url,
        url: formData.url,
        user: {
          connect: {
            clerkId: clerkId,
          },
        },
      },
    });
    return {
      link: submitNewLink,
      error: "",
    };
  } catch (error: any) {
    console.error("Error adding link. ", error);
    return {
      link: null,
      error: error.message,
    };
  }
}
