import axios from "axios";

interface Taller {
  idAct: string;
  nombreAct: string;
}

export interface DatosQR {
  idPar: string;
  talleres: Taller[];
}

// ? Respuesta
interface Respuesta {
  estado: boolean;
  datos?: undefined | DatosQR;
  error?: string | undefined;
  detalles?: string | undefined;
}

const apiObtenerDatosQR = async (url: string): Promise<Respuesta> => {
  //Creamos un form
  const formData: FormData = new FormData();
  formData.append("url", url);

  const URL = "https://www.uagroapp.uagro.mx/api/lectorqr";

  try {
    //Enviamos
    const res = axios
      .post(URL, formData)
      //Éxito
      .then(function (ex) {
        console.log("LLEGO => " + ex);
        //Retornamos
        return {
          estado: true,
          datos: ex ? (ex.data ? ex.data : undefined) : undefined,
        };
      })
      //Error
      .catch(function (er) {
        console.error(er);
        if (er.response && er.response.data) {
          return {
            estado: false,
            error: "No se pudo conectar con el servidor",
            detalles: `Error, ${er.response.data.error}`,
          };
        }

        return {
          estado: false,
          error: "No se pudo conectar con el servidor",
        };
      });

    console.log(res);

    //Devolvemos
    return res;

    //Errores críticos
  } catch (error: unknown) {
    //Verificamos
    if (error instanceof Error) {
      console.log(error);

      return {
        estado: false,
        error: "No se pudo conectar con el servidor",
        detalles: `Error, ${error}`,
      };
    }

    return {
      estado: false,
      error: "No se pudo conectar con el servidor",
      detalles: `Error, desconocido`,
    };
  }
};

export default apiObtenerDatosQR;
