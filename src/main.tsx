//Hooks
import { Toaster } from 'sonner';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//UI
import App from './App.tsx';

//Styles
import './styles/tailwindcss.css';

const root = document.getElementById('root');
const queryClient = new QueryClient();

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          richColors
          duration={3000}
          position={'top-right'}
        />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,

)
