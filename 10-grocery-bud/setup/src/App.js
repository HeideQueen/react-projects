import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const retrieveListFromStorage = () => {
  const storedList = JSON.parse(localStorage.getItem('list'));
  if (storedList) {
    return storedList;
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(retrieveListFromStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter something');
    } else if (name && isEditing) {
      const newList = list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name };
        }
        return item;
      });

      setList(newList);
      setIsEditing(false);
      setName('');

      showAlert(true, 'success', 'item edited successfully');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    setList([]);
    showAlert(true, 'danger', 'list cleared');
    localStorage.clear();
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, 'danger', 'item removed');
  };

  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(itemToEdit.title);
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs '
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            Clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
