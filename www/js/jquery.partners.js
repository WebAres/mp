$( document).ready( function(){

    //
    $(".niceCheck").each( function() {
        changeCheckStart($(this));
    });



    // map initializing ===========================
    var defAddress = $( '.partners-map__header .show-on-map').attr( 'data-address' ),
        mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        },
        image = new google.maps.MarkerImage('img/map-marker-green.png',
            new google.maps.Size(39, 46)
        ),
        map = new google.maps.Map( $( '.map-wrap').eq( 0 )[ 0 ], mapOptions),
        marker = marker = new google.maps.Marker({
            map: map,
            icon: image
        }),
        geocoder = new google.maps.Geocoder();


    // get map position by address ===============================
    function getPosByAddress( address ) {
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker.setPosition( results[0].geometry.location );
                /*marker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    position: results[0].geometry.location
                })*/
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
    getPosByAddress( defAddress );


    $( '.show-on-map').on( {
        click: function(){
            var address = $( this).attr( 'data-address' );
            getPosByAddress( address );
            return false;
        }
    } );


} );

