
# PowerPoint to PDF Converter

A web application that allows users to convert multiple PowerPoint files (PPT/PPTX) to PDFs in batch mode with a modern, user-friendly interface.

## Features

- Multi-file upload support with drag-and-drop functionality
- Batch conversion of PPT/PPTX files to PDF
- Real-time progress tracking for each conversion
- Download options for individual PDFs or ZIP bundles
- Secure processing with automatic file cleanup after 24 hours
- Preserves original formatting, images, and embedded elements

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express
- **File Conversion**: LibreOffice CLI integration
- **Additional Libraries**: 
  - react-dropzone for drag-and-drop
  - JSZip for bundling downloads
  - shadcn/ui components
  - React Query for API state management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure LibreOffice is installed on your system.

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://0.0.0.0:5000`

## Project Structure

```
├── client/           # Frontend React application
├── server/           # Backend Express server
├── uploads/          # Temporary storage for uploaded files
├── converted/        # Storage for converted PDFs
├── shared/           # Shared types and schemas
```

## API Endpoints

- `POST /api/conversion` - Upload and convert files
- `GET /api/files/:id/:filename` - Download converted files
- `POST /api/conversion/:id/cancel` - Cancel ongoing conversion

## Security Features

- Automatic file cleanup after 24 hours
- File size limits (100MB per file)
- Secure file handling and processing
- Input validation and sanitization

## Limitations

- Maximum file size: 100MB
- Supported input formats: PPT, PPTX
- Output format: PDF, DOC
