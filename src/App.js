import React, { useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';

import styled from '@emotion/styled';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #FFF;
  padding: 3rem;
`;

function App() {

  // agregamos useState y creamos este state, para pasar los datos del formulario al componente ppal,
  //para usarlo en otros componentes ==> Resumen y resultado
  const [ resumen, guardarResumen ] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  });

  // extraer datos ( no necesitamos la cotizacion por ahora)
  // para mostrar el resultado necesitamos la cotizacion, asi q tb la extraemos aqui:
  const { cotizacion, datos } = resumen;

  return (
    <Contenedor>
      <Header titulo='Cotizador de Seguros' />

      <ContenedorFormulario>
        <Formulario guardarResumen={guardarResumen}/>
        <Resumen datos ={datos}/>
        <Resultado cotizacion={cotizacion}/>
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
