'use client';

import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  isEditing?: boolean;
}

const categories = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'E-commerce',
  'Backend Development',
  'Full Stack',
  'Other',
];

const ProjectForm = ({ initialData, isEditing = false }: ProjectFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    technologies: [],
    image: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'draft',
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleInputChange = (
    field: keyof ProjectFormData,
    value: string | boolean
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTechnologiesChange = (value: string) => {
    const technologies = value
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);
    setFormData(prev => ({ ...prev, technologies }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
      });
      return;
    }

    setLoading(true);

    try {
      const url = isEditing
        ? `/api/projects/${initialData?.id}`
        : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Project ${isEditing ? 'updated' : 'created'} successfully`,
        });
        router.push('/admin/projects');
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Something went wrong',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div className='flex items-center gap-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.back()}
          disabled={loading}
        >
          <ArrowLeft size={16} className='mr-2' />
          Back
        </Button>
        <div>
          <h1 className='text-2xl font-bold text-foreground'>
            {isEditing ? 'Edit Project' : 'New Project'}
          </h1>
          <p className='text-muted-foreground'>
            {isEditing
              ? 'Update your project details'
              : 'Create a new portfolio project'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='title'>Project Title *</Label>
                <Input
                  id='title'
                  value={formData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  placeholder='Enter project title'
                  className='mt-1'
                  required
                />
              </div>

              <div>
                <Label htmlFor='category'>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={value => handleInputChange('category', value)}
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor='description'>Description *</Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder='Describe your project...'
                className='mt-1 min-h-[100px]'
                required
              />
            </div>

            <div>
              <Label htmlFor='technologies'>
                Technologies (comma separated)
              </Label>
              <Input
                id='technologies'
                value={formData.technologies.join(', ')}
                onChange={e => handleTechnologiesChange(e.target.value)}
                placeholder='React, Node.js, MongoDB, TypeScript'
                className='mt-1'
              />
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card>
          <CardHeader>
            <CardTitle>Project Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={formData.image}
              onChange={url => handleInputChange('image', url)}
              onRemove={() => handleInputChange('image', '')}
              disabled={loading}
            />
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardHeader>
            <CardTitle>Project Links</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label htmlFor='liveUrl'>Live Demo URL</Label>
              <Input
                id='liveUrl'
                type='url'
                value={formData.liveUrl}
                onChange={e => handleInputChange('liveUrl', e.target.value)}
                placeholder='https://example.com'
                className='mt-1'
              />
            </div>

            <div>
              <Label htmlFor='githubUrl'>GitHub Repository URL</Label>
              <Input
                id='githubUrl'
                type='url'
                value={formData.githubUrl}
                onChange={e => handleInputChange('githubUrl', e.target.value)}
                placeholder='https://github.com/username/repo'
                className='mt-1'
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='status'>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={value =>
                    handleInputChange(
                      'status',
                      value as ProjectFormData['status']
                    )
                  }
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='published'>Published</SelectItem>
                    <SelectItem value='archived'>Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex items-center space-x-2 pt-6'>
                <input
                  type='checkbox'
                  id='featured'
                  checked={formData.featured}
                  onChange={e =>
                    handleInputChange('featured', e.target.checked)
                  }
                  className='rounded border-border text-primary focus:ring-primary'
                />
                <Label htmlFor='featured'>Featured Project</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className='flex justify-end space-x-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={loading}>
            <Save size={16} className='mr-2' />
            {loading
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
                ? 'Update Project'
                : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
