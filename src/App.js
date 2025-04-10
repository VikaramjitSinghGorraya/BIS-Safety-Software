import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import LandingPage from './pages/LandingPage';
import EditUserPage from './pages/EditUserPage';
import Layout from './components/Layout';

function App() {
	return (
		<Box minH='100vh' bg='gray.50'>
			<Layout>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/edit/:userId' element={<EditUserPage />} />
				</Routes>
			</Layout>
		</Box>
	);
}

export default App;
