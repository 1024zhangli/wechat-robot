var player = require('play-sound')(opts = {})
var path = require('path')

class MusicPlayer {

    constructor(fileName = 'wangfeng-empty.mp3') {
        this.fileName = path.join(__dirname, '../assets', fileName)
    }


    play() {
        this.player = player.play(this.fileName, err => {
            if (err && !err.killed) throw err
        })
        return this
    }

    stop() {
        this.player.kill()
    }

    getPlayer() {
        return this.player
    }
}

module.exports = MusicPlayer

