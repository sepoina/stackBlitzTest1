import { actionClassPrototype } from "./useActionClass";

// Funzione action specifica per il caricamento dell'avatar
class avatarActionClass extends actionClassPrototype {
  //
  // LOADING --------------------------------------------------------
  // https://reqres.in/
  //
  // State:
  //    esternamente su Avatar.state
  //    internamente su this.state (read and write rimbalzano su uno useState)
  //
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

  changeName(newName) {
    console.log("changeName:", this.state);
    if (this.state?.data?.first_name) {
      alert("ciao");
      this.state = { ...this.state, ...{ data: { first_name: newName } } };
    }
  }
}

export default avatarActionClass;
