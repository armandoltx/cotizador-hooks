import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838F;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color .3s;


  &:hover {
    background-color: #26C6DA;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {

  // crear el state, puede ser un objeto o por separado con variables
  const [datos, guardarDatos] = useState({
    marca: '',
    year: '',
    plan: ''
  });

  const [error, guardarError] = useState(false);

  // extraer los valores del state usando destructuring
  const { marca, year, plan } = datos;

  // leer los datos del formulario y colocarlos en el state
  const obtenerInformacion = e => {
    guardarDatos({
      ...datos,
      [e.target.name] : e.target.value
    })
  }

  // cuando el usuario presiona submit
  const cotizarSeguro = e => {
    //== prevenir el comportamiento del formulario por default
    e.preventDefault();

    //== validar el formulario, que no este vacio
    if(marca.trim() === '' || year.trim() === '' || plan.trim() === '' ) {
      guardarError(true);
      return;
    }

    guardarError(false);

    // cosas que hacer:
    // 1 el seguro cada ano va a ser mas barato ==> obterner la diferencia de anos
    const diferenciaYear = obtenerDiferenciaYear(year);

    console.log(diferenciaYear);
    // por cada ano hay q restar el 3% hay q tener una base, que sera de 2000 a la que restarle el 3%
    let resultado = 2000;

    resultado -= (( diferenciaYear * 3 ) * resultado ) / 100;
    console.log("diferenciaYear ", resultado);

    // Cada marca va a tener un precio != ==> Americano 15%, Asatico 5% Europeo 30%
    resultado = calcularMarca(marca) * resultado; // lo multiplicamos por resultado pq es un incremento.
    console.log("calcularMarca ", resultado);

    // Cada tipo se seguro va a tener un precio != Basico 20% completo 50%
    const incrementoPlan = obtenerPlan(plan);
    // para que sea bonito:
    resultado = parseFloat( obtenerPlan(plan) * resultado ) .toFixed(2);
    console.log("obtenerPlan ", resultado);

    //== Una vez que tenemos el resultado lo pasamos al componente ppal:
    // ahora agregamos el spinner
    guardarCargando(true);

    setTimeout(() => {

      // quitamos el spinner
      guardarCargando(false);

      // pasamos los datos al componente ppal.
      guardarResumen({
        cotizacion: Number(resultado), // pasamos Number(), pq al agragarle los props noe hemos dado cuenta que pasa el resultado como un string
        datos // datos es un objeto dentro de otro ==> datos: datos || viene del state creado al ppo de la pag.
      });
    }, 2000);
  }

	return (
    <form onSubmit={cotizarSeguro}>
      { error ? <Error>Todos los campos son obligatorios</Error>: null }

      <Campo>
				<Label htmlFor="">Marca</Label>
				<Select
          name="marca"
          value={marca}
          onChange={obtenerInformacion}
        >
					<option value="">-- Seleccione --</option>
					<option value="americano">Americano</option>
					<option value="europeo">Europeo</option>
					<option value="asiatico">Asiatico</option>
				</Select>
      </Campo>

			<Campo>
				<Label htmlFor="">Año</Label>
        <Select
          name="year"
          value={year}
          onChange={obtenerInformacion}
        >
					<option value="">-- Seleccione --</option>
					<option value="2021">2021</option>
					<option value="2020">2020</option>
					<option value="2019">2019</option>
					<option value="2018">2018</option>
					<option value="2017">2017</option>
					<option value="2016">2016</option>
					<option value="2015">2015</option>
					<option value="2014">2014</option>
					<option value="2013">2013</option>
					<option value="2012">2012</option>
				</Select>
			</Campo>

			<Campo>
				<Label htmlFor="">Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        /> Basico

        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        /> Completo
			</Campo>

			<Boton type="submit">Cotizar</Boton>
		</form>
	);
};

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired
}

export default Formulario;