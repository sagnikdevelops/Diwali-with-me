const { loadEnvConfig } = require('@next/env');
const { combinedEnv } = loadEnvConfig(process.cwd());
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: combinedEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: combinedEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: combinedEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: combinedEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: combinedEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: combinedEnv.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log('Testing with Next.js environment loader:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  apiKeyPrefix: firebaseConfig.apiKey ? firebaseConfig.apiKey.slice(0, 10) + '...' : 'none'
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    console.log('1. Attempting to write a test diya document to Firestore...');
    const testDoc = doc(db, 'diyas', 'diagnostics-test-1');
    await setDoc(testDoc, {
      name: 'Diagnostic Tester',
      message: 'Testing write connectivity',
      style: 'brass',
      isPublic: true,
      createdAt: Date.now()
    });
    console.log('SUCCESS: Document written successfully to Firestore!');

    console.log('2. Attempting to read documents back...');
    const snapshot = await getDocs(collection(db, 'diyas'));
    console.log('SUCCESS: Read back', snapshot.size, 'documents from Firestore!');
    snapshot.forEach(d => console.log('Doc id:', d.id, 'data:', d.data().name));
    process.exit(0);
  } catch (err) {
    console.error('DIAGNOSTIC FAILURE Code:', err.code);
    console.error('DIAGNOSTIC FAILURE Message:', err.message);
    process.exit(1);
  }
}

test();
