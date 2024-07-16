import { actionClassPrototype } from "./useAction";

// Funzione action specifica per il caricamento dell'avatar
class avatarActionClass extends actionClassPrototype{
  
  //
  // LOADING --------------------------------------------------------
  // https://reqres.in/
  //
  // esempio lo status
  //
  // esternamente su Avatar.state.status
  // internamente su this.state.value.status
  //
  // this.state.value      valore asincrono dello state
  // this.state.syncValue  valore sempre aggiornato dello state
  //                          "onBooting" - al boot, settato in inizializzazione
  //                          "onLoading" - caricamento in corso
  //                          "error"     - il caricamento non è andato a buon fine
  //                          "okData"    - dati disponibili
  // this.state.update     aggiornamento dello stato con un oggetto o altro
  // this.state.set        sovrascrittura dello state
  //
  async load(user) {
    this.state.set({ status: "onLoading" });
    try {
      const response = await fetch(
        `https://reqres.in/api/users/${user}?delay=1`
      );
      const retVal = await response.json();
      if (response.ok) this.state.set({ status: "okData", data: retVal?.data });
      else throw "not found";
    } catch (error) {
      this.state.set({ status: "error", data: error });
    }
  }
}

export default avatarActionClass;
