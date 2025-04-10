import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
} from '@chakra-ui/react';

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isLoading }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Confirm Delete</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>Are you sure you want to delete this user?</Text>
				</ModalBody>
				<ModalFooter>
					<Button mr={3} onClick={onClose} isDisabled={isLoading}>
						Cancel
					</Button>
					<Button colorScheme='red' onClick={onConfirm} isLoading={isLoading}>
						Delete
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default DeleteConfirmationModal;
