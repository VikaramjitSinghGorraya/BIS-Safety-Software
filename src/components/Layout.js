import React from 'react';
import { Box, Container, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Layout({ children }) {
	return (
		<Box>
			<Box as='header' bg='blue.500' color='white' py={4}>
				<Container maxW='container.xl'>
					<Link as={RouterLink} to='/' _hover={{ textDecoration: 'none' }}>
						<Heading size='lg'>User Management App</Heading>
					</Link>
				</Container>
			</Box>

			<Container maxW='container.xl' py={4}>
				<Box
					bg='white'
					p={4}
					borderRadius='md'
					boxShadow='sm'
					minH='calc(100vh - 180px)'
				>
					{children}
				</Box>
			</Container>
		</Box>
	);
}

export default Layout;
