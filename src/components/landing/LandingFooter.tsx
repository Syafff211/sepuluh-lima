'use client';

import { GraduationCap, Github, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">X-5 SMAN 1 Purbalingga</h3>
                <p className="text-xs text-muted-foreground">Premium Digital Classroom</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Platform digital kelas modern untuk mengelola kehadiran, tugas, nilai,
              dan kegiatan kelas X-5 SMAN 1 Purbalingga.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Gallery', 'Students', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Social Media</h4>
            <div className="flex gap-3">
              {[Github, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 X-5 SMAN 1 Purbalingga. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by Kelas X-5
          </p>
        </div>
      </div>
    </footer>
  );
}
