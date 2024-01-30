export const prerender = false;
import type {APIRoute} from 'astro';
import {getAuth} from 'firebase-admin/auth';
import {app} from '../../../../firebase/server';

export const POST: APIRoute = async ({request}) => {
  const auth = getAuth(app);

  // const sessionCookie = request.headers.get('cookie').split('session=')[1];

  const formData = await request.formData();
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const roles = formData.get('roles')?.toString();
  
  if(!name || !email || !password){
    return new Response("Missing Input",{
      status:400,
    })
  }

  // let decodedCookie;
  // try{
  //   decodedCookie = await auth.verifySessionCookie(sessionCookie);
  // }catch(err){
  //   return new Response("Something went wrong", {
  //     status:400,
  //   })
  // }
  // if(!decodedCookie.admin){
  //   return new Response("You're not an admin",{
  //     status:400,
  //   })
  // }

  const customClaims = {};
  const rolesMap = roles.split(',');
  let rolesHTML = ''
  rolesMap.map((r) => {
    rolesHTML += `<span class='role'>${r}</span>`;
    customClaims[r] = true;
  })
  let uid;
  try {
    const user = await auth.createUser({
      email,
      password,
      displayName:name,
      photoURL:'https://i.postimg.cc/V6YpBkFt/profile-Img.webp'
    })
    uid = user.uid;
    await auth.setCustomUserClaims(uid, customClaims);
    // const usersRef = db.collection('users').doc(uid);
    // await usersRef.set({
    //   name,
    //   email,
    //   roles
    // })
  } catch(err){
    return new Response("Something went wrong",{
      status:400,
    })
  }
const html = `
<div hx-swap-oob='innerHTML:#responses'>
  <div id='res' data-type='success'>
    <p>User was registered successfully</p>
  </div>
</div>
`
  return new Response( html ,{
    status:200,
  })

}
