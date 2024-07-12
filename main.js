const API_KEY = `557ab4c2cf244be5a7d3bd6382bcb22a`;
let newsList = [];
const getLatesNews = async () => {
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();   
    newsList = data.articles;
    render();
};
getLatesNews();

const render=()=>{
    const newsHTML = newsList.map(
        (news)=>`<div class="row news">
            <div class="col-lg-4">
                <img class="news_img_size" src="${news.urlToImage}"onerror="this.onerror=null; this.src='https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg';">
                
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                    <p>${
                        news.description == null || news.description == ""
                        ? "내용없음"
                        : news.description.length > 200
                        ? news.description.substring(0, 200) + "..."
                        : news.description
                    }</p>
                <div>
                    <div>${news.source.name || "no source"}  ${moment().subtract(10, 'days').calendar()}</div>
                    </div>
                    </div>
                    </div>`).join('');
                    document.getElementById("news_board").innerHTML = newsHTML;
                }


const input = document.getElementById("input2");
const SearchButton = document.getElementById("Search_button");

let count = 0
const disnone = () =>{    
    if(count == 0){
        console.log(123)
        input.classList.add("none");
        count += 1;
    }
    else if(count == 1){
        console.log(123)
        input.classList.remove("none");
        count -=1;
    }
};

const menus =document.querySelectorAll("#menu button");
menus.forEach(menu2=>menu2.addEventListener("click", (event)=>getnewByCategory(event)))

const getnewByCategory = async (event)=>{
    const category = event.target.textContent.toLowerCase();
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data2 = await response.json();
    newsList = data2.articles;
    render();
}


const getNewByKeyword = async () =>{    
    const keyword = document.getElementById("input_text").value;
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}&country=kr&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data3 = await response.json();
    newsList = data3.articles;
    render();
};

const menu = document.getElementById("menu");
const close = document.getElementById("close");
const hamBar = document.getElementById("hamBar_img");
let count2 = 0;

hamBar.addEventListener("click", function(){
    if(count2 == 0){
        menu.style.animation = "slidein 0.5s forwards";
        count2++;
    }   
close.addEventListener("click", function(){
    if(count2 == 1){
        menu.style.animation = "slideout 0.5s forwards";
        count2--; 
    }
})
})

const inputext = document.getElementById("input_text")

inputext.addEventListener("keypress", function(event) {
    if(inputext.value == ""){
        return;
    }

    if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("input_submit").click();
    inputext.value = "";
    }
    
});
