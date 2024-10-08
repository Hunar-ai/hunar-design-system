import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

export const asteriskStyle = {
    color: red[600],
    fontSize: '20px',
    fontFamily: 'Roboto,Arial,sans-serif'
};

export const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Lato',
            textTransform: 'none'
        }
    },
    palette: {
        text: {
            primary: grey[900]
        }
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    // fontSize: '0.85rem',
                    // minHeight: '1.138rem'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        },
        MuiTableRow: {
            styleOverrides: {
                // Even though there is a hover rule we have to override it here. Don't ask.
                root: {
                    '&:hover': {
                        backgroundColor: grey[100],
                        '.left-sticky-cell, .right-sticky-cell': {
                            backgroundColor: grey[100]
                        }
                    },
                    '.left-sticky-cell, .right-sticky-cell': {
                        backgroundColor: 'white'
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                // Even though there is a hover rule we have to override it here. Don't ask.
                head: {
                    backgroundColor: grey[100]
                }
            }
        }
    }
});
