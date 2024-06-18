import { ContactForm } from "@/components/contact-us/contactForm";
import ContactPath from "@/components/contact-us/contactPath";

export default function ContactUsPage() {
  return (
    <main className=" bg-white">
      <ContactPath />
      <ContactForm />
    </main>
  );
}