export const Percent365 = require('./356-percent.jpg') 
export const Einstein = require('./einstein.jpg')
export const Slow = require('./slow.jpeg')
export const Twain = require('./twain.jpg')

const quotes = [
  Percent365,
  Einstein,
  Slow,
  Twain,
]

export const randomElement = quotes[Math.floor(Math.random() * quotes.length)];
