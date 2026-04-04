// app/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-white">Miona  Tech Autospares</h2>
            <p className="mt-1 text-sm">Nairobi - Kirinyaga Road near shell pretrol station</p>
          </div>

          {/* Social links */}
          <div>
            
           
                {/* Contact info
                <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                 <ul className="flex space-x-4 mt-2">
              <li>
                <Link href="https://www.tiktok.com/@gaabsolutions" target="_blank" rel="noopener noreferrer">
                  <span className="hover:text-white">TikTok</span>
                </Link>
              </li>
              <li>
                <Link href="https://www.facebook.com/61580876740265/" target="_blank" rel="noopener noreferrer">
                  <span className="hover:text-white">Facebook</span>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/gaab_solutions_ltd" target="_blank" rel="noopener noreferrer">
                  <span className="hover:text-white">Instagram</span>
                </Link>
              </li>
            </ul>
         
            */}
             </div>
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="mt-2 text-sm space-y-1">
              <li>📞 <Link href="tel:+254700141499"><span className="hover:text-white">+254 715584225</span></Link> (WhatsApp)</li>
              <li>✉️ <Link href="mailto:kaceymwangi@gmail.com"><span className="hover:text-white">naomygeorge08@gmail.com</span></Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Miona tech autospares Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
