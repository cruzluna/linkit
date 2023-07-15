#!/usr/bin/python3
"""
If permission denied error, run the following command:

    chmod +x exec.py
"""
import os

beginning_message = "Running check before push"
bm = os.system("echo %s" %beginning_message)
build_command = os.system("npm run build")

print(f"Build command exited with code: {build_command}")
if build_command == 0: 
    print("Build succeeded, time to push")
else:
    print("Build failed, review npm run build error log")

current_working_directory = os.getcwd()
print("*---------------------*")
print("Push project --> ", current_working_directory.split('/')[-1])
print("*---------------------*")
