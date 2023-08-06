import React, {useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Header, Titulo, ContenedorHeader } from './../elementos/Header'
import Boton from '../elementos/Boton'
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario'
import {ReactComponent as SvgLogin} from './../Imagenes/login.svg'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom/dist';
import Alerta from '../elementos/Alerta';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { auth } from './../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 200px */
    margin-bottom: 1.25rem; /* 20px */
`

const InicioSesion = () => {

    const navigate = useNavigate();
    const [correo, establecerCorreo] = useState('')
    const [password, establecerPassword] = useState('')
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false)
    const [alerta, cambiarAlerta] = useState({})

    const handleSubmit = async(e) => {
        e.preventDefault()
        cambiarEstadoAlerta(false)
        cambiarAlerta({})

        //Comprobamos del lado del cliente que el correo sea valido.
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
        if(!expresionRegular.test(correo)){
            cambiarEstadoAlerta(true)
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor ingresa un correo electrónico válido.'
            })
            return;
        }

        if(correo === '' || password === ''){
            cambiarEstadoAlerta(true)
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellene todos los datos'
            })
            return;
        }

        try{
            await signInWithEmailAndPassword(auth, correo, password)
            navigate('/')
        }catch(error){
            cambiarEstadoAlerta(true)
            let mensaje;
            switch(error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No se encontro ninguna cuenta con este correo electronico.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje})
        }  
    }

    return ( 
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Iniciar Sesión</title>
                </Helmet>
            </HelmetProvider>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to='/crear-cuenta'>Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input 
                    type='email'
                    name='email'
                    placeholder='Correo Electrónico'
                    value={correo}
                    onChange={(e) => establecerCorreo(e.target.value)}
                />
                <Input 
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => establecerPassword(e.target.value)}
                />
                <ContenedorBoton>
                    <Boton as='button' type='submit' $primario>Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>

            <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
                <Alerta 
                    tipo={alerta.tipo}
                    mensaje={alerta.mensaje}
                    estadoAlerta={estadoAlerta}
                    cambiarEstadoAlerta={cambiarEstadoAlerta}  
                />
            </StyleSheetManager>
        </>
    );
}
 
export default InicioSesion;