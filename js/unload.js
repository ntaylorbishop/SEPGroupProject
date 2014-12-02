var inInputOrLink = false;
$('a').on('click', function() { inInputOrLink = true; });
$('input').on('click', function() { inInputOrLink = true; });

$(window).on('beforeunload', function() { 
    return inInputOrLink ? null : "If you reload or close this page, you will forfeit the game and be logged out."; 
});