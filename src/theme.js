import { extendTheme } from '@chakra-ui/react';

// Simple minimal theme with default styling
const theme = extendTheme({
	// Use default fonts and colors for simplicity
	components: {
		// Just some basic responsive adjustments
		Container: {
			baseStyle: {
				maxW: '1200px',
				px: { base: '4', md: '6' },
			},
		},
	},
});

export default theme;
