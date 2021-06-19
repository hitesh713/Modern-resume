$(document).ready(function () {

    $('#profile_ripple').ripples({
        resolution: 400,
        dropRadius: 10
    });

});

const bars = document.querySelectorAll('.progress_bar');

bars.forEach(function (bar) {
    let percentage = bar.dataset.percent;
    let tooltrip = bar.children[0];
    tooltrip.innerText = percentage + '%';
    bar.style.width = percentage + '%';



    //image filter

    var $wrapper = $('.portfolio_wrapper');

    //initalize isotope
    $wrapper.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOption: {
            duration: 750,
            easing: 'linear'
        }
    });

    let links = document.querySelectorAll('.tabs a');


    links.forEach(link => {

        let selector = link.dataset.filter;
        link.addEventListener('click', function (e) {
            e.preventDefault();


            $wrapper.isotope({
                filter: selector,
                layoutMode: 'masonry',
                animationOption: {
                    duration: 750,
                    easing: 'linear'
                }
            });

            links.forEach(link => {
                link.classList.remove('active');
            });

            e.target.classList.add('active');

        });
    });

    //magnify pop

    $('.magnify').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true
        }

    })
});



/* ------------ portfolio filters & popup ---------------*/



function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}



(() => {
    const filterContainer = document.querySelector(".tabs"),
        portfolioItemsContainer = document.querySelector(".project-wrapper"),
        portfolioItems = document.querySelectorAll(".project-item"),
        popup = document.querySelector(".project-popup"),
        prevBtn = popup.querySelector(".pp-previous"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;
    /*--- filter portfolio items ---- */
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            //deactivating existing active filter-item
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            //activating new filter item
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }

            })

        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".project-item-inner")) {
            const portfolioItem = event.target.closest(".project-item-inner").parentElement;
            //get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".project-item-img img").getAttribute("data-screenshots");
            //convert screenshots into an array
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlidershow();
            popupDetails();
        }
    });

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })


    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }


    function popupSlidershow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        //  active loader untill the popupImg loaded  //
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactive loader //
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }
    // next slide //
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlidershow();
    })
    // prev slide //
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1
        }
        else {
            slideIndex--;
        }
        popupSlidershow();
    })


    function popupDetails() {
        // if project details does not exists
        if (!portfolioItems[itemIndex].querySelector(".project-item-details")) {
            projectDetailsBtn.style.display = "none";
            return;  /*end function excecution*/
        }
        projectDetailsBtn.style.display = "block";
        //  getting the project details //
        const details = portfolioItems[itemIndex].querySelector(".project-item-details").innerHTML;
        // set project details //
        popup.querySelector(".pp-project-details").innerHTML = details;
        // get the project title //
        const title = portfolioItems[itemIndex].querySelector(".project-item-title").innerHTML;
        // set project title //
        popup.querySelector(".pp-title h2").innerHTML = title;
        // get the project category //
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // set project category //
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px"
        }
        else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "10px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }



})();



