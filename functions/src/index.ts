import * as functions from 'firebase-functions'
import fetch from 'cross-fetch'

export const onPageWrite = functions.firestore
  .document('workspace/{workspaceId}/website/{websiteId}/page/{path}')
  .onWrite(async (change) => {
    const isCreate = change.before.exists === false
    const isUpdate = !isCreate
    const isDelete = change.after.exists === false

    if (isCreate) {
      functions.logger.info('Page created')
    } else if (isDelete || isUpdate) {
      await fetch('http://localhost:3000', {
        method: 'PURGE',
      })
    }

    return
  })
