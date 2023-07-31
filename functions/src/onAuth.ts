import { firestore } from 'firebase-admin';
import { logger, region } from 'firebase-functions';

export const createUserDocAfterAuth = region('europe-west3')
  .auth.user()
  .onCreate((user) => {
    firestore()
      .collection('users_public')
      .doc(user.uid)
      .create({
        photoURL: user.photoURL,
        displayName: user.displayName,
      })
      .catch((error) => {
        logger.error(
          'Could not create new user doc, this should never happen',
          error
        );
      });
  });
