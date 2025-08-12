let token = null;

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorElement = document.getElementById('login-error');

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      token = data.token;
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      errorElement.textContent = '';
    } else {
      errorElement.textContent = data.error || 'Login failed. Please try again.';
    }
  } catch (err) {
    console.error('Frontend fetch error:', err);
    errorElement.textContent = 'Could not connect to server.';
  }
});

function loadData(table) {
  fetch(`http://localhost:3000/api/${table}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const output = document.getElementById('output');
      output.innerHTML = `<h3>${table.toUpperCase()}</h3>`;

      if (!Array.isArray(data) || data.length === 0) {
        output.innerHTML += '<p>No data available.</p>';
        return;
      }

      // Create table
      let html = '<table border="1" cellpadding="5" cellspacing="0"><thead><tr>';
      
      // Get column headers from first object
      const columns = Object.keys(data[0]);
      columns.forEach(col => {
        html += `<th>${col}</th>`;
      });
      html += '</tr></thead><tbody>';

      // Add rows
      data.forEach(row => {
        html += '<tr>';
        columns.forEach(col => {
          html += `<td>${row[col]}</td>`;
        });
        html += '</tr>';
      });

      html += '</tbody></table>';
      output.innerHTML += html;
    })
    .catch(err => {
      console.error('Data fetch error:', err);
      document.getElementById('output').textContent = 'Failed to load data.';
    });
}

function logout() {
  token = null;
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('output').innerHTML = '';
}
