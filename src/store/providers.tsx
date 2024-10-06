"use client";


import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { ZoomProvider } from '@/contexts/ZoomUserContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <ZoomProvider>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ZoomProvider>
  </Provider>;
}
