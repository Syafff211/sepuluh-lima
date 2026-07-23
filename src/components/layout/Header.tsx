'use client';

import { Bell, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNotificationStore, useUIStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function Header() {
  const { unreadCount } = useNotificationStore();
  const { theme, setTheme } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 lg:h-20 glass border-b border-white/10 px-4 lg:px-6">
      <div className="flex h-full items-center justify-between gap-2">
        {/* Search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-white/5 border-white/10 h-10"
            />
          </div>
        </div>

        {/* Spacer for mobile - push actions to the right */}
        <div className="flex-1 sm:hidden" />

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Mobile search */}
          <Button variant="ghost" size="icon" className="sm:hidden h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-9 w-9"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  variant="error"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-12 w-72 sm:w-80 glass rounded-xl border border-white/10 shadow-2xl"
                >
                  <div className="p-4 border-b border-white/10">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto p-2">
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No new notifications
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
