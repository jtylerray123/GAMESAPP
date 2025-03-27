import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  onSnapshot,
  limit
} from 'firebase/firestore';
import { db } from '../config';
import { GameSession } from '../../types/gameSession';

// Collection references
const SESSIONS_COLLECTION = 'gameSessions';

// Get a game session by code
export const getGameSessionByCode = async (code: string): Promise<GameSession | null> => {
  const q = query(
    collection(db, SESSIONS_COLLECTION),
    where('code', '==', code),
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  const doc = querySnapshot.docs[0];
  
  if (doc) {
    return { id: doc.id, ...doc.data() } as GameSession;
  }
  return null;
};

// Create a new game session
export const createGameSession = async (session: Omit<GameSession, 'id'>): Promise<string> => {
  // Check if code is already in use
  const existingSession = await getGameSessionByCode(session.code);
  if (existingSession) {
    throw new Error('Game code already in use');
  }

  const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), {
    ...session,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return docRef.id;
};

// Get a game session by ID
export const getGameSession = async (sessionId: string): Promise<GameSession | null> => {
  const docRef = doc(db, SESSIONS_COLLECTION, sessionId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as GameSession;
  }
  return null;
};

// Update a game session
export const updateGameSession = async (sessionId: string, updates: Partial<GameSession>): Promise<void> => {
  const docRef = doc(db, SESSIONS_COLLECTION, sessionId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date()
  });
};

// Delete a game session
export const deleteGameSession = async (sessionId: string): Promise<void> => {
  const docRef = doc(db, SESSIONS_COLLECTION, sessionId);
  await deleteDoc(docRef);
};

// Subscribe to real-time updates for a game session
export const subscribeToGameSession = (
  sessionId: string, 
  onUpdate: (session: GameSession | null) => void
) => {
  const docRef = doc(db, SESSIONS_COLLECTION, sessionId);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      onUpdate({ id: doc.id, ...doc.data() } as GameSession);
    } else {
      onUpdate(null);
    }
  });
};

// Get all active game sessions
export const getActiveGameSessions = async (): Promise<GameSession[]> => {
  const q = query(
    collection(db, SESSIONS_COLLECTION),
    where('status', '==', 'waiting')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as GameSession[];
}; 