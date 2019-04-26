$(function(){
  function buildHTML(message){
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
              </div>
            </div> `
      return html;
  }

$('#item_form').on('submit', function(e){
  console.log(1)
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
  .done(function(data){
    console.log(data)
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.form__message').val('');
    $( ".form__submit").prop( "disabled", false );
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    //$('.hidden').val('')
})
.fail(function(){
  alert('error');
})
})
});
