export default function Footer() {
  return (
    <footer id="footer" className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} FirstYear.ai. Created By Ayomide Hakeem.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

