import React, { useState } from 'react';

const NumberStoringComponent = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [storedNumbers, setStoredNumbers] = useState([]);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);
  };

  const storeNumber = (index) => {
    const updatedStoredNumbers = [...storedNumbers];
    updatedStoredNumbers[index] = randomNumber;
    setStoredNumbers(updatedStoredNumbers);
    setRandomNumber(null);
  };

  return (
    <div>
      <h2>Almacenamiento de números aleatorios</h2>
      <button onClick={generateRandomNumber}>Generar número aleatorio</button>
      <p>Número aleatorio generado: {randomNumber}</p>
      <div>
        {Array.from({ length: 5 }, (_, index) => (
          <RandomNumberButton
            key={index}
            number={storedNumbers[index]}
            onClick={() => storeNumber(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NumberStoringComponent;