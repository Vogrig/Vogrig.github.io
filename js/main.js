/* 
    andrea vogrig © 2020
    static webstite template
*/


function newElementFromTag(tag, text) {
    const el = document.createElement(tag)
    el.textContent = text
    return el
}

function newRepository(div,name,description,url){
    const item = newElementFromTag('div', "");
    const span = newElementFromTag('span',"\t "+name);
    item.className = "menu";
    span.className = "title rep";
    span.addEventListener('click', () => {
        window.location.href = url;
    });
    item.appendChild(span);
    div.appendChild(item);
}


function init(){
    
    const content = document.getElementById("content");
  
    const links = ["code/", "music/", "projects/", "fun/"];

    content.innerText = "";

    links.forEach(element => {
        //<div class="menu"><span id="fun" class="title">fun/</span></div> 
        const item = newElementFromTag('div', "");
        const span = newElementFromTag('span',element);
        item.className = "menu";
        span.className = "title";
        span.addEventListener('click', () => {
            if(element === "code/"){
                content.innerText = "";
                $("#opensource-projects").loadRepositories("Vogrig");
            }
            console.log(element);
        });
        item.appendChild(span);
        content.appendChild(item);
    });
}


jQuery.fn.loadRepositories = function(username) {
    
    this.html("<span>fetching" + username +"'s github repositories...</span>");

    const content = document.getElementById("content");

    var target = this;

    const item = newElementFromTag('span',"code:")
    content.appendChild(item);
    
    $.getJSON( "https://api.github.com/users/"+ username + "/repos",function(data) {
    
        data.forEach(rep => {
            if(!rep.fork)
                newRepository(content,rep.name.toLowerCase(),rep.description,rep.html_url);
            //.created_at
            //.updated_at            
        });
        
    });
  
};

window.addEventListener('load', (event) => {
        
    const about_link = document.querySelector('#about');
    const home_link = document.querySelector('#home-link');
    home_link.addEventListener('click', () => {
        //window.location.reload();
        init();
    });
    about_link.addEventListener('click', () => {
        console.log("about pressed");
        content.innerText = "i'm andrea vogrig, an italian programmer, artist and researcher currently based in the netherlands, den haag."
    });

    init();
   

});