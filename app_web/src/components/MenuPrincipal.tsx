import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import {
  albumsOutline,
  albumsSharp,
  alertCircleOutline,
  alertCircleSharp,
  cameraOutline,
  cameraSharp,
  cubeOutline,
  cubeSharp,
  listOutline,
  listSharp,
  locateOutline,
  locationSharp,
  logoCapacitor,
  logoGithub,
  logoIonic,
  readerOutline,
  readerSharp,
  searchOutline,
  searchSharp,
  wifiOutline,
  wifiSharp,
} from "ionicons/icons";
import { URL_APP } from "../apis/variables";

// Pagina del menu
interface Pagina {
  url: string;
  iconoIos: string;
  iconoAndroid: string;
  titulo: string;
}

// Lista de paginas
const paginas: Pagina[] = [
  {
    titulo: "Lector QR",
    url: URL_APP + "lector/qr",
    iconoIos: cubeOutline,
    iconoAndroid: cubeSharp,
  },
  {
    titulo: "Lista de datos",
    url: URL_APP + "lista/qr",
    iconoIos: listOutline,
    iconoAndroid: listSharp,
  },
  // {
  //   titulo: "Inputs",
  //   url: URL_APP + "input",
  //   iconoIos: readerOutline,
  //   iconoAndroid: readerSharp,
  // },
  // {
  //   titulo: "Otros componentes",
  //   url: URL_APP + "otros",
  //   iconoIos: albumsOutline,
  //   iconoAndroid: albumsSharp,
  // },
  // {
  //   titulo: "Lista infinita",
  //   url: URL_APP + "lista",
  //   iconoIos: listOutline,
  //   iconoAndroid: listSharp,
  // },
  // {
  //   titulo: "Pagina de error",
  //   url: URL_APP + "error",
  //   iconoIos: alertCircleOutline,
  //   iconoAndroid: alertCircleSharp,
  // },
];

const paginasApi: Pagina[] = [
  // {
  //   titulo: "Cámara",
  //   url: URL_APP + "camara",
  //   iconoIos: cameraOutline,
  //   iconoAndroid: cameraSharp,
  // },
  // {
  //   titulo: "Navegador",
  //   url: URL_APP + "navegador",
  //   iconoIos: searchOutline,
  //   iconoAndroid: searchSharp,
  // },
  // {
  //   titulo: "Ubicación",
  //   url: URL_APP + "ubicacion",
  //   iconoIos: locateOutline,
  //   iconoAndroid: locationSharp,
  // },
  // {
  //   titulo: "Estado de conexión",
  //   url: URL_APP + "conexion",
  //   iconoIos: wifiOutline,
  //   iconoAndroid: wifiSharp,
  // },
  // {
  //   titulo: "Cookies",
  //   url: URL_APP + "cookies",
  //   iconoIos: cubeOutline,
  //   iconoAndroid: cubeSharp,
  // },
];

// Contactos
interface Etiqueta {
  titulo: string;
  icono: string;
  url: string;
}

//Contactos de la pagina
const etiquetas: Etiqueta[] = [
  {
    titulo: "Componentes ionic",
    icono: logoIonic,
    url: "https://ionicframework.com/docs/components",
  },
  {
    titulo: "Apis de capacitor",
    icono: logoCapacitor,
    url: "https://capacitorjs.com/docs/plugins",
  },
  {
    titulo: "Link del proyecto",
    icono: logoGithub,
    url: "https://github.com/Astralzz/app_web_ionic.git",
  },
];

//Menu principal
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>APP WEB</IonListHeader>

          <IonNote>por Edain Jesus CC</IonNote>
          <br />

          {paginas.length > 0 && <IonNote>Componentes</IonNote>}

          {/* Paginas de componentes */}
          {paginas.map((pagina, i) => {
            return (
              <IonMenuToggle key={i} autoHide={false}>
                <IonItem
                  className={location.pathname === pagina.url ? "selected" : ""}
                  routerLink={pagina.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={pagina.iconoIos}
                    md={pagina.iconoAndroid}
                  />
                  <IonLabel>{pagina.titulo}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

          {paginasApi.length > 0 && (
            <>
              <br /> <IonNote>Apis de capacitor</IonNote>
              <br />
            </>
          )}

          <br />
          <br />

          {paginasApi.map((pagina, i) => {
            return (
              <IonMenuToggle key={i} autoHide={false}>
                <IonItem
                  className={location.pathname === pagina.url ? "selected" : ""}
                  routerLink={pagina.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={pagina.iconoIos}
                    md={pagina.iconoAndroid}
                  />
                  <IonLabel>{pagina.titulo}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* lista de enlaces */}
        <IonList id="labels-list">
          <IonNote>enlaces</IonNote>
          {etiquetas.map((etiqueta, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={etiqueta.icono} />
              <a
                target={"_blank"}
                style={{ textDecoration: "none" }}
                href={etiqueta.url}
                rel="noreferrer"
              >
                <IonLabel color={"dark"}>{etiqueta.titulo}</IonLabel>
              </a>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
