

async function streamMicrophoneAudioToSocket() {

    const imageTop = document.getElementById("imageTop");

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const audioContext = new AudioContext();
    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
    const analyserNode = audioContext.createAnalyser();
    mediaStreamAudioSourceNode.connect(analyserNode);

    const pcmData = new Float32Array(analyserNode.fftSize);
    const onFrame = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
        let value = Math.sqrt(sumSquares / pcmData.length) * 10000;
        let deg = value >= 1 ? value : 0;
        deg = deg <= 90 ? deg : 90;
        deg
        rotate(imageTop, -deg/5)
        window.requestAnimationFrame(onFrame);
    };
    window.requestAnimationFrame(onFrame);
    //window.setInterval(onFrame, 500)
};

window.onload = streamMicrophoneAudioToSocket;


function rotate(el,deg) {
    el.style.webkitTransform = 'rotate('+deg+'deg)'; 
    el.style.mozTransform    = 'rotate('+deg+'deg)'; 
    el.style.msTransform     = 'rotate('+deg+'deg)'; 
    el.style.oTransform      = 'rotate('+deg+'deg)'; 
    el.style.transform       = 'rotate('+deg+'deg)'; 
}