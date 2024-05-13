import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import APIInvoke from '../../config/APIInvoke'
import swal from 'sweetalert'

const Login = () => {
    const navigate = useNavigate();

    //definimos el estado inicial de un componente
    const [usuario, setUsuario] = useState({
        correo:'',
        password:''
    });

    const {correo, password} = usuario;
    const onChange = (e)=>{
        setUsuario({
            ...usuario,[e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        document.getElementById('correo').focus();
    },[])

    const iniciarSesion = async ()=>{
        if(password.length <8){
            const msg = "La contraseña debe tener minimo 8 caracteres";
            swal({
                title:'Error',
                text:msg,
                icon:'error',
                buttons:{
                    confirm:{
                        text:"OK",
                        value:true,
                        visible:true,
                        className:'btn btn-danger',
                        closeModal:true
                    }
                }
            });
        }else{
            const data = {
                correo: usuario.correo,
                password: usuario.password
            }
            const response = await APIInvoke.invokePOST('/api/auth',data);
            const mensaje = response.msg;
            if(mensaje === 'El usuario no esta registrado' || mensaje === 'La contraseña es incorrecta'){
                const msg = "No fue posible iniciar sesion, valida los datos de inicio";
                swal({
                    title:'Error',
                    text:msg,
                    icon:'error',
                    buttons:{
                        confirm:{
                            text:"OK",
                            value:true,
                            visible:true,
                            className:'btn btn-danger',
                            closeModal:true
                        }
                    }
                });
            }else{
                //optenemos el token
                const jwt = response.token
                //guardar el token en el local storage
                localStorage.setItem('token',jwt);
                //despues de loguearse redirige a la pagina inicial
                navigate('/home');
            }
        }
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        iniciarSesion();
    }

    return (
        <div className='hold-transition login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"}><b>Iniciar</b> sesion</Link>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">
                            Iniciar Sesion
                        </p>
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id='correo'
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
                                    id='password'
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
                            
                            <div className='social-auth-links text-center mb-3'>
                                <button type='submit' className='btn btn-block btn-primary'>Ingresar</button>
                                <Link to={"/Registro"} className='btn btn-block btn-danger'>Registrarse</Link>
                            </div>

                        </form>
                        
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login