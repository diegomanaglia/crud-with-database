document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    fetch('./api/addToDatabase.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
})

const tbody = document.getElementById("tbody_info");

fetch('./api/readDatabase.js', {method: 'GET'})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  