import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore/lite";
// Siga este patrón para importar otros servicios de Firebase
// import {} de 'Firebase/<service>';

export interface RegistrosBD {
  hora: string;
  fecha: string;
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

// * Agregar datos a la tabla
const agregarDatosFirebase = async (data: RegistrosBD): Promise<boolean> => {
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

// Obtener una lista de ciudades de tu base de datos
async function getLista(): Promise<RegistrosBD[]> {
  // const columnas = collection(
  //   REFERENCIA_BD,
  //   "fecha",
  //   "hora",
  //   "id_par",
  //   "id_taller",
  //   "nombre",
  //   "taller"
  // );
  // const data = await getDocs(columnas);
  const data = await getDocs(REFERENCIA_BD);
  console.log(data);

  const lista: RegistrosBD[] = data.docs.map(
    (doc) => doc.data() as RegistrosBD
  );
  return lista;
}

// Obtener los datos
interface Respuesta {
  estado: boolean;
  lista?: RegistrosBD[];
  error?: string;
}

const obtenerListaDeDatosFirebase = async (): Promise<Respuesta> => {
  try {
    // Llamar a la función getCities
    const res = await getLista()
      .then((data) => {
        console.log(data);
        return {
          estado: true,
          lista: data,
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          estado: false,
          error: err,
        };
      });

    return res;
  } catch (err) {
    return {
      estado: false,
      error: "Error..." + err,
    };
  }
};

export { agregarDatosFirebase, obtenerListaDeDatosFirebase };
