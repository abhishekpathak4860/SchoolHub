export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white mt-10 py-6 pb-24 md:pb-6">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()} Reno Platform. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
