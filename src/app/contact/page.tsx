import { ContactForm } from "../components/ContactForm";
import ContactPath from "../components/ContactPath";

export default function ContactPage() {
  return (
    <main className=" bg-white">
      <ContactPath />
      <ContactForm />
    </main>
  );
}
