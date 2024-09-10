import express from "express";
import cors from "cors";
import { generate } from "./utils";
import { simpleGit, CleanOptions } from "simple-git";
import { getAllFiles } from "./file";
simpleGit().clean(CleanOptions.FORCE);
import path from "path"; 
import { uploadToS3 } from "./aws";
const app = express();
app.use(cors());
app.use(express.json());
import fs from "fs";




app.get("/", (req, res) => {
    return res.send("backend:stable");
});



/**
 *  Puts  the files in the S3 bucket 
 * @param req {Request}
 * @param res {Response}
 * @returns {Promise<void>}
 */
app.post("/deploy", async (req, res) => {
	const { repoUrl } = req.body;
	// example:   repoUrl = "https://github.com/kiritocode1/trial_app";

	if (!repoUrl) {
		res.status(400).json({ message: "Repo url is required" });
		return;
	}

	console.log(repoUrl);
	const id = generate();
	const pathUrl = path.join(__dirname, `output/${id}`);
	console.log(pathUrl);

	await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
	const files = await getAllFiles(pathUrl);
	// TODO: deploy files to s3 bucket
	files.forEach(async (file) => {
		await uploadToS3(file.slice(__dirname.length + 1), file);
	});

    //  TODO : return the id for queue processing.
	!res.json({ id: id });
});





app.listen(3000, () => {
	console.log("listening on port 3000");
});
