'use client';

import ImageUpload from '@/components/ImageUpload';
import RichTextEditor from '@/components/RichTextEditor';
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
import { ArrowLeft, Eye, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogFormData {
  slug?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  isEditing?: boolean;
}

const categories = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Backend Development',
  'Database',
  'DevOps',
  'AI/ML',
  'Technology News',
  'Tutorials',
  'Best Practices',
];

export default function BlogForm({
  initialData,
  isEditing = false,
}: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    author: 'CodeMatrics Team',
    status: 'draft',
    category: 'Web Development',
    tags: [],
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    ...initialData,
  });

  // Auto-generate meta fields when title/excerpt changes
  useEffect(() => {
    if (formData.title && !formData.metaTitle) {
      setFormData(prev => ({ ...prev, metaTitle: prev.title }));
    }
  }, [formData.title, formData.metaTitle]);

  useEffect(() => {
    if (formData.excerpt && !formData.metaDescription) {
      setFormData(prev => ({ ...prev, metaDescription: prev.excerpt }));
    }
  }, [formData.excerpt, formData.metaDescription]);

  const handleInputChange = (
    field: keyof BlogFormData,
    value: BlogFormData[keyof BlogFormData]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      handleInputChange('tags', [...formData.tags, trimmedTag]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      'tags',
      formData.tags.filter(tag => tag !== tagToRemove)
    );
  };

  const addKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword && !formData.metaKeywords.includes(trimmedKeyword)) {
      handleInputChange('metaKeywords', [
        ...formData.metaKeywords,
        trimmedKeyword,
      ]);
    }
    setKeywordInput('');
  };

  const removeKeyword = (keywordToRemove: string) => {
    handleInputChange(
      'metaKeywords',
      formData.metaKeywords.filter(keyword => keyword !== keywordToRemove)
    );
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword(keywordInput);
    }
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
      });
      return;
    }

    setLoading(true);
    try {
      const submitData = { ...formData, status };
      const url = isEditing ? `/api/blogs/${formData.slug}` : '/api/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog');
      }

      toast({
        title: 'Success',
        description: `Blog ${isEditing ? 'updated' : 'created'} successfully`,
      });

      router.push('/admin/blogs');
    } catch {
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} blog`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-4xl'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() => router.back()}
              className='flex items-center gap-2'
            >
              <ArrowLeft className='h-4 w-4' />
              Back
            </Button>
            <h1 className='text-3xl font-bold'>
              {isEditing ? 'Edit Blog' : 'Create New Blog'}
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              onClick={() => handleSubmit('draft')}
              disabled={loading}
              className='flex items-center gap-2'
            >
              <Save className='h-4 w-4' />
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSubmit('published')}
              disabled={loading}
              className='flex items-center gap-2'
            >
              <Eye className='h-4 w-4' />
              Publish
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='title'>Title *</Label>
                  <Input
                    id='title'
                    value={formData.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                    placeholder='Enter blog title...'
                    className='mt-1'
                  />
                </div>

                <div>
                  <Label htmlFor='excerpt'>Excerpt *</Label>
                  <Textarea
                    id='excerpt'
                    value={formData.excerpt}
                    onChange={e => handleInputChange('excerpt', e.target.value)}
                    placeholder='Brief description of the blog post...'
                    rows={3}
                    className='mt-1'
                  />
                </div>

                <div>
                  <Label>Content *</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={content => handleInputChange('content', content)}
                    placeholder='Start writing your blog post...'
                    className='mt-1'
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='status'>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={value => handleInputChange('status', value)}
                  >
                    <SelectTrigger className='mt-1'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='draft'>Draft</SelectItem>
                      <SelectItem value='published'>Published</SelectItem>
                      <SelectItem value='archived'>Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='author'>Author</Label>
                  <Input
                    id='author'
                    value={formData.author}
                    onChange={e => handleInputChange('author', e.target.value)}
                    className='mt-1'
                  />
                </div>

                <div>
                  <Label htmlFor='category'>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={value =>
                      handleInputChange('category', value)
                    }
                  >
                    <SelectTrigger className='mt-1'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='tags'>Tags</Label>
                  <div className='mt-1 space-y-2'>
                    <Input
                      id='tags'
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      placeholder='Type a tag and press Enter'
                      className='w-full'
                    />
                    {formData.tags.length > 0 && (
                      <div className='flex flex-wrap gap-2'>
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className='inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md'
                          >
                            {tag}
                            <button
                              type='button'
                              onClick={() => removeTag(tag)}
                              className='ml-1 hover:text-destructive'
                            >
                              <X className='h-3 w-3' />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor='featuredImage'>Featured Image</Label>
                  <div className='mt-1'>
                    <ImageUpload
                      value={formData.featuredImage}
                      onChange={url => handleInputChange('featuredImage', url)}
                      onRemove={() => handleInputChange('featuredImage', '')}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='metaTitle'>Meta Title</Label>
                  <Input
                    id='metaTitle'
                    value={formData.metaTitle}
                    onChange={e =>
                      handleInputChange('metaTitle', e.target.value)
                    }
                    placeholder='SEO title for search engines'
                    className='mt-1'
                  />
                  <p className='text-xs text-muted-foreground mt-1'>
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor='metaDescription'>Meta Description</Label>
                  <Textarea
                    id='metaDescription'
                    value={formData.metaDescription}
                    onChange={e =>
                      handleInputChange('metaDescription', e.target.value)
                    }
                    placeholder='SEO description for search engines'
                    rows={3}
                    className='mt-1'
                  />
                  <p className='text-xs text-muted-foreground mt-1'>
                    Recommended: 150-160 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor='metaKeywords'>Meta Keywords</Label>
                  <div className='mt-1 space-y-2'>
                    <Input
                      id='metaKeywords'
                      value={keywordInput}
                      onChange={e => setKeywordInput(e.target.value)}
                      onKeyPress={handleKeywordKeyPress}
                      placeholder='Type a keyword and press Enter'
                      className='w-full'
                    />
                    {formData.metaKeywords.length > 0 && (
                      <div className='flex flex-wrap gap-2'>
                        {formData.metaKeywords.map((keyword, index) => (
                          <span
                            key={index}
                            className='inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md'
                          >
                            {keyword}
                            <button
                              type='button'
                              onClick={() => removeKeyword(keyword)}
                              className='ml-1 hover:text-destructive'
                            >
                              <X className='h-3 w-3' />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
