'use server'
import { v4 as uuidv4 } from "uuid";
import Customer from "@/database/models/Customer";
import xss from 'xss';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fileTypeFromBuffer } from 'file-type';
import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const s3 = new S3Client({
    region: bucketRegion,
});

export default async function AddCustomer(formData) {
    console.log('<<<<< INSIDE ADD CUSTOMER N>>>>>');

    try {
        const companyName = xss(formData.get('name'));
        console.log('Company Name:', companyName);

        const file = formData.get('image');
        console.log('<<<<< BEFORE File>>>>>');
        if (!file) {
            throw new Error('Image file is missing');
        }
        console.log('File:', file);

        const fileName = xss(file.name);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const type = await fileTypeFromBuffer(buffer);
        const contentType = type ? type.mime : file.type;

        // Generate a unique file name for the S3 object
        const s3FileName = `${uuidv4()}-${fileName}`;

        // Upload the image to S3
        const uploadParams = {
            Bucket: bucketName,
            Key: s3FileName,
            Body: buffer,
            ContentType: contentType,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);

        const customerData = {
            id: uuidv4(),
            company_name: companyName,
            logo_file_name: s3FileName,
            users: [],
        };

        console.log('customerData', customerData);

        const newCustomer = await Customer.create(customerData);
        console.log('successfully saved', newCustomer);

        revalidatePath('/customers');
        redirect('/customers');
    } catch (err) {
        console.error(err);
    }
}
