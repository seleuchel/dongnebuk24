<!-- connet to read json server and set markup in google map -->
<!DOCTYPE html>
<html>
  <head>
    <style>
       /* Set the size of the div element that contains the map */
      #map {
        height: 400px;  /* The height is 400 pixels */
        width: 50%;  /* The width is the width of the web page */
       }
    </style>
  </head>
  <body>

    <!--The div element for the map -->
    <div id="map"></div>
    <script>

      var leti = '';
      var loni = '';

      var M = [];
      var test= '';

// Initialize and add the map
async function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.793279, lng: 124.710349};
  //var demon = ;
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 1, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
  //test = new google.maps.Marker({position:{lat:-28.57, lng :119.22 }, map: map});

//  var i = 0;
  //let url = 'http://168.131.153.40:8000/api/locations/1/' + i + '/';



 setInterval(async function (){

      url = 'http://168.131.153.40:8000/api/locations/1/';
   fetch(url, { // URL인자값 더하기
  method: 'GET'
  }).then(
       function(response) {
         if (response.status !== 200) {
           console.log('Looks like there was a problem. Status Code: ' +
             response.status);
           return;
         }

         // Examine the text in the response
         response.json().then(function(data) {
           console.log(data);
           //for(var i = 0 ; i < 20 ; i++){
          //   let = data.features[0].geometry.coordinates[0][i][1];
            // lon = data.features[0].geometry.coordinates[0][i][0];
            lati = parseFloat(data.latitude);
            lngi = parseFloat(data.longitude);
            var pos = {lat:lati, lng:lngi};
             console.log(pos);

            test = new google.maps.Marker({position: pos, map: map});

         //}

         });

     )
     .catch(function(err) {
       console.log('Fetch Error :-S', err);
     });

   }
 }, 5000);

}
    </script>
    <!--Load the API from the specified URL
    * The async attribute allows the browser to render the page while the API loads
    * The key parameter will contain your own API key (which is not needed for this tutorial)
    * The callback parameter executes the initMap() function
    -->
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh7WAY4iFGD2LBufHnBFuIBSzpIKABqhI&callback=initMap">
    </script>
  </body>
</html>
