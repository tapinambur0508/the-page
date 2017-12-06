$(function() {
  // click on online button
  $('button.online-btn').click(function() {
    const id = $(this).data('live-id');

    $.ajax({
      url: `/admin/live/online/${id}`,
      method: 'PUT',
      success: function() {
        location.reload();
      }
    });
  });

  // click on delete button
  $('button.delete-btn').click(function() {
    if (confirm('Are you sure you want to delete this live?')) {
      const id = $(this).data('live-id');
      
      $.ajax({
        url: `/admin/live/delete/${id}`,
        method: 'DELETE',
        success: function() {
          location.reload();
        }
      });
    }
  });
});