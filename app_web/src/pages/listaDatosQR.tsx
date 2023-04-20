import React, { useEffect, useState } from "react";
import {
  RegistrosBD,
  obtenerListaDeDatosFirebase,
} from "../functions/firebase";
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  useIonAlert,
} from "@ionic/react";

//Explorador de paginas
const ListaDatosQR: React.FC = () => {
  //Datos
  const [lista, setLista] = useState<RegistrosBD[]>([]);
  const [alerta] = useIonAlert();

  // * Mostrar alerta
  const mostrarAlerta = (
    titulo: string,
    cuerpo: string,
    detalles: string = ""
  ) => {
    alerta({
      header: titulo,
      subHeader: cuerpo,
      message: detalles,
      buttons: ["OK"],
    });
  };

  // * Obtener datos
  const obtenerDatos = async () => {
    // Buscamos
    const res = await obtenerListaDeDatosFirebase();
    console.log(res);

    // Éxito
    if (res.estado) {
      setLista(res.lista ?? []);
      return;
    }

    // Error
    // ! Alerta
    mostrarAlerta(
      "Error",
      "No se pudieron obtener los datos de firebase",
      res.error ?? ""
    );
  };

  useEffect(() => {
    obtenerDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>Lista de participantes</h1>
      <br />
      {lista.map((dato, i) => {
        return (
          <IonCard key={i}>
            <br />
            <IonCardTitle>{dato.fecha}</IonCardTitle>
            <IonCardSubtitle>{dato.hora}</IonCardSubtitle>
            <IonCardContent>
              {dato.taller} <br />
              {"id del taller: " + dato.id_taller} <br />
              {"id del participante: " + dato.id_par}
            </IonCardContent>
          </IonCard>
        );
      })}
    </div>
  );
};

export default ListaDatosQR;
