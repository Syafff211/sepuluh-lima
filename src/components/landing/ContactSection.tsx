'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ContactSection() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Kontak</span> Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hubungi kami untuk informasi lebih lanjut
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: MapPin, title: 'Alamat', value: 'Jl. Raya Purbalingga, Jawa Tengah' },
            { icon: Phone, title: 'Telepon', value: '(0281) 123456' },
            { icon: Mail, title: 'Email', value: 'x5@sman1purbalingga.sch.id' },
            { icon: Globe, title: 'Website', value: 'www.sman1purbalingga.sch.id' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="text-center hover:glow-primary transition-all duration-500 h-full">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
