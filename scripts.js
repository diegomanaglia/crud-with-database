document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    // Get input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Validate inputs
    if (!name || !email) {
        return alert('Name and email are required');
    }

    fetch('./api/addToDatabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })
      .then(response => response.json())
      .then(data => window.location.reload())
      .catch(error => console.error('Error:', error));
})

const tbody = document.getElementById("tbody_info");

fetch('./api/readDatabase', {method: 'GET'})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <th>${user.name}</th>
            <th>${user.email}</th>
            <th><a href="#" onclick="deleteUser(${user.id})">Delete</a></th>
        `;
        tbody.appendChild(tr);
    });
  })
  .catch(error => console.error('Error:', error));

// Delete user function
async function deleteUser(id) {
    try {
        const response = await fetch(`./api/deleteUser?id=${id}`, {
        method: 'DELETE',
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
}