import * as admin from 'firebase-admin'

admin.initializeApp({
  projectId: 'deckchair-test',
})

export const firestore = admin.firestore()
