const path = require('path')
module.exports = {
  version: 1,
  title: "vid2pose",
  description: "Video to Openpose & DWPose (All OS supported) https://github.com/sdbds/vid2pose",
  icon: "icon.gif",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "env")
    let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: `Terminal (${local.type})`,
            href: "start.js",
          }]
        } else {
          return [{
            icon: 'fa-solid fa-terminal',
            text: `Terminal (${local.type})`,
            href: "start.js",
          }]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Openpose",
          href: "start.js",
          params: {
            type: "openpose"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Openpose Hand",
          href: "start.js",
          params: {
            type: "openpose_hand"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Openpose Face",
          href: "start.js",
          params: {
            type: "openpose_face"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Openpose Full",
          href: "start.js",
          params: {
            type: "openpose_full"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "DWPose",
          href: "start.js",
          params: {
            type: "dwpose"
          }
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-broom",
          text: "Factory Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
