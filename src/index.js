import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import theme from './theme';

// Create a client for React Query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
