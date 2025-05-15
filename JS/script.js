async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        console.log(users);
        displayUsers(users);
        scrollToUsers();  
    } catch (error) {
        console.error('Fel vid hämtning av användare:', error);
    }
}

function displayUsers(users) {
    const container = document.getElementById('userContainer');
    container.innerHTML = ''; 
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Användarnamn:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <button onclick="showMoreInfo(this, ${user.id})">Visa mer</button>
            <div class="extra-info" id="info-${user.id}" style="display: none;">
                <p><strong>Stad:</strong> ${user.address.city}</p>
                <p><strong>Telefon:</strong> ${user.phone}</p>
                <p><strong>Företag:</strong> ${user.company.name}</p>
            </div>
        `;
        container.appendChild(userCard);
    });
}

function showMoreInfo(button, userId) {
    const infoDiv = document.getElementById(`info-${userId}`);
    if (infoDiv.style.display === "none") {
        infoDiv.style.display = "block";
        button.textContent = "Visa mindre";
    } else {
        infoDiv.style.display = "none";
        button.textContent = "Visa mer";
    }
}

function scrollToUsers() {
    const container = document.getElementById('userContainer');
    if (container) {
        const yOffset = -window.innerHeight / 4; 
        const y = container.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}


fetchUsers();
