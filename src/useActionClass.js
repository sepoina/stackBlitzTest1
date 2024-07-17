import { useEffect, useRef } from "react";
import useImmediate from "./useImmediate";

//
// Hook simile a useReducer ma consente la realizzazione di funzioni asincrone che
// manipolano lo state
//
function useActionClass(reducerClass, initialState) {
  //
  // state.value      valore asincrono dello state
  // state.syncValue  valore sempre aggiornato dello state
  // state.update     aggiornamento dello stato con un oggetto o altro
  // state.set        sovrascrittura dello state
  //
  const state = useImmediate(initialState);
  // deposito delle azioni consentite
  const actionRef = useRef(new reducerClass(state));
  // in caso di aggiornamenti di state aggiorna lo statepointer
  useEffect(() => {
    console.log("updateStatePointer");
    actionRef.current._updateStatePointer(state);
  }, []);

  return { state: state.value, setState: state.set, action: actionRef.current };
}

// classe
class actionClassPrototype {
  // Inizializza lo stato
  constructor(immediateStatePointer) {
    this.immediateStatePointer = immediateStatePointer;
  }

  _updateStatePointer(newStatePointer) {
    this.immediateStatePointer = newStatePointer;
  }

  get state() {
    return this.immediateStatePointer.syncValue; // sempre il valore più aggiornato
  }

  set state(newValue) {
    console.log("setState", newValue);
    this.immediateStatePointer.set(newValue); // setta lo state dell'oggetto
  }
}

export { useActionClass, actionClassPrototype };
