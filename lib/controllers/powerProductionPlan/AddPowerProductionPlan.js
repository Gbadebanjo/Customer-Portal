'use server'
import PowerProductionPlan from '@/database/models/PowerProductionPlan';
import {v4 as uuidv4} from "uuid";
import xss from "xss";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fileTypeFromBuffer } from 'file-type';
import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const s3 = new S3Client({
    region: bucketRegion,
});


export default async function AddPowerProductionPlan(formData) {
    console.log('<<<<< INSIDE ADD PLANNED PROD PLAN N>>>>>');

    try{
        const fileName = xss(formData.get('fileName'));
        const note = xss(formData.get('note'));
        const file_name = xss(formData.get('file')['name']);
        const file = formData.get('file');
        console.log('<<<<< BEFORE File>>>>>');
        if (!file) {
            throw new Error('Image file is missing');
        }
        console.log('File:', file);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const type = await fileTypeFromBuffer(buffer);
        const contentType = type ? type.mime : file.type;

        // Generate a unique file name for the S3 object
        const s3FileName = `${uuidv4()}-${file_name}`;

        // Upload the image to S3
        const uploadParams = {
            Bucket: bucketName,
            Key: s3FileName,
            Body: buffer,
            ContentType: contentType,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);

        const powerProductionPlanData = {
            id: uuidv4(),
            note: note,
            power_production_plan_items: [
                {
                    item: 'logged_in_user',
                }
            ],
            unique_file_name: uuidv4(),
            file_name: fileName,
        }

        console.log('powerProductionPlanData', powerProductionPlanData);

        const newPowerProductionPlan = await PowerProductionPlan.create(powerProductionPlanData);
        console.log('successfully saved', newPowerProductionPlan);


    }catch(error){
        console.log(error)
    }
    revalidatePath('/planned-data-upload')
    redirect('/planned-data-upload')
}
