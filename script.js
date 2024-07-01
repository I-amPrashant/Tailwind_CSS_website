
const wrapper = document.querySelector("#draggable-wrapper");
const carousel = document.querySelector("#draggable-slider-wrapper");
const firstCardWidth = carousel.querySelector(".draggable-items").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");



const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 4000);
}
// autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


//THE WAY TO CLOSE A SIDEBAR OR OTHER WHEN CLICKING OUTSIDE IT

const sidebar = document.getElementById('sidebar');
const hamburgerMenu = document.getElementById('hamburger');

function sidebarSlide() {
// Toggle the transform when clicking the hamburger menu
sidebar.style.transform === "translateX(0px)" ? sidebar.style.transform="translateX(-300px)" : sidebar.style.transform="translateX(0px)";
}

function handleOutsideClick(event){
// Check if the clicked element is the hamburger menu or a child element
if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
sidebar.style.transform = "translateX(-300px)";
}
}

// Event listener to show/hide the sidebar on click outside
document.addEventListener('click', handleOutsideClick);

                        //slider


//numbering the slides
let slideItems =document.getElementsByClassName("slideShows");
document.getElementById('total-index').innerHTML=`${slideItems.length}`
let currentIndex=document.getElementById('current-index')


//AUTOMATIC SLIDE
let slideIndex = 0;
let slideTimer;
showSlidesPlus(slideIndex);

function showSlidesPlus(){
let i;
let slides = document.getElementsByClassName("slideShows");
for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}
slideIndex ++;
if (slideIndex > slides.length) {slideIndex = 1}
slides[slideIndex-1].style.display = "block";
currentIndex.innerHTML=slideIndex;
clearTimeout(slideTimer);
slideTimer = setTimeout(showSlidesPlus, 8000); // Restart the timer after manual slide change// Change image every 8 seconds
}

function showSlidesMinus(){
let i;
let slides = document.getElementsByClassName("slideShows");
for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}
slideIndex --;
if (slideIndex < 1) {slideIndex = slides.length}
slides[slideIndex-1].style.display = "block";
currentIndex.innerHTML=slideIndex;
clearTimeout(slideTimer);
slideTimer = setTimeout(showSlidesPlus, 8000); // Restart the timer after manual slide change 
//    prevent the slides for changing quickly and preventing the slides from manual and automatic transition to overlap and cause error.
}


    //images filter
    const controlLinks = document.getElementById('control-links').getElementsByTagName('li');
    const portImages=document.getElementsByClassName('portfolio-images')


for (const item of controlLinks) { // Use 'for...of' instead of 'for...in'
    item.addEventListener('click', () => {
        for (var i = 0; i < controlLinks.length; i++) {
            controlLinks[i].classList.remove('active'); 
        }
        item.classList.add('active');
        for(var p=0; p<portImages.length ;p++){
            portImages[p].style.display='none'
        }
        for(var j=0; j<portImages.length ;j++){
            if(item.getAttribute("name") === portImages[j].getAttribute("name")){
                portImages[j].style.display='block';
            }  
            if(item.getAttribute("name") === 'all'){
                portImages[j].style.display='block'
            }
        }
    });
}


const toTop = document.querySelector(".to-top");
    
window.addEventListener("scroll", () => {
if (window.pageYOffset > 100) {
    toTop.classList.add("active");
} else {
    toTop.classList.remove("active");
}
})
    
    // active element set garna lai

    // const sectionLinks=document.getElementById("sidebar").getElementsByTagName("a")
    // for(const item of sectionLinks){
    //     item.addEventListener("click", function(){
            
    //         for(let i=0;i<sectionLinks.length;i++){
    //             if(sectionLinks[i].classList.contains("active")){
    //                 sectionLinks[i].classList.remove("active")
    //             }
    //         }
    //         item.classList.add("active");
    //     })
    // }
    
    const sections=document.getElementsByTagName("section")
    const sectionLinks=document.getElementById("sidebar").getElementsByTagName("a")
    
    for(const item of sections){

        const target = item
    function callback(entries, observer) {
         entries.forEach((entry) => {
            for(let i=0;i<sectionLinks.length;i++){
                if(sectionLinks[i].getAttribute("href").substring(1)===target.id){

                    if(entry.isIntersecting) {
                        sectionLinks[i].classList.add("active")
                    } else {
                      sectionLinks[i].classList.remove("active")
                        
                    }
                }
            }
        });
    }
    
    function createObserver(target, callback) {
       const options = {
          root: null,
          threshold: 0
       };
       const observer = new IntersectionObserver(callback, options);
       observer.observe(target);
    }
      
    createObserver(target, callback);

    }    
