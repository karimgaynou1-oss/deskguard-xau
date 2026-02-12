import { useState, useEffect } from 'react';
import { createWebSocket } from '../services/api';

export const useWebSocket = () => {
  const [price, setPrice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let ws;
    
    const connect = () => {
      ws = createWebSocket();
      
      ws.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connected');
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setPrice(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };
      
      ws.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket disconnected');
        // Reconnect after 3 seconds
        setTimeout(connect, 3000);
      };
    };
    
    connect();
    
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return { price, isConnected };
};
