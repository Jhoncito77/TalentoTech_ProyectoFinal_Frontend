import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from '../../componentes/ContentHeader'
import Footer from '../../componentes/Footer'
import NavBar from '../../componentes/Navbar'
import SidebarContainer from '../../componentes/SidebarContainer'
import APIImvoke from '../../config/APIInvoke'
import swal from "sweetalert";



const MostrarEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const getEmpleados = async () => {
        const response = await APIImvoke.invokeGET('/api/empleados');
        setEmpleados(response.empleados);
    }

    useEffect(() => {
        getEmpleados();
    }, []);

    const eliminarEmpleado = async (e, idEmpleado) => {
        e.preventDefault();
        const response = await APIImvoke.invokeDELETE(`/api/empleados/${idEmpleado}`);

        if (response.msg === 'El empleado a sido eliminado') {
            const msg = "El Empleado fue eliminado correctamente";
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
            getEmpleados();
        } else {

            const msg = "Hay problemas para eliminar a este empleado...";
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
            getEmpleados();
        }
    }
    return (
        <div className="wrapper">
            <NavBar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={'Listado de empleados'}
                    breadCrumb1={'Inicio'}
                    breadCrumb2={'Empleados'}
                    ruta1={'/home'}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={'/empleados/agregar'} className="btn bnt-block btn-primary btn-sm">Agregar Empleado</Link>
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
                                        <th style={{ width: '10%' }}>Nombres Empleado</th>
                                        <th style={{ width: '10%' }}>Apellidos Empleado</th>
                                        <th style={{ width: '10%' }}>Cargo</th>
                                        <th style={{ width: '10%' }}>Cedula</th>
                                        <th style={{ width: '15%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Telefono</th>
                                        <th style={{ width: '15%' }}>Direccion</th>
                                        <th style={{ width: '20%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empleados.map((empleado, index) => (
                                        <tr key={index}>
                                            <td>{empleado.nombres}</td>
                                            <td>{empleado.apellidos}</td>
                                            <td>{empleado.cargo}</td>
                                            <td>{empleado.cedula}</td>
                                            <td>{empleado.correo}</td>
                                            <td>{empleado.telefono}</td>
                                            <td>{empleado.direccion}</td>
                                            <td>
                                                <Link to={`/empleados/editar/${empleado._id}`}
                                                    className="btn btn-warning btn-sm" style={{margin:'5px 5px 5px 5px'}}>Editar</Link>

                                                <button onClick={(e) => eliminarEmpleado(e, empleado._id)}
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

export default MostrarEmpleados;