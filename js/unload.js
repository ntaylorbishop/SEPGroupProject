var inInputOrLink = false;

$(window).on('beforeunload', function() { 
    console.log(inInputOrLink);
    if(!inInputOrLink) {
    	endGame($.cookie('user'));
        logout($.cookie('user'));
        return "You have been logged out.";
    }
    //return inInputOrLink ? null : "If you reload or close this page, you will forfeit the game and be logged out."; 
});

