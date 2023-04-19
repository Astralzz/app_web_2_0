import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

const detenerScanner = () => {
  try {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  } catch (error) {
    console.log("Error -> " + error);
  }
};

const prepararScanner = () => {
  try {
    BarcodeScanner.prepare();
  } catch (error) {
    console.log("Error -> " + error);
  }
};

const iniciarScanner = async (): Promise<string | null> => {
  try {
    // Pedimos permiso
    // const status = await BarcodeScanner.checkPermission({ force: true });

    // if (status.granted) {
    // Iniciamos
    BarcodeScanner.hideBackground();

    console.log("scanner en ejecución ...... = ");

    // vemos resultado
    const result = await BarcodeScanner.startScan();

    // verificar resultado
    if (result.hasContent) {
      console.log("Éxito ...... = ");
      console.log(result.content);
      return result.content;
    }
    return null;
    // }
    // console.log("No se encontraron los permisos");
    // return null;
  } catch (error) {
    console.log("Error -> " + error);
    return null;
  } finally {
    cambiarVistaCSS(false);
  }
};

const cambiarVistaCSS = (tipo: boolean) => {
  try {
    // Verificamos css
    const body = document.querySelector("body")?.classList;

    // Si existe
    if (body) {
      // Arriba
      if (tipo) {
        body.add("scanner-active");
        console.log("scanner -> ARRIBA");

        return;
      }
      //Ponemos abajo el scanner
      console.log("scanner -> ABAJO");
      body.remove("scanner-active");
    }
  } catch (error) {
    console.log("Error -> " + error);
  }
};

export { iniciarScanner, prepararScanner, detenerScanner, cambiarVistaCSS };
