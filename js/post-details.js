const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const commentsURL = 'https://jsonplaceholder.typicode.com/comments';

const postID = new URLSearchParams(window.location.search).get('id');

document.title = `Post ${postID}`;

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

fetchData(`${postsURL}/${postID}`)
    .then(post => {
        const postSection = document.getElementById('post');
        postSection.innerHTML = `
            <h3>${post.title}<span>${post.userId}.${post.id}</span> </h3>
            <p>${post.body}</p>  
        `;
    })

fetchData(`${commentsURL}`)
    .then(comments => {
        const commentsCurrentPost = comments.filter((comment) => comment.postId === +postID);
        if (commentsCurrentPost.length === 0) {
            alert("Не знайдено сторінки з постом");
            window.location.href = "index.html";
        }

        const commentsSection = document.getElementById('comments');

        commentsCurrentPost.forEach(comment => {
            const commentBlock = document.createElement('div');
            commentBlock.classList.add('comment-block', 'flex-column');
            commentBlock.innerHTML = `
                <h4>${comment.name} <span>${comment.email}</span></h4>
                <p>${comment.body}</p>  
            `;

            commentsSection.append(commentBlock);
        })
    })