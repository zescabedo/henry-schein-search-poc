import { LOGO_IMAGE_URL as logoUrl, LOGO_IMAGE_HEIGHT } from '@/app/_data/customizations';
import Image from 'next/image';

const Logo = () => {
  // Use custom logo URL if provided, otherwise use Henry Schein logo
  if (logoUrl && logoUrl.includes('https')) {
    return <img src={logoUrl} alt="Customer Logo" className="mr-8" style={{height: `${LOGO_IMAGE_HEIGHT}px`}} />
  }

  // Default to Henry Schein Dental logo
  return (
    <Image
      src="/henry-schein-logo.svg"
      alt="Henry Schein Dental"
      width={248}
      height={33}
      className="mr-8"
      priority
    />
  );
};

export default Logo;
