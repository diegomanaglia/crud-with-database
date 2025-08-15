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

fetch('./api/readDatabase', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <th>${user.name}</th>
            <th>${user.email}</th>
            <th><button onclick="openEditModal(${user.id}, '${user.name}', '${user.email}')">Edit</button></th>
            <th><button onclick="deleteUser(${user.id})">Delete</button></th>
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

// Save user edition function
async function saveUser() {
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;

    try {
        const response = await fetch(`./api/saveUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, email }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json();
            console.log(data);
            window.location.reload();
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Modal function for user editing
function openEditModal(id, name, email) {
  document.getElementById('userId').value = id;
  document.getElementById('userName').value = name;
  document.getElementById('userEmail').value = email;
  document.getElementById('editModal').style.display = 'flex';
}

// Close modal
function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('cancelModal').addEventListener('click', closeModal);

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
  const modal = document.getElementById('editModal');
  if (e.target === modal) {
    closeModal();
  }
});