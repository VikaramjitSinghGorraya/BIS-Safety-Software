import React, { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchUserById, useDeleteUser } from '../services/api';
import UserForm from '../components/UserForm';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

function EditUserPage() {
	const { userId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const { data, isLoading, isError, error } = useFetchUserById(userId);

	const user = data?.data?.user;

	const deleteUserMutation = useDeleteUser();

	const handleDelete = () => {
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = () => {
		deleteUserMutation.mutate(userId, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['users'] });

				setIsDeleteModalOpen(false);

				alert('User Deleted Successfully');

				navigate('/');
			},
		});
	};

	return (
		<Box>
			<Flex justify='space-between' align='center' mb={6}>
				<Heading size='lg'>Edit User</Heading>
				<Button as={RouterLink} to='/'>
					Back to List
				</Button>
			</Flex>

			{isLoading ? (
				<Flex justify='center' p={8}>
					<Spinner size='xl' />
				</Flex>
			) : isError ? (
				<Box p={4} textAlign='center'>
					<Text color='red'>
						Error: {error?.message || 'Failed to load user'}
					</Text>
					<Button mt={4} as={RouterLink} to='/' colorScheme='blue'>
						Return to User List
					</Button>
				</Box>
			) : (
				<Box maxW='700px' mx='auto'>
					<UserForm user={user} onDelete={handleDelete} />
				</Box>
			)}

			<DeleteConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleConfirmDelete}
				isLoading={deleteUserMutation.isLoading}
			/>
		</Box>
	);
}

export default EditUserPage;
