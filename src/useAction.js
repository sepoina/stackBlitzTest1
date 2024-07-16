import { useRef } from "react";
import useImmediate from "./useImmediate";

//
// Hook simile a useReducer ma consente la realizzazione di funzioni asincrone che
// manipolano lo state
//
function useAction(reducerClass, initialState) {
  //
  // state.value      valore asincrono dello state
  // state.syncValue  valore sempre aggiornato dello state
  // state.update     aggiornamento dello stato con un oggetto o altro
  // state.set        sovrascrittura dello state
  //
  const state = useImmediate(initialState);
  // deposito delle azioni consentite
  const actionRef = useRef(new reducerClass(state));

  return { state: state.value, action: actionRef.current };
}

// classe 
class actionClassPrototype {
  
  // Inizializza lo stato
  constructor(statePointer) {
    this.state = statePointer;
  }
}

export {useAction,actionClassPrototype};
