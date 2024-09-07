import { S3 } from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const { AccessKeyId, SecretAccessKey, S3ClientLink } = process.env;

const s3Client = new S3({
	accessKeyId: AccessKeyId ,
	secretAccessKey: SecretAccessKey,
	endpoint: S3ClientLink,
});

/**
 *
 * @param filename {string}
 * @param localfilepath {string}
 *
 * basically uploads to the s3 bucket
 *  @example uploadToS3("test.txt", "C:\\Users\\aryan\\Desktop\\deployer\\src\\test.txt")
 */
export const uploadToS3 = async (filename: string, localfilepath: string) => {
	console.log("uploading to s3 - " + filename);
	const fileContents = fs.readFileSync(localfilepath);
	try { 
			const response = await s3Client
		.upload({
			Bucket: "sellerhub-bucket",
			Body: fileContents,
			Key: filename,
		})
			.promise();
		

	} catch (error) {
		
	}

	
};
