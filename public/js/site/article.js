$(function() {
  // submit comment form
  $('#commentForm').on('submit', event => {
    event.preventDefault();

    let text = $('#commentForm textarea[name=text]').val();
    text = text.trim().replace(/  +/g, ' ');

    if (text) {
      $.ajax({
        url: '/article/comment/add',
        method: 'POST',
        data: { text },
        success: function () {
          document.getElementById('commentForm').reset();
          location.reload();
        }
      });
    }
  });
});