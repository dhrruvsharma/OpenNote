import React, { useEffect, useRef, useState } from "react";
import "./Note.css"
import axios from "axios";

const Note = ({ title, date, description, pinned, labels, color, id }) => {

    const GenerateLightColor = () => {
        const r = Math.floor(200 + Math.random() * 55);
        const g = Math.floor(200 + Math.random() * 55);
        const b = Math.floor(200 + Math.random() * 55);
        return `rgb(${r},${g},${b})`;
    }
    const labelList = labels.split(',')
    const randomColor = GenerateLightColor();
    const [c, setColor] = useState(color ? color : randomColor);
    const baseUrl = import.meta.env.VITE_BASE;
    const countRef = useRef(0);

    const HandleColor = (e) => {
        countRef.current = 1;
        setColor(e.target.value);
    }

    const ChangeColor = async () => {
        try {
            const response = await axios.post(`${baseUrl}/color`, {
                id: `${id}`,
                color: `${c}`
            })
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const time = setTimeout(() => {
            if (countRef.current === 1) {
                ChangeColor()
            }
        }, 2000)

        return () => {
            clearTimeout(time);
        }
    }, [c])

    return (
        <div className="card" style={{ backgroundColor: c || "white" }}>
            <div className="title">
                <h1>{title}</h1>
                <hr />
            </div>
            <div className="rest">
                <p>{description}</p>
                <p className="pinned">{pinned && (<span>&#128204;</span>)}</p>
                <div className="labels">
                    {labelList.map((item, index) => (
                        <span className="label" key={index}>{item}&nbsp;</span>
                    ))}
                </div>
                <input type="color" name="color" id="color" onChange={HandleColor} onClick={(e) => { e.stopPropagation() }} />
            </div>
        </div>
    )
}
export default Note;