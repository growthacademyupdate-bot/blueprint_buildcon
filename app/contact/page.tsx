import ContactSection from '@/components/ContactSection';
import FAQSection from '@/components/FAQSection';

export const metadata = {
  title: 'Contact Us | Blueprint Build Con',
  description: 'Contact Blueprint Build Con to discuss your residential or commercial construction project.',
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <FAQSection />
    </>
  );
}