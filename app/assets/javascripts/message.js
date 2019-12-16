$(function(){
  var buildHTML = function(message) {
    if (message.image){
      var image = `<img src="${message.image}">`
    }else{
      var image = ""
    }  
      var html = 
                    `<div class="chat-main__message-big" data-id="${message.id}">
                      <div class="chat-main__message-list">
                        <div class="chat-main__message-name">
                          ${message.user_name}
                        </div>
                        <div class="chat-main__message-name__data">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="chat-main__message-comment">
                        <p class="chat-main__message-comment">
                          ${message.content}
                        </p>
                      </div>
                    </div>`
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
      console.log(html)
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.chat-main__form__btn').prop('disabled', false);
    })
    .fail(function(){
      alert("error");
    }) 
  });  
  var reloadMessages = function() {
    last_message_id = $(".chat-main__message-big:last").data("id")
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $('.chat-main__message').append(insertHTML);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      })
    })
    .fail(function() {
      alert("error");
    });
  };
      setInterval(reloadMessages, 7000);
});
