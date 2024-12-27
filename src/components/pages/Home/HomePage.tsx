'use client';

import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

import { Button } from '@/components/ui/button';

export default function SessionPage() {
  const [stompClient, setStompClient] = useState<Client | undefined>(undefined);

  // Establishing connection
  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
    });
    client.activate();
    client.onConnect = () => {
      setStompClient(client);
      client.subscribe('/topic/quiz-sessions/000001/status', (message) => {
        const statusMessage = JSON.parse(message.body);
        console.log(statusMessage);
      });
    };
  }, []);

  const sendMessage = () => {
    stompClient?.publish({
      destination: '/app/hello',
      body: JSON.stringify({ name: 'Harry' }),
    });
    stompClient?.deactivate();
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button onClick={sendMessage}>Test</Button>
    </div>
  );
}
