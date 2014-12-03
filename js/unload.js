$(window).on('beforeunload', function() { 
    forfeitGame(user1Name, user2Name);
    logout($.cookie('user'));
    return "You have been logged out.";
});

