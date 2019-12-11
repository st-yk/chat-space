$(function(){
  function buildHTML(message){// 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = 
      `<div class="chat-main__message-list">
        <div class="chat-main__message-name">
          ${message.user_name}
        </div>
      <div class="chat-main__message-name__data">
          ${message.date}
      </div>
      <div class="chat-main__message-comment"></div>
        <p class="chat-main__message-comment">
          ${message.text}
        </p>
        <img src="${message.image}">
      </div>`
    } 
    else {
      var html = //メッセージに画像が含まれない場合のHTMLを作る
      `<div class="chat-main__message-list">
        <div class="chat-main__message-name">
          ${message.user_name}
        </div>
          <div class="chat-main__message-name__data">
            ${message.date}
          </div>
        <div class="chat-main__message-comment"></div>
          <p class="chat-main__message-comment">
            ${message.text}
          </p>
        </div>`
    }
    return html
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    
    var url = location.href ;
    console.log(url)
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
});