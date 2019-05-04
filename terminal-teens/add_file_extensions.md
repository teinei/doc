back to home
[home](./index.md)

image link<br>
![img](./img/EPFL200x50.jpeg)


In a terminal environment
#### Change file extension
The command below will rename all files with the extension .php4 to .php
 ```
for f in *.php4; do mv $f `basename $f .php4`.php; done;
```
```
for file in *; do mv "$file" `echo $file | tr ' ' '_'` ; done;
```
//replace space with underscore

#### Add (append) an extension to all files<br>
The command below add the extension .mp4 to all files in the directory ```
for f in *; do mv $f `basename $f `.mp4; done;
```
```
for f in *; do mv $f `basename $f `.srt; done;
```

#### Remove (delete) an extension from all files<br>
The command below remove the extension .txt from all files in the directory ```
for f in *.txt; do mv $f `basename $f .txt`; done;
```

[reference](https://www.heatware.net/linux-unix/change-file-extensions-directory-linux/)

John.N.Y
