// Firestore-backed leaderboard. The web config is public by design; writes are
// constrained server-side by firestore.rules (create-only, schema-validated).
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, getDocs, query,
  orderBy, limit, serverTimestamp,
} from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyDkbTm4KJCBMr4-p2GZ4DKiwFX-qKlcxyE',
  authDomain: 'political-compass-2026.firebaseapp.com',
  projectId: 'political-compass-2026',
});
const db = getFirestore(app);
const scores = collection(db, 'scores');

export async function saveScore(name, pt, quadrant, subs = null) {
  const doc = await addDoc(scores, {
    name: name.slice(0, 24),
    x: Math.round(pt.x * 100) / 100,
    y: Math.round(pt.y * 100) / 100,
    q: quadrant,
    // econ/social sub-scores let a claimed mark appear on the second plane
    ...(subs ? {
      es: Math.round(subs.econ.x * 100) / 100,
      ss: Math.round(subs.social.x * 100) / 100,
    } : {}),
    ts: serverTimestamp(),
  });
  return doc.id;
}

export async function fetchScores(max = 100) {
  const snap = await getDocs(query(scores, orderBy('ts', 'desc'), limit(max)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
