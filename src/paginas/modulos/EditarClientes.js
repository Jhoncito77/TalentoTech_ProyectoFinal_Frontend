import React, { useState, useEffect } from 'react'
import ContentHeader from '../../componentes/ContentHeader'
import Footer from '../../componentes/Footer'
import NavBar from '../../componentes/Navbar'
import SidebarContainer from '../../componentes/SidebarContainer'
import APIImvoke from '../../config/APIInvoke'
import swal from "sweetalert";
import { useNavigate, useParams } from 'react-router-dom'


const EditarClientes = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const actualizarCliente = async (e) => {
        
        const response = await APIImvoke.invokePUT(`/api/clientes/${id}`, {
            nombres: nombres,
            apellidos: apellidos,
            cedula: cedula,
            correo: correo,
            telefono: telefono,
            direccion: direccion
        });

        if(response){
            const msg = "Cliente actualizado correctamente."
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
            navigate('/clientes');
        }else{
            const msg = "No fue posible actualizar el cliente."
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
            });
        }
    }

    useEffect(() => {
        getClientesId();
        // eslint-disable-next-line
    },[]);

    const getClientesId = async () => {
        const clientes = await APIImvoke.invokeGET(`/api/clientes/${id}`);
        setNombres(clientes.nombres);
        setApellidos(clientes.apellidos);
        setCedula(clientes.cedula);
        setCorreo(clientes.correo);
        setTelefono(clientes.telefono);
        setDireccion(clientes.direccion);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        actualizarCliente();
    }

    return (
        <div className='wrapper'>
            <NavBar />
            <SidebarContainer />
            <div className='content-wrapper'>
                <ContentHeader
                    titulo={'Editar clientes'}
                    breadCrumb1={'Inicio'}
                    breadCrumb2={'Clientes'}
                    ruta1={'/clientes/editar'}
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
                                            onChange={(e) => setNombres(e.target.value)}
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
                                            onChange={(e) => setApellidos(e.target.value)}
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
                                            onChange={(e) => setCedula(e.target.value)}
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
                                            onChange={(e) => setCorreo(e.target.value)}
                                            required />
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fa fa-mobile'></span>
                                            </div>
                                            <label htmlFor='telefono' style={{ marginLeft: '5px' }}>Telefono</label>
                                        </div>
                                        <input type='number'
                                            className='form-control'
                                            id='telefono'
                                            name='telefono'
                                            placeholder='Ingrese el numero de telefono'
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            required />
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fa fa-map-marker'></span>
                                            </div>
                                            <label htmlFor='direccion' style={{ marginLeft: '5px' }}>Direccion</label>
                                        </div>
                                        <input type='text'
                                            className='form-control'
                                            id='direccion'
                                            name='direccion'
                                            placeholder='Ingrese la direccion del cliente'
                                            value={direccion}
                                            onChange={(e) => setDireccion(e.target.value)}
                                            required />
                                    </div>
                                </div>

                                <div className='card-footer'>
                                    <button type='submit' className='btn btn-primary'>Guardar cambios</button>
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

export default EditarClientes