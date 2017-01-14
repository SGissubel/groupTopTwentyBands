  var top100BandsArray = [{ name: "", image: "" }]
      //grabbing modal
  var modal = $("#myModal");
  //span to close modal
  var span = $("#close")[0];
  //     //modal btn
  // var mbtn = $("#myBtn")                    
  // console.log(moment().format(mm/dd/yy));
  var queryURL = "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=20&api_key=c7ca1cd620610095f4cc0675ec49307c&format=json"

  $.ajax({
          url: queryURL,
          method: 'GET'
      }).done(function(response) {

          $('#storage').text(JSON.stringify(response.artists.artist));

          // Create Buttons From Top 20 Bands Array
          //empties the img and btn on every load (instead of choosing several different divs to empty.)
          $(".bandClass").empty();

          //runs through and pulls band image and info
          for (var i = 0; i < 20; i++) {

              var div = $("<div>").addClass("bandImg")
              var img = $("<img>").addClass("bandClass").attr("src", "" + response.artists.artist[i].image[2]["#text"] + "").attr("data-name", response.artists.artist[i].name).text(response.artists.artist[i].name);
              var btn = $("<button>").addClass("bandClass button").attr("data-name", response.artists.artist[i].name).text(response.artists.artist[i].name);

              //appends the images and buttons on every page load to their own divs--instead of placing them in divs after the fact
              div.append(img);
              div.append(btn);
              $('.rowImg').append(div);

          } //end forloop




      }) //end done function/response (last.fm)

  // $(".bandClass").on("click",function(event) {
  $(document).on("click", ".bandClass", function() {
    // $(".rowImg").removeClass("col-xs-12").addClass("col-xs-3")
    $(".reload").html('<i>' + "Clear Results" + '</i>');
    $("#bandInfoAppearsHere").css("margin-left", "6%");
      $(".bandImg").css("margin", "0 1em 12em 1em");
      $(".container").css("width", "38%").css("float", "right").css("margin", "0");

      // $('.modal').css('display', 'block');

      //    event.preventDefault()
      // $(".container").hide();
      var bandIs = $(this).data("name")

      // alert("the band is  " + bandIs)


      $(document).ready(function() {
              $("#bandInfoAppearsHere").empty();

              var queryURL = "https://api.spotify.com/v1/search?q=" + bandIs + "&type=track&limit=10";




              $.ajax({
                      url: queryURL,
                      method: 'GET'
                  }).done(function(response) {
                      $('#storage').text(JSON.stringify(response));

                      $("#header").empty();
                      $("#header").append(bandIs);

                      for (i = 0; i < response.tracks.items.length; i++) {
                          var divTwo = $('<div>').addClass("bandInfoAppearsHere");
                          var p = $("<p>").text(bandIs);
                          // $(".bandInfoAppearsHere").append(p);
                          var album = $("<p>").text("Album:   " + response.tracks.items[i].album.name);
                          // $(".bandInfoAppearsHere").append(album);
                          var song = $("<p>").text("Song:    " + response.tracks.items[i].name);
                          // $(".bandInfoAppearsHere").append(song);
                          var c = $("<button>");
                          // Adds a class of movie to our button
                          c.addClass("bandPlayClass");
                          // Added a data-attribute
                          c.attr("data-url", response.tracks.items[i].preview_url);
                          // Provided the initial button text
                          c.attr("data-name", response.tracks.items[i].name);

                          c.text(response.tracks.items[i].name);
                          // $(".bandInfoAppearsHere").append(c);
                          // console.log(response.tracks.items[i].preview_url)
                          divTwo.append(p);
                          divTwo.append(album);
                          divTwo.append(song);
                          divTwo.append("Click To Listen To A Song Clip ", c);

                          $("#bandInfoAppearsHere").append(divTwo);



                      } //end for loop

                      $(".bandPlayClass").on("click", function(){


                        $('.modal').css('display', 'block');

                            var songModal = $(this).data("name")                   
                            var songURL = $(this).data("url")
                            
                             $("#pOne").empty();
                             $("#pTwo").empty();

                                var none = "none";
                                // var songURL = "https://p.scdn.co/mp3-preview/74e55f23c327f3a52d6d23f12c0af57e2beea3cd?cid=null"
                                var type = "audio/mpeg"
                                var controls = "controls";

                              
                                var audio = $("<audio autoplay>").addClass("myaudio").attr(controls,"controls").attr("preload",""+ none +"").attr("src","" + songURL +"");
                                console.log(songModal)
                                console.log(song)
                                 $("#pOne").append(songModal);
                                 $("#pTwo").append(audio);

                                 
                        });



                  }) //closes done function response

          }) //closes document ready function

  }); //closes document (bandclass) onclick function

  $('span').on("click", function() {
      $('.modal').css('display', 'none');
      $(".myaudio")[0].pause();
      // $("#pOne").empty();
      // $("#pTwo").empty();
  })

  $('window').on("click", function(event) {
      if (event.target == modal) {
          $("#pOne").empty();
          $("#pTwo").empty();
          $('.modal').css('display', 'none');
      }
  });
$(".reload").on("click", function(){
      $(".reload").empty();
      $("#bandInfoAppearsHere").empty();
      $("#bandInfoAppearsHere").css("margin", "0");
      $(".bandImg").css("margin", "0 1em 12em 1em");
      $(".container").css("width", "initial").css("float", "null").css("margin", "0 5%");
  })