import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

const token = '47D32587-A0A8-9FF5-52941F1FE1602250';

const config = {
	headers: {
		Authorization: `Bearer ${token}`,

		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

const getAuth = async () => {
	const authData = await axios.post(
		'http://assessmentapi.bistrainer.com/rest/auth',
		{
			clientID: '1fab396d13712c98b336a2030713b910',
			clientSecret: '3rDHuN1WpZhHA-yqmjyr14N74bdk4Wrh4qsGAsCYoTY',
		}
	);
	return authData.data;
};

const BASE_URL = 'http://assessmentapi.bistrainer.com/rest';

const fetchUsers = async (search = '') => {
	try {
		const url = `${BASE_URL}/api/user`;
		const params = search ? { searchTerm: search } : {};
		const response = await axios.get(url, {
			...config,
			params,
		});

		const data = response.data;

		return response;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};

const fetchUserById = async (userId) => {
	const userFetched = await axios.get(
		`http://assessmentapi.bistrainer.com/rest/api/user?userID=${userId}`,
		config
	);
	return userFetched.data;
};

const createUser = async (userData) => {
	const userCreated = await axios.post(
		'http://assessmentapi.bistrainer.com/rest/api/user',
		userData,
		config
	);
	return userCreated.data;
};

const updateUser = async (userId, userData) => {
	const userUpdated = await axios.patch(
		`http://assessmentapi.bistrainer.com/rest/api/user?userID=${userId}`,
		userData,
		config
	);
	return userUpdated.data;
};

const deleteUser = async (userId) => {
	const userDeleted = await axios.delete(
		`http://assessmentapi.bistrainer.com/rest/api/user?userID=${userId}`,
		config
	);
	return userDeleted.data;
};

export const useGetAuth = () => {
	return useMutation({
		mutationKey: ['Auth'],
		mutationFn: () => getAuth(),
	});
};

export const useFetchUsers = (search = '') => {
	const queryResult = useQuery({
		queryKey: ['users', search],
		queryFn: () => fetchUsers(search),
	});

	console.log('Query result structure:', Object.keys(queryResult));
	if (!queryResult.refetch) {
		console.warn('refetch function missing from query result');
	}

	return queryResult;
};

export const useFetchUserById = (userId) => {
	return useQuery({
		queryKey: [`user`, userId],
		queryFn: () => fetchUserById(userId),
	});
};

export const useCreateUser = () => {
	return useMutation({
		mutationKey: ['createUser'],
		mutationFn: (userData) => createUser(userData),
	});
};

export const useUpdateUser = () => {
	return useMutation({
		mutationKey: ['updateUser'],
		mutationFn: ({ userId, userData }) => updateUser(userId, userData),
	});
};

export const useDeleteUser = () => {
	return useMutation({
		mutationKey: ['deleteUser'],
		mutationFn: (userId) => deleteUser(userId),
	});
};

export { fetchUsers, fetchUserById, createUser, updateUser, deleteUser };
