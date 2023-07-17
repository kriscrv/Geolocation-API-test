import React, { useState, useEffect } from 'react';
import './style.css';

const GeolocationAPIComponent = () => {
  const [coordinate, setCoordinate] = useState('');
  const [name, setName] = useState('');
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition,
          handlePositionError
        );
      } else {
        console.log('Geolocation API não tem suporte para o seu navegador.');
      }
    };

    getLocation();
  }, []);

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

  const handlePositionError = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      setPermissionDenied(true);
    }
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

    setShowCoordinates(true);
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

      <button onClick={displayInput}>Mostrar informações</button>

      {permissionDenied ? (
        <p>Permita o acesso a localização para acessar o sistema</p>
      ) : (
        <div>
          <p>Nome: {name}</p>
          {showCoordinates && <p>{coordinate}</p>}
        </div>
      )}
    </div>
  );
};

export default GeolocationAPIComponent;
