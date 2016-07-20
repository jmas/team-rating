function watchForWindowClose (win, callback) {
    if (! win.closed) {
        setTimeout(() => {
            watchForWindowClose(win, callback);
        }, 1000);
        return;
    }
    callback();
}

export function openWindow (url, onClose=null, width=500, height=600, id='win') {
    let left = (screen.width / 2) - (width / 2);
    let top = (screen.height / 2) - (height / 2);
    let params = [
        'width='+width,
        'height='+height,
        'left='+left,
        'top='+top,
        'toolbar=no',
        'location=no',
        'directories=no',
        'status=no',
        'menubar=no',
        'scrollbars=no',
        'resizable=no',
        'copyhistory=no'
    ];
    let win = window.open(url, id, params.join(','));
    if (win) {
        win.focus();
        if (onClose) {
            watchForWindowClose(win, onClose);
        }
    } else {
        if (onClose) {
            onClose();
        }
    }
    return win;
}

export function requestFullScreen (el=null) {
    el = el || document.documentElement;
    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

export function exitFullScreen () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

export function triggerEvent (name, data=null, el=null) {
    let event = document.createEvent('Event');
    el = el || document;
    event.initCustomEvent(name, true, true, data);
    el.dispatchEvent(event);
}

export function isInFullScreen () {
    return (window.fullScreen) ||
        (window.innerWidth == screen.width && window.innerHeight == screen.height);
}