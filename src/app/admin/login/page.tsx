'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const loadingToast = toast({
      title: 'Signing In...',
      description: 'Please wait while we verify your credentials.',
    });

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        loadingToast.dismiss();
        toast({
          title: 'Login Successful!',
          description: 'Welcome to the admin panel.',
        });

        // Redirect to admin dashboard
        router.push('/admin/inquiries');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      loadingToast.dismiss();
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      toast({
        title: 'Login Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4'>
      <div className='w-full max-w-md'>
        <Card className='shadow-2xl border-0 bg-white/95 backdrop-blur-sm'>
          <CardHeader className='space-y-1 text-center pb-6'>
            <div className='mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4'>
              <Lock className='h-8 w-8 text-white' />
            </div>
            <CardTitle className='text-2xl font-bold text-gray-900'>
              Admin Login
            </CardTitle>
            <p className='text-gray-600'>
              Enter your credentials to access the admin panel
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='username'>Username</Label>
                <div className='relative'>
                  <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='username'
                    name='username'
                    type='text'
                    placeholder='Enter your username'
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className='pl-10'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className='pl-10 pr-10'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type='submit'
                className='w-full bg-gradient-primary border-0 h-11 font-semibold'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-500'>
                Forgot your credentials? Contact the system administrator.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
