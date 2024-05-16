document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('post-container');
    const postFiles = ['1.txt', '2.txt', '3.txt', '4.txt', '5.txt', '6.txt', '7.txt', '8.txt']; // Add all your post files here

    postFiles.forEach(file => {
        fetch(`hallOfRetards/${file}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${file}`);
                }
                return response.text();
            })
            .then(data => {
                const post = parsePostData(data);
                const postElement = createPostElement(post);
                postContainer.appendChild(postElement);
            })
            .catch(error => {
                console.error('Error fetching post file:', error);
            });
    });

    function parsePostData(data) {
        const lines = data.split('\n');
        const post = {};

        lines.forEach(line => {
            const [key, ...value] = line.split(': ');
            post[key] = value.join(': ').trim();
        });

        return post;
    }

    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        const titleElement = document.createElement('div');
        titleElement.className = 'post-title';
        titleElement.textContent = post.title;

        const contentElement = document.createElement('div');
        contentElement.className = 'post-content';
        contentElement.innerHTML = post.content.replace(/\\n/g, '<br>'); // Replace \n with <br> for line breaks

        const photosElement = document.createElement('div');
        photosElement.className = 'post-photos';
        if (post.photos !== 'none') {
            const photoFiles = post.photos.split(' ');
            photoFiles.forEach(photo => {
                const imgElement = document.createElement('img');
                imgElement.src = `images/${photo}`;
                photosElement.appendChild(imgElement);
            });
        }

        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);
        if (post.photos !== 'none') {
            postElement.appendChild(photosElement);
        }

        return postElement;
    }
});
