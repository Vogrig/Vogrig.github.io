/* 
    andrea vogrig © 2020
    static webstite template
*/

var content;

function Object(name,type,data) {

    this.name = name;
    this.type = type;
    this.data = data;

}

function newElementFromTag(tag, text) {

    const el = document.createElement(tag)
    el.textContent = text
    return el

}

function setHeaderPage(page){

    content.innerText = "";

    const item = newElementFromTag('span',page);
    item.className = "title";
    item.addEventListener('click', () => {
        init();
    });
    content.appendChild(item);

}

function changeContent(data,indent){

    if(Array.isArray(data)){
        data.forEach(i => {
            newElement(new Object(i.name,i.type,i.data),indent);
            //if(i.data)
                    //changeContent(i.data,++indent);  
        });
    }

}
  
function newElement(obj,indent){

    const item = newElementFromTag('div', "");
    const span = newElementFromTag('span',obj.name);

    if(indent)
        span.style.cssText = "margin-left:" + indent * 28 + "px; display:block;";
    
    switch(obj.type){
        case "page":
        case "github":
        case "link":
        case "rep":
            span.className = "title";
            break;
        case "image":
            span.innerText = "";
            const image = newElementFromTag('img',"");
            image.style.cssText = "margin:" + indent * 28 + "px; display:block;";
            image.setAttribute("src","images/"+obj.data.url);
            image.setAttribute("width",obj.data.width);
            image.setAttribute("height",obj.data.height);
            item.appendChild(image);
            break;
        case "video":
            break;
        case "text":
            break;
        default:
            console.log("ERROR: Object type not implemented.")
            break;
    }

    if(obj.data){
        span.addEventListener('click', () => {
            switch(obj.type){
                case "link":
                    window.location.href = obj.data;
                    break;
                case "rep":
                case "page":
                    setHeaderPage(obj.name);
                    changeContent(obj.data,1);
                    break;
                case "image":
                    break;
                case "video":
                    break;
                case "text":
                    break;
                case "github":
                    setHeaderPage(obj.name);
                    loadRepositories(obj.data);
                    break;
                default:
                    console.log("ERROR: Object type not implemented.")
                    break;
            }
        })
    }
    if(obj.type !== "image")
        item.appendChild(span);
    content.appendChild(item);

}

//jQuery.fn.loadRepositories
 function loadRepositories(username) {
    
    $.getJSON( "https://api.github.com/users/"+ username + "/repos",function(repos) {
    
        repos.forEach(rep => {

            if(!rep.fork){
               const stars = "*".repeat(rep.stargazers_count);
                newElement(new Object("·"+rep.name.toLowerCase() + stars.toString(),"rep",
                [
                    {
                        "name":rep.description,
                        "type":"text",
                    },
                    {
                        "name":"link",
                        "type":"link",
                        "data":rep.html_url
                    },
                    
                ]
                ),1);
                //.created_at
                //.updated_at      
            }      
        });
        
    });
  
};

function init(){

    indent = 0;

    content.innerText = "";
    
    w_data.forEach(j => {
        newElement(new Object(j.name,j.type,j.data),indent);
    });

}

window.addEventListener('load', (event) => {

    content = document.getElementById("content");

    var footer = document.getElementById("footer");
    const about_link = document.querySelector('#about');
    const home_link = document.querySelector('#home-link');

    footer.appendChild(newElementFromTag("span", " " + w_info.name + " © " + new Date().getFullYear()));

    home_link.addEventListener('click', () => {
        init();
    });
    about_link.addEventListener('click', () => {
        content.innerText = w_info.about;
    });

    init();
});