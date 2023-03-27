import {
    Center,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
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
            size="xl"
        >
            <ModalOverlay />
            <ModalContent
                fontFamily="default"
                w="90vw"
                h="90vh"
                bg="transparent"
            >
                <ModalBody>
                    <VStack>
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
                                thickness="10px"
                                speed="1s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="2xl"
                                label={label}
                            />
                            <Text color="white" fontSize="82px">
                                {label}
                            </Text>
                        </Center>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LoadingSpinner;
