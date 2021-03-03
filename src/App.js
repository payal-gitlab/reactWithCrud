import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { getapi } from './Redux/Actions/table';
import FormComponent  from './Container/FormCompoent';
import TableComponent  from './Container/TableComponent';
function App() {
  store.dispatch(getapi());
  //const [passdata , setdata] = useState();
  
  return (
    <Provider store={store} >
      <FormComponent />
      <TableComponent />
    </Provider>    
  );
}

export default App;
