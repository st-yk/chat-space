$(function(){
  var buildHTML = function(message) {
    if (message.text && message.image) {
      var html = `<div class="message" data-id= message.id 
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        message.user_name
                      </div>
                      <div class="upper-message__date">
                        message.date 
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        message.text 
                      </p>
                      <img src=" + message.image + " class="lower-message__image" >
                    </div>
                  </div>`
    } else if (message.text) {
      var html = `<div class="message" data-message-id= + message.id + >
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        message.user_name
                      </div>
                      <div class="upper-message__date">
                        message.date
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        message.text
                      </p>
                    </div>
                  </div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id= + message.id + >
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        message.user_name 
                      </div>
                    <div class="upper-message__date">
                      message.date  
                    </div> 
                  </div>
                    <div class="lower-message"> 
                      <img src=" + message.image + " class="lower-message__image" > 
                    </div> 
                  </div>`
             };
        return html;
  };

  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = location.href ;
    $.ajax({
      url: url, 
      type: 'POST',  
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })  
    
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__message').append(html);
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.chat-main__form__btn').prop('disabled', false);
    })
    .fail(function(){
      alert("error");
    }) 
  });  
  var reloadMessages = function() {
    last_message_id = message.id
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});

    })
    .fail(function() {
      alert("error");
    });
  };
  setInterval(reloadMessages, 7000);
});