import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import apiService from '@/utils/apiService';
import { useAppSelector } from '@/store/hooks';

interface ZoomContextType {
  zoomUser: any | null;
  setZoomUser: (user: any) => void;
  loading: boolean;
}

const ZoomContext = createContext<ZoomContextType>({
  zoomUser: null,
  setZoomUser: () => { },
  loading: true,
});

export const ZoomProvider = ({ children }: { children: ReactNode }) => {
  const [zoomUser, setZoomUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.value);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       const { data } = await apiService.get('auth/zoom/verify', { params: { userId: user.id } });
  //       console.log(data);

  //       setZoomUser(data);
  //     } catch (e) {
  //       console.log(e);

  //       setZoomUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   verifyUser();
  // }, []);

  return (
    <ZoomContext.Provider value={{ zoomUser, setZoomUser, loading }}>
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoom = () => useContext(ZoomContext);
