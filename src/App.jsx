import React, { useState } from 'react';
import './index.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [storedNumbers, setStoredNumbers] = useState(Array(5).fill(null));
  const [gameLost, setGameLost] = useState(false);
  const [isNumberGenerated, setIsNumberGenerated] = useState(false); // Nuevo estado para rastrear si se ha generado un número

  const generateRandomNumber = () => {
    if (!isNumberGenerated) { // Verificar si el número ya se ha generado
      const newRandomNumber = Math.floor(Math.random() * 1000);
      setRandomNumber(newRandomNumber);
      setGameLost(false);
      setIsNumberGenerated(true); // Establecer isNumberGenerated a true
    }
  };

  const storeRandomNumber = (index) => {
    if (randomNumber !== null && isNumberGenerated) { // Verificar si el número ya se ha generado
      const newStoredNumbers = [...storedNumbers];

      if (index > 0 && randomNumber < storedNumbers[index - 1]) {
        setGameLost(true);
        return;
      }

      newStoredNumbers[index] = randomNumber;
      setStoredNumbers(newStoredNumbers);
      setIsNumberGenerated(false); // Restablecer isNumberGenerated a false
    }
  };

  const resetGame = () => {
    setRandomNumber(null);
    setStoredNumbers(Array(5).fill(null));
    setGameLost(false);
    setIsNumberGenerated(false); // Restablecer isNumberGenerated a false
  };

  const checkGameResult = () => {
    if (storedNumbers.every((num, index) => index === 0 || num > storedNumbers[index - 1])) {
      return '¡Felicidades! Has ganado.';
    } else if (storedNumbers.every((num, index) => index === 0 || num < storedNumbers[index - 1])) {
      setGameLost(true);
      return 'Lo siento, has perdido.';
    }
    return '';
  };

  return (
    <div>
      <button onClick={generateRandomNumber}>Generar número aleatorio</button>
      <button onClick={resetGame}>Reiniciar juego</button>
      <br />
      <div className='textRandom'>Número aleatorio generado: {randomNumber}</div>
      {gameLost && <div className='lostGame'>Lo siento, has perdido.</div>}
      <br />
      <div>
        {storedNumbers.map((value, index) => (
          <button key={index} onClick={() => storeRandomNumber(index)}>
            {value !== null ? value : 'Posición número ' + (index + 1)}
          </button>
        ))}
      </div>
      <div>
        {checkGameResult()}
      </div>
    </div>
  );
}

export default App;