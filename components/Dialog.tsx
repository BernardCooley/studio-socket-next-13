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
                    w="90vw"
                    fontFamily="default"
                    bg="brand.primary-light"
                    p={1}
                >
                    <AlertDialogHeader p={1} fontSize="xs" fontWeight="bold">
                        {headerText}
                    </AlertDialogHeader>

                    <AlertDialogBody p={1} fontSize="18px">
                        {bodyText}
                    </AlertDialogBody>

                    <AlertDialogFooter p={1}>
                        <ButtonGroup>
                            {buttons.map((button) => (
                                <Button
                                    size="xs"
                                    fontSize="16px"
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
