// 引入 vscode 模块, 包含了 VS Code 插件的API
const vscode = require('vscode')
const { window, workspace, commands } = require('vscode')
const { ConsoleMsg } = require('./consoleMsg/index.js')
const { StatusUi } = require('./statusUi/index.js')
const { getSerialArr } = require('./serialize/index.js')

// 暴露出去的函数 将会在插件被激活的时候被调用
exports.activate = (context) => {
    const consoleMsg = new ConsoleMsg()

	// resisterCommand 实现 定义在package.json中的命令
	// onCommand:consoleLog.displayLogMessage
	// commandId参 数必须与 package.json 中的command成员匹配, 即 consoleLog.displayLogMessage
	context.subscriptions.push(commands.registerCommand('consoleLog.showLog', async () => {
		// 每次命令被执行的时候都将执行你这里的代码		
		const editor = window.activeTextEditor // 当前文本编辑器
		if (!editor) return
		const document = editor.document   // 当前文件
		const selectedLen = editor.selections.length
        const tabSize = getTabSize(editor.options.tabSize)

        // 全局配置
        const config = workspace.getConfiguration('consoleLog')
        const properties = getExtensionProperties(config)

		// selections 选中的内容
		for (let i = 0; i < selectedLen; i++) {
			const selection = editor.selections[i]

			let wordUnderCursor = ''
			const rangeUnderCursor = document.getWordRangeAtPosition(selection.active)
			if (rangeUnderCursor) {
				// 获得鼠标下的文案
				wordUnderCursor = document.getText(rangeUnderCursor)
			}
			const selectedText = document.getText(selection) || wordUnderCursor
			const selectedLine = selection.active.line

			if (selectedText.trim().length !== 0) {
				// 编辑文本用于输入呗
				await editor.edit(textEditor => {
					consoleMsg.msg(Object.assign({}, properties, {
                        textEditor,
                        document,
                        selectedText,
                        selectedLine,
                        tabSize
                    }))
				})
			}
		}
	}))

    // 上面是快捷键输出 log 下面按 bar 清除 log
    const statusUi = new StatusUi()
    isExistLog() ? statusUi.live() : statusUi.offline()
    context.subscriptions.push(window.onDidChangeActiveTextEditor(() => {
        isExistLog() ? statusUi.live() : statusUi.offline()
    }))
    context.subscriptions.push(workspace.onDidSaveTextDocument(() => {
        isExistLog() ? statusUi.live() : statusUi.offline()
    }))
    context.subscriptions.push(commands.registerCommand('extension.clearLog', async () => {
        const editor = window.activeTextEditor
        if (!editor) return
        const document = editor.document
        const lineCount = document.lineCount
        editor.edit(editBuilder => {
            for (let i = 0; i < lineCount; i++) {
                const currentLine = document.lineAt(i)
                const currentText = currentLine.text ? currentLine.text.trim() : ''
                if (currentText.startsWith('console.log(')) {
                    editBuilder.delete(currentLine.rangeIncludingLineBreak)
                }
            }
        })
        await workspace.saveAll()
        statusUi.offline()
    }))

    // 个性化序列化
    context.subscriptions.push(commands.registerCommand('serialize.order', async () => {
        const editor = window.activeTextEditor
		if (!editor) return
		const document = editor.document
		const selectedLen = editor.selections.length
        
        const config = workspace.getConfiguration('serialize')
        const serialType = config.number || '1'
        const serialArr = getSerialArr(serialType, selectedLen)

        for (let i = 0; i < selectedLen; i++) {
			const selection = editor.selections[i]
            const selectedText = document.getText(selection)
            const { line, character } = selection.active
            const position = new vscode.Position(line, character)

			if (selectedText.trim().length) {
				await editor.edit(editBuilder => {
					editBuilder.replace(selection, serialArr[i])
				})
			} else {
                await editor.edit(editBuilder => {
					editBuilder.insert(position, serialArr[i])
				})
            }
		}
    }))
}

// 插件被释放时触发
exports.disposable = () => {}

/**
 *   解析配置文件字段
 */
function getExtensionProperties (workspaceConfig) {
    const logType = workspaceConfig.logType || 'log'
    const logPrefix = workspaceConfig.logPrefix || ''
    const logExtenSymbol = workspaceConfig.logExtenSymbol || ' '
    const quote = workspaceConfig.quote || '\''
    const addSemicolonInEnd = workspaceConfig.addSemicolonInEnd || false
    const showFileName = workspaceConfig.showFileName || false
    const showRow = workspaceConfig.showRow || false
    return {
        logType,
        logPrefix,
        logExtenSymbol,
        quote,
        addSemicolonInEnd,
        showFileName,
        showRow
    }
}

/**
 *   获取文本编辑器的tabSize
 */
function getTabSize (tabSize) {
    if (tabSize && typeof tabSize === 'number') {
        return tabSize
    } else if (tabSize && typeof tabSize === 'string') {
        return parseInt(tabSize)
    } else {
        return 4
    }
}

/**
 *   判断当前文件是否有console
 */
function isExistLog () {
    const editor = window.activeTextEditor
    if (!editor) return
    const document = editor.document
    const lineCount = document.lineCount
    for (let i = 0; i < lineCount; i++) {
        const currentLine = document.lineAt(i)
        const currentText = currentLine.text ? currentLine.text.trim() : ''
        if (currentText.startsWith('console.log(')) {
            return true
        }
    }
    return false
}
