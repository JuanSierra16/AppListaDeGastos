import React from 'react';
import {ReactComponent as IconoCerarSesion} from './../Imagenes/log-out.svg'
import Boton from './../elementos/Boton';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import {auth} from './../firebase/firebaseConfig';
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

const BotonCerrarSesion = () => {

    const navigate = useNavigate()

    const cerrarSesion = async() => {
        try {
            await signOut(auth)
            navigate('/iniciar-sesion')
        }catch(error){
            console.log('Error al cerrar la sesion', error)
        }
    }

    return ( 
        <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>     
            <Boton iconoGrande as='button' onClick={cerrarSesion}>
                <IconoCerarSesion />
            </Boton>
        </StyleSheetManager>
    );
}
 
export default BotonCerrarSesion;