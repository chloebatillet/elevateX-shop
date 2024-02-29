import NewsletterForm from "./Newsletter";
import SocialMedias from "./SocialMedias";

function Contact() {
  return (
    <div className="flex flex-col items-start justify-start">
      <h4 className="font-bold uppercase">Contacts</h4>
      <NewsletterForm />
      <SocialMedias />
    </div>
  );
}

export default Contact;
