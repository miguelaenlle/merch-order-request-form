import * as React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react'

const CustomModal: React.FC<{
    isOpen?: boolean;
    buttonText: string;
    title?: string;
    content: React.ReactNode;
    closeText?: string;
    actionText?: string;
    onClose?: () => void;
    onAction?: () => void;
    disableDefaultButtons?: boolean;
    extraLong?: boolean;
    transparentButton?: boolean;
}> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleAction = () => {
        if (props.onAction) {
            props.onAction();
            onClose();
        }
    }

    return (
        <div>
            {!props.transparentButton && (
                <Button colorScheme="blue" onClick={onOpen}>{props.buttonText}</Button>
            )}
            <Modal isOpen={props.isOpen ?? isOpen} onClose={props.onClose ?? onClose}>
                <ModalOverlay />
                <ModalContent maxW={props.extraLong ? "1000px" : undefined}>
                    {props.title && (
                        <>
                            <ModalHeader>{props.title}</ModalHeader>
                            <ModalCloseButton />
                        </>
                    )}
                    <ModalBody>
                        {props.content}
                    </ModalBody>
                    {!props.disableDefaultButtons && (
                        <ModalFooter>
                            <div></div>
                            <Button colorScheme="blue" variant='ghost' mr={3} onClick={onClose}>
                                {props.closeText}
                            </Button>
                            <Button colorScheme="blue" onClick={handleAction}>
                                {props.actionText}
                            </Button>
                        </ModalFooter>
                    )}

                </ModalContent>
            </Modal >
        </div>
    );
}
export default CustomModal