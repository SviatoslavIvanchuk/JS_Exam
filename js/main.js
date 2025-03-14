let usersURL = 'https://jsonplaceholder.typicode.com/users';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Не вдалося завантажити дані.");
        return null;
    }
}

const usersBlock = document.getElementById('users');

fetchData(usersURL)
    .then(users => {
        users.forEach(user => {
            const userBlock = document.createElement('div');
            userBlock.classList.add('user-block', 'flex-column');
            userBlock.innerHTML = `
                <h3>${user.id}. ${user.name}</h3>
                <a href="user-details.html?id=${user.id}">Details</a>
            `;
            usersBlock.appendChild(userBlock);
        })
    })