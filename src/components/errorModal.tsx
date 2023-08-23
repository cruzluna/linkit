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
  // const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog open={open} handler={() => onOpen(false)}>
        <DialogHeader>Error submitting form.</DialogHeader>
        <DialogBody divider>
          If problem persists, email notespaceai@gmail.com{" "}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={() => onOpen(false)}>
            <span>Try again</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}