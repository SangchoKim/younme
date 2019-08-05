import lottie from 'lottie-web';

const _lottie = (element) =>{
    console.log(element);
    lottie.loadAnimation({
        container: document.getElementById(element), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/159-servishero-loading.json' // the path to the animation json
      });
}

export { 
    _lottie 
} ;