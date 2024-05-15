import styled from '@emotion/styled';
import { Box, DialogContent } from '@mui/material';

export const RegisterPageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    gap: 8px;
    margin: auto;
    height: 80vh;
`;

export const RegisterPageTitle = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-bottom: 2rem;
`;

export const FormContainer = styled(DialogContent)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 16px;
`;

export const ActionButtonContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin: 1rem 0rem;
`;