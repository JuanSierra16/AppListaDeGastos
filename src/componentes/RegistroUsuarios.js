import React, {useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Header, Titulo, ContenedorHeader } from './../elementos/Header'
import Boton from '../elementos/Boton'
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario'
import {ReactComponent as SvgLogin} from './../Imagenes/registro.svg'
import styled from 'styled-components';
import {auth, createUserWithEmailAndPassword} from './../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom/dist';
import Alerta from '../elementos/Alerta';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`

const RegistroUsuarios = () => {

    const navigate = useNavigate();
    const [correo, establecerCorreo] = useState('')
    const [password, establecerPassword] = useState('')
    const [password2, establecerPassword2] = useState('')
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

        if(correo === '' || password === '' || password2 === ''){
            cambiarEstadoAlerta(true)
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellene todos los datos'
            })
            return;
        }

        if(password !== password2){
            cambiarEstadoAlerta(true)
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Las contraseñas no son iguales'
            })
            return;
        }

        try{
            await createUserWithEmailAndPassword(auth, correo, password)
            navigate('/')
        }catch(error){
            cambiarEstadoAlerta(true)

            let mensaje;
            switch(error.code){
                case 'auth/weak-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
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
                    <title>Crear Cuenta</title>
                </Helmet>
            </HelmetProvider>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to='/iniciar-sesion'>Iniciar Sesion</Boton>
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
                <Input 
                    type='password'
                    name='password2'
                    placeholder='Repetir la Contraseña'
                    value={password2}
                    onChange={(e) => establecerPassword2(e.target.value)}
                />
                <ContenedorBoton>
                    <Boton as='button' type='submit' $primario>Crear Cuenta</Boton>
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
 
export default RegistroUsuarios;