/**
 * @method getLetterMatchCount
 * @param {string} guessWord - Guessed word
 * @param {string} secretWord - Secret word
 * @returns {number} - Number of letters matched between guessed word and secret word
*/
export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetterSet = new Set(secretWord.split(''))
  const guessedLetterSet = new Set(guessedWord.split(''))
  const guessedLettersResult = [...secretLetterSet].filter(letter => guessedLetterSet.has(letter)).length
  return guessedLettersResult
}