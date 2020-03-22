navigator.getUserMedia({ video:true, audio:true},(stream)=>{
    var Peer = require('simple-peer')
    var local = new Peer({
        initiator:location.hash==='#init',
        trickle:false,
        stream: stream
    })

    local.on('signal',(data)=>{
        console.log(data)
        document.getElementById('local').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click',()=>{
        var remote_id = JSON.parse(document.getElementById('remote').value)
        local.signal(remote_id)
    })

    document.getElementById('send').addEventListener('click',()=>{
        var msg = document.getElementById('message').value
        try {
            local.send(msg)
            msg = document.getElementById('message').value = ''
        } catch (error) {
            alert('message couldn\'t be sent')
        }
    })

    local.on('data',(data)=>{
        document.getElementById('messages').textContent += data+'\n'
    })

    local.on('stream',(stream)=>{
        var video = document.getElementById('remoteVideo')
        const mediaStream = new MediaStream(stream);
        video.srcObject = mediaStream
        video.play()
    })
},(err)=>{
    console.log(err)
})