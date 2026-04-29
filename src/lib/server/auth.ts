export interface User {
	id: string;
	username: string;
	name: string;
	role: 'admin' | 'user';
}

type UserWithPassword = User & { password: string };

// Dummy users — replace with real DB later
const DUMMY_USERS: UserWithPassword[] = [
	{ id: '1', username: 'admin', password: 'password123', name: 'Administrator', role: 'admin' },
	{ id: '2', username: 'user', password: 'user123', name: 'John Doe', role: 'user' }
];

// In-memory session store — resets on server restart
const sessions = new Map<string, string>(); // sessionId → userId

export function validateCredentials(username: string, password: string): User | null {
	const found = DUMMY_USERS.find((u) => u.username === username && u.password === password);
	if (!found) return null;
	const { password: _p, ...user } = found;
	return user;
}

export function createSession(userId: string): string {
	const sessionId = crypto.randomUUID();
	sessions.set(sessionId, userId);
	return sessionId;
}

export function getUser(sessionId: string): User | null {
	const userId = sessions.get(sessionId);
	if (!userId) return null;
	const found = DUMMY_USERS.find((u) => u.id === userId);
	if (!found) return null;
	const { password: _p, ...user } = found;
	return user;
}

export function deleteSession(sessionId: string): void {
	sessions.delete(sessionId);
}
