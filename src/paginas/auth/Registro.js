import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import APIInvoke from '../../config/APIInvoke'
import swal from 'sweetalert'

const Registro = () => {
  
    //definimos el estado inicial de un componente
    const [usuario, setUsuario] = useState({
        nombres: '',
        correo: '',
        password: '',
        confirpassword: ''
    });

    const { nombres, correo, password, confirpassword } = usuario;
    const onChange = (e) => {
        setUsuario({
            ...usuario, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById('nombres').focus();
    }, [])

    const registroCuenta = async () => {
        if (password !== confirpassword) {
            const msg = "Las contraseñas ingresadas son diferentes";
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
        } else if (password.length < 8) {
            const msg = "La contraseña debe tener minimo 8 caracteres";
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
        } else {
            const data = {
                nombres: usuario.nombres,
                correo: usuario.correo,
                password: usuario.password
            }
            const response = await APIInvoke.invokePOST('/api/usuarios', data);
            const mensaje = response.msg;
            if (mensaje === 'El usuario ya existe') {
                const msg = "El correo ingresado ya esta registrado";
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
            } else {
                const msg = "Usuario creado correctamente";
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

                setUsuario({
                    nombres: '',
                    correo: '',
                    password: '',
                    confirpassword: ''
                })
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        registroCuenta();
    }
    return (
        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="register-logo">
                    <Link to={'#'}><b>App </b>Proyecto Talento Tech</Link>
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">
                            Registro de usuario nuevo
                        </p>
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    id="nombres"
                                    name='nombres'
                                    value={nombres}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id="correo"
                                    name='correo'
                                    value={correo}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    id="password"
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirmar password"
                                    id="confirpassword"
                                    name='confirpassword'
                                    value={confirpassword}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className='social-auth-links text-center mb-3'>
                                <button type='submit' className='btn btn-block btn-success'>Crear cuenta</button>
                                <Link to={"/"} className='btn btn-block btn-primary'>Regresar al login</Link>
                            </div>

                        </form>

                    </div>
                </div >
            </div >

        </div >
    )
}

export default Registro