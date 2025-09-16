# Justin Wessels Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean design, dark theme support, and comprehensive project showcase.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- **Component Library**: shadcn/ui components for consistent design
- **Dark Theme**: Toggle between light and dark modes
- **Project Showcase**: Featured projects on homepage and filterable grid
- **Dynamic Pages**: Individual project detail pages with JSON-LD structured data
- **Responsive Design**: Mobile-first approach with responsive layouts
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Type Safety**: Strict TypeScript configuration
- **Code Quality**: ESLint and Prettier for consistent code formatting

## 📁 Project Structure

```
jjw-portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage with featured projects
│   │   ├── projects/          # Projects pages
│   │   │   ├── page.tsx       # Projects grid with filtering
│   │   │   └── [slug]/        # Dynamic project detail pages
│   │   └── layout.tsx         # Root layout with navigation
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── ProjectCard.tsx   # Project card component
│   │   ├── ProjectDetail.tsx # Project detail component
│   │   ├── Filters.tsx       # Project filtering component
│   │   ├── Navigation.tsx    # Site navigation
│   │   └── ProjectJsonLd.tsx # JSON-LD structured data
│   ├── lib/                  # Utility functions
│   │   ├── projects.ts       # Project data management
│   │   └── utils.ts          # General utilities
│   └── types/                # TypeScript type definitions
│       └── project.ts        # Project-related types
├── public/
│   ├── data/
│   │   └── projects.json     # Project data source
│   └── images/               # Project images and assets
└── scripts/
    └── generate-placeholders.js # Placeholder image generator
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/username/jjw-portfolio.git
cd jjw-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Adding Projects

#### GitHub Projects

1. Add project data to `public/data/projects.json`
2. Add project image to `public/images/`
3. Update the image path in the JSON file

#### Manual Entries

For projects without GitHub repositories, you can add them manually:

1. Create a new file in `data/manual/<slug>.yml`
2. Follow the schema in `data/manual/README.md`
3. Include `portfolio:include` in topics to make it visible
4. Commit changes - the build process will automatically include it

Example:

```yaml
slug: my-project
title: My Project
source: manual
include: true
visibility: ventures
status: in-progress
tier: mvp
roles: [Founder]
homepage_url: https://myproject.com
highlights:
  - Key feature 1
  - Key feature 2
topics: [portfolio:include, domain:saas, health]
```

### Styling

- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind classes
- Theme customization: Update `tailwind.config.js`

### Content

- Update personal information in `src/app/page.tsx`
- Modify navigation in `src/components/Navigation.tsx`
- Update metadata in `src/app/layout.tsx`

## 🚀 Deployment

### Quick Setup

1. **Run deployment setup**:

   ```bash
   npm run deploy:setup
   ```

2. **Set up GitHub integration**:

   ```bash
   # Set your GitHub token
   export GH_TOKEN=your_github_token_here

   # Run GitHub setup
   npm run github:setup
   ```

3. **Follow the generated instructions** to:
   - Set up Vercel environment variables
   - Configure GitHub secrets
   - Deploy your portfolio

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables (see generated tokens)
4. Deploy automatically

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

For detailed deployment instructions, see [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md).

## 🔗 GitHub Integration

The portfolio includes comprehensive GitHub integration:

### Features

- **Automated Workflows**: CI/CD, project data updates, preview deployments
- **Branch Protection**: Required PR reviews and status checks
- **Issue Templates**: Standardized bug reports and feature requests
- **PR Templates**: Consistent pull request descriptions
- **Auto-Revalidation**: Automatic site updates when project data changes

### Setup

```bash
# Set your GitHub token
export GH_TOKEN=your_github_token_here

# Run GitHub integration setup
npm run github:setup
```

### Available Scripts

- `npm run github:setup` - Set up GitHub integration
- `npm run build:projects` - Build project data from GitHub
- `npm run backfill:topics` - Backfill repository topics
- `npm run content:validate` - Validate all content files
- `npm run content:migrate` - Migrate content between formats
- `npm run content:generate` - Generate content from templates

For detailed GitHub integration instructions, see [docs/GITHUB_INTEGRATION.md](docs/GITHUB_INTEGRATION.md).

## 📝 Content Management

The portfolio includes comprehensive content management features:

### Features

- **MDX Support**: Rich content rendering with Markdown + JSX
- **Content Validation**: Schema validation and linting tools
- **Content Migration**: Tools for moving and updating content
- **Content Generation**: Automated content creation from templates
- **Content API**: RESTful API for content management
- **Content Dashboard**: Web interface for content management

### Setup

```bash
# Validate all content
npm run content:validate

# Generate sample content
npm run content:generate

# Migrate content
npm run content:migrate migrate
```

### Content Types

- **Case Studies**: Detailed project documentation in MDX format
- **Project Manifests**: Repository metadata in YAML format

For detailed content management instructions, see [docs/CONTENT_MANAGEMENT.md](docs/CONTENT_MANAGEMENT.md).

## 🔧 Configuration

### TypeScript

The project uses strict TypeScript configuration with additional checks:

- `noUnusedLocals` and `noUnusedParameters`
- `exactOptionalPropertyTypes`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`
- `noUncheckedIndexedAccess`

### ESLint

Configured with:

- Next.js recommended rules
- TypeScript strict rules
- Prettier integration
- Custom rules for code quality

### Prettier

Configured for consistent code formatting:

- Single quotes
- Semicolons
- 2-space indentation
- 80 character line width

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🔄 Data Pipeline

This portfolio automatically builds project data from your GitHub repositories using a GitHub Action and supports automatic revalidation for instant updates.

### Setup

1. **Add GitHub Token**: Go to your repository → Settings → Secrets and variables → Actions → New repository secret
   - Name: `GH_TOKEN`
   - Value: A fine-grained PAT with read-only repository access to `jjwprotozoa` organization

2. **Project Manifests**: Add `.project-manifest.yml` files to your repositories for enhanced metadata. See [templates/](templates/) for ready-to-use templates:

```yaml
title: 'My Awesome Project'
status: complete # complete | in-progress | archived
tier: flagship # flagship | mvp | experiment
stack: [React, TypeScript, Node.js]
roles: [Founder, Full-stack]
live_url: https://myapp.com
demo_url: https://demo.myapp.com
highlights:
  - 'Built with modern tech stack'
  - 'Handles 10k+ users daily'
metrics:
  users: 10000
  mrr: 5000
topics: [domain:saas, ai, automation]
```

3. **GitHub Topics**: Use topics for automatic categorization:
   - `portfolio:complete` - Mark as completed
   - `portfolio:archived` - Mark as archived
   - `domain:saas` - Categorize by domain (strips `domain:` prefix)

### How It Works

- **GitHub Action** runs on push to main and hourly
- **GraphQL API** fetches all non-fork, non-archived repositories
- **Manifest parsing** merges `.project-manifest.yml` with GitHub metadata
- **Auto-sorting** by tier (flagship > mvp > experiment), status, and recency
- **Auto-commit** updates `public/data/projects.json` when changes detected

### Local Testing

```bash
# Set your GitHub token
export GH_TOKEN=your_token_here

# Build projects locally
pnpm build:projects

# Format the generated JSON
pnpm format:json
```

### GitHub Topics Backfill

For one-time setup of repository topics, use the backfill script:

```bash
# Set your GitHub token (requires repo access)
export GITHUB_TOKEN=your_token_here

# Run the topics backfill script
pnpm backfill:topics
```

**Setup:**

1. Edit `topics.json` to map your repositories to topics
2. Set `GITHUB_TOKEN` with repo permissions
3. Run the script to apply topics to all repositories

**Example topics.json:**

```json
{
  "ruvoplayer": ["portfolio:complete", "domain:saas", "react", "typescript"],
  "zeroforms": ["portfolio:in-progress", "domain:saas", "health", "forms"]
}
```

**Required GitHub Token Scopes:**

- `repo` (for private repositories)
- `public_repo` (for public repositories only)

The site reads the committed JSON file - no server-side tokens required for the frontend.

### Auto-Revalidation (Optional)

For instant updates after project data changes, set up automatic revalidation:

1. **Vercel Environment Variable**:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `REVALIDATE_TOKEN` with a secure random string

2. **GitHub Secrets**:
   - Add `REVALIDATE_URL`: `https://your-portfolio.vercel.app/api/revalidate`
   - Add `REVALIDATE_TOKEN`: Same value as Vercel

3. **How it works**:
   - GitHub Action updates `projects.json`
   - After commit, calls revalidation endpoint
   - Vercel instantly updates all cached pages
   - Your site shows new data immediately

See [docs/VERCEL_ENVIRONMENT_VARIABLES.md](docs/VERCEL_ENVIRONMENT_VARIABLES.md) for detailed setup instructions.

## 📞 Contact

- Email: justin@example.com
- GitHub: [@jjwprotozoa](https://github.com/jjwprotozoa)
- Portfolio: [https://justinwessels.vercel.app](https://justinwessels.vercel.app)
