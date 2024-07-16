import useImmediate from './useImmediate';
import { useCallback } from 'react';
//
// Hook simile a useReducer ma consente la realizzazione di funzioni asincrone che
// manipolano lo state
//
function useAction(reducerFunction, initialState) {
  //
  // state.value      valore asincrono dello state
  // state.syncValue  valore sempre aggiornato dello state
  // state.update     aggiornamento dello stato con un oggetto o altro
  // state.set        sovrascrittura dello state
  //
  const state = useImmediate(initialState);

  const action = useCallback(
    async (...args) => {
      await reducerFunction(state, ...args);
    },
    [reducerFunction]
  );

  return { state: state.value, action };
}

export default useAction;
