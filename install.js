module.exports = {
  "cmds": {
    "nvidia": "pip install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu118",
    "amd": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.6",
    "default": "pip install torch torchvision torchaudio"
  },
  "requires": [{
    "type": "conda",
    "name": "ffmpeg",
    "args": "-c conda-forge"
  }, {
    "gpu": "nvidia",
    "name": "cuda",
  }],
  "run": [{
    "method": "shell.run",
    "params": { "message": "git clone https://github.com/candywrap/vid2pose app" }
  }, {
    "method": "shell.run",
    "params": {
      "venv": "env",
      "path": "app",
      "message": [
        "{{(gpu === 'nvidia' ? self.cmds.nvidia : (gpu === 'amd' ? self.cmds.amd : self.cmds.default))}}",
        "pip install opencv-python gradio==3.50.2",
        "pip install -U openmim mmengine mmcv mmdet mmpose",
        "pip install -r requirements.txt"
      ]
    }
  }, {
    "method": "input",
    "params": { "title": "Install Success", "description": "Go back to the dashboard and launch the app!" }
  }, {
    "method": "notify",
    "params": {
      "html": "Click the 'start' tab to get started!"
    }
  }]
}
