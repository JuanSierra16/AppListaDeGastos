import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Puntos} from './../Imagenes/puntos.svg' /* Para importar svgs */

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`

const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`

const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`

const Fondo = () => {
    return ( 
        <>
            <PuntosArriba />
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
                <path 
                    fillOpacity="1" 
                    d="M0,64L18.5,74.7C36.9,85,74,107,111,112C147.7,117,185,107,222,133.3C258.5,160,295,224,332,256C369.2,288,406,288,443,266.7C480,245,517,203,554,154.7C590.8,107,628,53,665,64C701.5,75,738,149,775,170.7C812.3,192,849,160,886,160C923.1,160,960,192,997,192C1033.8,192,1071,160,1108,170.7C1144.6,181,1182,235,1218,240C1255.4,245,1292,203,1329,165.3C1366.2,128,1403,96,1422,80L1440,64L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z">
                </path>
            </Svg>
            <PuntosAbajo />
        </>
     );
}
 
export default Fondo;