import VerificationEmailTemplate from "@/components/email/verification-email";
import { transporter } from "@/utils/mail";
import { resend } from "@/utils/resend";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async () => {
  const images = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_CLIENT_KEY}`
  );

  return Response.json(images);
};

// export const POST = async (req: Request) => {
//   const formData = req.formData();
//   const file: File = (await formData).get("images") as File;

//   console.log(file.name);

//   const fileBuffer = await file.arrayBuffer();

//   const images = await axios
//     .post(`https://api.imgbb.com/1/upload`, fileBuffer, {
//       headers: {
//         Authorization: `key ${process.env.IMGBB_CLIENT_KEY}`,
//       },
//     })
//     .then((res) => res.data)
//     .catch((e) => console.log(e));

//   return Response.json({ name: file.name });
// };

export async function POST(req: NextRequest) {
  try {
    
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["guntureka1020@gmail.com"],
      subject: "Hello world",
     react: VerificationEmailTemplate({emailVerificationToken: "asdasdsad"}),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
