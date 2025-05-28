import { useCallback, useState, useEffect } from 'react'
import './App.css'
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

function App() {

  let [url, setUrl] = useState('http://localhost:8080/Users');
  let [data, setData] = useState(null);
  let [error, setError] = useState(false);
  let [load, setLoad] = useState(false);
  let [editTitle, setEditTitle] = useState('');
  let [editingId, setEditingId] = useState(null);
  let [apiUrl, setApiUrl] = useState('http://localhost:8080/Users');
  let [esc, setEsc] = useState(false);

  let [form, setForm] = useState({
    name: '',
    lastname: '',
    age: '',
    gender: '',
    country: '',
    isDeveloper: false,
  });

  let newUserr = {
    name: '',
    lastname: '',
    age: '',
    gender: '',
    country: '',
    isDeveloper: false,
  }

  const handleForm = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "number" ? + value : value
    }))
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

    const res = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, lastname: form.lastname, age: form.age, country: form.country, isDeveloper: form.isDeveloper })
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
      body: JSON.stringify({ name: editTitle })
    });
    const update = await res.json();
    setData(prev => prev.map(user => user.id === id ? update : user));

    setEditTitle('');
    setEditingId(null);
  }

  const handleChange = (newUrl) => {
    setUrl(newUrl);
  }

  if (load) {
    return <Loader />
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }


  return (
    <>
      {esc && <Modal form={form} setEsc={() => setEsc(false)} addUser={addUser} handle={handleForm} />}

      <div className="container">


        <div className="main-header">
          <div className="change-url">
            <h1>Change Api:</h1>
            <input className='change-input' type="text" placeholder='New Url' value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
            <button onClick={() => handleChange(apiUrl)}>Change</button>
          </div>
          <div className="add-user">
            <h1>Add user:</h1>
            <button onClick={() => setEsc(true)}>Add new User</button>
          </div>
        </div>

        <div className="users-list">
          <h1>Users: {data ? data.length : 0}</h1>

          <div className="main-ul">
            {
              data && (
                <ul className='ul-list'>
                  {
                    data.map(user => {
                      return (
                        <li key={user.id}>
                          {editingId === user.id ? (
                            <>
                              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                              <button onClick={() => updateUser(user.id)}>Save</button>
                              <button onClick={() => setEditingId(null)}>Cancel</button>
                            </>) : (
                            <>
                              {user.name ? user.name : user.title}
                              <button className='edit-btn' onClick={() => {
                                setEditingId(user.id);
                                setEditTitle(user.title);
                              }}>Edit</button>
                              <button className='delete-btn' onClick={() => deleteUser(user.id)}>Delete</button>
                            </>
                          )}
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

    </>
  )
}

export default App
