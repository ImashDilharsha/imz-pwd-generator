export const generatePassword = (length, includeUppercase, includeNumbers, includeSymbols) => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let charPool = lowercaseChars;
  let guaranteedChars = [];

  if (includeUppercase) {
    charPool += uppercaseChars;
    guaranteedChars.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
  }
  if (includeNumbers) {
    charPool += numberChars;
    guaranteedChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
  }
  if (includeSymbols) {
    charPool += symbolChars;
    guaranteedChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
  }

  // Handle edge case: if no character types are selected, default to lowercase
  if (charPool === lowercaseChars && guaranteedChars.length === 0 && length > 0) {
     // This case is already handled by charPool defaulting to lowercaseChars
     // and the main loop will pick from it.
     // If length is 0, it will return an empty string.
     // If all options are false, it will generate a lowercase password.
  }


  if (length <= 0) {
    return '';
  }

  // If charPool is empty (e.g. only lowercase was initially set and then removed - though UI should prevent this)
  // and no guaranteed chars, return empty string.
  // However, charPool always includes lowercase, so this check is more for future-proofing if that changes.
  if (charPool.length === 0 && guaranteedChars.length === 0) {
      return '';
  }
  
  // Ensure length is sufficient for guaranteed characters
  if (length < guaranteedChars.length) {
    // This case should ideally be handled by UI validation (e.g., min length based on selections)
    // For now, we'll return a password composed of only the guaranteed characters, truncated or padded if necessary.
    // Or, more simply, let the UI enforce a reasonable minimum length.
    // Given the current setup, if length is too small, the shuffle might not distribute them.
    // A simple approach: if length is less than guaranteed, just return those guaranteed ones joined.
    return guaranteedChars.slice(0, length).join(''); 
  }


  let password = [...guaranteedChars];
  const remainingLength = length - guaranteedChars.length;

  for (let i = 0; i < remainingLength; i++) {
    if (charPool.length === 0) break; // Should not happen if lowercase is always in pool
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password.push(charPool[randomIndex]);
  }

  // Shuffle the password to ensure guaranteed characters are not always at the beginning
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }
  
  return password.join('');
};
