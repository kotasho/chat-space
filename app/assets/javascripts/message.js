$(function(){
  function build_messageHTML(message){
   
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                 <div class="upper-message">
                 <div class="upper-message__user-name">
                 ${message.user_name}
                 </div>
                 <div class="upper-message__date">
                 ${message.created_at}
                </div>
               </div>
               <div class="lower-meesage">
                 <p class="lower-message__content">
                 ${message.content}
                 </p>  
                 ${image}
              </div>
            </div> `
      return html;
  }

$('#item_form').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');

  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })

  .done(function(message){
    var html = build_messageHTML(message);
    $('.messages').append(html);
    $('.form__message').val('');
    $( ".form__submit").prop( "disabled", false );
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');  
  })
.fail(function(){
  alert('無効');
    })
  });

var reloadMessages = function() {
 
  if (location.pathname.match(/\/groups\/\d+\/messages/)) {
　var last_message_id = $('.message').filter(":last").data('message-id')
  
  $.ajax({  
    url: 'api/messages',
    type: 'get',
    dataType: 'json', 
    data: {last_id: last_message_id}
})

  .done(function(messages) {   
    var insertHTML = '';
 
  if (messages.length !== 0){
    messages.forEach(function(message){
      if (message.id > last_message_id){
      var html = build_messageHTML(message);
      $('.messages').append(html)   
      }
    })   
   } 
  }) 
   .fail(function() {
        alert('error');
      });    
    }
}
    setInterval(reloadMessages, 5000);  
});
