# zb-extension README

This is the README for your extension "zb-extension". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**


```
// 一个插件必须在该属性中描述的什么条件下被激活
// contributes: 设置激活命令执行, #number 都是在这个属性里面配置的
activationEvents: []

// 可以是一直激活
1. ["*"]
// 可以是插件命令激活
2. [onComand:xx1]
#2. commands: [{ command: 'xx1' }]
// 可以是按键激活
3. [onComand:xx2]
#3. keybindings: [{ command: 'xx2, key: 'ctrl+shift+l', mac: 'ctrl+shift+l' }]

// 主要JavaScript代码位置
main: "extension.js"
```

```
###contributes###

* configuration:   设置，配置一些全局变量
* commands:        命令
* menus:           菜单/'右键菜单', '右上角图标', '资源管理器右键菜单'
* keybindings:     快捷键绑定
* themes:          主题
* snippets:        代码片段
* views:           左侧侧边栏内, view的实现
* viewsContainers: 自定义activityBar, '左侧侧边栏最大的图标'
```
