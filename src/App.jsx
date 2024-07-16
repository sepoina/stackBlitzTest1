import {useAction} from "./useAction";
import avatarActionClass from "./avatarActionClass";

// Esempio di utilizzo del hook
export default function App() {
  const Avatar = useAction(
    //
    // oggetto con funzioni di manipolazione
    avatarActionClass,
    //
    // stato di inizializzazione
    {
      avatar: null,
      data:null,
      status: "booting",
    }
  );

  const handleLoad = () => {
    if (Avatar.state.status !== "onLoading") {
      Avatar.action.load(parseInt(Math.random() * 15).toString());
    }
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
        Load Avatar
      </button>
    </div>
  );
}
