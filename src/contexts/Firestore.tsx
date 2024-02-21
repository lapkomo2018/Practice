import {firestore} from "../firebase.ts";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
    Timestamp,
    where
} from 'firebase/firestore'
import {Game, Lobby, LobbyMessage, User} from "../elements/types.ts";

export function addData(collectionName: string, data: object) {
    return addDoc(collection(firestore, collectionName), data);
}

export async function delLobby(lobbyId: string){
    return await deleteDoc(doc(firestore, 'lobbies', lobbyId));
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
    const documentRef = doc(firestore, collectionName, documentId);

    return onSnapshot(documentRef, (doc: any) => callback(doc));
}

export function subscribeToLobbyMessages(lobbyId : string, callback: (message: LobbyMessage) => void) {
    const q = query(collection(firestore, 'lobby-messages'), where('lobbyId', '==', lobbyId));

    return onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const messageData = { id: change.doc.id, ...change.doc.data() };
                callback(messageData as LobbyMessage);
            }
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

export function subscribeToGameUsers(gameId: string, callback: (users: User[]) => void) {
    const q = query(collection(firestore, 'users'), where('gameId', '==', gameId));

    return onSnapshot(q, (snapshot) => {
        const users: User[] = [];
        snapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() } as User);
        });
        callback(users);
    });
}

export function subscribeToLobby(lobbyId: string, callback: (lobby: Lobby) => void){
    return onSnapshot(doc(firestore, 'lobbies', lobbyId), (snapshot: any) => {
        const lobby: Lobby = { id: snapshot.id, ...snapshot.data() };
        callback(lobby);
    });
}

export function subscribeToGame(gameId: string, callback: (game: Game) => void){
    return onSnapshot(doc(firestore, 'games', gameId), (snapshot: any) => {
        const game: Game = { id: snapshot.id, ...snapshot.data() };
        callback(game);
    });
}

export function subscribeLobbies(callback: (users: Lobby[]) => void) {

    return onSnapshot(collection(firestore, 'lobbies'), (snapshot) => {
        const lobbies: Lobby[] = [];
        snapshot.forEach((doc) => {
            lobbies.push({ id: doc.id, ...doc.data() } as Lobby);
        });
        callback(lobbies);
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

export async function createGame(game: Game){
    try {
        const gamesRef = collection(firestore, 'games');
        const newGameRef = await addDoc(gamesRef, {...game, createdAt: Timestamp.now()});

        return newGameRef.id;

    } catch (error){
        console.error("Error creating game:", error);
    }
}

export async function updateLobby(id: string, newData: Partial<Lobby>): Promise<void> {
    try {
        const userRef = doc(firestore, 'lobbies', id);
        await setDoc(userRef, { ...newData }, { merge: true });
    } catch (error) {
        console.error("Error updating lobby:", error);
    }
}

export async function updateGame(id: string, newData: Partial<Game>): Promise<void> {
    try {
        const userRef = doc(firestore, 'games', id);
        await setDoc(userRef, { ...newData }, { merge: true });
    } catch (error) {
        console.error("Error updating game:", error);
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
