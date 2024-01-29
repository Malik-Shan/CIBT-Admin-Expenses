export const prerender = false;
import type { APIRoute } from "astro";
import { app } from '../../../../firebase/server';
import { getStorage } from 'firebase-admin/storage';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const img = formData.get('receipt') as File;
  const ref = getStorage(app).bucket('images');
  console.log(img)
  
  // Convert file data to a Buffer
 const arrayBuffer = await img.arrayBuffer();
  const d = new Uint8Array(arrayBuffer);

  // const fileName = 'your-file-name.jpg'; // Adjust the file name as needed

  // Upload the file to Firebase Cloud Storage
  try{
    await ref.upload(d, {
      destination: img.name,
      metadata: {
        contentType: img.type
      }
    });

  }catch(err){
    console.log(err)
    return new Response(err,{
      status:400,
    })
  }


  return new Response("Hi", {
    status: 200,
  });
};
