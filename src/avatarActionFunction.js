// Funzione action specifica per il caricamento dell'avatar
const avatarActionFunction = async (state, type, ...params) => {
  //
  // LOADING --------------------------------------------------------
  // https://reqres.in/
  //
  //                  servito su Avatar.state.status
  //
  // state.value      valore asincrono dello state
  // state.syncValue  valore sempre aggiornato dello state
  //                  "onBooting" - al boot, settato in inizializzazione
  //                  "onLoading" - caricamento in corso
  //                  "error"     - il caricamento non è andato a buon fine
  //                  "okData"    - dati disponibili
  // state.update     aggiornamento dello stato con un oggetto o altro
  // state.set        sovrascrittura dello state
  //
  if (type === 'load') {
    const [user] = params;
    state.set({ status: 'onLoading' });
    try {
      const response = await fetch(
        `https://reqres.in/api/users/${user}?delay=1`
      );
      const retVal = await response.json();
      if (response.ok) state.set({ status: 'okData', data: retVal?.data });
      else throw 'not found';
    } catch (error) {
      state.set({ status: 'error', data: error });
    }
  }
};

export default avatarActionFunction;
