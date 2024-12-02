import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firestoreの初期化ファイルをインポート

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [showSplash, setShowSplash] = useState(true); // スプラッシュ画面を管理

  useEffect(() => {
    // スプラッシュ画面を2秒間表示
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'messages'));
        const messagesArray = querySnapshot.docs.map(doc => doc.data());
        setMessages(messagesArray);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  if (showSplash) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>EP-proxy-server</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to the Chat</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.text}</li>
          ))}
        </ul>
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
}
