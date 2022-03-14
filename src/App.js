import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
    .then(data => setBooks(Object.values(data)))
    .catch(err => console.error(err))
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

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            Booksore
          </Typography>
        </Toolbar>
      </AppBar>
      <AddBook  addBook={addBook} />
     <div className="ag-theme-material" style={ {height:400, width: 600, margin: 'auto'} }>
       <AgGridReact rowData={books}>
         <AgGridColumn sortable={true} filter={true} field='title' />
         <AgGridColumn sortable={true} filter={true} field='author' />
         <AgGridColumn sortable={true} filter={true} field='year' />
         <AgGridColumn sortable={true} filter={true} field='isbn' />
         <AgGridColumn sortable={true} filter={true} field='price' />
       </AgGridReact>
     </div>
    </div>
  );
}

export default App;
