$(function() {
    $(window).scroll(() => {
        window.pageYOffset > 600 ? $('#up').show() : $('#up').hide();
    });

    setInterval(() => {
        $.ajax({
            url: '/api/stock',
            method: 'POST',
            success: function(data) {
                $('#stockPrice').text(data.currentPrice.toFixed(2));
            }
        });
    }, 1000);

    $('#up').click(goUp);
    $('#myCarousel .carousel-indicators li:first-child').addClass('active');
    $('#myCarousel .carousel-inner .item:first-child').addClass('active');
});

const goUp = () => {
    const timer = setInterval(() => {
        $(document).scrollTop(window.pageYOffset - 50);

        window.pageYOffset === 0 && clearInterval(timer);
    }, 5);
}