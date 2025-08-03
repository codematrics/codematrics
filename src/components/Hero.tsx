import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Globe, Play, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-20'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-grid-pattern opacity-10'></div>
      <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl'></div>
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl'></div>

      <div className='pb-16 sm:pb-20 md:pb-24 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Content */}
          <div className='text-center lg:text-left animate-fade-in-up'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-poppins'>
              <span className='text-white'>Innovating Code,</span>
              <span className='block text-blue-400'>Empowering Business</span>
            </h1>

            <p className='text-md sm:text-lg text-slate-200 mb-8 leading-relaxed max-w-2xl'>
              Transform your digital presence with cutting-edge web development,
              mobile applications, and custom software solutions designed to
              scale your business.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12'>
              <Link href='/contact'>
                <Button
                  size='lg'
                  className='bg-blue-600 hover:bg-blue-700 text-white shadow-2xl group w-full sm:w-auto'
                >
                  Get Started Today
                  <ArrowRight
                    size={20}
                    className='ml-2 group-hover:translate-x-1 transition-transform'
                  />
                </Button>
              </Link>

              <Link href='/services'>
                <Button
                  variant='outline'
                  size='lg'
                  className='border-blue-300/50 text-white hover:text-white hover:bg-blue-500/20 backdrop-blur-sm group w-full sm:w-auto bg-transparent'
                >
                  <Play size={18} className='mr-2' />
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-6 text-center lg:text-left'>
              <div>
                <div className='text-2xl sm:text-3xl font-bold text-white mb-1'>
                  50+
                </div>
                <div className='text-sm text-white/80'>Projects Delivered</div>
              </div>
              <div>
                <div className='text-2xl sm:text-3xl font-bold text-white mb-1'>
                  15+
                </div>
                <div className='text-sm text-white/80'>Technologies</div>
              </div>
              <div>
                <div className='text-2xl sm:text-3xl font-bold text-white mb-1'>
                  24/7
                </div>
                <div className='text-sm text-white/80'>Support</div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className='relative animate-scale-in hidden lg:block'>
            <div className='relative'>
              {/* Floating Cards */}
              <div className='absolute top-0 left-0 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-[fade-in_1s_ease-out_0.2s_both]'>
                <Code size={32} className='text-primary-light mb-3' />
                <h3 className='font-semibold text-white mb-2'>Clean Code</h3>
                <p className='text-sm text-white/80'>
                  Modern, maintainable solutions
                </p>
              </div>

              <div className='absolute top-20 right-0 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-[fade-in_1s_ease-out_0.4s_both]'>
                <Smartphone size={32} className='text-primary-light mb-3' />
                <h3 className='font-semibold text-white mb-2'>Mobile First</h3>
                <p className='text-sm text-white/80'>
                  Responsive design principles
                </p>
              </div>

              <div className='absolute bottom-0 left-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-[fade-in_1s_ease-out_0.6s_both]'>
                <Globe size={32} className='text-primary-light mb-3' />
                <h3 className='font-semibold text-white mb-2'>Global Reach</h3>
                <p className='text-sm text-white/80'>
                  Scalable, worldwide solutions
                </p>
              </div>

              {/* Central Element */}
              <div className='mx-auto w-64 h-64 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center'>
                <Image
                  src='/logo.png'
                  alt='CodeMatrics'
                  width={96}
                  height={96}
                  className='w-24 h-24 opacity-80'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block'>
        <div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse'></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
