
// create a new element function
const createElement =(text,self=false,animation=false)=>{

    const newMessage = document.createElement('div');

    newMessage.classList.add('chatbox-message');

    if(self){
        newMessage.classList.add('self');
    }

    if (animation) {
        
        const img = document.createElement('img');
        img.src = 'images/animation.gif';
        img.alt = 'animation loading image';
    
        newMessage.appendChild(img);

    } else {
        const messageContent = document.createElement('p');

        messageContent.innerHTML = marked.parse(text);

        newMessage.appendChild(messageContent);
    }

    const chatbox = document.querySelector('.chatbox');
    chatbox.appendChild(newMessage);
}

// remove the animation
const removeAnimation = () => {
    const parentElement = document.querySelector('.chatbox');
    const lastAppendedChild = parentElement.lastChild;
    parentElement.removeChild(lastAppendedChild);
} 

const form_target = document.getElementById("chatbox-form");

form_target.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = document.querySelector("#message-input").value;

    createElement(message,true);
    createElement('',false,true);
    
    document.querySelector("#message-input").value = "";

    fetch('./php_files/bot.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({message})}).then(res => res.json())
    .then((res) => {
    console.log("🚀 ~ .then ~ res:", res)

        removeAnimation();
        createElement(res.output.output);
    })
    .catch(err => console.log(err));

})


