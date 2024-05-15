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
  }),
  ...(color === 'secondary' && {
    backgroundColor: '#fff',
    border: '1px solid #DDD',
    color: '#000048',
  }),
  ...(color === 'info' && {
    backgroundColor: '#78ECE8',
    border: '1px solid #78ECE8',
    color: '#000048',
  }),
  '&:hover': {
    boxShadow: 'none',
    ...(color === 'primary' && {
      backgroundColor: '#1a1a66',
    }),
    ...(color === 'secondary' && {
      backgroundColor: '#c2c2c2',
    }),
    ...(color === 'info' && {
      backgroundColor: '#00b3b3',
    }),
  },
}));
