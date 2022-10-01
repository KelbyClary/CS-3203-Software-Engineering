$(function () {
  //This function will get the tweets on button click
  $('#get-button').on('click', function () {
    $.ajax({
      url: '/tweets',
      contentType: 'application/json',
      success: function (response) {
        var tbodyEl = $('#namebody');
        tbodyEl.html('');
        response.newArray.forEach(function (newArray) {
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
  //Get tweets from the JSON data
  $('#get-tweets-button').on('click', function () {
    $.ajax({
      url: '/tweetinfo',
      contentType: 'application/json',
      success: function (response) {
        var tbodyEl = $('#tweetbody');
        tbodyEl.html('');
        response.newArray.forEach(function (newArray) {
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
  //Get recently searched tweets
  $('#get-searched-tweets').on('click', function () {
    $.ajax({
      url: '/searchinfo',
      contentType: 'application/json',
      success: function (response) {
        var tbodyEl = $('#searchbody');
        tbodyEl.html('');
        response.searchedArray.forEach(function (searchedArray) {
          //Bringing in the id,text,created_at data
          tbodyEl.append('\
                      <tr>\
                          <td class="id">' + searchedArray.id + '</td>\
                          <td><input type="text" class="name" value="' + searchedArray.text + '"></td>\
                          <td><input type="text" class="name" value="' + searchedArray.created_at + '"></td>\
                      </tr>\
                  ');
        });
      }
    });
  });
  //CREATE
  $('#create-form').on('submit', function (event) {
    event.preventDefault();
    var createInput = $('#create-input').val();//Creates input and gets the value
    var s = createInput.split(';');//Used to split the input entries seperated by a ; character
    $.ajax({
      url: '/tweetinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id: s[0], text: s[1] }),//Converting javscript value to a JSON String
      success: function (response) {
        createInput.val('');
      }
    })
  });
  //Create searched tweets
  $('#search-form').on('submit', function (event) {
    event.preventDefault();
    var inputID = $('#search-input').val();
    $.ajax({
      url: '/searchinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ inputID: inputID }),//Converting the inputID to a JSON string
      success: function (response) {
        console.log(response)
        var tbodyEl = $('#searchbody');
        tbodyEl.html('');
        response.searchArray.forEach(function (searchArray) {//Creating the data from the searched tweet
          tbodyEl.append('\
                      <tr>\
                          <td class="id">' + searchArray.id + '</td>\
                          <td><input type="text" class="name" value="' + searchArray.text + '"></td>\
                          <td><input type="text" class="name" value="' + searchArray.created_at + '"></td>\
                      </tr>\
                  ');
        }
        )
      }
    })
  });
  //UPDATE/PUT
  $("#update-user").on('submit', function (event) {
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();//Updates the input value 
    const parsedStrings = inputString.split(';');//Splits the input by the character ;
    //This is used to seperate the incoming input to retrieve the name and the screenName
    var inputname = parsedStrings[0];
    var inputNewScreenName = parsedStrings[1];
    $.ajax({
      url: '/tweets/' + inputname,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ inputNewScreenName: inputNewScreenName }),//Converting the inputnewScreenName value into a JSON string
      success: function (response) {
        console.log(response);
      }
    });  
  });
  //DELETE
  //Deletes the tweet when given the ID
  $("#delete-form").on('submit', function () {
    var id = $('#delete-input').val()
    event.preventDefault();
    $.ajax({
      url: '/tweetinfo/' + id, 
      method: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify({ input: id }),
      success: function (response) {
        console.log(response);
      }
    })
  });
})