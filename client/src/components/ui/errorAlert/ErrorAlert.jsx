import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

function ErrorAlert({
  close,
  cancelRef,
  isOpen,
  error,
  clearError,
  messageOnSuccess,
}) {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={close}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>answer from server:</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{error || messageOnSuccess}</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            colorScheme="red"
            onClick={() => {
              clearError();
              close();
            }}
          >
            Okey
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ErrorAlert;
