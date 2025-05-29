import { useEffect, useRef } from 'react';
import './Modal.css'

function Modal({ form, addUser, handle, setEsc }) {

    let modalRef = useRef(null);

    useEffect(() => {
        const modalClose = (e) => {
            if (e.key == "Escape") {
                setEsc();
            }
        }
        modalRef.current.style.backdropFilter = 'blur(5px)';

        window.addEventListener('keydown', modalClose)

        return () => {
            window.removeEventListener('keydown', modalClose)
        }
    }, [setEsc])

    return (
        <div className="modal" ref={modalRef} >
            <form>
                <div className="Modal">
                    <label>
                        <h1>Name:</h1>
                        <input type="text" name="name" placeholder="Name.." value={form.name} onChange={handle} autoComplete='off' required />
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
                        <h1>Gender:</h1>

                        <div className="radio">
                            <div>
                                <label>
                                    <h1>Male</h1>
                                    <input type="radio" name="gender" checked={form.gender === 'male'} value={"male"} onChange={handle} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <h1>Female</h1>
                                    <input type="radio" name="gender" checked={form.gender === 'female'} value={"female"} onChange={handle} />
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
                            <div>
                                <label>
                                    <h1>True</h1>required 
                                    <input type="radio" name="isDeveloper" checked={form.isDeveloper === 'true'} value={"true"} onChange={handle} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <h1>False</h1>
                                    <input type="radio" name="isDeveloper" checked={form.isDeveloper === 'false'} value={"false"} onChange={handle} />
                                </label>
                            </div>
                        </div>
                    </label>
                    <button onClick={addUser}>Add</button>
                </div>
            </form>
        </div>
    );
}

export default Modal;