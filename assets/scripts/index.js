/*
*   22 July 2025
*   Matthew Hirschberger 
*
*   TODO:
*       I think this code would be a bit easier to track if all the 
*       slideshow variables were packaged into a struct.
*
*       I don't like tracking slideshow indices for multiple containers
*       in one array.
*/


// Startup variables
let timeoutId = null;

// Construct an array that represents the slideIndex of each slideshow
// [slideshow1.index slideshow2.index, ...]
//let slideshowIndices = Array(slideshows.length).fill(1);
let slideshowIndices = [1, 1, 1, 1, 1];

// TODO: Replace this with some code that dynamically gets the container ids
let slideshowIds = ["ff-slideshow", "fdss-slideshow", "nasa-dpl-slideshow", "mitre-slideshow", "gps-lab-slideshow"];

// Call the showSlides function for every slideshow
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);

function plusSlides(n, no) {
    showSlides(slideshowIndices[no] += n, no);
}

function showSlides(n, no) {

    // Collect all the slides in slideshow #no
    let slideshow = document.getElementById(slideshowIds[no]);

    let slides = slideshow.getElementsByClassName("slide");

    if (n > slides.length) {
        slideshowIndices[no] = 1;
    }

    if (n < 1) {
        slideshowIndices[no] = slides.length;
    }

    // Hide all of the slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remember JS indexes at 0
    slides[slideshowIndices[no] - 1].style.display = "inline";

    /*
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(showSlides, 5000);
    */
}