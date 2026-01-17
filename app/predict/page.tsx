
import PredictionPage from './predictionContent'
import { Metadata } from 'next';


type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// This works here because this is a Server Component
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const city = params.city as string;
  const lat = params.lat as string;
  const lon = params.lon as string;

  const baseUrl = 'https://snowdaypredictor.com/predict';
  const canonicalUrl = `${baseUrl}?city=${city?.toLowerCase()}&lat=${lat}&lon=${lon}`;

  return {
    title: `Snow Day Prediction for ${city?.replace(/-/g, ' ') || 'Your City'}`,
    description: `Check the school closure probability for ${city}.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const PredictPage = () => {
  return (
    <div>
      <PredictionPage/>
    </div>
  )
}

export default PredictPage