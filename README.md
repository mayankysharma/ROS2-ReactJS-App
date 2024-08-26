# ROS2-Web-App

This project is a web application that provides a user interface for controlling and interacting with Robot using ROS 2 commands. The application is built with a FastAPI backend and a React frontend.

## Features

- **Remote Mode:** Start the Robot in remote control mode.
- **SLAM + NAV:** Launch the Robot's SLAM (Simultaneous Localization and Mapping) and navigation system.
- **MAP + NAV:** Use a pre-built map for navigation.
- **Create Map:** Launch the process to create a new map using the Robot.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **ROS 2 Humble:** Installed on your machine. Follow the official ROS 2 installation guide for your operating system.
- **Python 3.8+**
- **Node.js and npm:** Required if you are running the React frontend.

## Setting Up the Backend

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-repo-url.git
    cd your-repo-directory
    ```

2. **Install the required Python packages:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Ensure ROS 2 is sourced:**

    Add the following line to your `.bashrc` or execute it in your terminal:

    ```bash
    source /opt/ros/humble/setup.bash
    ```

5. **Run the FastAPI server:**

    ```bash
    python3 backend.py
    ```

    The backend should now be running on `http://localhost:8000`.

## Setting Up the Frontend

1. **Navigate to the frontend directory (if applicable):**

    ```bash
    cd ros2-web-app/
    ```

2. **Install the required npm packages:**

    ```bash
    npm install
    ```

3. **Start the React development server:**

    ```bash
    npm start
    ```

    The frontend should now be running on `http://localhost:3000`.

## Run Front and Backend together
### Make sure to edit `start.sh` file by giving proper paths 
```bash
cd ros2-web-app/
./start.sh
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
