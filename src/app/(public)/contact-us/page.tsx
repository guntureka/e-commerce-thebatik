import { ContactForm } from "@/components/contact-us/contactForm";
// import ContactPath from "@/components/contact-us/contactPath";

export default function ContactUsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-40 lg:p-24 p-10">
      {/* <ContactPath /> */}
      <ContactForm />
    </main>
  );
}
