# CodeMatrix - Professional Portfolio & Blog Platform

A modern, responsive portfolio and blog platform built with Next.js 15, TypeScript, and MongoDB. Features a comprehensive admin panel, dynamic blog management, and Cloudinary integration for media uploads.

## 🚀 Features

- **Modern Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Content Management**: Dynamic blog system with rich text editor (Tiptap)
- **Media Upload**: Cloudinary integration for optimized image uploads
- **Admin Panel**: Secure dashboard with analytics, content management
- **SEO Optimized**: Dynamic metadata, structured data, social sharing
- **Responsive Design**: Mobile-first design with custom utilities
- **Authentication**: JWT-based admin authentication
- **Database**: MongoDB integration with connection pooling
- **Performance**: Optimized images, caching, and bundle splitting

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.16+
- MongoDB (local or MongoDB Atlas)
- Cloudinary account for image uploads

### Environment Setup

1. Copy the environment template:

```bash
cp .env.example .env.local
```

2. Configure your environment variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/codematrix

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=codematrix
```

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Cloudinary Setup

1. **Create Account**: Sign up at [cloudinary.com](https://cloudinary.com)

2. **Get Credentials**: Find your cloud name, API key, and API secret in your Cloudinary dashboard

3. **Create Upload Preset**:
   - Go to Settings > Upload > Upload presets
   - Create a new preset named `website` (already configured)
   - Set it to "Unsigned" for client-side uploads
   - Configure folder: `codematrix/blog`
   - Set transformations for optimization

4. **Update Environment**: Your Cloudinary credentials are already configured in `.env.local`

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript checks
npm run validate     # Run all validation (lint + type-check)
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── admin/          # Admin panel pages
│   ├── blog/           # Public blog pages
│   └── (other pages)/
├── components/         # Reusable components
│   ├── ui/            # UI primitives
│   └── common/        # Shared components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and configurations
└── types/             # TypeScript type definitions
```

## 🛡️ Admin Panel

Access the admin panel at `/admin` with the following features:

- **Dashboard**: Analytics and overview
- **Blog Management**: Create, edit, and manage blog posts
- **Inquiry Management**: View and manage contact form submissions
- **Media Upload**: Cloudinary-powered image uploads
- **SEO Tools**: Meta tags, structured data management

## 🎨 Styling & Design

- **Tailwind CSS v4**: Latest features and performance improvements
- **Custom Design System**: OKLCH color space for better color accuracy
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Dark/Light Mode**: System preference detection
- **Professional Icons**: Lucide React icon library

## 📈 Performance & SEO

- **Core Web Vitals**: Optimized for Google's performance metrics
- **Image Optimization**: Cloudinary transforms and Next.js Image component
- **Dynamic Metadata**: SEO-friendly meta tags and structured data
- **Sitemap Generation**: Automatic sitemap for better indexing
- **Bundle Analysis**: Webpack bundle analyzer for optimization

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## 🔒 Security

- JWT-based authentication for admin access
- Input validation and sanitization
- CORS protection
- Rate limiting on API routes
- Secure environment variable handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run validation: `npm run validate`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [MongoDB](https://mongodb.com) - Database platform
- [Cloudinary](https://cloudinary.com) - Media management platform
- [Tiptap](https://tiptap.dev) - Rich text editor
