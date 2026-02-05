import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';
import { Provider } from 'react-redux'
import { theme } from 'theme/theme';
import { store } from 'store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BreakpointsProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </Provider>
    </ThemeProvider>
);
