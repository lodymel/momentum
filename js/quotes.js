const quotes = [
  {
    quote: "The future belongs to those who believe in the beauty of their dreams",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "All our dreams can come true, if we have the courage to pursue them.",
    author: "Walt Disney",
  },
  {
    quote: "Dream big and dare to fail.",
    author: "Norman Vaughan",
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston S. Churchill",
  },
  {
    quote: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    quote: "Love all, trust a few, do wrong to none.",
    author: "William Shakespeare",
  },
  {
    quote: "Where there is love there is life.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
  },
  {
    quote: "Love is composed of a single soul inhabiting two bodies.",
    author: "Aristotle",
  }
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)];

// Simple and clean infinite loop
const quoteText = todaysQuote.quote;
const authorText = todaysQuote.author;

// Set quote and author separately
quote.innerText = quoteText;
author.innerText = authorText;