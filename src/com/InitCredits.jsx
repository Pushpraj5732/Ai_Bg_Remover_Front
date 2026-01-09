import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

function InitCredits() {
  const { user, isLoaded } = useUser();
const url=import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!isLoaded || !user) return;

    // call backend once after login
    fetch(`${url}/api/credits/create/${user.id}`, {
      method: "POST",
    }).catch((err) => {
      console.error("Init credits failed", err);
    });
  }, [isLoaded, user]);

  return null; // 👈 nothing to render
}

export default InitCredits;
