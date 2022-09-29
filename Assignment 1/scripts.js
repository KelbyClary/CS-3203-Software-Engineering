
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response){
            var tbodyEl = $('#namebody');
            tbodyEl.html('');
            response.newArray.forEach(function(newArray) {
              console.log(newArray)
              tbodyEl.append('\
              <tr>\
              <td class="id">' + newArray.id + '</td>\
              <td><input type="text" class="name" value="' + newArray.screenName + '"></td>\
              <td><input type="text" class="name" value="' + newArray.name + '"></td>\
              </tr>\
              ');
              });
              }
              });
   });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
              var tbodyEl = $('#tweetbody');

              tbodyEl.html('');

              response.newArray.forEach(function(newArray) {
                  tbodyEl.append('\
                      <tr>\
                          <td class="id">' + newArray.id + '</td>\
                          <td><input type="text" class="name" value="' + newArray.text + '"></td>\
                          <td><input type="text" class="name" value="' + newArray.created_at + '"></td>\
                      </tr>\
                  ');
              });
          }
      });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');

        //TODO: creat a tweet
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet

  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet

  });


});
