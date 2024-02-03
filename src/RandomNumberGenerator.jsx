import React, { useState } from 'react';

function RandomNumberGenerator() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  // Función para generar un número aleatorio del 1 al 100
  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
  };

  // Función para manejar el clic en los botones de almacenamiento
  const handleNumberSelection = (number) => {
    if (selectedNumbers.includes(number)) return; // Verifica si el número ya está seleccionado
    const updatedSelectedNumbers = [...selectedNumbers, number];
    setSelectedNumbers(updatedSelectedNumbers);
  };

  // Renderiza los botones de almacenamiento
  const renderNumberButtons = () => {
    const buttons = [];
    const uniqueNumbers = Array.from({ length: 5 }, () => {
      let number;
      do {
        number = Math.floor(Math.random() * 100) + 1;
      } while (selectedNumbers.includes(number));
      return number;
    });
    for (let i = 0; i < 5; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleNumberSelection(uniqueNumbers[i])}
          disabled={selectedNumbers.includes(uniqueNumbers[i]) || !randomNumber}
        >
          {selectedNumbers.includes(uniqueNumbers[i]) ? uniqueNumbers[i] : `Almacenar ${uniqueNumbers[i]}`}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <h1>Generador de Números Aleatorios</h1>
      <button onClick={generateRandomNumber}>Generar Número Aleatorio</button>
      <p>{randomNumber ? `Número Aleatorio: ${randomNumber}` : 'Presiona el botón para generar un número aleatorio'}</p>
      <div>
        {renderNumberButtons()}
      </div>
    </div>
  );
}

export default RandomNumberGenerator;