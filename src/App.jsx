import { useActionClass } from "./useActionClass";
import avatarActionClass from "./avatarActionClass";

// Esempio di utilizzo del hook
export default function App() {
  //
  // useActionClass torna un oggetto contenente:
  //
  //      state - lo stato
  //   useState - il setting dello stato
  //     action - Elenco dei metodi della classe che ne consente la manipolazione
  //                Metodi e proprietà della classe ereditati da actionClassPrototype:
  //                  |          state - (set e get trasparenti usando this.state)
  //                  |  _refreshState - (forza l'autoreload dello state con un cloning), nessun parametro
  //
  const Avatar = useActionClass(
    avatarActionClass, // classe con funzioni di manipolazione
    {
      // initial state
      status: "booting",
      data: null,
    }
  );

  return (
    <div>
      <p>
        State:
        <pre>{JSON.stringify(Avatar.state, null, 4)}</pre>
      </p>

      {/* ################  SHOW IMAGE? ################################ */}

      {Avatar.state?.data?.avatar && (
        <img src={Avatar.state.data.avatar} alt="avatarImage" />
      )}

      {/* ################  SHOW ERROR? ################################ */}

      {Avatar.state.status === "error" && (
        <div>
          Errore del tipo: <b>{JSON.stringify(Avatar.state.data, null, 4)}</b>
        </div>
      )}
      <br />

      {/* ################  BUTTON LOADING ################################ */}

      <br />
      <button
        onClick={() => {
          if (Avatar.state.status !== "onLoading") {
            Avatar.action.load(parseInt(Math.random() * 15).toString());
          }
        }}
        disabled={Avatar.state.status === "onLoading"}
      >
        Load 1 second Random Avatar or generate Random Error
      </button>

      {/* ################  BUTTON SETTING ################################ */}

      <br />
      <button
        onClick={() => {
          Avatar.setState({
            status: "okData",
            data: {
              id: 7,
              email: "Arianna.Susanetti@reqres.in",
              first_name: "Arianna",
              last_name: "Susanetti",
              avatar: "https://reqres.in/img/faces/7-image.jpg",
            },
          });
        }}
        disabled={Avatar.state.status === "onLoading"}
      >
        Force Arianna Susanetti id:7
      </button>

      {/* ################  BUTTON CHANGE TO PIERPAOLO ################################ */}

      <br />
      {Avatar.state.status === "okData" &&
        Avatar.state?.data?.first_name !== "PierPaolo" && (
          <button onClick={() => Avatar.action.changeName("PierPaolo")}>
            Change Name to PierPaolo
          </button>
        )}
    </div>
  );
}
