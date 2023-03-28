import {
    Center,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    Spinner,
} from "@chakra-ui/react";
import React from "react";

interface Props {
    loading: boolean;
    label: string;
}

const LoadingSpinner = ({ loading, label }: Props) => {
    return (
        <Modal
            isOpen={loading}
            onClose={() => {}}
            blockScrollOnMount
            isCentered
            returnFocusOnClose
            size="xs"
        >
            <ModalOverlay />
            <ModalContent
                fontFamily="default"
                w="90vw"
                h="90vh"
                bg="transparent"
            >
                <ModalBody>
                    <Center
                        display="flex"
                        flexDir="column"
                        position="absolute"
                        top={0}
                        right={0}
                        left={0}
                        bottom={0}
                        margin="auto"
                    >
                        <Spinner
                            thickness="4px"
                            speed="1s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                            label={label}
                        />
                        <Text color="brand.primary-light" fontSize="32px">
                            {label}
                        </Text>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LoadingSpinner;
