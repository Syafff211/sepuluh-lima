'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Bell,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store';

const stats = [
  { icon: CheckCircle, label: 'Kehadiran', value: '95%', color: 'text-success', bg: 'bg-success/20' },
  { icon: BookOpen, label: 'Tugas Aktif', value: '3', color: 'text-primary', bg: 'bg-primary/20' },
  { icon: TrendingUp, label: 'Rata-rata Nilai', value: '87.5', color: 'text-info', bg: 'bg-info/20' },
  { icon: Calendar, label: 'Kegiatan Bulan Ini', value: '5', color: 'text-warning', bg: 'bg-warning/20' },
];

const todaySchedule = [
  { time: '07:30', subject: 'Matematika', room: 'R.101', status: 'ongoing' },
  { time: '09:00', subject: 'Bahasa Indonesia', room: 'R.101', status: 'upcoming' },
  { time: '10:30', subject: 'Fisika', room: 'Lab Fisika', status: 'upcoming' },
  { time: '13:00', subject: 'Bahasa Inggris', room: 'R.101', status: 'upcoming' },
];

const recentAnnouncements = [
  { title: 'Ujian Tengah Semester', date: '15-20 Oktober 2024', pinned: true },
  { title: 'Class Meeting', date: '25 Oktober 2024', pinned: false },
  { title: 'Study Tour', date: 'November 2024', pinned: false },
];

const upcomingAssignments = [
  { title: 'Essay Bahasa Indonesia', due: '3 hari lagi', subject: 'B. Indonesia' },
  { title: 'Soal Matematika Bab 5', due: '5 hari lagi', subject: 'Matematika' },
  { title: 'Laporan Praktikum Fisika', due: '1 minggu lagi', subject: 'Fisika' },
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">
            Selamat Datang, <span className="text-gradient">{user?.full_name || 'Siswa'}</span>
          </h1>
          <p className="text-muted-foreground">
            Berikut ringkasan kegiatan kelas X-5 hari ini.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:glow-primary transition-all duration-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Jadwal Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <div className="text-center min-w-[60px]">
                      <p className="text-sm font-semibold">{item.time}</p>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="flex-1">
                      <p className="font-medium">{item.subject}</p>
                      <p className="text-sm text-muted-foreground">{item.room}</p>
                    </div>
                    <Badge
                      variant={item.status === 'ongoing' ? 'success' : 'outline'}
                    >
                      {item.status === 'ongoing' ? 'Berlangsung' : 'Akan Datang'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Pengumuman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAnnouncements.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      </div>
                      {item.pinned && (
                        <Badge variant="warning" className="text-[10px]">Pinned</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Assignments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Tugas Mendatang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {upcomingAssignments.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors cursor-pointer border border-white/5"
                >
                  <Badge variant="outline" className="mb-2">{item.subject}</Badge>
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Deadline: <span className="text-warning">{item.due}</span>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
