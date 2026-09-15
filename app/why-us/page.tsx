import QualitySection from '@/components/QualitySection';
import WhyChooseUs from '@/components/WhyChooseUs';

export const metadata = {
  title: 'Why Choose Us | Blueprint Build Con',
  description: 'Discover the quality, transparency and support behind Blueprint Build Con projects.',
};

export default function WhyUsPage() {
  return (
    <>
      <WhyChooseUs />
      <QualitySection />
    </>
  );
}