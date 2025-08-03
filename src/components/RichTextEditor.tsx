'use client';

import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Table as TableIcon,
  Type,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  className = '',
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg mx-auto',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'focus:outline-none min-h-[200px] p-4 max-w-none [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:my-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:my-5 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:my-4 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:leading-tight [&_h4]:my-3 [&_h5]:text-lg [&_h5]:font-bold [&_h5]:leading-tight [&_h5]:my-2 [&_h6]:text-base [&_h6]:font-bold [&_h6]:leading-tight [&_h6]:my-2 [&_p]:text-base [&_p]:leading-relaxed [&_p]:my-4 [&_strong]:font-bold [&_em]:italic [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_ul]:my-4 [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:pl-6 [&_li]:my-1 [&_a]:text-primary [&_a]:underline hover:[&_a]:text-primary/80 [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_th]:bg-gray-50 [&_th]:font-bold [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_hr]:border-0 [&_hr]:border-t-2 [&_hr]:border-gray-300 [&_hr]:my-8',
      },
    },
  });

  const insertImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
      setImageUrl('');
      setImageAlt('');
      setImageDialogOpen(false);
    }
  }, [editor, imageUrl, imageAlt]);

  const insertLink = useCallback(() => {
    if (linkUrl && editor) {
      const { from, to } = editor.state.selection;
      if (from === to && linkText) {
        // No text selected, insert new text with link
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
          .run();
      } else {
        // Text is selected, apply link to selection
        editor.chain().focus().setLink({ href: linkUrl }).run();
      }
      setLinkUrl('');
      setLinkText('');
      setLinkDialogOpen(false);
    }
  }, [editor, linkUrl, linkText]);

  const openImageDialog = useCallback(() => {
    setImageDialogOpen(true);
  }, []);

  const openLinkDialog = useCallback(() => {
    const { from, to } = editor?.state.selection || { from: 0, to: 0 };
    if (from !== to) {
      // Text is selected
      const selectedText = editor?.state.doc.textBetween(from, to, ' ');
      setLinkText(selectedText || '');
    }
    setLinkDialogOpen(true);
  }, [editor]);

  const addTable = useCallback(() => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    }
  }, [editor]);

  const setTextColor = useCallback(
    (color: string) => {
      if (editor) {
        editor.chain().focus().setColor(color).run();
      }
    },
    [editor]
  );

  const toggleHighlight = useCallback(
    (color?: string) => {
      if (editor) {
        if (color) {
          editor.chain().focus().toggleHighlight({ color }).run();
        } else {
          editor.chain().focus().toggleHighlight().run();
        }
      }
    },
    [editor]
  );

  if (!isMounted || !editor) {
    return (
      <div className={`border rounded-lg ${className}`}>
        <div className='border-b p-2 h-10 bg-muted animate-pulse' />
        <div className='min-h-[200px] p-4 bg-muted/20 animate-pulse' />
      </div>
    );
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className='border-b p-2 space-y-2'>
        {/* First Row - Text Formatting */}
        <div className='flex flex-wrap gap-1 items-center'>
          {/* Headings */}
          <Select
            value={
              editor.isActive('heading', { level: 1 })
                ? 'h1'
                : editor.isActive('heading', { level: 2 })
                  ? 'h2'
                  : editor.isActive('heading', { level: 3 })
                    ? 'h3'
                    : editor.isActive('heading', { level: 4 })
                      ? 'h4'
                      : editor.isActive('heading', { level: 5 })
                        ? 'h5'
                        : editor.isActive('heading', { level: 6 })
                          ? 'h6'
                          : 'p'
            }
            onValueChange={value => {
              if (value === 'h1') {
                editor.chain().focus().setHeading({ level: 1 }).run();
              } else if (value === 'h2') {
                editor.chain().focus().setHeading({ level: 2 }).run();
              } else if (value === 'h3') {
                editor.chain().focus().setHeading({ level: 3 }).run();
              } else if (value === 'h4') {
                editor.chain().focus().setHeading({ level: 4 }).run();
              } else if (value === 'h5') {
                editor.chain().focus().setHeading({ level: 5 }).run();
              } else if (value === 'h6') {
                editor.chain().focus().setHeading({ level: 6 }).run();
              } else {
                editor.chain().focus().setParagraph().run();
              }
            }}
          >
            <SelectTrigger className='w-24 h-8'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='p'>Normal</SelectItem>
              <SelectItem value='h1'>H1</SelectItem>
              <SelectItem value='h2'>H2</SelectItem>
              <SelectItem value='h3'>H3</SelectItem>
              <SelectItem value='h4'>H4</SelectItem>
              <SelectItem value='h5'>H5</SelectItem>
              <SelectItem value='h6'>H6</SelectItem>
            </SelectContent>
          </Select>

          {/* Quick Heading Buttons */}
          <Button
            variant={
              editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'
            }
            size='sm'
            onClick={() =>
              editor.chain().focus().setHeading({ level: 1 }).run()
            }
            title='Heading 1'
          >
            <Heading1 className='h-4 w-4' />
          </Button>

          <Button
            variant={
              editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
            }
            size='sm'
            onClick={() =>
              editor.chain().focus().setHeading({ level: 2 }).run()
            }
            title='Heading 2'
          >
            <Heading2 className='h-4 w-4' />
          </Button>

          <Button
            variant={
              editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'
            }
            size='sm'
            onClick={() =>
              editor.chain().focus().setHeading({ level: 3 }).run()
            }
            title='Heading 3'
          >
            <Heading3 className='h-4 w-4' />
          </Button>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Basic Formatting */}
          <Button
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleBold().run()}
            title='Bold'
          >
            <Bold className='h-4 w-4' />
          </Button>

          <Button
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title='Italic'
          >
            <Italic className='h-4 w-4' />
          </Button>

          <Button
            variant={editor.isActive('underline') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title='Underline'
          >
            <UnderlineIcon className='h-4 w-4' />
          </Button>

          <Button
            variant={editor.isActive('strike') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title='Strikethrough'
          >
            <Strikethrough className='h-4 w-4' />
          </Button>

          <Button
            variant={editor.isActive('code') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleCode().run()}
            title='Inline Code'
          >
            <Code className='h-4 w-4' />
          </Button>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Text Color */}
          <div className='flex gap-1'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setTextColor('#000000')}
              title='Text Color'
            >
              <Type className='h-4 w-4' />
            </Button>
            <input
              type='color'
              onChange={e => setTextColor(e.target.value)}
              className='w-8 h-8 border rounded cursor-pointer'
              title='Pick Text Color'
            />
          </div>

          {/* Highlight */}
          <div className='flex gap-1'>
            <Button
              variant={editor.isActive('highlight') ? 'default' : 'ghost'}
              size='sm'
              onClick={() => toggleHighlight()}
              title='Highlight'
            >
              <Highlighter className='h-4 w-4' />
            </Button>
            <input
              type='color'
              onChange={e => toggleHighlight(e.target.value)}
              className='w-8 h-8 border rounded cursor-pointer'
              title='Pick Highlight Color'
            />
          </div>
        </div>

        {/* Second Row - Alignment and Lists */}
        <div className='flex flex-wrap gap-1 items-center'>
          {/* Text Alignment */}
          <Button
            variant={
              editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'
            }
            size='sm'
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            title='Align Left'
          >
            <AlignLeft className='h-4 w-4' />
          </Button>

          <Button
            variant={
              editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'
            }
            size='sm'
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            title='Align Center'
          >
            <AlignCenter className='h-4 w-4' />
          </Button>

          <Button
            variant={
              editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'
            }
            size='sm'
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            title='Align Right'
          >
            <AlignRight className='h-4 w-4' />
          </Button>

          <Button
            variant={
              editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'
            }
            size='sm'
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            title='Justify'
          >
            <AlignJustify className='h-4 w-4' />
          </Button>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Lists */}
          <Button
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title='Bullet List'
          >
            <List className='h-4 w-4' />
          </Button>

          <Button
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title='Numbered List'
          >
            <ListOrdered className='h-4 w-4' />
          </Button>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Blockquote and Code Block */}
          <Button
            variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title='Quote'
          >
            <Quote className='h-4 w-4' />
          </Button>

          <Button
            variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
            size='sm'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            title='Code Block'
          >
            <Code2 className='h-4 w-4' />
          </Button>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Insert Elements */}
          <Button
            variant='ghost'
            size='sm'
            onClick={openLinkDialog}
            title='Add Link'
          >
            <LinkIcon className='h-4 w-4' />
          </Button>

          <Button
            variant='ghost'
            size='sm'
            onClick={openImageDialog}
            title='Add Image'
          >
            <ImageIcon className='h-4 w-4' />
          </Button>

          <Button
            variant='ghost'
            size='sm'
            onClick={addTable}
            title='Add Table'
          >
            <TableIcon className='h-4 w-4' />
          </Button>

          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title='Horizontal Rule'
          >
            <Minus className='h-4 w-4' />
          </Button>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Undo/Redo */}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            title='Undo'
          >
            <Undo className='h-4 w-4' />
          </Button>

          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            title='Redo'
          >
            <Redo className='h-4 w-4' />
          </Button>
        </div>

        {/* Table Controls - Show only when inside a table */}
        {editor.isActive('table') && (
          <div className='flex flex-wrap gap-1 items-center border-t pt-2'>
            <span className='text-sm text-muted-foreground mr-2'>Table:</span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor.commands.addColumnBefore()}
              title='Add Column Before'
            >
              Col Before
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor.commands.addColumnAfter()}
              title='Add Column After'
            >
              Col After
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor.commands.deleteColumn()}
              title='Delete Column'
            >
              Del Col
            </Button>
          </div>
        )}
      </div>
      {/* Editor */}
      <EditorContent editor={editor} className='min-h-[200px]' />{' '}
      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='image-url'>Image URL</Label>
              <Input
                id='image-url'
                type='url'
                placeholder='https://example.com/image.jpg'
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </div>

            <div className='text-center text-sm text-muted-foreground'>or</div>

            <div>
              <Label htmlFor='image-file'>Upload Image</Label>
              <Input
                id='image-file'
                type='file'
                accept='image/*'
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = event => {
                      setImageUrl(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor='image-alt'>Alt Text (optional)</Label>
              <Input
                id='image-alt'
                placeholder='Description of the image'
                value={imageAlt}
                onChange={e => setImageAlt(e.target.value)}
              />
            </div>
            <div className='flex gap-2'>
              <Button onClick={insertImage} disabled={!imageUrl}>
                Insert Image
              </Button>
              <Button
                variant='outline'
                onClick={() => setImageDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='link-url'>URL</Label>
              <Input
                id='link-url'
                type='url'
                placeholder='https://example.com'
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
              />
            </div>
            {editor?.state.selection.from === editor?.state.selection.to && (
              <div>
                <Label htmlFor='link-text'>Link Text</Label>
                <Input
                  id='link-text'
                  placeholder='Link text'
                  value={linkText}
                  onChange={e => setLinkText(e.target.value)}
                />
              </div>
            )}
            <div className='flex gap-2'>
              <Button onClick={insertLink} disabled={!linkUrl}>
                Insert Link
              </Button>
              <Button
                variant='outline'
                onClick={() => setLinkDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
