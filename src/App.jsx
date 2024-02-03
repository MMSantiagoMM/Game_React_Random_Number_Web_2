import React, { useState } from 'react';
import './index.css';


function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [storedNumbers, setStoredNumbers] = useState(Array(5).fill(null));
  const [guessedNumbers, setGuessedNumbers] = useState([]);
  const [gameLost, setGameLost] = useState(false);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);
    setGameLost(false);
  };

  const storeRandomNumber = (index) => {
    if (randomNumber !== null) {
      const newStoredNumbers = [...storedNumbers];
      const newGuessedNumbers = [...guessedNumbers, randomNumber];
      
      if (index > 0 && randomNumber < storedNumbers[index - 1]) {
        setGameLost(true);
        return; 
      }
      
      newStoredNumbers[index] = randomNumber;
      setStoredNumbers(newStoredNumbers);
      setGuessedNumbers(newGuessedNumbers);
    }
  };

  const resetGame = () => {
    setRandomNumber(null);
    setStoredNumbers(Array(5).fill(null));
    setGuessedNumbers([]);
    setGameLost(false);
  };

  const checkGameResult = () => {
    if (guessedNumbers.length === 5) {
      const isSorted = guessedNumbers.every((num, index) => index === 0 || num > guessedNumbers[index - 1]);
      return isSorted ? '¡Felicidades! Has ganado.' : 'Lo siento, has perdido.';
    }
    return '';
  };

  return (
    <div>
      <button onClick={generateRandomNumber}>Generar número aleatorio</button>
      <button onClick={resetGame}>Reiniciar juego</button>
      <br />
      <div>Número aleatorio generado: {randomNumber}</div>
      {gameLost && <div>Lo siento, has perdido.</div>}
      <br />
      <div>
        {storedNumbers.map((value, index) => (
          <button key={index} onClick={() => storeRandomNumber(index)}>
            {value !== null ? value : 'Almacenar en Botón ' + (index + 1)}
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