  var top100BandsArray = [{name:"",image:""}]
                            
         
         var queryURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=20&api_key=c7ca1cd620610095f4cc0675ec49307c&format=json"

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
          var img = $("<img>").addClass("bandClass").attr("src","" + response.artists.artist[i].image[0]["#text"] + "").attr("data-name", response.artists.artist[i].name).text(response.artists.artist[i].name);
          var btn = $("<button>").addClass("bandClass button").attr("data-name", response.artists.artist[i].name).text(response.artists.artist[i].name);

            //appends the images and buttons on every page load to their own divs--instead of placing them in divs after the fact
          div.append(img);
          div.append(btn);
          $('.container').append(div);
 
          }//end forloop
    

            

  })//end done function/response (last.fm)
function nwin(){
  
}
$(document).on("click",".bandClass",function()  {         
// $(".bandClass").on("click",function(event) {

  window.open('page2.html', '_blank'); 

//    event.preventDefault()

    var bandIs = $(this).data("name")

   alert("the band is  " + bandIs)

   $(document).ready(function() {
        

    var queryURL = "https://api.spotify.com/v1/search?q=" + bandIs + "&type=track&limit=10";


    

          $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
         $('#storage').text(JSON.stringify(response));

       
         for (i=0;i < response.tracks.items.length;i++){
         var p = $("<p>").text("Band Name:    " + bandIs);
         $(".container2").append(p);
         var album = $("<p>").text("Album Name:   " + response.tracks.items[i].album.name);
         $(".container2").append(album);
         var song = $("<p>").text("Song Name:    " + response.tracks.items[i].name);
         $(".container2").append(song);
         var c = $("<button>");
          // Adds a class of movie to our button
          c.addClass("bandPlayClass");
          // Added a data-attribute
          c.attr("data-url", response.tracks.items[i].preview_url);
          // Provided the initial button text
          c.text(response.tracks.items[i].name);
          $(".container2").append(c);
          console.log(response.tracks.items[i].preview_url)
          }



  }) //closes done function response

 })//closes document ready function

});//closes document (bandclass) onclick function
       
