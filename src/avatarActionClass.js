import { actionClassPrototype } from "./useActionClass";

// Funzione action specifica per il caricamento dell'avatar
class avatarActionClass extends actionClassPrototype {
  //
  // LOADING --------------------------------------------------------
  // https://reqres.in/
  //
  // State:
  //    esternamente -> Avatar.state
  //    internamente -> this.state (read and write rimbalzano su uno useState)
  //
  // Metodi distribuiti da actionClassPrototype:
  //    _refreshState: updata lo state (eventualmente aggiornato senza setState)
  //
  //


  /** Carica asincrono un user
   *  --------------------------------------------------------------------------- */
  async load(user) {
    this.state = { status: "onLoading" };
    try {
      const response = await fetch(
        `https://reqres.in/api/users/${user}?delay=1`
      );
      const retVal = await response.json();
      if (response.ok) this.state = { status: "okData", data: retVal?.data };
      else throw "not found";
    } catch (error) {
      this.state = { status: "error", data: error };
    }
  }

  
  /** Cambia il nome in caso di presenza di un nome
   *  --------------------------------------------------------------------------- */
  changeName(newName) {
    if (this.state?.data?.first_name) {
      this.state.data.first_name = newName;
      this._refreshState(); // metodo per il refresh in loco
    }
  }
}

export default avatarActionClass;
