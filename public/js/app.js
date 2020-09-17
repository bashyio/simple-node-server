const weatherForm = document.querySelector('form')
const search = document.querySelector('input#search')
const messageOne = document.querySelector('p#message-1')
const messageTwo = document.querySelector('p#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Please wait...'
  messageTwo.textContent = ''

  fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed.');
      }
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
    .catch((error) => {
      messageOne.textContent = data.error
    });
})