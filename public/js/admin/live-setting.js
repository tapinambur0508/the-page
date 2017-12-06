$(function () {
  // input file change
  $('#coverImage input[name=image]').on('change', function () {
    uploadFile()
      .then(image => {
        $('#coverImage img').attr('src', `/images/covers/${image}`);
        $('#coverImage img').addClass('img-responsive img-thumbnail');
      })
      .catch(error => console.log(error));
  });

  // submit update form
  $('#updateForm').on('submit', function (event) {
    event.preventDefault();

    let title = $(this).find('input[name=title]').val();
    title = title.trim().replace(/  +/g, ' ');

    let summary = $(this).find('textarea[name=summary]').val();
    summary = summary.trim().replace(/  +/g, ' ');

    let image = $('#coverImage img').data('src');

    uploadFile(image)
    .then(image => {
      if (title && summary && image) {
        $.ajax({
          url: `/admin/live/update`,
          method: 'PUT',
          data: { title, summary, image },
          success: function () {
            alert('Live has been updated');
          }
        });
      }
    })
    .catch(error => console.log(error));
  });

  // submit create form
  $('#createForm').on('submit', function (event) {
    event.preventDefault();

    let title = $(this).find('input[name=title]').val();
    title = title.trim().replace(/  +/g, ' ');

    let summary = $(this).find('textarea[name=summary]').val();
    summary = summary.trim().replace(/  +/g, ' ');

    uploadFile()
    .then(image => {
      if (title && summary && image) {
        $.ajax({
          url: '/admin/live/create',
          method: 'POST',
          data: { title, summary, image },
          success: function () {
            alert('Live has been saved');
          }
        });
      }
    })
    .catch(error => console.log(error));
  });
});

const uploadFile = image => {
  return new Promise((resolve, reject) => {
    const files = $('#coverImage input[name=image]').get(0).files;

    if (files.length) {
      let formData = new FormData();

      for (let i = 0, length = files.length; i < length; ++i) {
        let file = files[i];

        formData.append('uploads[]', file, file.name);
      }

      $.ajax({
        url: '/api/photo/covers',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
          resolve(files[0].name);
        }
      });
    } else {
      resolve(image);
    }
  });
}