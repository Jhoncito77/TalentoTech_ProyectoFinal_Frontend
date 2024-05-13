import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from '../../componentes/ContentHeader'
import Footer from '../../componentes/Footer'
import NavBar from '../../componentes/Navbar'
import SidebarContainer from '../../componentes/SidebarContainer'
import APIImvoke from '../../config/APIInvoke'
import swal from "sweetalert";



const MostrarClientes = () => {
    const [clientes, setClientes] = useState([]);
    const getClientes = async () => {
        const response = await APIImvoke.invokeGET('/api/clientes');
        setClientes(response.clientes);
    }

    useEffect(() => {
        getClientes();
    }, []);

    const eliminarCliente = async (e, idCliente) => {
        e.preventDefault();
        const response = await APIImvoke.invokeDELETE(`/api/clientes/${idCliente}`);

        if (response.msg === 'El cliente a sido eliminado') {
            const msg = "El cliente fue eliminado correctamente";
            swal({
                title: 'Info',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            getClientes();
        } else {

            const msg = "Hay problemas para eliminar a este cliente...";
            swal({
                title: 'Error',
                text: msg,
                icon: 'Error',
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            }); 
            getClientes();
        }
    }
    return (
        <div className="wrapper">
            <NavBar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={'Listado de clientes'}
                    breadCrumb1={'Inicio'}
                    breadCrumb2={'Clientes'}
                    ruta1={'/home'}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={'/clientes/agregar'} className="btn bnt-block btn-primary btn-sm">Agregar Cliente</Link>
                            </h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget='collapse'
                                    title="Collapse"><i className="fas fa-times" /></button>
                                <button type="button" className="btn btn-tool" data-card-widget='remove'
                                    title="Remove"><i className="fas fa-items" /></button>
                            </div>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Nombres Cliente</th>
                                        <th style={{ width: '15%' }}>Apellidos Cliente</th>
                                        <th style={{ width: '10%' }}>Cedula</th>
                                        <th style={{ width: '15%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Telefono</th>
                                        <th style={{ width: '15%' }}>Direccion</th>
                                        <th style={{ width: '20%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cliente, index) => (
                                        <tr key={index}>
                                            <td>{cliente.nombres}</td>
                                            <td>{cliente.apellidos}</td>
                                            <td>{cliente.cedula}</td>
                                            <td>{cliente.correo}</td>
                                            <td>{cliente.telefono}</td>
                                            <td>{cliente.direccion}</td>
                                            <td>
                                                <Link to={`/clientes/editar/${cliente._id}`}
                                                    className="btn btn-warning btn-sm" style={{margin:'5px 5px 5px 5px'}}>Editar</Link>

                                                <button onClick={(e) => eliminarCliente(e, cliente._id)}
                                                    className="btn btn-danger btn-sm" style={{margin:'5px 5px 5px 5px'}}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )

}

export default MostrarClientes