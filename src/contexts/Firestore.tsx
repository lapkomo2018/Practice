import {firestore} from "../firebase.ts";
import {collection, addDoc, setDoc, getDocs, getDoc, doc, onSnapshot, Timestamp, query, where} from 'firebase/firestore'
import {LobbyMessage, User} from "../elements/types.ts";

export function addData(collectionName: string, data: object) {
    return addDoc(collection(firestore, collectionName), data);
}

export async function addLobbyMessage(lobbyId: string, userId: string, content: string) {

    const message: object = {
        lobbyId: lobbyId,
        userId: userId,
        content: content,
        createdAt: Timestamp.now()
    };

    return await addDoc(collection(firestore, 'lobby-messages'), message);
}


export function readTable(collectionName: string) {
    return getDocs(collection(firestore, collectionName));
}

export function readRow(collectionName: string, documentId: any){
    return getDoc(doc(firestore, collectionName, documentId));
}

export function subscribeToRowChanges(collectionName: string, documentId: string, callback: (doc: any) => void) {
    // Получаем ссылку на документ
    const documentRef = doc(firestore, collectionName, documentId);

    // Возвращаем функцию отписки от изменений
    return onSnapshot(documentRef, (doc: any) => callback(doc));
}

export function subscribeToLobbyMessages(lobbyId : string, callback: (message: LobbyMessage) => void) {
    const q = query(collection(firestore, 'lobby-messages'), where('lobbyId', '==', lobbyId));

    // Подписываемся на изменения в запросе
    return onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                // Обработка добавленного сообщения
                const messageData = { id: change.doc.id, ...change.doc.data() };
                callback(messageData as LobbyMessage);
            }
            // Другие типы изменений (изменение, удаление) могут быть также обработаны здесь, если нужно
        });
    });
}

export function subscribeToLobbyUsers(lobbyId: string, callback: (users: User[]) => void) {
    const q = query(collection(firestore, 'users'), where('lobbyId', '==', lobbyId));

    return onSnapshot(q, (snapshot) => {
        const users: User[] = [];
        snapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() } as User);
        });
        callback(users);
    });
}

export async function getUserByUid(uid: string): Promise<User | null> {
    try {
        const docRef = doc(firestore, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
}

export async function createUser(user: any): Promise<void> {
    try {
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, { id: user.uid, name: user.displayName, email: user.email });
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

export async function updateUser(uid: string, newData: Partial<User>): Promise<void> {
    try {
        const userRef = doc(firestore, 'users', uid);
        await setDoc(userRef, { ...newData }, { merge: true });
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

export async function getUsersByLobbyId(lobbyId: string): Promise<User[]> {
    const q = query(collection(firestore, 'users'), where('lobbyId', '==', lobbyId));
    const querySnapshot = await getDocs(q);
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as User);
    });
    return users;
}