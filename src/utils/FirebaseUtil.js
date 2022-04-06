import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
// import { uuid } from 'uuidv4';
const { v4: uuidv4 } = require('uuid')



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig() {

  const firebaseConfig = {
    apiKey: "AIzaSyDE_99-Zs5r1r_YLsLqWqyS3QT_88y33Vg",
    authDomain: "pwa3-53bf8.firebaseapp.com",
    projectId: "pwa3-53bf8",
    storageBucket: "pwa3-53bf8.appspot.com",
    messagingSenderId: "468772987473",
    appId: "1:468772987473:web:03488efe1ddbe5e269ce70",
    measurementId: "G-WVZK0LV35B"
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}

export function firebaseRegistrarUsuario(email, password) {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
      // credenciales.user.
    })
}

export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user
  } catch (e) {
    return false;
  }
  return true;
}

export async function firebaseBuscar(coleccionABuscar) {
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach(documento => {
    let objeto = documento.data();
    objeto.id = documento.id;
    listado.push(objeto);
  });
  return listado;
}

export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuidv4();
  // objeto.id = uuid();

  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}