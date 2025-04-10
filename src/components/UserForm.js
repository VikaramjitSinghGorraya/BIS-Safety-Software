import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Heading,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateUser } from '../services/api';

function UserForm({ user, onDelete, isLoading = false }) {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
	});

	const [originalData, setOriginalData] = useState({});
	const queryClient = useQueryClient();

	useEffect(() => {
		if (user) {
			const userData = {
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				username: user.username || '',
				email: user.email || '',
			};
			setFormData(userData);
			setOriginalData(userData);
		}
	}, [user]);

	const updateUserMutation = useUpdateUser();

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

		updateUserMutation.mutate(
			{ userId: user.id, userData: formData },
			{
				onSuccess: () => {
					// Invalidate cache
					queryClient.invalidateQueries({ queryKey: ['user', user.id] });
					queryClient.invalidateQueries({ queryKey: ['users'] });

					alert('User Updated Successfully');
				},
				onError: (error) => {
					alert('Error updating user: ' + (error?.message || 'Unknown error'));
				},
			}
		);
	};

	const handleReset = () => {
		setFormData(originalData);
	};

	return (
		<Box as='form' onSubmit={handleSubmit} width='100%'>
			<Stack spacing={4}>
				<Heading size='md'>Edit User Information</Heading>

				<FormControl>
					<FormLabel>First Name</FormLabel>
					<Input
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
						isDisabled={isLoading || updateUserMutation.isLoading}
						required
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Last Name</FormLabel>
					<Input
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
						isDisabled={isLoading || updateUserMutation.isLoading}
						required
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Username</FormLabel>
					<Input
						name='username'
						value={formData.username}
						onChange={handleChange}
						isDisabled={isLoading || updateUserMutation.isLoading}
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
						isDisabled={isLoading || updateUserMutation.isLoading}
						required
					/>
				</FormControl>

				<Stack direction='row' spacing={4} justify='space-between'>
					<Button
						colorScheme='red'
						onClick={onDelete}
						isDisabled={isLoading || updateUserMutation.isLoading}
					>
						Delete User
					</Button>

					<Stack direction='row' spacing={4}>
						<Button
							onClick={handleReset}
							isDisabled={isLoading || updateUserMutation.isLoading}
						>
							Reset
						</Button>
						<Button
							colorScheme='blue'
							type='submit'
							isLoading={updateUserMutation.isLoading}
							isDisabled={isLoading}
						>
							Update
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}

export default UserForm;
