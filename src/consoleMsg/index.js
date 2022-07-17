const vscode = require('vscode')
const { TextEditorEdit, TextDocument, TextLine } = require('vscode')

class ConsoleMsg {
    
    /**
     *  输出Log
     */
    msg (options) {
        const {
            textEditor = TextEditorEdit,
            document = TextDocument,
            selectedText,
            selectedLine,
            tabSize,
            logType,
            logPrefix,
            logExtenSymbol,
            quote,
            addSemicolonInEnd,
            showFileName,
            showRow
        } = options

        const fileName = document.fileName.includes('/')
        ? document.fileName.split('/')[document.fileName.split('/').length - 1]
        : document.fileName.split('\\')[document.fileName.split('\\').length - 1]
        const fileNameCont = showFileName ? `[${fileName}]` : ''
        const rowCont = showRow ? `[${selectedLine + 2}row]` : ''

        const outputLine = whichLine(document, selectedLine)
        const spacesBeforeMsg = spacesBefore(document, selectedLine, tabSize)

        const codeMsg = `console.${logType}(${quote}${logPrefix}${fileNameCont}${rowCont}[${selectedText}]${logExtenSymbol}${quote}, ${selectedText})${addSemicolonInEnd ? ';' : ''}`
        textEditor.insert(
            new vscode.Position(outputLine, 0),
            `${spacesBeforeMsg}${codeMsg}\n`
        )
    }
}

function whichLine (document = TextDocument, selectedLine) {
    if (selectedLine === document.lineCount - 1) {
        return selectedLine
    }
    return selectedLine + 1
}

function spacesBefore (document = TextDocument, selectedLine, tabSize) {
    const currentLine = document.lineAt(selectedLine)
    return ' '.repeat(tabSize)
}


module.exports = {
    ConsoleMsg
}
