import React, { useEffect, useState } from 'react';
import { LobbyMessage } from "../elements/types.ts";
import { getUserByUid } from "../contexts/Firestore.tsx";

function ChatComponent({ messages }: { messages: LobbyMessage[] }) {
    const [userNamesCache, setUserNamesCache] = useState<any>({});

    useEffect(() => {
        messages.forEach(message => {
            // Проверяем, есть ли имя пользователя в кэше, и если нет, то делаем запрос к базе данных
            if (!userNamesCache[message.userId]) {
                fetchUserName(message.userId);
            }
        });
    }, [messages, userNamesCache]);

    const fetchUserName = async (userId: string) => {
        try {
            const userName = await getUserByUid(userId);
            setUserNamesCache((prevCache: any) => ({ ...prevCache, [userId]: userName?.name }));
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    return (
        <>
            {messages.map(message => (
                <li key={message.id}>
                    <strong>{userNamesCache[message.userId] || 'Loading...'}</strong>: {message.content}
                </li>
            ))}
        </>
    );
}

export default ChatComponent;
