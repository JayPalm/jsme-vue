export {};
declare global {
  interface Window {
    NameSpace: any;
  }
}
//  window.jsmeOnLoad= window.jsmeOnLoad|| {};
declare global {
  interface JSME {
    new (id: String, width: String, height: String, options: String): JSME;

    readGenericMolecularInput(smilesString: String): null;
    smiles(): String;
    setCallBack(event: String, callback: Function): null;
  }
  interface JSApplet {}

  interface Window {
    jsmeOnLoad: Function;
    JSApplet: {
      JSME(): (
        id: String,
        width: String,
        height: String,
        options: String
      ) => JSME;
    };
  }
}
