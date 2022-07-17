const vscode = require('vscode')
const { window } = require("vscode")

class StatusUi {
    constructor () {
        this.statusBar = null
        this.init()
    }

    init () {
        if (!this.statusBar) {
            this.statusBar = window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100)
            this.statusBar.show()
        }
    }

    show () {
        this.statusBar.show()
    }

    hide () {
        this.statusBar.hide()
    }

    live () {
        this.statusBar.text = '$(close-all) Clear Log'
        this.statusBar.command = 'extension.clearLog'
        this.statusBar.tooltip = 'clear all log'
        this.show()
    }

    offline () {
        this.statusBar.text = '$(circle-slash) Clear Over'
        this.statusBar.command = null
        this.statusBar.tooltip = 'have not log to clear'
        this.show()
    }

    dispose () {
        this.statusBar.dispose()
    }
}

module.exports = {
    StatusUi
}
