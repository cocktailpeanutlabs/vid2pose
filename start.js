module.exports = {
  "daemon": true,
  "run": [{
    "method": "local.set",
    "params": {
      "type": "{{input.type}}"
    }
  }, {
    "method": "shell.run",
    "params": {
      "venv": "env",
      "env": {
        "PYTORCH_ENABLE_MPS_FALLBACK": "1"
      },
      "path": "app",
      "message": "python video2openpose2.py --pose_model={{local.type}}",
      "on": [ { "event": "/https?:\/\/[0-9.:]+/", "done": true } ]
    }
  }, {
    "method": "local.set",
    "params": {
      "url": "{{input.event[0]}}"
    }
  }]
}
