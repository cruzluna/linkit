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

export async function submitProfileForm(
  formData: FormValues,
  clerkId: string,
  username: string
) {
  // async logic here
  console.log("SERVER FORM ACTION");
  try {
    const submitNewUser = await prisma.user.upsert({
      where: {
        clerkId: clerkId,
      },
      create: {
        clerkId: clerkId,
        username: username,
        name: formData.name,
        headline: formData.headline,
        // tags: {
        //   create: formData.tags.map((tag) => ({
        //     skill: tag,
        //   })),
        // },
        tools: {
          create: formData.tools.map((tool) => ({
            iconName: tool,
            toolItem: tool,
          })),
        },
      },
      update: {
        username: username,
        name: formData.name,
        headline: formData.headline,
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

export type FormValRequired = {
  name: string;
  headline: string;
  tools: {
    toolItem: string;
    id: string;
  }[];
};

// gets User values for profile form, which are used as default values
export async function getUserValuesForProfile(
  clerkId: string
): Promise<FormValRequired | null> {
  console.log("getUser: SERVER ACTION");
  try {
    const user = await prisma.user.findFirst({
      where: {
        clerkId: clerkId,
      },
      select: {
        headline: true,
        name: true,
        tools: {
          select: {
            toolItem: true,
            id: true,
          },
        },
      },
    });
    console.log("getUserValProf: ", user);
    //TODO: properly structure it
    return user;
  } catch (error) {
    return null;
  }
}

export async function updateToolsAction(
  clerkId: string,
  oldToolArray: [string, string][],
  newToolArray: string[]
) {
  console.log("updateToolsAction");
  console.log("newtool array: ", newToolArray);

  // find diff in new vs old array
  // if not in new array -> delete it
  const removed: [id: string, toolName: string][] = oldToolArray.filter(
    (toolTuple: [string, string]) => !newToolArray.includes(toolTuple[1])
  );
  // if not in old array -> write to db

  const extractedToolNames: string[] = oldToolArray.map(
    (toolTuple: [id: string, toolName: string]) => toolTuple[1]
  );
  const added: string[] = newToolArray.filter(
    (tool: string) => !extractedToolNames.includes(tool)
  );
  console.log("Added: ", added);
  console.log("removed: ", removed);
  try {
    const userId = await prisma.user.findFirst({
      where: {
        clerkId: clerkId,
      },
      select: {
        id: true,
      },
    });
    if (userId === null) {
      throw new Error("User id is null");
    }

    // delete
    for (const [id, _] of removed) {
      console.log("ID 4loop", id);

      const deleteTool = await prisma.tool.delete({
        where: {
          id: id,
        },
      });
      console.log(deleteTool);
    }

    // write to db
    for (var tool of added) {
      const insertTool = await prisma.tool.create({
        data: {
          iconName: tool,
          toolItem: tool,
          user: {
            connect: {
              clerkId: clerkId,
            },
          },
        },
      });

      console.log(insertTool);
    }
  } catch (error) {
    console.log("ERROR in updateing tools:", error);
    return null;
  }
  // get userId
}
