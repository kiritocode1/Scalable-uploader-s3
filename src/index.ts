import express from "express";
import cors from "cors";
import { generate } from "./utils";
import { simpleGit } from "simple-git";
import { getAllFiles } from "./file";
import path from "path"; 
import { uploadToS3 } from "./aws";
const app = express();
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/deploy", async (req, res) => {
    const { repoUrl } = req.body;
    if (!repoUrl) {
        res.status(400).json({ message: "Repo url is required" });
        return;
    }
    
	
    console.log(repoUrl);
    const id = generate();
    const pathUrl = path.join(__dirname, `output/${id}`);
        simpleGit().clone(repoUrl, pathUrl);
    const files = getAllFiles(pathUrl);
    // TODO: deploy files to s3 bucket
    for (const file of files) {
        await uploadToS3(file, path.join(pathUrl, file));
    }
    

    ! res.json({ message: "Deployed" });

});



