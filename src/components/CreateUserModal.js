import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUser } from '../services/api';

function CreateUserModal({ isOpen, onClose, onSuccess }) {
	const initialFormData = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
	};

	const [formData, setFormData] = useState(initialFormData);
	const queryClient = useQueryClient();
	const createUserMutation = useCreateUser();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			!formData.firstName ||
			!formData.lastName ||
			!formData.username ||
			!formData.email
		) {
			alert('Please fill in all fields');
			return;
		}

		createUserMutation.mutate(formData, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['users'] });

				setFormData(initialFormData);
				onClose();

				alert('New User Created');
			},
			onError: (error) => {
				alert('Error creating user: ' + (error?.message || 'Unknown error'));
			},
		});
	};

	const handleCancel = () => {
		setFormData(initialFormData);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCancel}>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={handleSubmit}>
					<ModalHeader>Create New User</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<Stack spacing={3}>
							<FormControl>
								<FormLabel>First Name</FormLabel>
								<Input
									name='firstName'
									value={formData.firstName}
									onChange={handleChange}
									required
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Last Name</FormLabel>
								<Input
									name='lastName'
									value={formData.lastName}
									onChange={handleChange}
									required
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Username</FormLabel>
								<Input
									name='username'
									value={formData.username}
									onChange={handleChange}
									required
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Email</FormLabel>
								<Input
									name='email'
									type='email'
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</FormControl>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button
							mr={3}
							onClick={handleCancel}
							isDisabled={createUserMutation.isLoading}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							colorScheme='blue'
							isLoading={createUserMutation.isLoading}
						>
							Create User
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}

export default CreateUserModal;
