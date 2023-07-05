# AurumApp
## Setup the local environment to work with React Native
You need to follow the instruction of the official site, this is the link:
https://reactnative.dev/docs/environment-setup 
You need to set up the environment for iOS and Android for running the app 



## How to run the app?
1. Run this command in the root of the project in order to download the node dependencies(packages)
---- yarn ----
2. Run this command in the root of the project in order to download the pods for iOS project.
---- cd ios && pod install && cd .. ------
For general information
In the file package.json in the section 'script' you can find the commands to run the app according the environment you require.

Running Android App
1. Run this command to run in production environment
---- yarn android:prod ----
note: this is the command for whatever environment
---- yarn android:<environment> ----

Running iOS App Intel Chip
1. Run this command to run in production environment
---- yarn ios:prod ----
note: this is the command for whatever environment
---- yarn ios:<environment> ----

Running iOS App M1 or M2 Chips
1. Run this command to run in production environment
---- arch -x86_64 yarn ios:prod ----
note: this is the command for whatever environment
---- arch -x86_64 yarn ios:<environment> ----