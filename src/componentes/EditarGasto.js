import React from 'react';
import { Header, Titulo } from '../elementos/Header';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto'
import { useParams } from 'react-router-dom';
import useObtenerGasto from '../hooks/useObtenerGasto';

const EditarGasto = () => {

    const {id} = useParams()
    const [gasto] = useObtenerGasto(id)

    return ( 
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Editar Gasto</title>
                </Helmet>
            </HelmetProvider>

            <Header>
                <BtnRegresar ruta='/lista' />
                <Titulo>Editar Gasto</Titulo>
            </Header>

            <FormularioGasto gasto={gasto} />

            <BarraTotalGastado />
        </>
     );
}
 
export default EditarGasto;