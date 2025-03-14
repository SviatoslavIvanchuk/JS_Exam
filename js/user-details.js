const usersURL = 'https://jsonplaceholder.typicode.com/users';

const userID = new URLSearchParams(window.location.search).get('id');

document.title = `${userID.name}`;

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

fetchData(usersURL)
    .then(users => {
        const userByID = users.find(user => user.id === +userID);
        if (!userByID) {
            alert("Неправильний ID користувача!");
            window.location.href = "index.html";
        }

        document.title = `${userByID.name}`;

        const userSection = document.getElementById('user');

        const userTitle = document.createElement('div');
        userTitle.classList.add('user-title');
        userTitle.innerHTML = `
            <h2>${userByID.name} <span>${userByID.username}</span></h2>
        `;

        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info', 'flex-center');

        const userAddress = document.createElement('div');
        // language=HTML
        userAddress.innerHTML = `
            <h4>Address</h4>
            <ul>
                <li>Street: ${userByID.address.street}</li>
                <li>Suite: ${userByID.address.suite}</li>
                <li>City: ${userByID.address.city}</li>
                <li>Zipcode: ${userByID.address.zipcode}</li>
                <li>
                    <ul>Geo:
                        <li>Lat: ${userByID.address.geo.lat}</li>
                        <li>Lng: ${userByID.address.geo.lng}</li>
                    </ul>
                </li>
            </ul>
        `;

        const userContacts = document.createElement('div');
        userContacts.innerHTML = `
            <h4>Contacts</h4>
            <ul>
                <li>Email: ${userByID.email}</li>
                <li>Phone: ${userByID.phone}</li>
                <li>Website: ${userByID.website}</li>
            </ul> 
        `;

        const userCompany = document.createElement('div');
        userCompany.innerHTML = `
            <h4>Company</h4>
            <ul>
                <li>Name: ${userByID.company.name}</li>
                <li>Catch phrase: ${userByID.company.catchPhrase}</li>
                <li>Bs: ${userByID.company.bs}</li>
            </ul>  
        `;
        userInfo.append(userAddress, userContacts, userCompany);

        const showPostsCurrentUser = document.createElement('button');
        showPostsCurrentUser.classList.add('show-posts', 'flex-center');
        showPostsCurrentUser.textContent = 'Show Posts';

        userSection.append(userTitle, userInfo, showPostsCurrentUser);

        showPostsCurrentUser.addEventListener('click', function () {

            const postsSection = document.getElementById('posts');

            if (postsSection.children.length > 0) {
                postsSection.innerHTML = '';
                return;
            }

            fetchData(`${usersURL}/${userByID.id}/posts`)
                .then(posts => {
                    posts.forEach(post => {
                        const postBlock = document.createElement('div');
                        postBlock.classList.add('post-block');
                        postBlock.innerHTML = `
                        <h4>${post.title}</h4>
                        <a href="post-details.html?id=${post.id}">More</a>
                    `;

                        postsSection.append(postBlock);
                    });
                });

        })

    });