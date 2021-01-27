// Attaches click handlers. Wait until the DOM is fully loaded first.
$( document ).ready( function() {
    $( ".change-devoured" ).on( "click", function( event ) {
       const id = $( this ).data( "id" );
       
       const newDevour = $( this ).data( "newdevour" );

       const newDevourState = {
           devoured: newDevour
       };

       $.ajax( `/api/burgers/${id}`, {
           type: "PUT",
           data: newDevourState
       }).then(
           function() {
               console.log( "Changed devoured to", newDevour );
               // Reload page to get new results.
               location.reload();
           }
       )
    });

    $( ".create-form" ).on( "submit", function( event ) {
        event.preventDefault();

        const newBurger = {
            burger_name: $( "#bu" ).val().trim(),
            devoured: $( "[name=devoured]:checked" ).val().trim()
        }

        $.ajax( "/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log( "Created a new burger!" );
                // Reload the page to get new results.
                location.reload();
            }
        );
    });

    $( ".delete" ).click( function() {
        const id = $( this ).data( "id" );

        $.ajax( `/api/burgers/${ id }`, {
            type: "DELETE"
        }).then( function() {
            console.log( `Burger #${ id } has been deleted.` );
            location.reload();
        })
    })
});