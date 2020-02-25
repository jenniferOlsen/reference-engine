
// Helper function to filter returned array 
// Checks for any text properties (in this case, 'success')
export function filterByValue(array, string) {
  return array.filter(item =>
    Object.keys(item).some(text => String(item[text]).includes(string)));
}


  /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   * @param  {Array} array The array to shuffle
   * @return {String}      The first item in the shuffled array
   */

    export const shuffle = (array) => {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

	return array;

};
