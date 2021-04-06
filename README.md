# HomeAutomation Web-App

This web application is a simple dashboard that allows users to control AWD (Automatic Watering Devices) and was designed for local home network devices. Application allows user to change single AWD parameters such as humidity pump start/stop level or voltage level (percentage 0 - 100% of voltage PWM).

In order to test pump that is connected to AWD user may use "PUMP TEST" field to do so.

# How to use App

After cloning this application you need to install every necessary packages by running single command in terminal

```sh
npm install
```

When the installation finishes you can run web application by putting command

```sh
npm start
```

After that open your web browser and go to https://localhost:3000. This should open **HomeAutomation** Web App.

# Used technologies

All the application has been written with **Typescript** in React library. To do requests to IoT AWD Devices axios library was used.

Other technologies: **framer-motion**, **react-router**, **redux** with **react-redux**, **redux-toolkit**, **redux-saga**, **styled-components**

# Screenshots (OLD)

After starting application user gets homepage that includes content of connected AWD devices. Additionally next to it application shows current weather from local station (station is manualy set by user in code).

Homepage incudes _CONNECTED AWD DEVICES_ card that shows currently connected AWD Devices. When there's no connected devices user sees specific information.

![main-no-devices-found](screenshots/screen1.png?raw=true "HomeAutomation no device")

When AWD Device has been discovered by **HomeAutomation** WebApp it's showed in homepage card.

![main-single-device-connected](screenshots/screen2.png?raw=true "HomeAutomation single device")

After hovering mouse pointer at the selected device it shows the flower that it waters (good if you forgot which device ID waters which flower in your house).

![main-mouse-hover](screenshots/screen3.png?raw=true "HomeAutomation hover selected device")

Left clicking on the selected IoT device opens control dialog in which user is able to change control parameters and test out pump by his own.

![main-single-device-menu](screenshots/screen4.png?raw=true "HomeAutomation dialog")
