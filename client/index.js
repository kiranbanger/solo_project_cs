// react app starts here

const body = document.querySelector('body');

fetch('/getdata')
.then( data => {
  const p = document.createElement('p')
  p.innerText = data
  body.append(p)
})