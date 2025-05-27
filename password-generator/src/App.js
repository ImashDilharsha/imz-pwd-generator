import React, { useState } from 'react';
import './App.css';
import { generatePassword as generatePasswordService } from './passwordService';

function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const handleGeneratePassword = () => {
    const newPassword = generatePasswordService(
      Number(passwordLength),
      includeUppercase,
      includeNumbers,
      includeSpecialChars
    );
    setPassword(newPassword);
  };

  return (
    <div className="App"> {/* Outer container for global styles like body background and centering */}
      <div className="generator-container"> {/* Main card for the generator */}
        <header className="App-header"> {/* Keeping App-header for title and general structure within the card */}
          <h1>Password Generator</h1>
          <div className="password-display-container">
            <input type="text" value={password} readOnly placeholder="Your new password" />
          </div>
          <div className="settings">
            <div>
              <label htmlFor="passwordLength">Password Length:</label>
          <input
            type="number"
            id="passwordLength"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            min="1" // Adjusted min to 1 as generatePassword can handle it
              max="128"
            />
            </div>
            <div>
              <label htmlFor="includeUppercase">Include Uppercase Letters:</label>
              <input
                type="checkbox"
                id="includeUppercase"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="includeNumbers">Include Numbers:</label>
              <input
                type="checkbox"
                id="includeNumbers"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="includeSpecialChars">Include Special Characters:</label>
              <input
                type="checkbox"
                id="includeSpecialChars"
                checked={includeSpecialChars}
                onChange={(e) => setIncludeSpecialChars(e.target.checked)}
              />
            </div>
          </div>
          <button onClick={handleGeneratePassword} className="generate-btn">Generate Password</button>
        </header>
      </div>
    </div>
  );
}

export default App;
