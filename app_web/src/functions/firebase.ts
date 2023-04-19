import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Primitive,
} from "firebase/firestore/lite";
import { sync } from "ionicons/icons";
// Siga este patrón para importar otros servicios de Firebase
// import {} de 'Firebase/<service>';

export interface BD_Registros {
  hora:string;
  fecha:string;
  id_par: string;
  id_taller: string;
  nombre: string;
  taller: string;
}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// La configuración de Firebase de su aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyBhg0qmS93qbhxvJ2hxC0o5YNOdHtCsji8",
  authDomain: "datos-fe9a7.firebaseapp.com",
  projectId: "datos-fe9a7",
  storageBucket: "datos-fe9a7.appspot.com",
  messagingSenderId: "618624957836",
  appId: "1:618624957836:web:f00cf512abd89dc5f6aaa9",
};

// Inicializar Firebase
const APP_FIREBASE = initializeApp(firebaseConfig);
const DB_FIREBASE = getFirestore(APP_FIREBASE);
const REFERENCIA_BD = collection(DB_FIREBASE, "registros");

const agregarDatosFirebase = async (data: BD_Registros): Promise<boolean> => {
  try {
    const res = await addDoc(REFERENCIA_BD, data);

    if (res) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error, " + error);
    return false;
  }
};

export default agregarDatosFirebase;
