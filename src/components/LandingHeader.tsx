import { Logo } from '../assets/Logo';
import { LogoText } from '../assets/LogoText';

const LandingHeader = () => (
  <div className='bg-white border-b border-gray-200 flex py-3 mb-3 items-center justify-center'>
    <Logo style='h-12 mr-2' />
    <LogoText style='h-9' />
  </div>
);

export default LandingHeader;
