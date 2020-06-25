const address = 'Lagos'

const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const resultText = document.querySelector('p')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.innerText = 'Please wait...'
  messageTwo.innerText = ''

  fetch('/weather?address=' + searchEl.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.innerText = data.error
      } else {
        messageOne.innerText = data.location
        messageTwo.innerText = data.forecast
      }
    })
  }).catch((error) => {
    console.log(error)
  })

})