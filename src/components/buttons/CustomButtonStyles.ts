import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

export const StyledButton = styled(Button)<ButtonProps>(({ color }) => ({
  boxShadow: 'none',
  borderRadius: 20,
  textTransform: 'none',
  textAlign: 'center',
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  lineHeight: '24px',
  fontWeight: 600,
  ...(color === 'primary' && {
    backgroundColor: '#000048',
    border: '1px solid #000048',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1a1a66',
      boxShadow: 'none',
    },
  }),
  ...(color === 'secondary' && {
    backgroundColor: '#fff',
    border: '1px solid #DDD',
    color: '#000048',
    '&:hover': {
      backgroundColor: '#c2c2c2',
      boxShadow: 'none',
    },
  }),
}));
