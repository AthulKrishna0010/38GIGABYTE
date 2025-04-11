// class CollaborationService {
//     constructor() {
//         this.activeSessions = new Map();
//     }

//     createSession(sessionId, participants = []) {
//         if (this.activeSessions.has(sessionId)) {
//             throw new Error('Session already exists');
//         }

//         const session = {
//             id: sessionId,
//             participants: new Set(participants),
//             documents: [],
//             createdAt: new Date()
//         };

//         this.activeSessions.set(sessionId, session);
//         return session;
//     }

//     joinSession(sessionId, userId) {
//         const session = this.activeSessions.get(sessionId);
//         if (!session) {
//             throw new Error('Session not found');
//         }

//         session.participants.add(userId);
//         return session;
//     }

//     addDocumentToSession(sessionId, document) {
//         const session = this.activeSessions.get(sessionId);
//         if (!session) {
//             throw new Error('Session not found');
//         }

//         session.documents.push({
//             ...document,
//             uploadedAt: new Date()
//         });

//         return session;
//     }

//     getSession(sessionId) {
//         return this.activeSessions.get(sessionId);
//     }

//     endSession(sessionId) {
//         if (!this.activeSessions.has(sessionId)) {
//             throw new Error('Session not found');
//         }

//         const session = this.activeSessions.get(sessionId);
//         this.activeSessions.delete(sessionId);
//         return session;
//     }
// }

// module.exports = new CollaborationService();