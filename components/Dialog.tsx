import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    ButtonGroup,
} from "@chakra-ui/react";
import React from "react";
import { DialogButton } from "../types";

interface Props {
    isOpen: boolean;
    cancelRef: React.RefObject<HTMLButtonElement>;
    onClose: () => void;
    headerText: string;
    bodyText: string;
    buttons: DialogButton[];
}

const Dialog = ({
    isOpen = false,
    cancelRef,
    onClose,
    headerText,
    bodyText,
    buttons,
}: Props) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            closeOnOverlayClick
            isCentered
            size="xl"
        >
            <AlertDialogOverlay>
                <AlertDialogContent
                    mt="500px"
                    w="90vw"
                    fontFamily="default"
                    bg="brand.primary-light"
                >
                    <AlertDialogHeader fontSize="xl" fontWeight="bold">
                        {headerText}
                    </AlertDialogHeader>

                    <AlertDialogBody>{bodyText}</AlertDialogBody>

                    <AlertDialogFooter>
                        <ButtonGroup gap="4">
                            {buttons.map((button) => (
                                <Button
                                    variant="primary"
                                    key={button.text}
                                    ref={cancelRef}
                                    onClick={button.onClick}
                                >
                                    {button.text}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default Dialog;
