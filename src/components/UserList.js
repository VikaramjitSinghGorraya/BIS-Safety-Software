import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	Box,
	Flex,
	Text,
	Stack,
	Input,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteUser } from '../services/api';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function UserList({ users = [], onSearch, searchTerm, setSearchTerm }) {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const queryClient = useQueryClient();
	const deleteUserMutation = useDeleteUser();

	const handleDeleteClick = (user) => {
		setSelectedUser(user);
		setDeleteModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (selectedUser) {
			deleteUserMutation.mutate(selectedUser.id, {
				onSuccess: () => {
					setDeleteModalOpen(false);

					queryClient.invalidateQueries({ queryKey: ['users'] });

					alert('User deleted successfully');
				},
			});
		}
	};

	const handleCloseModal = () => {
		setDeleteModalOpen(false);
		setSelectedUser(null);
	};

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);

		if (onSearch) {
			onSearch(value);
		}
	};

	return (
		<Box>
			<Flex mb={4}>
				<Input
					placeholder='Search users...'
					value={searchTerm}
					onChange={handleSearchChange}
					maxWidth='300px'
				/>
			</Flex>

			<Box overflowX='auto'>
				<Table>
					<Thead>
						<Tr>
							<Th>First Name</Th>
							<Th>Last Name</Th>
							<Th>Username</Th>
							<Th>Email</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{Array.isArray(users) && users.length > 0 ? (
							users.map((user, index) => (
								<Tr key={user.id || index}>
									<Td>{user.firstName || '-'}</Td>
									<Td>{user.lastName || '-'}</Td>
									<Td>{user.username || '-'}</Td>
									<Td>{user.email || '-'}</Td>
									<Td>
										<Stack direction='row' spacing={2}>
											<Button
												as={RouterLink}
												to={`/edit/${user.id}`}
												size='sm'
												colorScheme='blue'
												isDisabled={!user.id}
											>
												Edit
											</Button>
											<Button
												size='sm'
												colorScheme='red'
												onClick={() => handleDeleteClick(user)}
												isDisabled={!user.id}
											>
												Delete
											</Button>
										</Stack>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={5} textAlign='center'>
									<Text py={4}>No users found</Text>
								</Td>
							</Tr>
						)}
					</Tbody>
				</Table>
			</Box>

			<DeleteConfirmationModal
				isOpen={deleteModalOpen}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				isLoading={deleteUserMutation.isLoading}
			/>
		</Box>
	);
}

export default UserList;
