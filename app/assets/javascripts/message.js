$(function(){
  function build_messageHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class=message>
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
                 ${imagehtml}
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
  alert('error');
})
})
});
