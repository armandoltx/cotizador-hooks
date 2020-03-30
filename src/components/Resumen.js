import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import { primeraMayuscula } from '../helper';

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838F;
  color: #FFF;
  margin-top: 1rem;
`;
const H2 = styled.h2``;

const Resumen = ({datos}) => {
  // Como no queremos que aparezca hasta que no tengamos los datos, pasamos el ternario aqui, solo que
  // agregamos la cotizacion y los datos al state resumen en app.js
  // solo necesitamos los datos asi que los cogemos del state resumen en app.js haciendo destructuring
  // extraemos de datos:
  const {marca, year, plan} = datos;

  // creamos un return para ensenar el resumen en caso de q tengamos datos:
  if (marca === '' || year === '' || plan === '') return null;

  return (
    <ContenedorResumen>
      <h2>Resumen de Cotizacion</h2>
      <ul>
        <li>Marca: {primeraMayuscula(marca)}</li>
        <li>Año del Vehiculo: {year}</li>
        <li>Plan: {primeraMayuscula(plan)}</li>
      </ul>
    </ContenedorResumen>
  );
};
export default Resumen;