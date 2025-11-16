'use client';
import { Provider } from 'react-redux';
import { useEffect, useRef } from 'react';
import { makeStore } from './store';
import { initLanguage } from './features/languageSlice';

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Component mount olduqda localStorage-dən dili oxuyuruq
    storeRef.current.dispatch(initLanguage());
    
    // Hydration tamamlandı - səhifəni göstər
    document.body.classList.add('hydrated');
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}