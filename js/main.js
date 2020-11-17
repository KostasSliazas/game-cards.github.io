;
(function (d) {
  'use strict'
  const arr = [1, 2, 3, 4, 5, 6, 7, '☕', '🌹', '♥']
  let shufleCards = getShuffledArr(arr.concat(arr))
  const documentFragment = d.createDocumentFragment()
  const gridContainer = d.getElementsByClassName('grid-container')[0]
  const message = d.getElementsByClassName('message')[0]
  const timers = d.getElementsByClassName('time')[0]
  const card = {
    card: null,
    cards: 0
  }

  function getShuffledArr (arr) {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
    }
    return newArr
  };

  function Element (tagName, className, text) {
    this.tagName = tagName
    this.text = text
    this.className = className
    this.elem = d.createElement(this.tagName)
    this.elem.className = this.className
    this.elem.innerHTML = this.text
    return this.elem
  }
  let on = 0
  function timer () {
    let sec = 0
    function pad (val) {
      return val > 9 ? val : '0' + val
    }
    on = setInterval(function () {
      d.getElementById('seconds').innerHTML = pad(++sec % 60)
      d.getElementById('minutes').innerHTML = pad(parseInt(sec / 60, 10))
    }, 1000)
  }

  function start () {
    shufleCards = getShuffledArr(arr.concat(arr))
    shufleCards.forEach(e => {
      const ele = new Element('DIV', 'wrpko', '')
      const kor = new Element('DIV', 'korta', '')
      const gal = new Element('DIV', 'galas', e)
      const pri = new Element('DIV', 'priekis', '')
      ele.appendChild(kor)
      kor.appendChild(gal)
      kor.appendChild(pri)
      documentFragment.appendChild(ele)
    })
    gridContainer.appendChild(documentFragment)
    timer()
  }

  d.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('korta')) {
      if (!card.cards) card.card = e.target
      if (card.cards === 2) return false
      ++card.cards
      const randomClass = Math.round(Math.random()) >= 0.5 ? 'pasukti' : 'pasukti1'
      target.className += ' ' + randomClass
      if (card.cards === 2) {
        gridContainer.style.pointerEvents = 'none'
        if (card.card.firstChild.innerHTML === target.firstChild.innerHTML) {
          let inter0 = setTimeout(() => {
            target.classList.add('blur')
            card.card.classList.add('blur')
            card.cards = 0
            gridContainer.style.pointerEvents = 'auto'
            if (gridContainer.getElementsByClassName('blur').length === shufleCards.length) {
              clearInterval(on)
              message.innerHTML = `<p>YOU WON!</p><p>your time: ${timers.textContent}</p>`
              gridContainer.innerHTML = ''
              button('Play again')
              message.style.display = 'block'
            }
            clearTimeout(inter0)
            inter0 = 0
          }, 1000)
        } else {
          let inter = setTimeout(() => {
            target.classList.remove(randomClass)
            card.card.className = 'korta'
            card.cards = 0
            gridContainer.style.pointerEvents = 'auto'
            clearTimeout(inter)
            inter = 0
          }, 1000)
        }
      }
    }
  })

  function button (text) {
    timers.classList.add('hidden')
    const btn = new Element('button', 'btn', text)
    btn.onclick = () => {
      start()
      message.style.display = 'none'
      timers.classList.remove('hidden')
    }
    message.appendChild(btn)
  }

  function init () {
    button('Start')
  }

  init()
})(document)
