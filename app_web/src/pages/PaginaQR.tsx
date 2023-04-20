import {
  IonAlert,
  IonButton,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  iniciarScanner,
  detenerScanner,
  cambiarVistaCSS,
  prepararScanner,
} from "../functions/qrCaner";
import { agregarDatosFirebase } from "../functions/firebase";
import apiObtenerDatosQR, { DatosQR } from "../apis/apiScaneer";
import "../themes/scanner.css";

let fecha_actual: string;
let isUsandoScanner: boolean = false;

//Pagina de la cámara
const PaginaQR: React.FC = () => {
  // Variables
  const [datoQR, setDatoQR] = useState<DatosQR | null>(null);
  const [estadoAlerta, isEstadoAlerta] = useState<boolean>(false);
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
  // * Activar la Confirmacion
  const activarConfirmacion = () => {
    isEstadoAlerta(true);
    prepararScanner();
  };

  // * Usar el escáner
  const usarScanner = async () => {
    isEstadoAlerta(false);
    cambiarVistaCSS(true);
    console.log("ÉXITO.................... iniciando scanner .....");
    const dato = await iniciarScanner();
    isUsandoScanner = false;
    if (dato) {
      console.log("ÉXITO.................... EL valor escaneado es : " + dato);
      obtenerDatosQR(dato);
      return;
    }

    // ! Alerta
    mostrarAlerta("Error", "No se pudieron obtener los datos del QR");
  };

  // * Obtener datos del escáner
  const obtenerDatosQR = async (url: string) => {
    // ! Buscamos por la proxy
    const res = await apiObtenerDatosQR(url);

    // ! Verificamos
    if (res.estado) {
      setDatoQR(res.datos ?? null);
      return;
    }

    // ! Datos nulos
    setDatoQR(null);

    // ! Alerta
    mostrarAlerta(
      "Error",
      "No se pudieron obtener los datos de la request",
      res.error ?? ""
    );
  };

  // * Agregar datos a firebase
  const agregarDatosAlaBase = async (taller: string, id_taller: string) => {
    // Comprobamos
    if (datoQR) {
      // HORA
      let timestamp: number = Math.floor(Date.now() / 1000);
      const hora = new Date(timestamp * 1000).toLocaleTimeString("es-ES", {
        hour12: false,
      });

      const data = {
        hora: hora,
        fecha: fecha_actual,
        id_par: datoQR?.idPar,
        id_taller: id_taller,
        nombre: "desconocido",
        taller: taller,
      };

      // ? Guardamos
      const res = await agregarDatosFirebase(data);

      if (res) {
        mostrarAlerta("Éxito", "Los datos se guardaron correctamente");
        return;
      }

      mostrarAlerta("Error", "No se pudieron guardar los datos");
      return;
    }
    // ! Alerta
    mostrarAlerta("Error", "Los datos de QR están vacíos");
  };

  //Obtenemos fecha
  useEffect(() => {
    let timestamp: number = Math.floor(Date.now() / 1000);
    fecha_actual = new Date(timestamp * 1000).toLocaleDateString("es-ES");
  }, []);

  return (
    <>
      {isUsandoScanner ? (
        <></>
      ) : (
        <div
          className="container"
          style={{
            backgroundColor: "transparent",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <br /> <br />
          {/* Boton para usar QR*/}
          {datoQR ? (
            <>
              {/* Titulo de talleres escritos */}
              <h2>Talleres inscritos</h2>

              <IonList inset>
                {datoQR.talleres.map((taller, i) => {
                  return (
                    <IonItemGroup key={i}>
                      <IonItemDivider>
                        <IonLabel>{"Grupo " + (i + 1)}</IonLabel>
                      </IonItemDivider>

                      <IonItem>
                        <IonLabel
                          style={{ whiteSpace: "normal", textAlign: "center" }}
                        >
                          {taller.nombreAct}
                        </IonLabel>
                        <IonButton
                          slot="end"
                          color={"success"}
                          expand="full"
                          onClick={() =>
                            agregarDatosAlaBase(taller.nombreAct, taller.idAct)
                          }
                        >
                          Agregar
                        </IonButton>
                      </IonItem>
                    </IonItemGroup>
                  );
                })}
              </IonList>

              {/* Boton para termina */}
              <IonButton
                slot="start"
                color={"danger"}
                expand="block"
                onClick={() => setDatoQR(null)}
              >
                Terminar
              </IonButton>
            </>
          ) : (
            <>
              <IonButton
                id="present-alert"
                color={"dark"}
                onClick={() => activarConfirmacion()}
              >
                Abrir QR
              </IonButton>
            </>
          )}
          {/* Alerta */}
          <IonAlert
            header="Iniciar scanner"
            buttons={[
              {
                text: "No",
                role: "cancel",
                handler: () => {
                  isEstadoAlerta(false);
                  cambiarVistaCSS(false);
                  detenerScanner();
                },
              },
              {
                text: "SI",
                role: "confirm",
                handler: () => {
                  isUsandoScanner = true;
                  usarScanner();
                },
              },
            ]}
            onDidDismiss={() => {
              isEstadoAlerta(false);
              console.log("ÉXITO.................... alerta cerrada .....");
            }}
            isOpen={estadoAlerta}
          ></IonAlert>
        </div>
      )}
    </>
  );
};

export default PaginaQR;
