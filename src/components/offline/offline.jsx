import { useState } from "react";
import Style from "./offline.module.css";
import useIsOnline from "../../Hooks/useIsOnline";

export default function Offline({ children }) {
  let isOnline = useIsOnline();
  if (isOnline == false) return children;
}
