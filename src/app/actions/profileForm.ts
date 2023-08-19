"use server";
import { FormValues } from "@/components/profileComponent";
import { prisma } from "../../../prisma/prismaclient";

export async function isUsernameAvailable(username: string) {
  console.log("SERVER ACTION");
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
}

export async function submitProfileForm(formData: FormValues) {
  // async logic here
  console.log("SERVER ACTION");
  const submitNewUser = await prisma.user.create({
    data: {
      username: "uniqjakdjadsklfjalksdjfl",
      name: formData.name,
      headline: formData.headline,
      links: {
        create: [
          {
            title: "Test title",
            iconName: "github",
            url: "github.com/cruzluna",
          },
        ],
      },
      tags: {
        create: [
          {
            skill: "fullstack",
          },
        ],
      },
      tools: {
        create: [
          {
            iconName: "AWS",
            toolItem: "AWS",
          },
        ],
      },
    },
  });
  console.log(submitNewUser);
}
