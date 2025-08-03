'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Mail, Phone, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast({
      title: 'Sending Message...',
      description: 'Please wait while we process your request.',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        loadingToast.dismiss();
        toast({
          title: 'Message Sent Successfully!',
          description:
            "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
    } catch (error) {
      loadingToast.dismiss();
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'Error Sending Message',
        description: `There was a problem sending your message: ${errorMessage}. Please try again later.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'codematricsitsolution@gmail.com',
      description: 'Send us an email anytime!',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 96649 20112',
      description: 'Mon-Fri from 8am to 5pm',
    },
  ];

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Backend Development',
    'E-commerce Solutions',
    'Consulting Services',
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900  pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h1 className='text-4xl lg:text-5xl font-bold mb-6 font-poppins animate-fade-in-up'>
              Get In Touch
            </h1>
            <p
              className='text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in'
              style={{ animationDelay: '0.2s' }}
            >
              Ready to start your next project? Let&apos;s discuss how we can
              help bring your ideas to life
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div className='animate-fade-in-up'>
              <h2 className='text-3xl font-bold text-foreground mb-6 font-poppins'>
                Send us a Message
              </h2>
              <p className='text-muted-foreground mb-8 leading-relaxed'>
                Fill out the form below and we&apos;ll get back to you within 24
                hours. Let us know about your project requirements and
                we&apos;ll provide a detailed proposal.
              </p>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div>
                    <Label htmlFor='name'>Full Name *</Label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='mt-2'
                      placeholder='John Doe'
                    />
                  </div>
                  <div>
                    <Label htmlFor='email'>Email Address *</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='mt-2'
                      placeholder='john@example.com'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div>
                    <Label htmlFor='company'>Company</Label>
                    <Input
                      id='company'
                      name='company'
                      type='text'
                      value={formData.company}
                      onChange={handleInputChange}
                      className='mt-2'
                      placeholder='Your Company'
                    />
                  </div>
                  <div>
                    <Label htmlFor='subject'>Subject *</Label>
                    <Input
                      id='subject'
                      name='subject'
                      type='text'
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className='mt-2'
                      placeholder='Project Inquiry'
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='message'>Message *</Label>
                  <Textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className='mt-2 min-h-[120px]'
                    placeholder='Tell us about your project requirements, timeline, and budget...'
                  />
                </div>

                <Button
                  type='submit'
                  size='lg'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-primary border-0 group'
                >
                  {isSubmitting ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={18}
                        className='ml-2 group-hover:translate-x-1 transition-transform'
                      />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div
              className='animate-fade-in-up'
              style={{ animationDelay: '0.2s' }}
            >
              <h2 className='text-3xl font-bold text-foreground mb-6 font-poppins'>
                Contact Information
              </h2>
              <p className='text-muted-foreground mb-8 leading-relaxed'>
                We&apos;re here to help! Reach out to us through any of these
                channels and we&apos;ll respond as quickly as possible.
              </p>

              <div className='space-y-6'>
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card
                      key={info.title}
                      className='bg-gradient-card shadow-card animate-scale-in p-0'
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className='p-6'>
                        <div className='flex items-start'>
                          <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
                            <Icon size={24} className='text-white' />
                          </div>
                          <div>
                            <h3 className='font-semibold text-foreground mb-1 font-poppins'>
                              {info.title}
                            </h3>
                            <p className='text-primary font-medium mb-1'>
                              {info.details}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className='py-16 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              How Can We Help You?
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              We offer a comprehensive range of IT services to meet your
              business needs
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {services.map((service, index) => (
              <Card
                key={service}
                className='border-0 bg-background shadow-card hover:shadow-hero transition-all duration-300 group animate-fade-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className='p-6 text-center'>
                  <CheckCircle
                    size={32}
                    className='text-primary mx-auto mb-4 group-hover:scale-110 transition-transform'
                  />
                  <h3 className='font-semibold text-foreground font-poppins'>
                    {service}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              Frequently Asked Questions
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Quick answers to common questions about our services
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {[
              {
                question: 'How long does a typical project take?',
                answer:
                  'Project timelines vary based on complexity, but most web development projects take 4-12 weeks, while mobile apps typically require 8-16 weeks.',
              },
              {
                question: 'Do you provide ongoing support?',
                answer:
                  'Yes! We offer comprehensive maintenance and support packages to ensure your application stays updated, secure, and performing optimally.',
              },
              {
                question: 'What is your development process?',
                answer:
                  'We follow an agile methodology with regular client communication, including discovery, design, development, testing, and deployment phases.',
              },
              {
                question: 'Can you work with our existing team?',
                answer:
                  'Absolutely! We can integrate with your existing development team or work as an extended team to complement your in-house capabilities.',
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className='border-0 bg-background shadow-card animate-fade-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className='p-6'>
                  <h3 className='font-semibold text-foreground mb-3 font-poppins'>
                    {faq.question}
                  </h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='py-16 lg:py-24 bg-gradient-hero'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-6 font-poppins'>
              Let&apos;s Build Something Great Together
            </h2>
            <p className='text-xl mb-8 max-w-2xl mx-auto opacity-90'>
              Ready to transform your ideas into reality? Contact us today for a
              free consultation.
            </p>
            <a
              href='mailto:codematricsitsolution@gmail.com'
              className='inline-block'
            >
              <Button
                size='lg'
                className='bg-white text-primary hover:bg-white/90 shadow-hero'
              >
                Email Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
