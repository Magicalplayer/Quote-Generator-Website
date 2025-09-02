document.addEventListener("DOMContentLoaded", () => {
  const quoteEl = document.getElementById("quote");
  const categoryEl = document.getElementById("category");
  const authorEl = document.getElementById("author");
  const button = document.getElementById("new-quote");

  async function getQuote() {
    const category = categoryEl.value;
    const author = authorEl.value.trim();
    let url = "https://api.quotable.io/quotes?";
    let params = [];

    if (category) {
      params.push(tags=${encodeURIComponent(category)});
    }

    if (author) {
      params.push(author=${encodeURIComponent(author)});
    }

    if (params.length > 0) {
      url += params.join("&");
    } else {
      url = "https://api.quotable.io/random";
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const randomQuote = data.results[Math.floor(Math.random() * data.results.length)];
        quoteEl.textContent = "${randomQuote.content}" — ${randomQuote.author};
      } else if (data.content) {
        quoteEl.textContent = "${data.content}" — ${data.author};
      } else {
        quoteEl.textContent = "No quotes found for this filter.";
      }
    } catch (error) {
      quoteEl.textContent = "Error fetching quote.";
    }
  }

  button.addEventListener("click", getQuote);
});