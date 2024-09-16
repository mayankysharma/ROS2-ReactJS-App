#!/bin/bash

# Start the ROS 2 backend
source /opt/ros/humble/setup.bash
source ~/ros2_ws/install/setup.bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml &

# Start the Node.js server
cd path to/backend/
node server.js &

# Navigate to the React app directory and start the React app
cd path to react app/
npm start