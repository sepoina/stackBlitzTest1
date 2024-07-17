import { useEffect, useRef, useState } from "react";

//
// Hook simile a useReducer ma consente la realizzazione di funzioni asincrone che
// manipolano lo state
//
function useActionClass(actionClassDefinition, initialState) {
  //
  // contenitore dello state
  const statePointer = useState(initialState);
  //
  // deposito delle azioni consentite
  const actionClassRef = useRef(new actionClassDefinition());
  //
  // ogni aggiornamento allo state aggiorna lo statepointer della classe
  useEffect(
    () => actionClassRef.current._updateStatePointer(statePointer),
    [statePointer]
  );

  return {
    state: statePointer[0],
    setState: statePointer[1],
    action: actionClassRef.current,
  };
}

//
// prototipo della classe (da estendere)
//
class actionClassPrototype {
  // aggiorna il pointer allo state
  _updateStatePointer(newStatePointer) {
    this.immediateStatePointer = newStatePointer;
  }

  get state() {
    return this.immediateStatePointer[0]; // leggi lo state
  }

  set state(newValue) {
    this.immediateStatePointer[1](newValue); // setta lo state dell'oggetto
  }

  // se non nullo ed oggetto refreshalo copiandolo su di sè
  _refreshState() {
    if (
      this.immediateStatePointer[0] &&
      typeof this.immediateStatePointer[0] === "object"
    )
      this.immediateStatePointer[1]({ ...this.immediateStatePointer[0] }); // copia lo state su di sè per refreshare
  }
}

export { useActionClass, actionClassPrototype };
