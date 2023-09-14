"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import analyze from "@assets/analyze.svg";

export default function Analytics() {
  return (
    <>
      <div className="flex items-center justify-center">
        <Card className="mt-2 w-96">
          <CardBody>
            <Image
              src={analyze}
              className="mb-4"
              width={1000}
              height={1000}
              alt={"analyze graphic"}
            />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Beta...
            </Typography>
            <Typography>
              Soon notespace.ai will offer statistics on link clicks that are
              shared in your profile.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="button" className="bg-noto-purple">
              More to come...
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
