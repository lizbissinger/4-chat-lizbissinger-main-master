const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const username = document.getElementById("user-name");

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
  // Loop over the messages. Inside the loop we will:
      // get each message
      // format it
      // add it to the chatbox
  let formattedMessages = "";
  messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}


const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}




function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}


function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}


sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});

savebutton.addEventListener("click", function(sendButtonClickEvent){
    saveButtonClickEvent.preventDefault();
    const save = localStorage.getItem('user-name');
    const username = username.value;
    
    saveName(save,username);
    username.value = "";

})

function validate() {
    if(validateFields){
        localStorage.setItem('user-name', userInput[0].value);
      }
   }
  
  function validateFields(){
   var retVal = false;
   var userInput = document.querySelectorAll("name-input");
    var regex = /[^a-z|^A-Z|^0-9|^\s^\w+^\"']/;
   for(var i = 0; i < userInput.length; i++) {
      if(userInput[i].value === "") {
        alert("Please fill all required fields!");
        break;
      }
      else if(userInput[i].value.match(regex)) {
        alert("Please use an appropriate symbols!");
        break;
      }else{
        retval = true;
      }
    }
   return username.value;
  }