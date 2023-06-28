import { Participant } from '../firebase-send-models/participant';
import { FirebaseService } from '../service/firebase.service';

export function getParticipantsWithoutCurrentUser(
  participants: Participant[],
  firebaseService: FirebaseService
): Participant {
  return participants.filter(
    (participant) => participant.uid !== firebaseService.auth.currentUser?.uid
  )[0];
}
