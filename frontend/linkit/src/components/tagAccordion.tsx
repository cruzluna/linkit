"use client";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Card,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { TagComponent } from "./tagDisplayComponent";
import { useUser } from "@clerk/nextjs";
import { getTags } from "@/app/actions/tagActions";
import type { Tag } from "@prisma/client";
import { TagFormComponent } from "./tagFormComponent";
export type TagWithoutUserId = Omit<Tag, "userId">;

export function TagAccordion() {
  const { user, isLoaded } = useUser(); // get clerk user for clerkId
  // TODO: limit no. of tags total
  const [tagData, setTagData] = useState<TagWithoutUserId[]>([]);
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  // get tags

  useEffect(() => {
    if (isLoaded && user) {
      const fetchTags = async () => {
        const res = await getTags(user.id);
        if (res !== null) {
          setTagData(res.tags);
        }
      };
      fetchTags();
    }
  }, [user]);

  const handleDeleteTag = (tagIdToDelete: string) => {
    // Filter out the tag to be deleted based on its ID
    const updatedTagData = tagData.filter((tag) => tag.id !== tagIdToDelete);
    setTagData(updatedTagData);
  };

  const [addOneTag, setAddOneTag] = useState<boolean>(false);

  const handleAddOneTag = () => {
    setAddOneTag(false);
  };

  const handleAddTag = (tagToAdd: TagWithoutUserId) => {
    setTagData([...tagData, tagToAdd]);
  };
  const [tooManyTags, setTooManyTags] = useState<boolean>(false);

  return (
    <>
      <div className="flex  justify-center">
        <Card color="transparent" shadow={false}>
          <div className="mt-4 mb-2 w-100 mx-auto max-w-screen-lg sm:w-96">
            <div className="flex justify-center">
              <Accordion
                open={open === 1}
                className=" mb-2 w-100 rounded-lg border border-blue-gray-100 px-4"
              >
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className={`border-b-0 transition-colors ${
                    open === 1 ? "hover:!text-noto-purple" : ""
                  }`}
                >
                  Update Tags
                </AccordionHeader>
                <AccordionBody className="flex flex-col items-center justify-center pt-0 text-base font-normal gap-y-2">
                  {tagData.map((tag) => (
                    <TagComponent
                      key={tag.id}
                      id={tag.id}
                      skill={tag.skill}
                      handleDeleteTag={handleDeleteTag}
                    />
                  ))}

                  {user && addOneTag && (
                    <>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Add a Tag (e.g AI, React, Blockchain, DevOps)
                      </label>
                      <TagFormComponent
                        clerkId={user.id}
                        handleAddOneTag={handleAddOneTag}
                        handleAddTag={handleAddTag}
                      />
                    </>
                  )}

                  {tooManyTags && (
                    <Alert
                      color="red"
                      open={tooManyTags}
                      onClose={() => {
                        setTooManyTags(false);
                      }}
                    >
                      Can only have 3 tags
                    </Alert>
                  )}
                  <Button
                    className="bg-noto-purple mt-2"
                    onClick={() => {
                      if (tagData.length < 3) {
                        setAddOneTag(true);
                      } else {
                        // set alert
                        setTooManyTags(true);
                      }
                    }}
                  >
                    Add
                  </Button>
                </AccordionBody>
              </Accordion>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
