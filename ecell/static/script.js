$(document).ready(function() {
    for(let i=1;i<=5;i++){
        $('#read-more-' + i).click(function(){
            $('#long-description-'+i).show();
            $('#read-less-'+i).show();
            $('#read-more-'+i).hide();
        });
        $('#read-less-' + i).click(function(){
            $('#long-description-'+i).hide();
            $('#read-less-'+i).hide();
            $('#read-more-'+i).show()
        });
    }
});

ScrollReveal().reveal('.scroll-animation',{distance:"50px",opacity:0,duration:1000});
ScrollReveal().reveal('.scroll-delay-1',{distance:"50px",opacity:0,duration:1000,delay:500});
ScrollReveal().reveal('.scroll-delay-2',{distance:"50px",opacity:0,duration:1000,delay:1000});
ScrollReveal().reveal('.scroll-delay-3',{distance:"50px",opacity:0,duration:1000,delay:1500});
ScrollReveal().reveal('.scroll-delay-4',{distance:"50px",opacity:0,duration:1000,delay:2000});
ScrollReveal().reveal('.scroll-delay-5',{distance:"50px",opacity:0,duration:1000,delay:2500});
