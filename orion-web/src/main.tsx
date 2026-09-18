import { createRoot } from 'react-dom/client'
import { Router } from './routes/router'
import './index.css'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClient } from './api/QueryClient'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  </StrictMode>,
)