$("#dbConf").submit(function(event) {
  /* stop form from submitting normally */
  event.preventDefault();
  /* get some values from elements on the page: */
  var $form = $( this ),
      url = $form.attr( 'action' );

  /* Send the data using post */
  var posting = $.post( url, { user: $('#user').val()
                             , pass: $('#pass').val()
                             , server: $('#server').val()
                             , db: $('#db').val()  } );

  /* Put the results in a div */
  posting.done(function( data ) {
    $("#result").empty().append(data);
  });
});