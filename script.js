const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

btn.addEventListener("click", () => {
  const input = document.getElementById("input-word");
  const searchWord = input.value.trim(); // Trim to remove leading/trailing spaces

  fetch(`${url}${searchWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data && data.length > 0) {
        const word = data[0];
        const phonetic = word.phonetics.find(p => p.audio);
        const audioSrc = phonetic ? phonetic.audio : null;

        result.innerHTML = `
          <div class="word">
            <h3>${word.word}</h3>
            ${audioSrc ? `<button onclick="playSound()"><i class="fas fa-volume-up"></i></button>` : ''}
          </div>
          <div class="details">
            <p>${word.meanings[0].partOfSpeech}</p>
            <p>${word.phonetic || ''}</p>
          </div>
          <p class="word-meaning">
            ${word.meanings[0].definitions[0].definition}
          </p>
          <p class="word-example">
            ${word.meanings[0].definitions[0].example || ''}
          </p>`;

        if (audioSrc) {
          sound.setAttribute("src", audioSrc);
        }
      } else {
        result.innerHTML = `<h3 class="error">No results found</h3>`;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      result.innerHTML = `<h3 class="error">Sorry mate, check the word again</h3>`;
    });
});

function playSound() {
  sound.play();
}
