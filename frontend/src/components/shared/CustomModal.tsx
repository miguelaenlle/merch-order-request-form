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
    buttonText: string;
    title: string;
    content: React.ReactNode;
    closeText: string;
    actionText: string;
    onAction: () => void;
}> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleAction = () => {
        props.onAction();
        onClose();
    }

    return (
        <div>
            <Button colorScheme="blue" onClick={onOpen}>{props.buttonText}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.content}
                    </ModalBody>

                    <ModalFooter>
                        <div></div>
                        <Button colorScheme="blue" variant='ghost' mr={3} onClick={onClose}>
                            {props.closeText}
                        </Button>
                        <Button colorScheme="blue" onClick={handleAction}>
                            {props.actionText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </div>
    );
}
export default CustomModal