module.exports = async (kernel) => {
  let cmd = "pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 --index-url https://download.pytorch.org/whl/cpu"
  if (kernel.platform === 'darwin') {
    if (kernel.arch === "arm64") {
      cmd = "pip install torch torchaudio torchvision"
    } else {
      cmd = "pip install torch==2.1.2 torchaudio==2.1.2"
    }
  } else {
    if (kernel.gpu === 'nvidia') {
      if (kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
        cmd = "pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      } else {
        cmd = "pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 xformers --index-url https://download.pytorch.org/whl/cu121"
      }
    } else if (kernel.gpu === 'amd') {
      cmd = "pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 --index-url https://download.pytorch.org/whl/rocm5.6"
    } 
  }
  return {
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
          cmd,
          "pip install opencv-python gradio==3.50.2 moviepy==1.0.3",
          "pip install mmcv==2.1.0 -f https://download.openmmlab.com/mmcv/dist/cu121/torch2.1/index.html",
          "pip install -U openmim",
          "mim install mmengine==0.10.5 mmdet==3.2.0 mmpose==1.3.2",
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
}
