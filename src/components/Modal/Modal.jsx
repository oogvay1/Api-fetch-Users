import { useEffect, useRef, useState } from 'react';
import './Modal.css'

function Modal({ form, addUser, updateUser, handle, setEsc, editingId, setForm, newForm }) {

    let modalRef = useRef(null);
    let genderRef = useRef([]);
    let developRef = useRef([]);

    useEffect(() => {
        const modalClose = (e) => {
            if (e.key == "Escape") {
                setEsc();
                setForm(newForm);
            }
        }
        modalRef.current.style.backdropFilter = 'blur(5px)';

        window.addEventListener('keydown', modalClose)

        return () => {
            window.removeEventListener('keydown', modalClose)
        }
    }, [setEsc]);

    const changeColor = (index, color) => {
        genderRef.current.forEach((el, i) => {
            if (el) {
                el.style.background = i === index ? color : '#080808';
                el.addEventListener('mouseenter', () => {
                    el.style.background = i !== index ? '#000' : '#202020';
                });
                el.addEventListener('mouseleave', () => {
                    el.style.background = i === index ? color : '#080808';
                })
            }
        });

    };

    const changeColor2 = (index, color) => {
        developRef.current.forEach((ele, e) => {
            if (ele) {
                ele.style.background = e === index ? color : '#080808';
                ele.addEventListener('mouseenter', () => {
                    ele.style.background = e !== index ? '#000' : '#202020';
                });
                ele.addEventListener('mouseleave', () => {
                    ele.style.background = e === index ? color : '#080808';
                })
            }
        });
    }

    const setColor = (index, color) => {
        developRef.current.forEach((el, i) => {
            if (el) {
                el.style.background = i == index && color;
            }
        })
    }

    useEffect(() => {
        if (form.isDeveloper == true) {
            setColor(1, '#141414');
            setColor(0, '#000');
        } else if (form.isDeveloper == false && form.name.length > 0) {
            setColor(0, '#141414');
            setColor(1, '#000');
        } else {
            setColor(0, '#141414');
            setColor(1, '#141414');
        }
    }, [editingId])

    return (
        <div className="modal" ref={modalRef} >
            <form onSubmit={(e) => { e.preventDefault(); editingId ? updateUser(editingId) : addUser(); }}>
                <div className="Modal">
                    <label>
                        <h1>Name:</h1>
                        <input type="text" name="name" placeholder="Name.." value={form.name || form.title} onChange={handle} autoComplete='off' required />
                    </label>
                    <label>
                        <h1>Lastname:</h1>
                        <input type="text" name="lastname" placeholder="Lastname" value={form.lastname} onChange={handle} autoComplete='off' required />
                    </label>
                    <label>
                        <h1>Age:</h1>
                        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handle} autoComplete='off' required />
                    </label>
                    <div className="gender">
                        <h1 className='gender-h1'>Gender:</h1>

                        <div className="radio">
                            <div ref={(el) => genderRef.current[0] = el} onClick={() => changeColor(1, '#141414')}>
                                <label>
                                    <h1 className='checkbox'>Male</h1>
                                    <input type="radio" name="gender" checked={form.gender === 'male'} value={"male"} onChange={handle} />
                                </label>
                            </div>
                            <div ref={(el) => genderRef.current[1] = el} onClick={() => changeColor(0, '#141414')}>
                                <label>
                                    <h1 className='checkbox'>Female</h1>
                                    <input className='genderr' type="radio" name="gender" checked={form.gender === 'female'} value={"female"} onChange={handle} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <label>
                        <h1>Country:</h1>
                        <input type="text" name="country" placeholder="Country" value={form.country} onChange={handle} autoComplete='off' required />
                    </label>
                    <label>
                        <h1>Is Developer:</h1>
                        <div className="radio">
                            <div ref={(el) => developRef.current[0] = el} onClick={() => changeColor2(1, '#141414')}>
                                <label>
                                    <h1 className='checkbox'>True</h1>
                                    <input className='develop' type="checkbox" name="isDeveloper" checked={form.isDeveloper === true} value={true} onChange={() => handle} />
                                </label>
                            </div>
                            <div ref={(el) => developRef.current[1] = el} onClick={() => changeColor2(0, '#141414')}>
                                <label>
                                    <h1 className='checkbox'>False</h1>
                                    <input className='develop' type="checkbox" name="isDeveloper" checked={form.isDeveloper === false} value={false} onChange={() => handle} />
                                </label>
                            </div>
                        </div>
                    </label>
                    <button type="submit">{editingId ? "Update User" : "Add User"}</button>
                </div>
            </form>
        </div>
    );
}

export default Modal;