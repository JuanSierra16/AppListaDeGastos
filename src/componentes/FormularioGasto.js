import React, {useState, useEffect} from 'react';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elementos/ElementosDeFormulario'
import Boton from '../elementos/Boton';
import { ReactComponent as IconoPlus } from './../Imagenes/plus.svg';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import {useAuth} from './../contextos/AuthContext'
import Alerta from './../elementos/Alerta'
import { useNavigate } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {

    const [inputDescripcion, cambiarInputDescripcion] = useState('')
    const [inputCantidad, cambiarInputCantidad] = useState('')
    const [categoria, cambiarCategoria] = useState('')
    const [fecha, cambiarFecha] = useState(new Date())
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false)
    const [alerta, cambiarAlerta] = useState({})
    const {usuario} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        //Comprobamos si ya hay algun gasto.
        //De ser asi establecemos todo el state con los valores del gasto.
        if(gasto){
            //Comprobamos que el gasto sea del usuario actual.
            //Para eso comprobamos el uid guardado en el gasto con el uid del usuario.
            if(gasto.data().uidUsuario === usuario.uid){
                cambiarCategoria(gasto.data().categoria)
                cambiarFecha(fromUnixTime(gasto.data().fecha))
                cambiarInputDescripcion(gasto.data().descripcion)
                cambiarInputCantidad(gasto.data().cantidad)
            } else {
                navigate('/lista')
            }
        }
    }, [gasto, usuario, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        //Transformamos la cantidad en numero y le pasamos 2 decimales
        let cantidad = parseFloat(inputCantidad).toFixed(2)

        //Comprobamos que haya una descripcion y valor
        if(inputDescripcion !== '' && inputCantidad !== ''){
            if(cantidad){
                if(gasto){
                    editarGasto({
                        id: gasto.id,
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha)
                    }).then(() => {
                        navigate('/lista')
                    }).catch((error) => {
                        console.log('Error editando el gasto en el formulario', error)
                    })
                } else {
                    agregarGasto({
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid
                    })
                    .then(() => {
                        cambiarCategoria('')
                        cambiarInputDescripcion('')
                        cambiarInputCantidad('')
                        cambiarFecha(new Date())
    
                        cambiarEstadoAlerta(true)
                        cambiarAlerta({tipo: 'exito', mensaje: 'El gasto fue agregado correctamente.'})
                    })
                    .catch((error) => {
                        cambiarEstadoAlerta(true)
                        cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar agregar tu gasto.'})
                    })
                }
            } else {
                cambiarEstadoAlerta(true)
                cambiarAlerta({tipo: 'error', mensaje: 'El valor que ingresate no es correcto.'})    
            }

        }else {
            cambiarEstadoAlerta(true)
            cambiarAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los campos.'})
        }

    }

    return ( 
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias 
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                />
                <DatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
            </ContenedorFiltros>

            <div>
                <Input 
                    type='text'
                    name='descripcion'
                    placeholder='Descripción'
                    value={inputDescripcion}
                    onChange={(e) => cambiarInputDescripcion(e.target.value)}
                />
                <InputGrande 
                    type='text'
                    name='valor'
                    placeholder='$0.00'
                    value={inputCantidad}
                    onChange={(e) => cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''))}
                />
            </div>
            <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
                <ContenedorBoton>
                    <Boton as='button' primario conIcono type='submit'>
                        {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
                    </Boton>
                </ContenedorBoton>
            </StyleSheetManager>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
     );
}
 
export default FormularioGasto;