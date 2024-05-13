import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AuthenticationProvider from './components/authenticationProvider/AuthenticationProvider';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <AuthenticationProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthenticationProvider>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
