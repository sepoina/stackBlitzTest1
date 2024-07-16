import useAction from "./useAction";
import avatarActionFunction from "./avatarActionFunction";
import { useState } from "react";

// Esempio di utilizzo del hook
export default function App() {


  if (true) {
    const theme = useState("ciao");
    console.log(theme);
  }

  const Avatar = useAction(avatarActionFunction, {
    avatar: null,
    status: "booting",
  });

  const handleLoad = () => {
    if (Avatar.state.status !== "onLoading") {
     Avatar.action("load", parseInt(Math.random() * 15).toString());
    }
  };

  return (
    <div>
      <p>Loading state: {Avatar.state.status}</p>
      {Avatar.state.status === "okData" && (
        <>
          <pre>{JSON.stringify(Avatar.state.data, null, 4)}</pre>
          <img src={Avatar.state.data.avatar} />
        </>
      )}
      {Avatar.state.status === "error" && (
        <>
          <div>{JSON.stringify(Avatar.state.data, null, 4)}</div>
        </>
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
