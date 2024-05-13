import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './paginas/auth/Login';
import Registro from './paginas/auth/Registro';
import Home from './Home'
import MostrarClientes from './paginas/modulos/MostrarClientes';
import AgregarClientes from './paginas/modulos/AgregarClientes';
import EditarClientes from './paginas/modulos/EditarClientes';
import MostrarEmpleados from './paginas/modulos/MostrarEmpleados';
import AgregarEmpleado from './paginas/modulos/AgregarEmpleado';
import EditarEmpleado from './paginas/modulos/EditarEmpleado';

function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
            <Route path='/' exact element={<Login/>}></Route>
            <Route path='/Registro' exact element={<Registro/>}></Route>
            <Route path='/home' exact element={<Home/>}></Route>
            <Route path='/clientes' exact element={<MostrarClientes/>}></Route>
            <Route path='/clientes/agregar' exact element={<AgregarClientes/>}></Route>
            <Route path='/clientes/editar/:id' exact element={<EditarClientes/>}></Route>
            <Route path='/empleados' exact element={<MostrarEmpleados/>}></Route>
            <Route path='/empleados/agregar' exact element={<AgregarEmpleado/>}></Route>
            <Route path='/empleados/editar/:id' exact element={<EditarEmpleado/>}></Route>
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
