import React, { useState } from 'react';
import './style.css';

const GeolocationAPIComponent = () => {
  const [coordinate, setCoordinate] = useState('');
  const [name, setName] = useState('');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation API não tem suporte para o seu navegador.');
    }
  };

  const showPosition = (position) => {
    setCoordinate('Carregando localização...');

    setTimeout(() => {
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setCoordinate(
        `Latitude: ${locationData.latitude}\nLongitude: ${locationData.longitude}`
      );

      const jsonLocationData = JSON.stringify(locationData);
      console.log('Location Data:', jsonLocationData);
    }, 2000);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const displayInput = () => {
    const nameData = {
      name: name,
    };

    const jsonNameData = JSON.stringify(nameData);
    console.log('Name Data:', jsonNameData);
  };

  return (
    <div>
      <h2>JavaScript Geolocation API</h2>
      <p>Clique no botão para mostrar suas coordenadas e seu nome.</p>

      <input
        type="text"
        placeholder="Preencha seu nome"
        value={name}
        onChange={handleNameChange}
      />

      <button
        onClick={() => {
          displayInput();
          getLocation();
        }}
      >
        Mostrar informações
      </button>

      <p>Nome: {name}</p>

      <p>{coordinate}</p>
    </div>
  );
};

export default GeolocationAPIComponent;
