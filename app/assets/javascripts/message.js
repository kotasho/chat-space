$(function(){
  function build_messageHTML(message){
    // var imagehtml = message.image !== null ? "" : `<img src="${message.image}class="lower-message__image">`
   
    // var image = message.is_image_present ? `<img src='${message.image.url}'> ` : ''
    // = image_tag message.image.url, class: 'lower-message__image' if message.image.present?
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



  // 自動更新
  
  // group_api_messages GET    /groups/:groupId/api/messages(.:format) api/messages#index {:format=>"json"}

  // var message_id = $('.chat__contents__content:last').data('message-id');
  
var reloadMessages = function() {
  // どこのページで動貸すのか記述
  if (location.pathname.match(/\/groups\/\d+\/messages/)) {
var last_message_id = $('.message').filter(":last").data('message-id')
  // console.log(last_message_id);
//  group_api_messages GET    /groups/:group_id/api/messages(.:format) api/messages#index {:format=>"json"}

  $.ajax({  
    url: 'api/messages',
    type: 'get',
    dataType: 'json', 
    data: {last_id: last_message_id}
})

// 1 controler
// 2

  .done(function(messages) {
    
    var insertHTML = '';
 

  // if (xxxxxxxxx) {
  // each xxxxxxxxxx
  
  if (messages.length !== 0){
    messages.forEach(function(message){
      if (message.id > last_message_id){
      var html = build_messageHTML(message);
      $('.messages').append(html)
      // $(".main-contents__body").animate({scrollTop:$('.main-contents__body__list')[0].scrollHeight});
      // ScrollToNewMessage();
      }
    })
    
  //   $.each(messages, function(i, message){
  //     var html = build_messageHTML(message);
  //   insertHTML += build_messageHTML(message);
  //   console.log('jj')
  //   $('.messages').append(insertHTML)
}
  
  //   })
  //  }
  })

  
   .fail(function() {
        alert('error');
      });
      
    // var interval = setInterval(function(){
    //   console.log('hhh');
    //    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    //    } 
    //   })
    }
}
    setInterval(reloadMessages, 5000);
  
});
