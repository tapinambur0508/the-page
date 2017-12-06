$(function() {
    // click on carousel button
    $('button.carousel-btn').click(function() {
        const id = $(this).data('article-id');
    
        $.ajax({
            url: `/admin/article/carousel/${id}`,
            method: 'PUT',
            success: function() {
                location.reload();
            }
        });
    });
  
    // click on published button
    $('button.published-btn').click(function() {
        const id = $(this).data('article-id');
    
        $.ajax({
            url: `/admin/article/publish/${id}`,
            method: 'PUT',
            success: function() {
                location.reload();
            }
        });
    });
  
    // click on delete button
    $('button.delete-btn').click(function() {
        if (confirm('Are you sure you want to delete this article?')) {
            const id = $(this).data('article-id');
            
            $.ajax({
                url: `/admin/article/delete/${id}`,
                method: 'DELETE',
                success: function() {
                    location.reload();
                }
            });
        }
    });
});
