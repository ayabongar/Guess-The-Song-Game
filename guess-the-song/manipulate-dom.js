document.addEventListener('DOMContentLoaded', function() {
    const lyricsElement = document.getElementById('lyrics');
    const songOptionsContainer = document.getElementById('song-options');
    const selectedSongInput = document.getElementById('selected-song');
    const guessForm = document.getElementById('guess-form');
    const resultElement = document.getElementById('result');
  
    
    fetch('/retrieve-lyrics')
      .then(response => response.text())
      .then(lyrics => {
        lyricsElement.textContent = lyrics;
  
        
        fetch('/retrieve-song-options', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ lyrics })
        })
          .then(response => response.json())
          .then(songOptions => {
            updateSongOptions(songOptions);
          })
          .catch(error => {
            console.error('Error fetching song options:', error);
          });
      })
      .catch(error => {
        console.error('Error retrieving lyrics:', error);
      });
  
    function updateSongOptions(songOptions) {
      
      songOptionsContainer.innerHTML = '';
  
      songOptions.forEach(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('song-option');
        button.textContent = option;
        songOptionsContainer.appendChild(button);
      });
    }
  
    const songOptions = document.getElementsByClassName('song-option');
  
    for (const songOption of songOptions) {
      songOption.addEventListener('click', function() {
        const selectedSong = songOption.textContent;
        selectedSongInput.value = selectedSong;
        clearSelectedOptions();
        songOption.classList.add('selected');
      });
    }
  
    function clearSelectedOptions() {
      for (const songOption of songOptions) {
        songOption.classList.remove('selected');
      }
    }
  
    guessForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const selectedSong = selectedSongInput.value;
        
      
      fetch('/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedSong })
      })
        .then(response => response.json())
        .then(result => {
          resultElement.textContent = result;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  
  });
  