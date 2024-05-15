import styled from '@emotion/styled';
import { Box, DialogContent } from '@mui/material';

export const LoginPageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    gap: 8px;
    margin: auto;
    height: 80vh;
`;

export const LoginPageTitle = styled(Box)`
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

export const HorizontalLine = styled.div`
    width: 50%;
    margin: 0.5rem 0.5rem;
    border: 1px solid #999999;
`;

export const HorizontalLineContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    align-text: center;
    width: 100%;
    margin: 0.5rem 0rem;
    color: #999999
`;