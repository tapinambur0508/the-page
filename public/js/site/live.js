$(function() {
  scrollDownPosts();
  scrollDownComments();

  const socket = io('http://localhost:5000');

  // submit comment form
  $('#commentForm').on('submit', function(event) {
    event.preventDefault();

    let text = $(this).find('textarea[name=text]').val();
    text = text.trim().replace(/  +/g, ' ');

    if (text) {
      socket.emit('comment', text);
      document.getElementById('commentForm').reset();
    }
  });

  socket.on('newPost', post => createPostTemplate(post));
  socket.on('newComment', comment => createCommentTemplate(comment));
});

const scrollDownComments = () => {
  const comments = document
    .getElementById('myContainer')
    .getElementsByClassName('comment-container')[0]
    .getElementsByClassName('comments')[0]
  
  comments.scrollTop = comments.scrollHeight;
}

const scrollDownPosts = () => {
  const posts = document
    .getElementById('myContainer')
    .getElementsByClassName('post-container')[0]
    .getElementsByClassName('posts')[0]

  posts.scrollTop = posts.scrollHeight;
}

const createCommentTemplate = comment => {
  $('#myContainer .comment-container .comments').append(
    `<div class="panel post panel-shadow">
      <div class="post-heading">
        <div class="pull-left">
          <img src="${comment.userThumbnail}" class="img-circle avatar" alt="${comment.username}">
        </div>
        <div class="pull-left meta">
          <div class="title">
            <h4><b>${comment.username}</b></h4>
          </div>
          <h5 class="text-muted">${comment.date}</h5>
        </div>
      </div>
      <div class="post-description">
        <p>${comment.text}</p>
      </div>
    </div>`
  );
}

const createPostTemplate = post => {
  let imageTemplate = '';

  if (post.image) { 
    imageTemplate = `<img class="img-responsive img-rounded" src="/images/posts/${post.image}">`;
  }

  $('#myContainer .post-container .posts').append(
    `<div class="panel post panel-shadow">
      <div class="post-heading">
        <div class="pull-left">
          <img src="${post.userThumbnail}" class="img-circle avatar" alt="${post.username}">
        </div>
        <div class="pull-left meta">
          <div class="title">
            <h4><b>${post.username}</b></h4>
          </div>
          <h5 class="text-muted">${post.date}</h5>
        </div>
      </div>
      <div class="post-description">
        <p>${post.text}</p>
        ${imageTemplate}
      </div>
    </div>`
  );

  document.getElementById("audio").play();
}