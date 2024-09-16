const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const runCommand = (command, res) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Failed to run command' });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Command execution error' });
    }
    console.log(`stdout: ${stdout}`);
    res.json({ message: 'Command executed successfully' });
  });
};

app.post('/run-remote-mode', (req, res) => {
  const command = `bash -c "source /opt/ros/humble/setup.bash && source ~/ros2_ws/install/setup.bash && echo 'Running Remote Mode'"`;
  runCommand(command, res);
});

app.post('/run-create-map', (req, res) => {
  const command = `bash -c "source /opt/ros/humble/setup.bash && source ~/ros2_ws/install/setup.bash && echo 'Creating Map'"`;
  runCommand(command, res);
});

app.post('/run-slam-nav', (req, res) => {
  const command = `bash -c "source /opt/ros/humble/setup.bash && source ~/ros2_ws/install/setup.bash && /opt/ros/humble/bin/ros2 run yolov5_ros2 yolov5_node"`;
  runCommand(command, res);
});

app.post('/run-map-nav', (req, res) => {
  const command = `bash -c "source /opt/ros/humble/setup.bash && source ~/ros2_ws/install/setup.bash && echo 'Running Map Navigation'"`;
  runCommand(command, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});