const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-start">
        
        {/* Logo và bản quyền */}
        <div className="mb-8 md:mb-0">
          <div className="flex items-center mb-4">
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/playo_footer_logo.png" // đặt logo Playo ở đây
              alt="Playo Logo"
              className="h-10"
            />
          </div>
          <p className="text-sm">
            © 2025 Techmash Solutions Pvt. Ltd. <br />
            All Rights Reserved.
          </p>
        </div>

        {/* Các cột link */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-sm font-semibold">
          {/* Company */}
          <div>
            <h3 className="text-gray-500 font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-800">ABOUT US</a></li>
              <li><a href="#" className="hover:text-gray-800">BLOGS</a></li>
              <li><a href="#" className="hover:text-gray-800">CONTACT</a></li>
              <li><a href="#" className="hover:text-gray-800">CAREERS</a></li>
              <li><a href="#" className="hover:text-gray-800">PARTNER WITH US</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-500 font-medium mb-4">Social</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-800">INSTAGRAM</a></li>
              <li><a href="#" className="hover:text-gray-800">FACEBOOK</a></li>
              <li><a href="#" className="hover:text-gray-800">LINKEDIN</a></li>
              <li><a href="#" className="hover:text-gray-800">TWITTER</a></li>
            </ul>
          </div>

          {/* Privacy & Terms */}
          <div>
            <h3 className="text-gray-500 font-medium mb-4">Privacy & Terms</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-800">FAQS</a></li>
              <li><a href="#" className="hover:text-gray-800">PRIVACY POLICY</a></li>
              <li><a href="#" className="hover:text-gray-800">TERMS OF SERVICE</a></li>
              <li><a href="#" className="hover:text-gray-800">CANCELLATION POLICY</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
