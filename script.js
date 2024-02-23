document.addEventListener("DOMContentLoaded", function() {
  const wordListSelect = document.getElementById("wordListSelect");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const randomButton = document.getElementById("randomButton");
  const wordInput = document.getElementById("wordInput");
  const goToWordButton = document.getElementById("goToWordButton");
  const wordElement = document.getElementById("word");
  const kasusElement = document.getElementById("kasus");
  const meaningElement = document.getElementById("meaning");
  const exampleElement = document.getElementById("example");
  const wordCountElement = document.getElementById("wordCount");

  let words = [];
  let currentIndex = 0;

  // Function to fetch and display words
  function fetchAndDisplayWords() {
    const selectedWordList = wordListSelect.value;
    fetch(selectedWordList)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        words = lines.map(line => {
          const [word, kasus, meaning, example] = line.split('|').map(part => part.trim());
          return { word, kasus, meaning, example };
        });
        displayWord(currentIndex);
      })
      .catch(error => console.error('Error reading the file:', error));
  }

  // Function to display the current word
  function displayWord(index) {
    const wordObj = words[index];
    wordElement.textContent = wordObj.word;
    kasusElement.textContent = wordObj.kasus;
    meaningElement.textContent = wordObj.meaning;
    exampleElement.textContent = wordObj.example;
    wordCountElement.textContent = `${index + 1}/${words.length}`; // Update the word count
  }

  // Initial fetch and display
  fetchAndDisplayWords();

  // Event listener for word list change
  wordListSelect.addEventListener("change", fetchAndDisplayWords);

  // Event listener for next button
  nextButton.addEventListener("click", function() {
    currentIndex = (currentIndex + 1) % words.length;
    displayWord(currentIndex);
  });

  // Event listener for previous button
  prevButton.addEventListener("click", function() {
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    displayWord(currentIndex);
  });

  // Event listener for random button
  randomButton.addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * words.length);
    displayWord(randomIndex);
  });

  // Event listener for go to word button
  goToWordButton.addEventListener("click", function() {
    const wordNumber = parseInt(wordInput.value);
    if (!isNaN(wordNumber) && wordNumber >= 1 && wordNumber <= words.length) {
      displayWord(wordNumber - 1); // Adjust for 0-based index
    } else {
      alert("Please enter a valid word number.");
    }
  });
});
