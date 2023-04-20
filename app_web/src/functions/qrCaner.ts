import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

const scan = BarcodeScanner;

const detenerScanner = () => {
  try {
    scan.showBackground();
    scan.stopScan();
    console.log("ÉXITO.................... escáner detenido .....");
  } catch (error) {
    console.log("Error -> " + error);
  }
};

const prepararScanner = () => {
  try {
    // scan.prepare();
    console.log("ÉXITO.................... escáner preparado .....");
  } catch (error) {
    console.log("ERROR.................... escáner NO preparado .....");
    console.log("Error -> " + error);
  }
};

const iniciarScanner = async (): Promise<string | null> => {
  try {
    // Pedimos permiso
    // const status = await scan.checkPermission({ force: true });

    // if (status.granted) {
    console.log("EXITO.................... EL escáner SI tiene permisos");

    // Iniciamos
    scan.hideBackground();

    console.log(
      "EXITO.................... Iniciado BarcodeScanner.hideBackground()"
    );

    // vemos resultado
    const result = await scan.startScan();
    console.log("ÉXITO.................... escáner terminado .....");

    // verificar resultado
    if (result.hasContent) {
      console.log(result.content);
      console.log(
        "ÉXITO.................... EL valor escaneado es --- > " +
          result.content
      );
      return result.content;
    }
    console.log("ERROR.................... NO se obtuvo el valor del Scanner");
    return null;
    // }
    // console.log("ERROR.................... EL escáner NO tiene permisos");

    // return null;
  } catch (error) {
    console.log("Error -> " + error);
    return null;
  } finally {
    // detenerScanner();
    cambiarVistaCSS(false);
  }
};

const cambiarVistaCSS = (tipo: boolean) => {
  try {
    // Elementos a los que se agregará o eliminará la clase "scanner-active"
    const elementos = [
      document.querySelector("body"),
      document.querySelector("ion-app"),
      document.querySelector("ion-page"),
      document.querySelector("ion-content"),
      document.querySelector("ion-menu"),
      document.querySelector("ion-menu-button"),
      document.querySelector("ion-header"),
      document.querySelector("ion-toolbar"),
      document.querySelector("ion-list"),
    ];

    // Iterar sobre la matriz y agregar o eliminar la clase según el valor del parámetro "tipo"
    elementos.forEach((elemento) => {
      const clases = elemento?.classList;
      if (clases) {
        if (tipo) {
          clases.add("scanner-active");
        } else {
          clases.remove("scanner-active");
        }
        console.log(`${elemento.tagName} classList:`, clases); // Registro para verificar si se eliminó la clase del elemento
      }
    });

    console.log(
      `EXITO.................... EL escáner se puso ${
        tipo ? "ARRIBA" : "ABAJO"
      }`
    );
  } catch (error) {
    console.log("Error -> " + error);
  }
};

export { iniciarScanner, prepararScanner, detenerScanner, cambiarVistaCSS };
