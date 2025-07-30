
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Confetti } from "../ui/confetti";
import { useNavigate } from "react-router-dom";

// interface EventSuccessDialogProps {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   eventTitle: string;
//   isEdit?: boolean;
// }

export function EventSuccessDialog({
  isOpen,
  setIsOpen,
  eventTitle,
  isEdit = false,
}) {
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    navigate("/events");
  };

  return (
    <>
      {isOpen && <Confetti />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Success! 🎉</DialogTitle>
            <DialogDescription>
              Your event "{eventTitle}" has been {isEdit ? "updated" : "created"} successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              View All Events
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
