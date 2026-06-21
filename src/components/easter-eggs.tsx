"use client";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import React, { useEffect } from "react";
import NyanCat from "./nyan-cat";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console !== "undefined") {
      console.clear();
      console.log(
        "%cWhoa, look at you! 🕵️‍♂️\n" +
          "You seem to have discovered the secret console! 🔍\n" +
          "Want to see some magic? ✨\n" +
          "Just type %cmy first name%c and hit enter! 🎩🤖",
        "color: #3776ab; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #3776ab; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
      );

      ["dhruvaryan", "Dhruvaryan", "DHRUVARYAN"].forEach((name) => {
        // @ts-ignore
        if (Object.hasOwn(window, name)) return;
        Object.defineProperty(window, name, {
          get() {
            console.log(
              "%c🤖 Neural Network Activated! 🤖\n\n" +
                "You just summoned the intelligence of Dhruvaryan! 🧠⚡\n" +
                "Not impressed? Fine — but the model's already learning from you. 📊🚀",

              "color: #3776ab; font-size: 18px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:10px"
            );

            const timer = setTimeout(() => {
              console.log(
                "%cPssttt! 🤫\n\n" +
                  "Do you like cats?? 😺 If yes, then press 'n' on viewport and see what happens! 🐱✨",
                "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
              );
              clearTimeout(timer);
            }, 7000);
            return "";
          },
        });
      });
    }
  }, [isDevToolsOpen]);

  return (
    <>
      <NyanCat />
    </>
  );
};

export default EasterEggs;
