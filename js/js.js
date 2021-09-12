$(document).ready(function() {

    const untilDate = moment().add(7, 'day').format('MMMM, DD');
    $('#date').html(`${untilDate}`);

    if (checkCookie('userCity')) {
        $('.city').html(`${checkCookie('userCity')}`);
        hideLoader();
    } else {
        setLocation();
    }

    function hideLoader() {
        setTimeout(function(){
            $('.loader').fadeOut(300);
        }, 500);
    }

    function checkCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    
    function setLocation() {
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=ac306a64495340599347c6d3f645dab1')
        .then(response => response.json())
        .then(data => {
            if (data.city) {
                $('.city').html(`${data.city}`);
                document.cookie = `userCity=${encodeURIComponent(data.city)}`
                hideLoader();
            } else {
                hideLoader();
            }
        });
    }
});