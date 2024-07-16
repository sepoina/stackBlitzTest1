import { useState, useRef } from 'react';

//
// state.value      valore asincrono dello state
// state.syncValue  valore sempre aggiornato dello state
// state.update     aggiornamento dello stato con un oggetto o altro
// state.set        sovrascrittura dello state
//
// const state = useImmediate(initialState);

/**
 * Hook personalizzato per gestire lo stato con accesso immediato al valore più recente.
 *
 * @param {any} defaultValue - Il valore iniziale dello stato.
 * @returns {Object} Un oggetto contenente lo stato e i metodi per manipolarlo.
 * @property {any} value - Il valore corrente dello stato.
 * @property {any} syncValue - Il valore più recente dello stato, sempre aggiornato.
 * @property {Function} update - Un metodo per aggiornare lo stato. Se lo stato corrente è un oggetto, unisce i nuovi valori allo stato. Se lo stato corrente è un valore primitivo, sovrascrive lo stato con i nuovi valori.
 * @property {Function} set - Un metodo per impostare lo stato su un nuovo valore, sovrascrivendo completamente lo stato corrente.
 *
 * @example
 * // Esempio di utilizzo con un oggetto
 * const state = useImmediate({ name: 'John', age: 30 });
 * state.update({ age: 31 }); // Aggiorna l'età
 * state.set({ name: 'Jane', age: 25 }); // Sovrascrive completamente lo stato
 *
 * @example
 * // Esempio di utilizzo con un valore primitivo
 * const state = useImmediate('initial');
 * state.update('updated'); // Sovrascrive il valore iniziale
 * state.set('new value'); // Sovrascrive completamente il valore
 */
function useImmediate(defaultValue) {
  const [state, setState] = useState(defaultValue);
  const syncValueRef = useRef(state);

  // Aggiorna il ref ogni volta che lo stato cambia
  syncValueRef.current = state;

  // Setta lo state (prevede un oggetto nuovo in ingresso)
  const set = (newState) => {
    setState(newState);
    syncValueRef.current = newState; // Aggiorna il ref con il nuovo stato
  };

  // Aggiorna lo state (prevede un oggetto nuovo in ingresso)
  const update = (newValues) => {
    if (typeof state === 'object' && state !== null) {
      if (typeof newValues === 'object' && newValues !== null) {
        set({ ...syncValueRef.current, ...newValues }); // merge oggetti
      } else {
        set(newValues); // il nuovo non è oggetto, sovrascrivi
      }
    } else {
      set(newValues); // il vecchio non è oggetto, sovrascrivi
    }
  };

  return {
    value: state,
    syncValue: syncValueRef.current,
    update,
    set,
  };
}

export default useImmediate;
