import { useState } from "react"
import Style from './TemplateName.module.css'

export default function TemplateName() {
    const [counter, setCounter] = useState(0);
    return <>
        <h2>TemplteName</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, expedita repudiandae! Quibusdam sit esse doloremque exercitationem, minima quis sint, dolores nihil neque corrupti, aspernatur ipsa. Tempora explicabo
            quibusdam quam voluptatibus?</p>
    </>
}