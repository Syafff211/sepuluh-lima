'use client';

import { motion } from 'framer-motion';
import { Crown, Users, BookOpen, Calculator } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const officers = [
  { name: 'Ahmad Rizky', role: 'Ketua Kelas', icon: Crown, color: 'text-yellow-500' },
  { name: 'Siti Nurhaliza', role: 'Wakil Ketua', icon: Users, color: 'text-blue-500' },
  { name: 'Dewi Lestari', role: 'Sekretaris', icon: BookOpen, color: 'text-green-500' },
  { name: 'Budi Santoso', role: 'Bendahara', icon: Calculator, color: 'text-purple-500' },
];

export function OfficersSection() {
  return (
    <section id="officers" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pengurus <span className="text-gradient">Kelas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tim yang memimpin dan mengorganisir kegiatan kelas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {officers.map((officer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="text-center hover:glow-primary transition-all duration-500 group">
                <CardContent className="pt-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <officer.icon className={`h-10 w-10 ${officer.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{officer.name}</h3>
                  <Badge variant="outline">{officer.role}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
