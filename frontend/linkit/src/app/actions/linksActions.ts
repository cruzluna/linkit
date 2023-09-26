"use server";
import { LinkFormValues } from "@/components/linkFormComponent";
import { prisma } from "../../../prisma/prismaclient";
import { isValidURL } from "@/utils/utils";
import { EditLinkFormValues } from "@/components/editLinkComponent";

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

// TODO: add return type
export async function addLink(clerkId: string, formData: LinkFormValues) {
  try {
    const submitNewLink = await prisma.link.create({
      data: {
        title: formData.title,
        iconName: isValidURL(formData.url)
          ? new URL(formData.url).hostname
          : formData.url,
        url: formData.url,
        enabled: formData.enabled,
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

export async function deleteLink(linkId: string) {
  try {
    const deleteLink = await prisma.link.delete({
      where: {
        id: linkId,
      },
    });
    return {
      link: deleteLink,
      error: "",
    };
  } catch (error: any) {
    console.error("Error deleting link. ", error);
    return {
      link: null,
      error: error.message,
    };
  }
}

export async function updateLink(linkId: string, formData: EditLinkFormValues) {
  try {
    const updateLink = await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        title: formData.title,
        url: formData.url,
        iconName: isValidURL(formData.url)
          ? new URL(formData.url).hostname
          : formData.url,
      },
    });
    return {
      link: updateLink,
      error: "",
    };
  } catch (error: any) {
    console.error("Error updating link. ", error);
    return {
      link: null,
      error: error.message,
    };
  }
}

export async function updateLinkEnabled(linkId: string, enabled: boolean) {
  try {
    const updateLink = await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        enabled: enabled,
      },
    });
    return {
      link: updateLink,
      error: "",
    };
  } catch (error: any) {
    console.error("Error updating link. ", error);
    return {
      link: null,
      error: error.message,
    };
  }
}
