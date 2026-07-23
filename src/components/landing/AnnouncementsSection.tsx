'use client';

import { motion } from 'framer-motion';
import { Bell, Pin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const announcements = [
  {
    title: 'Ujian Tengah Semester',
    content: 'UTS akan dilaksanakan pada tanggal 15-20 Oktober 2024. Persiapkan diri dengan baik.',
    date: '2024-10-01',
    pinned: true,
  },
  {
    title: 'Class Meeting',
    content: 'Class meeting akan diadakan setelah ujian semester. Setiap siswa wajib mengikuti minimal 1 cabang lomba.',
    date: '2024-09-28',
    pinned: false,
  },
  {
    title: 'Study Tour',
    content: 'Study tour ke Museum Nasional dan Taman Mini Indonesia Indah pada bulan November.',
    date: '2024-09-25',
    pinned: false,
  },
];

export function AnnouncementsSection() {
  return (
    <section id="announcements" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Pengumuman</span> Terbaru
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Informasi penting dan terkini dari kelas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {announcements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full hover:glow-primary transition-all duration-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    {item.pinned && (
                      <Badge variant="warning" className="gap-1">
                        <Pin className="h-3 w-3" />
                        Pinned
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.content}</p>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
