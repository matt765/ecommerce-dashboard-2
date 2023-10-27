import React, { useEffect, useRef } from "react";

import { SignUpForm } from "./SignUpForm";
import { useHandleSignUp } from "../../hooks/useHandleSignUp";

interface SignUpModalProps {
  closeModal: () => void;
  switchToSignIn: () => void;
}

export const SignUpModal = ({
  closeModal,
  switchToSignIn,
}: SignUpModalProps) => {
  const { handleSignUp } = useHandleSignUp();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        return;
      }
      closeModal();
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0 backdrop-blur-md"></div>
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 ">
        <div
          ref={modalRef}
          className="w-screen h-screen sm:w-[29rem] sm:h-auto  bg-primaryBg dark:bg-primaryBgDark shadow-xl px-[6vw] xsm:px-[18vw] sm:px-12 py-20 flex flex-col items-center justify-start pt-24 sm:pt-16 rounded-2xl relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-6 text-xl"
          >
            X
          </button>
          <h1 className="text-4xl font-bold mb-8 mt-0">Sign Up</h1>
          <SignUpForm
            handleSignUp={handleSignUp}
            switchToSignIn={switchToSignIn}
          />
        </div>
      </div>
    </>
  );
};
