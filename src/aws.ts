import { S3 } from "aws-sdk";
import fs from "fs";
import "dotenv/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const { AccessKeyId, SecretAccessKey, S3ClientLink } = process.env;



if (!AccessKeyId || !SecretAccessKey || !S3ClientLink) {
	throw new Error("Missing AWS credentials");
}

const Client = new S3Client({
	region: "auto",
	// errors here
	endpoint: S3ClientLink,
	credentials: {
		accessKeyId: AccessKeyId,
		secretAccessKey: SecretAccessKey,
	},
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
	console.log(" uploading to s3 - " + filename);
	const fileContents = fs.readFileSync(localfilepath);
	try {
		const command = new PutObjectCommand({
			Bucket: "sellerhub-bucket",
			Key: filename,
			Body: fileContents,
		});
		const lol = await Client.send(command);

		console.log(" ✅ uploaded to s3 - " + filename, lol);
	} catch (error) {
		console.log(error);
	}
};
