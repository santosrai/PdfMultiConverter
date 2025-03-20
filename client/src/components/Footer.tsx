export default function Footer() {
  return (
    <footer className="mt-12 text-center text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()} PPT to PDF Converter. All rights reserved.</p>
      <p className="mt-2">
        <a href="#" className="text-primary hover:underline">Terms of Service</a> · 
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </p>
    </footer>
  );
}
