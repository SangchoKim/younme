import lottie from 'lottie-web';

const _lottie = (element) =>{
    if(element==='animation1'){
        _gifForth(element);
    }else if(element==='animation2'){
        _gifFirst(element);
    }else if(element==='animation3'){
        _gifSecond(element);
    }else if(element==='animation4'){
        _gifThird(element);
    }
}

const _gifForth = (element) => {
    lottie.loadAnimation({
        container: document.getElementById(element), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/159-servishero-loading.json' // the path to the animation json
      });
}

const _gifFirst = (element) =>{
    lottie.loadAnimation({
        container: document.getElementById(element), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/128-around-the-world.json' // the path to the animation json
      });
}

const _gifSecond = (element) =>{
    lottie.loadAnimation({
        container: document.getElementById(element), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/8134-dont-worry-be-happy.json' // the path to the animation json
      });
}

const _gifThird = (element) =>{
    lottie.loadAnimation({
        container: document.getElementById(element), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/8144-battery-low-humour-animation.json' // the path to the animation json
      });
}

export { 
    _lottie,
} ;