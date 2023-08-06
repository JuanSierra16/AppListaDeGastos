import React from 'react';
import {ReactComponent as IconoComida} from './../Imagenes/cat_comida.svg';
import {ReactComponent as IconoCompras} from './../Imagenes/cat_compras.svg';
import {ReactComponent as IconoCuentasYPagos} from './../Imagenes/cat_cuentas-y-pagos.svg';
import {ReactComponent as IconoDiversion} from './../Imagenes/cat_diversion.svg';
import {ReactComponent as IconoHogar} from './../Imagenes/cat_hogar.svg';
import {ReactComponent as IconoRopa} from './../Imagenes/cat_ropa.svg';
import {ReactComponent as IconoSaludEHigiene} from './../Imagenes/cat_salud-e-higiene.svg';
import {ReactComponent as IconoTransporte} from './../Imagenes/cat_transporte.svg';

const IconoCategoria = ({id}) => {
    switch(id){
        case 'comida':
            return <IconoComida />
        case 'compras':
            return <IconoCompras />
        case 'cuentas y pagos':
            return <IconoCuentasYPagos />
        case 'diversion':
            return <IconoDiversion />
        case 'hogar':
            return <IconoHogar />
        case 'ropa':
            return <IconoRopa />
        case 'salud e higiene':
            return <IconoSaludEHigiene />
        case 'transporte':
            return <IconoTransporte />
        default:
            break;
    }
}
 
export default IconoCategoria;