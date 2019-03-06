// SLIDER START

let sliderList = [],
	pagination = document.querySelectorAll('.pagination-item'),
	sliderQuantity = document.querySelectorAll('.slide').length,
	sliderWrapper = document.querySelector('.slider-list'),
	sliderInterval = setInterval(nextSlide,5000),
	slides = document.querySelectorAll('.slide'),
	paginationWrapper = document.querySelector('.pagination'),
	nextBtn = document.querySelector('.next-btn'),
	prevBtn = document.querySelector('.prev-btn');



function Slide(index, status, slide) {
    this.id = index;
    this.isActive = status;
    this.slide = slide;
};

function changeSlide(elem) {
	let slides = document.querySelectorAll('.slide');
	for (let i = 0; i < sliderQuantity; i++) {
		slides[i].classList.remove('active')
	};
	elem.classList.add('active');
};

function changeClassPagination(index) {
	for (let i = 0; i < pagination.length; i++) {
		pagination[i].classList.remove('active')
	};
	pagination[index].classList.add('active');
};

function changeSlideByPagination() {
	let index = this.getAttribute('data-index');
	changeSlide(sliderList[index].slide);
	changeClassPagination(index);

};

function nextSlide() {
	for (let i = 0; i < sliderQuantity; i++) {
		if (sliderList[i].isActive) {
			if (i == sliderQuantity - 1) {
				sliderList[i].isActive = false
				sliderList[0].isActive = true
				changeSlide(sliderList[0].slide);
				changeClassPagination(0);
				break;
			}
			sliderList[i].isActive = false;
			sliderList[i + 1].isActive = true;
			changeSlide(sliderList[i + 1].slide);
			changeClassPagination(i + 1);
			break;
		};
	};
};

function prevSlide() {
	for (let i = 0; i < sliderQuantity; i++) {
		if (sliderList[i].isActive) {
			if (i == 0) {
				sliderList[i].isActive = false;
				sliderList[sliderList.length - 1].isActive = true;
				changeSlide(sliderList[sliderList.length - 1].slide);
				changeClassPagination(sliderList.length - 1);
				break; 
			};
			sliderList[i].isActive = false;
			sliderList[i - 1].isActive = true;
			changeSlide(sliderList[i - 1].slide);
			changeClassPagination(i - 1);
			break;
		};
	};
};

for (let i = 0; i < sliderQuantity; i++) {
	let elem = document.querySelector('.slider-list').children;
	sliderList[i] = new Slide (
			i,
			elem[i].classList.contains('active'),
			elem[i]
		);
};

for (let i = 0; i < sliderQuantity; i++) {
	slides[i].onmouseover = function() {
		clearInterval(sliderInterval);
	}
	slides[i].onmouseout = function() {
		sliderInterval = setInterval(nextSlide,5000);
	}
};

paginationWrapper.onmouseover = function() {
	clearInterval(sliderInterval);
};
paginationWrapper.onmouseout = function() {
	sliderInterval = setInterval(nextSlide,5000);
};

nextBtn.onmouseover = function() {
	clearInterval(sliderInterval);
};
nextBtn.onmouseout = function() {
	sliderInterval = setInterval(nextSlide,5000);
};

prevBtn.onmouseover = function() {
	clearInterval(sliderInterval);
};
prevBtn.onmouseout = function() {
	sliderInterval = setInterval(nextSlide,5000);
};

for(let i = 0; i < pagination.length; i++) {
	pagination[i].onclick = changeSlideByPagination;
};

nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

// SLIDER END

// VIDEO PLAYER START

let mediaPlayer = document.querySelector('.video-block__inner'),
	duration = document.querySelector('.controls__time-code'),
	controls = document.querySelector('.video-block__controls');

mediaPlayer.controls = false;

document.querySelector('.controls__play-pause').onclick = playPause;


function playPause() {
	let btn = document.querySelector('.controls__play-pause');
	if (mediaPlayer.paused || mediaPlayer.ended) {
		mediaPlayer.play();
		controls.classList.add('hidden');
		setTimeout(resetControl,Math.round(mediaPlayer.duration)*1000);
	} else {
		mediaPlayer.pause();
	}
};

function resetControl() {
		controls.classList.remove('hidden');
};

window.onload=function(){
	duration.innerHTML = Math.floor(Math.round(mediaPlayer.duration)/60) + ' : ' + Math.round(mediaPlayer.duration) % 60;
};
// VIDEO PLAYER END

// CAROUSEL START
let carouselWidth = Math.round(document.querySelector('.recent__content').clientWidth),
	carouselStep = 0,
	leftBtn = document.querySelector('.carousel-controls__left-btn'),
	rightBtn = document.querySelector('.carousel-controls__right-btn'),
	carouselWrapper = document.querySelector('.content__list'),
	carouselQuantity = document.querySelectorAll('.content__list .list__item').length / 3;

function carouselRight() {
		if (leftBtn.classList.contains('disabeld-left')) {
			leftBtn.classList.remove('disabeld-left');
		};
		if (rightBtn.classList.contains('disabeld-right')) {
		} else {
			carouselStep++;
			carouselWrapper.style.left = -(carouselStep*carouselWidth) + 'px';
			if (carouselStep == carouselQuantity - 1) {
				rightBtn.classList.add('disabeld-right');
			}	
		};	
};

function carouselLeft() {
		if (rightBtn.classList.contains('disabeld-right')) {
			rightBtn.classList.remove('disabeld-right');
		};
		if (leftBtn.classList.contains('disabeld-left')) {;
		} else {
			carouselStep--;
			carouselWrapper.style.left = -(carouselStep*carouselWidth) + 'px';
			if (carouselStep == 0) {
				leftBtn.classList.add('disabeld-left');
			}	
		};	
};	

leftBtn.onclick = carouselLeft;
rightBtn.onclick = carouselRight;	
// CAROUSEL END
