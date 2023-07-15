#!/usr/bin/python3
"""
If permission denied error, run the following command:

    chmod +x exec.py
"""
import os
import subprocess

beginning_message = "Running check before push"
bm = os.system("echo %s" %beginning_message)

build_process = subprocess.Popen("npm run build", stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
stdout, stderr = build_process.communicate()

print(stdout.decode())
if build_process.returncode == 0:
    print("Build succeeded, time to push")
    current_working_directory = os.getcwd()
    print("*---------------------*")
    print("Push project --> ", current_working_directory.split('/')[-1])
    print("*---------------------*")
else:
    print(stderr.decode())
    print("Build failed, review npm run build error log")
