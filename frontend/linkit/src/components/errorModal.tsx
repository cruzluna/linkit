import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

type errorModalProps = {
  open: boolean;
  onOpen: () => void;
};

export function ErrorModal({ open, onOpen }: errorModalProps) {
  return (
    <>
      <Dialog open={open} handler={onOpen}>
        <DialogHeader>Error submitting form.</DialogHeader>
        <DialogBody divider>
          If problem persists, email notespaceai@gmail.com{" "}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={onOpen}>
            <span>Try again</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
