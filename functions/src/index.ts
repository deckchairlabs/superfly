import * as functions from 'firebase-functions'

export const onPageWrite = functions.firestore
  .document('pages/{path}')
  .onWrite(async (change) => {
    return
  })
