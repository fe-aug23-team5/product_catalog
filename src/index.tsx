import React from 'react';
import './index.scss';
import { createRoot } from 'react-dom/client';
import { Root } from './app/Root';

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
