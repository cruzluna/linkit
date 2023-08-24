"use server";
import { FormValues } from "@/components/profileComponent";
import { prisma } from "../../../prisma/prismaclient";
import { isValidURL } from "@/utils/utils";

export async function getUsername(username: string) {
  console.log("getUsername: SERVER ACTION");
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
}

export async function getUserByClerkId(clerkId: string) {
  console.log("getUserByClerkId: SERVER ACTION");
  const user = await prisma.user.findFirst({
    where: {
      clerkId: clerkId,
    },
  });

  return user;
}

export async function getUser(username: string) {
  console.log("getUser: SERVER ACTION");
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        clerkId: true,
        headline: true,
        name: true,
        links: {
          select: {
            id: true,
            title: true,
            iconName: true,
            url: true,
            enabled: true,
          },
        },
        tags: {
          select: {
            id: true,
            skill: true,
          },
        },
        tools: {
          select: {
            iconName: true,
            toolItem: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error in getUser action: ", error);
    return null;
  }
}

export async function submitProfileForm(formData: FormValues, clerkId: string) {
  // async logic here
  console.log("SERVER FORM ACTION");
  try {
    const submitNewUser = await prisma.user.create({
      data: {
        username: formData.username,
        name: formData.name,
        headline: formData.headline,
        // TODO: make this a separate function, so it doesnt fail
        links: {
          create: formData.links.map((link) => ({
            title: link,
            iconName: isValidURL(link) ? new URL(link).hostname : link,
            url: link,
          })),
        },
        tags: {
          create: formData.tags.map((tag) => ({
            skill: tag,
          })),
        },
        tools: {
          create: formData.tools.map((tool) => ({
            iconName: tool,
            toolItem: tool,
          })),
        },
        clerkId: clerkId,
      },
    });
    console.log(submitNewUser);
    return {
      user: submitNewUser,
      error: "",
    };
  } catch (error: any) {
    console.error("Error submitting profile form. ", error);
    return {
      user: null,
      error: error.message,
    };
  }
}
