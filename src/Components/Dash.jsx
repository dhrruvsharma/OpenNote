import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Note from "./Note";
import "./Dash.css"
import Loader from "./Loader/Loader";
import { Link } from "react-router-dom";
import Overlay from "./Overlay/Overlay";

const Dash = () => {

    const [data, setData] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE;
    const [load, setLoad] = useState(false);
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const [selected, setSelected] = useState("");
    const [message, setMessage] = useState("An unexpected error occured");
    const [error, setError] = useState(false);
    const [pinned, setNewPinned] = useState(false);
    const Get = async () => {
        setLoad(true);
        try {
            const response = await axios.get(`${baseUrl}/get`, {
                params: {
                    offset: offset
                }
            })
            setData(response.data.notes)
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoad(false);
        }
    }

    useEffect(() => {
        Get();
    }, [offset])

    const HandleClick = (title, desc, labels, id, pinned,e) => {
        setEdit(true);
        setSelected(id);
        setNewDesc(desc);
        setNewTitle(title);
        setNewLabel(labels);
        setNewPinned(pinned);
        e.stopPropagation();
    }

    const HandleEdit = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setNewTitle(value);
        }
        if (name === "desc") {
            setNewDesc(value);
        }
        if (name === "labels") {
            setNewLabel(value);
        }
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        setEdit(false);
        try {
            const response = await axios.post(`${baseUrl}/edit`, {
                title: newTitle,
                description: newDesc,
                labels: newLabel,
                id: selected,
                pinned: pinned
            })
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoad(false);
            Get();
        }
    }

    return (
        <>
            {load ?
                <div className="load">
                    <Loader />
                </div>
                :
                <div className="main-container">
                    {data?.map((item, index) => {
                        return (
                            <div className="card-container" key={index} onClick={(e) => { HandleClick(item.title, item.description, item.labels, item.id, item.pinned,e) }}>
                                <Note title={item.title} description={item.description} labels={item.labels} date={item.created_at} pinned={item.pinned} color={item.color} id={item.id} setData={setData} setLoad={setLoad} setError={setError} setMessage={setMessage} offset={offset} />
                            </div>
                        )
                    })}
                    {data?.length < 6 && (
                        <br />
                    )}
                    <div className="wrapper">
                        <div className="pagination">
                            {page > 1 && (
                                <button onClick={() => { setOffset(prev => prev - 6); setPage(prev => prev - 1) }}>&lt;</button>
                            )}
                            <div className="numbers">
                                <span className="pactive">{page}</span>
                                {data.length === 6 && <span>{page + 1}</span>}
                            </div>
                            {data.length === 6 && (
                                <button onClick={() => { setOffset(prev => prev + 6); setPage(prev => prev + 1) }}>&gt;</button>
                            )}
                        </div>
                        {data?.length === 0 && (
                            <h1 className="nodata">Nothing to display... <Link to={'/create'}>Add a note?</Link></h1>
                        )}
                    </div>
                </div>
            }
            {edit && (
                <Overlay setDisplay={setEdit}>
                    <form className="edit" onSubmit={HandleSubmit} onClick={(e) => {e.stopPropagation();}}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" autoComplete="off" onChange={HandleEdit} value={newTitle} />
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" value={newDesc} onChange={HandleEdit}></textarea>
                        <label htmlFor="labels">Labels</label>
                        <input type="text" name="labels" id="labels" autoComplete="off" onChange={HandleEdit} value={newLabel} />
                        <div className="checkbox">
                            <input type="checkbox" name="pinned" id="pinned" defaultChecked={pinned} onClick={() => { setNewPinned(!pinned) }} />
                            <label htmlFor="pinned">Pin this note?</label>
                        </div>
                        <div className="buttons">
                            <button type="submit">Edit</button>
                            <button onClick={() => { setEdit(false) }}>Close</button>
                        </div>
                    </form>
                </Overlay>
            )}
            {error && (
                <Overlay>
                    <div className="error">
                        <h1>{message}</h1>
                        <button onClick={(e) => { setError(false); e.stopPropagation(); }}>Close</button>
                    </div>
                </Overlay>
            )}
        </>
    )
}
export default Dash;