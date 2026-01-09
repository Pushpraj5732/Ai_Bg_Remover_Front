import React from "react";
import {
  useClerk,
  useUser,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import Credits from "./Credits";
import BuyCredits from "./BuyCredits"; // ✅ IMPORT ADDED
import arr from "../assets/arrow_icon.svg";
import logo from "../assets/favicon.svg";
import InitCredits from "./InitCredits";
const Header = () => {
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-200">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold">AI PDF Assistant</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <button
            onClick={() => openSignIn()}
            className="bg-blue-500 text-white px-5 py-2 rounded-full flex items-center hover:bg-blue-600 transition"
          >
            Get Started
            <img src={arr} alt="arrow" className="w-5 h-5 ml-2" />
          </button>
        </SignedOut>

        <SignedIn>
          {isLoaded && user && (
            <>

              <InitCredits />
              <Credits clerkUserId={user.id} />
              <BuyCredits />
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
