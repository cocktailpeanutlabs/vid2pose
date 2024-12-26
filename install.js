module.exports = {
  "cmds": {
    "nvidia": "pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 xformers --index-url https://download.pytorch.org/whl/cu121",
    "amd": "pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 --index-url https://download.pytorch.org/whl/rocm5.6",
    "default": "pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 --index-url https://download.pytorch.org/whl/cpu"
  },
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "git clone https://github.com/candywrap/vid2pose app"
    }
  }, {
    "method": "shell.run",
    "params": {
      "venv": "env",
      "path": "app",
      "message": [
        "{{(gpu === 'nvidia' ? self.cmds.nvidia : (gpu === 'amd' ? self.cmds.amd : self.cmds.default))}}",
        "pip install opencv-python gradio==3.50.2 moviepy==1.0.3",
        "pip install mmcv==2.1.0 -f https://download.openmmlab.com/mmcv/dist/cu121/torch2.1/index.html",
        "pip install -U openmim",
        "mim install mmengine mmdet mmpose",
        "python -m pip install -U pip",
        "pip install -r requirements.txt"
      ]
    }
  }, {
    "method": "fs.link",
    "params": {
      "venv": "app/env"
    }
  }, {
    "method": "notify",
    "params": {
      "html": "Go back to the dashboard and launch the app!"
    }
  }]
}
