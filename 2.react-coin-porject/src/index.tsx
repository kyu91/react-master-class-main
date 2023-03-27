import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import router from './routes/router';
import { theme } from './styles/theme'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={ theme }>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </QueryClientProvider>
);
