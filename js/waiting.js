(function poll(){
    var url = "api/foundPlayer2.php";
    
    setTimeout(function(){
      $.ajax({ 
          url: url, 
          success: function(data){
              alert(data);
            if(data === true) {
                window.location = "game.php";
            }
            else {
                //Setup the next poll recursively
                poll();
            }
          }, dataType: "json"});
    }, 1000);
})();