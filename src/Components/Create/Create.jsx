import React, { useState } from "react";
import "./Create.css"
import axios from "axios";
import Loader from "../Loader/Loader";

const Create = () => {
    const baseUrl = import.meta.env.VITE_BASE;
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [labels, setLabels] = useState("");
    const [pinned, setPinned] = useState(false);
    const [load, setLoad] = useState(false);
    const [pop, setPop] = useState(false);

    const HandleChange = (e) => {
        const { value, name } = e.target;
        if (name === "title") {
            setTitle(value);
        }
        if (name === "desc") {
            setDesc(value);
        }
        if (name === "labels") {
            setLabels(value);
        }
    }

    const HandleCheckBox = (e) => {
        setPinned(e.target.checked);
    }

    const AddNote = async (e) => {
        e.preventDefault();
        setLoad(true);
        try {
            const response = await axios.post(`${baseUrl}/create`, {
                "title": title,
                "description": desc,
                "labels": labels,
                "pinned": pinned
            })
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoad(false);
        setPop(true);
        e.target.reset();
    }

    return (
        <>
            <div className="create-main">
                <div className="create-container">
                    <h1>Create  a note</h1>
                    <form className="create" onSubmit={AddNote}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" required autoComplete="off" onChange={HandleChange} />
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" onChange={HandleChange}></textarea>
                        <label htmlFor="labels">Labels</label>
                        <input type="text" name="labels" id="labels" placeholder="Enter comma separated values" onChange={HandleChange} autoComplete="off" />
                        <div className="checkbox">
                            <input type="checkbox" name="pin" id="pin" onChange={HandleCheckBox} />
                            <label htmlFor="pin">Pin this note?</label>
                        </div>
                        <button type="submit">Create Note</button>
                    </form>
                </div>
                {load && (
                    <div className="load">
                        <Loader />
                    </div>
                )}
            </div>
            {pop && (
                <div className="create-overlay" onClick={() => { setPop(false) }}>
                    <div className="create-pop">
                        <h1>Note Created Successfully</h1>
                        <button onClick={() => { setPop(false) }}>Close</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default Create;