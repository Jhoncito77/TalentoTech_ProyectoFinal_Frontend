import React, { useState, useEffect } from 'react'
import ContentHeader from '../../componentes/ContentHeader'
import Footer from '../../componentes/Footer'
import NavBar from '../../componentes/Navbar'
import SidebarContainer from '../../componentes/SidebarContainer'
import APIImvoke from '../../config/APIInvoke'
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom'

const AgregarClientes = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState({
        nombres: '',
        apellidos: '',
        cedula: '',
        correo: '',
        telefono: '',
        direccion: ''

    });

    const { nombres, apellidos, cedula, correo, telefono, direccion } = clientes;

    useEffect(() => {
        document.getElementById("nombres").focus()
    }, []);

    const onChange = (e) => {
        setClientes({
            ...clientes, [e.target.name]: e.target.value
        })
    }

    const crearCliente = async () => {
        const data = {
            nombres: clientes.nombres,
            apellidos: clientes.apellidos,
            cedula: clientes.cedula,
            correo: clientes.correo,
            telefono: clientes.telefono,
            direccion: clientes.direccion
        }

        const response = await APIImvoke.invokePOST('/api/clientes', data);
        const id = response._id;
       
        if (id === "") {

            const msg = 'Error al agregar el cliente'
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            })
        } else {

            navigate('/clientes');
            const msg = 'El cliente se agrego correctamente'
            swal({
                title: 'Info',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: 'btn btn-success',
                        closeModal: true
                    }
                }
            });
            setClientes({
                nombres: '',
                apellidos: '',
                cedula: '',
                correo: '',
                telefono: '',
                direccion: ''
            })
        }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        crearCliente();
    }


    return (
        <div className='wrapper'>
            <NavBar />
            <SidebarContainer />
            <div className='content-wrapper'>
                <ContentHeader
                    titulo={'Agregar un cliente'}
                    breadCrumb1={'Inicio'}
                    breadCrumb2={'Clientes'}
                    ruta1={'/clientes/agregar'}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget='collapse'
                                    title="Collapse"><i className="fas fa-times" /></button>
                                <button type="button" className="btn btn-tool" data-card-widget='remove'
                                    title="Remove"><i className="fas fa-items" /></button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className='card-body'>
                                    <div className='form-group'>
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-user'></span>
                                            </div>
                                            <label htmlFor='nombres' style={{ marginLeft: '5px' }}>Nombres</label>
                                        </div>
                                        <input type='text'
                                            className='form-control'
                                            id='nombres'
                                            name='nombres'
                                            placeholder='Ingrese los nombres'
                                            value={nombres}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>


                                <div className='card-body'>
                                    <div className='form-group'>
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-user'></span>
                                            </div>
                                            <label htmlFor='apellidos' style={{ marginLeft: '5px' }}>Apellidos</label>
                                        </div>
                                        <input type='text'
                                            className='form-control'
                                            id='apellidos'
                                            name='apellidos'
                                            placeholder='Ingrese los apellidos'
                                            value={apellidos}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-id-card'></span>
                                            </div>
                                            <label htmlFor='cedula' style={{ marginLeft: '5px' }}>Documento</label>
                                        </div>
                                        <input type='number'
                                            className='form-control'
                                            id='cedula'
                                            name='cedula'
                                            placeholder='Ingrese el numero de identificacion'
                                            value={cedula}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-envelope'></span>
                                            </div>
                                            <label htmlFor='correo' style={{ marginLeft: '5px' }}>Correo electronico</label>
                                        </div>
                                        <input type='email'
                                            className='form-control'
                                            id='correo'
                                            name='correo'
                                            placeholder='Ingrese el correo electronico'
                                            value={correo}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                <div className='input-group-append'>
                                    <div className='input-group-text'>
                                        <span className='fa fa-mobile'></span>
                                    </div>
                                        <label htmlFor='telefono' style={{marginLeft:'5px'}}>Telefono</label>
                                </div>
                                        <input type='number'
                                            className='form-control'
                                            id='telefono'
                                            name='telefono'
                                            placeholder='Ingrese el numero de telefono'
                                            value={telefono}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                <div className='input-group-append'>
                                    <div className='input-group-text'>
                                        <span className='fa fa-map-marker'></span>
                                    </div>
                                        <label htmlFor='direccion' style={{marginLeft:'5px'}}>Direccion</label>
                                </div>
                                        <input type='text'
                                            className='form-control'
                                            id='direccion'
                                            name='direccion'
                                            placeholder='Ingrese la direccion del cliente'
                                            value={direccion}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>

                                <div className='card-footer'>
                                    <button type='submit' className='btn btn-primary'>Guardar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default AgregarClientes