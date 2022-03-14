import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBook from './components/AddBook';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [])

  const fetchBooks = () => {
    fetch('https://bookstore-800ks-default-rtdb.firebaseio.com/books/.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  // Add keys to the book objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((book, index) =>
    Object.defineProperty(book, 'id', {value: keys[index]}));
    setBooks(valueKeys);
  }

  const addBook = (newBook) => {
    fetch('https://bookstore-800ks-default-rtdb.firebaseio.com/books/.json',
    {
      method: 'POST',
      body: JSON.stringify(newBook)
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err))
  }

  const deleteBook = (id) => {
    fetch(`https://bookstore-800ks-default-rtdb.firebaseio.com/books/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>
      <AddBook  addBook={addBook} />
     <div className="ag-theme-material" style={ {height:400, width: 700, margin: 'auto'} }>
       <AgGridReact rowData={books}>
         <AgGridColumn sortable={true} filter={true} field='title' />
         <AgGridColumn sortable={true} filter={true} field='author' />
         <AgGridColumn sortable={true} filter={true} field='year' />
         <AgGridColumn sortable={true} filter={true} field='isbn' />
         <AgGridColumn sortable={true} filter={true} field='price' />
            <AgGridColumn 
                headerName='' 
                field='id' 
                width={90} 
                cellRendererFramework = { params =>
                  <IconButton onClick={() => deleteBook(params.value)} size="small" color="secondary">
                    <DeleteIcon />
                  </IconButton>
                }
            />
       </AgGridReact>
     </div>
    </div>
  );
}

export default App;
