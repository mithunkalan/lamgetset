Your aws profiles are stored in your ~/.aws/config file
This is the file that will be used in the menu

You must add these 2 lines to your ~/bashrc file

alias lamgetset='/usr/bin/nodejs /home/...../.../.../index.js'

export AWS_PAGER=""

The first line will set a shortcut in your terminal so that you can access the menu in any directory. I use a different name instead of lamgetset. So its easy to bash 3 keys and tab to get the command to autocomplete.
The second line will make the AWS CLI that you should already have display the full output instead of that scrollable 'less' way


To upload existing directory to lambda
1) go into the directory that has your code. Usually there is the main index.js file.
2) type "lamgetset" enter
3) select your profile
4) it will list all existing lambdas. select one that you will be replacing
5) it will ask to download or upload, select upload.
6) it will zip the directory, upload the zip, delete the zip

To download existing  lambda to directory
1) go into the directory that will contain your code. Good idea to empty it, if you still have old code.
2) type "lamgetset" enter
3) select your profile
4) it will list all existing lambdas. select one that you will be replacing
5) it will ask to download or upload, select download.
6) it will download zip into the directory, unzip, delete the zip
