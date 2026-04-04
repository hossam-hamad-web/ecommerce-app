import { useState } from "react"
import Style from './Online.module.css'
import useIsOnline from "../../Hooks/useIsOnline"

export default function Online({ children }) {
    let isOnline = useIsOnline();
    if (isOnline == true)
        return children
}