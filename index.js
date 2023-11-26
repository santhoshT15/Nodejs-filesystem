const express = require("express");
const fs = require("fs");
const path =require("path");

const app = express();
const port =3010;

const folderPath = 'all_files';

//Endpoint to create a text file with the current timestamp
app.post('/createFile', (req,res) =>{

    const currentDateTime = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, ''); // Format: YYYY-MM-DDTHH-mm-ss
    const fileName = `${currentDateTime}.txt`;
    const filePath = path.join(folderPath, fileName);
    const fileContent = currentDateTime;

    //Create a file and write the content
    fs.writeFile(filePath, fileContent, (err) =>{
        if(err){
            console.log(err);
            res.status(500).send("error in creating file");
        }else{
            console.log(`file ${fileName} is created successfully at ${folderPath}`);
            res.status(200).send("File created successfully");
        }
    });
});

//Endpoint to retireve all text files in the folder
app.get('/allFiles', (req,res) =>{
    //Read the content of the folder
    fs.readdir(folderPath, (err, files) =>{
        if(err){
            console.log(err);
            res.status(500).send('Error in loading files');
        }else{
            //log the list of files in the folder
            const textFiles = files.filter(file => path.extname(file) === '.txt');
      res.status(200).json({ files: textFiles });
        };
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
  