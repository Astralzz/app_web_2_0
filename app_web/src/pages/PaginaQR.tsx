import { IonAlert, IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  iniciarScanner,
  detenerScanner,
  cambiarVistaCSS,
  prepararScanner,
} from "../functions/qrCaner";
import agregarDatosFirebase from "../functions/firebase";
import apiObtenerDatosQR, { DatosQR } from "../apis/apiScaneer";
import "../themes/scanner.css";

let fecha_actual: string;
let timestamp: number = Math.floor(Date.now() / 1000);
let isUsandoScanner: boolean = false;

//Pagina de la cámara
const PaginaQR: React.FC = () => {
  // Variables
  const [datoQR, setDatoQR] = useState<DatosQR | null>(null);
  const [estadoAlerta, isEstadoAlerta] = useState<boolean>(false);
  // const [usandoEscaner, isUsandoScaner] = useState<boolean>(false);
  const activarAlerta = () => {
    isEstadoAlerta(true);
    prepararScanner();
  };

  const usarScanner = async () => {
    isEstadoAlerta(false);
    cambiarVistaCSS(true);
    console.log("ÉXITO.................... iniciando scanner .....");
    const dato = await iniciarScanner();
    isUsandoScanner = false;
    if (dato) {
      console.log("EXITO.................... EL valor escaneado es : " + dato);
      obtenerDatosQR(dato);
      return;
    }
    console.log("ERROR.................... No se encontró el valor escaneado");
  };

  const obtenerDatosQR = async (url: string) => {
    const res = await apiObtenerDatosQR(url);

    if (res.estado) {
      setDatoQR(res.datos ?? null);
    }
  };

  console.log("Estado scanner ..... " + isUsandoScanner);

  //Obtenemos fecha
  useEffect(() => {
    timestamp = Math.floor(Date.now() / 1000);
    fecha_actual = new Date(timestamp * 1000).toLocaleDateString("es-ES");
  }, []);

  return (
    <>
      {isUsandoScanner ? (
        <></>
      ) : (
        <div className="container" style={{ backgroundColor: "transparent" }}>
          <br /> <br />
          {/* Boton para usar QR*/}
          {datoQR ? (
            <>
              <h2>Talleres inscritos</h2>

              <IonList>
                {datoQR.talleres.map((taller, i) => {
                  return (
                    <IonItem key={i}>
                      <IonLabel
                        style={{ whiteSpace: "normal", textAlign: "center" }}
                      >
                        {taller.nombreAct}
                      </IonLabel>
                    </IonItem>
                  );
                })}
              </IonList>
            </>
          ) : (
            <>
              <IonButton
                id="present-alert"
                color={"dark"}
                onClick={() => activarAlerta()}
              >
                Abrir QR
              </IonButton>
              <IonButton
                onClick={async () => {
                  // HORA
                  const hora = new Date(timestamp * 1000).toLocaleTimeString(
                    "es-ES",
                    {
                      hour12: false,
                    }
                  );

                  const data = {
                    hora: hora,
                    fecha: fecha_actual,
                    id_par: "1",
                    id_taller: "2",
                    nombre: "desconocido",
                    taller: "taller de programación",
                  };

                  const res = await agregarDatosFirebase(data);

                  if (res) {
                    alert("Éxito en guardar");
                    return;
                  }

                  alert("Error al guardar los datos");
                }}
                color={"success"}
              >
                Agregar datos
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
