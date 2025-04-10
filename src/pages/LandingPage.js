import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Flex,
	Heading,
	Text,
	Spinner,
	Stack,
} from '@chakra-ui/react';
import { useFetchUsers } from '../services/api';
import UserList from '../components/UserList';
import CreateUserModal from '../components/CreateUserModal';

function LandingPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [users, setUsers] = useState([]);

	const result = useFetchUsers(searchTerm);

	const data = result?.data;
	const isLoading = result?.isLoading;
	const isError = result?.isError;
	const error = result?.error;

	useEffect(() => {
		if (data) {
			let extractedUsers = null;

			const responseData = data.data || data;

			if (responseData.data?.users && Array.isArray(responseData.data.users)) {
				extractedUsers = responseData.data.users;
			} else if (responseData.users && Array.isArray(responseData.users)) {
				extractedUsers = responseData.users;
			} else if (Array.isArray(responseData.data)) {
				extractedUsers = responseData.data;
			} else if (Array.isArray(responseData)) {
				extractedUsers = responseData;
			}

			if (extractedUsers && Array.isArray(extractedUsers)) {
				setUsers(extractedUsers);
			} else {
				if (data && Array.isArray(data)) {
					setUsers(data);
				} else {
					setUsers([]);
				}
			}
		}
	}, [data]);

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	const handleCreateSuccess = () => {
		if (result && typeof result.refetch === 'function') {
			result.refetch();
		}
	};

	const handleRefresh = () => {
		if (result && typeof result.refetch === 'function') {
			result.refetch();
		} else {
			console.warn('Refetch function not available');
		}
	};

	return (
		<Box>
			<Flex justify='space-between' align='center' mb={6}>
				<Heading size='lg'>User Management</Heading>
				<Stack direction='row' spacing={4}>
					<Button onClick={handleRefresh} colorScheme='gray'>
						Refresh Users
					</Button>
					<Button colorScheme='blue' onClick={() => setIsCreateModalOpen(true)}>
						Create User
					</Button>
				</Stack>
			</Flex>

			{isLoading ? (
				<Flex justify='center' p={8}>
					<Spinner />
				</Flex>
			) : isError ? (
				<Box p={4} mb={6} bg='red.50' color='red.500' borderRadius='md'>
					<Text>Error: {error?.message || 'Failed to load users'}</Text>
				</Box>
			) : (
				<Box>
					{users && users.length > 0 ? (
						<UserList
							users={users}
							onSearch={handleSearch}
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					) : (
						<Box p={8} textAlign='center'>
							<Text>No users found. Create a new user to get started.</Text>
						</Box>
					)}
				</Box>
			)}

			<CreateUserModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSuccess={handleCreateSuccess}
			/>
		</Box>
	);
}

export default LandingPage;
