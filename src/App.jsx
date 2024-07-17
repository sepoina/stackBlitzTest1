import { useActionClass } from "./useActionClass";
import avatarActionClass from "./avatarActionClass";

// Esempio di utilizzo del hook
export default function App() {
  //
  // useActionClass torna:
  //
  //      state - lo stato
  //   useState - il setting dello stato
  //     action - l'elenco dei metodi della classe che ne consente la manipolazione
  //
  const Avatar = useActionClass(
    avatarActionClass, // classe con funzioni di manipolazione
    {
      // initial state
      status: "booting",
      data: null,
    }
  );

  const handleLoad = () => {
    if (Avatar.state.status !== "onLoading") {
      Avatar.action.load(parseInt(Math.random() * 15).toString());
    }
  };

  const handleOverWrite = () => {
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
  };

  return (
    <div>
      <p>
        Loading state:
        {Avatar.state.status}
      </p>
      {Avatar.state.status === "okData" && (
        <>
          <pre>{JSON.stringify(Avatar.state.data, null, 4)}</pre>
          <img src={Avatar.state.data.avatar} alt="avatarImage" />
        </>
      )}
      {Avatar.state.status === "error" && (
        <div>{JSON.stringify(Avatar.state.data, null, 4)}</div>
      )}
      <br />
      <br />
      <button
        onClick={handleLoad}
        disabled={Avatar.state.status === "onLoading"}
      >
        Load 1 second Random Avatar or generate Random Error
      </button>
      <br />
      <button
        onClick={handleOverWrite}
        disabled={Avatar.state.status === "onLoading"}
      >
        Force Arianna Susanetti id:7
      </button>
      <br />
      {Avatar.state.status === "okData" && (
        <button onClick={() => Avatar.action.changeName("Pierpaolo")}>
          Change Name to pippo
        </button>
      )}
    </div>
  );
}
