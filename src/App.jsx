import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import UserInfo from './components/UserInfo';

let newUserr = {
  name: '',
  title: '',
  lastname: '',
  age: '',
  gender: '',
  country: '',
  isDeveloper: false,
}

function App() {

  let [url, setUrl] = useState('http://localhost:8080/Users');
  let [data, setData] = useState(null);
  let [error, setError] = useState(false);
  let [load, setLoad] = useState(false);
  let [editingId, setEditingId] = useState(null);
  let [apiUrl, setApiUrl] = useState('http://localhost:8080/Users');
  let [esc, setEsc] = useState(false);
  let [loadi, setLoadi] = useState(true);


  let [form, setForm] = useState({
    id: 0,
    name: '',
    title: '',
    lastname: '',
    age: '',
    gender: '',
    country: '',
    isDeveloper: false,
  });

  let [info, setInfo] = useState(newUserr);

  useEffect(() => {
    const modalClose = (e) => {
      if (e.key == "Escape") {
        setEsc(false);
      }
    }

    window.addEventListener('keydown', modalClose)

    return () => {
      window.removeEventListener('keydown', modalClose)
    }
  }, [esc])

  const handleForm = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked
        : type === "number" ? +value
          : value
    }));
  };


  const fetchData = useCallback(async () => {
    setError(false);
    setLoad(true);

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(true);
    } finally {
      setLoad(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const objectEmpty = Object.values(form).every(value => {
    if (typeof value === 'string') {
      return value.trim() === '';
    }

    return !value;
  });

  const addUser = async () => {
    setEsc(true);
    setEsc(false)
    if (objectEmpty) return;

    const { name, lastname, age, country, isDeveloper } = form;

    const res = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, lastname, age, country, isDeveloper })
    });
    const user = await res.json();

    setData(prev => [...prev, user]);
    setForm(newUserr);
  }

  const deleteUser = async (id) => {
    await fetch(`${url}/${id}`, { method: "DELETE" });
    setData(prev => prev.filter(user => user.id !== id));
  }

  const updateUser = async (id) => {
    const res = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const updatedUser = await res.json();

    findUser(id);
    setData(prev => prev.map(user => user.id === id ? updatedUser : user));
    setEditingId(null);
    setForm(newUserr);
    setEsc(false);
  };


  const handleChange = (newUrl) => {
    setUrl(newUrl);
  }

  if (load) {
    return <Loader />
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }


  const defineUser = async (id) => {
    if (!id) return;

    const res = await fetch(`${url}/${id}`);
    const data = await res.json();

    setForm({
      id: data.id || 0,
      name: data.name || '',
      title: data.title || '',
      lastname: data.lastname || '',
      age: data.age || '',
      gender: data.gender || '',
      country: data.country || '',
      isDeveloper: Boolean(data.isDeveloper) || false,
    });

    setEditingId(id);
    setEsc(true);
  };

  const findUser = async (id) => {
    if (!id) return;

    const res = await fetch(`${url}/${id}`);
    const data = await res.json();

    setInfo({
      id: data.id || 0,
      name: data.name || 'Azimbek',
      title: data.title || 'Azimbek',
      lastname: data.lastname || 'Alibekov',
      age: data.age || 20,
      gender: data.gender || 'male',
      country: data.country || 'Uzbekistan',
      isDeveloper: Boolean(data.isDeveloper) || true
    });
    console.log(data.isDeveloper);
  };

  info && console.log(info)

  return (
    <>
      {esc && (
        <Modal
          form={form}
          setEsc={() => setEsc(false)}
          handle={handleForm}
          addUser={addUser}
          updateUser={updateUser}
          editingId={editingId}
        />
      )}

      <main>
        <header className="main-header">
          <div className="header-wrapper">
            <div className="change-url">
              <h1>Change Api</h1>
              <div className="change-button">
                <input className='change-input' type="text" placeholder='New Url' value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
                <button onClick={() => handleChange(apiUrl)}><i class="ri-arrow-left-right-line"></i></button>
              </div>
            </div>
            <div className="add-user">
              <h1>Add user:</h1>
              <button onClick={() => setEsc(true)}>Add new User</button>
            </div>
          </div>
        </header>


        <div className="users-list">
          <UserInfo info={info} load={loadi} />

          <div className="users-number">
            <div className="main-ul">
              {
                data && (
                  <ul data-lenis-prevent id="scroll-target" className='ul-list'>
                    <div className="users-num">
                      <h1>Users: {data ? data.length : 0}</h1>
                    </div>
                    {
                      data.map((user, index) => {
                        return (
                          <li onClick={() => { findUser(user.id); setLoadi(false) }} key={user.id || index}>
                            <>
                              {<h1>{user.name ? user.name : user.title}</h1>}
                              <button className='edit-btn' onClick={() => {
                                defineUser(user.id);
                                setEsc(true);
                              }}>Edit<i className="ri-pencil-fill"></i></button>
                              <button className='delete-btn' onClick={() => deleteUser(user.id)}>Delete</button>
                            </>
                          </li>
                        )
                      })
                    }
                  </ul>
                )
              }
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default App
