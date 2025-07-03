'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  FileText,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/funnel', label: 'Funnel', icon: TrendingUp },
    { href: '/nurture', label: 'Nurture', icon: Target },
    { href: '/summary', label: 'Summary', icon: FileText },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:top-16">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-blue-400 mr-2" />
              <h1 className="text-lg font-semibold text-white">CRM Menu</h1>
            </div>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <IconComponent className={`mr-3 h-5 w-5 ${
                    pathname === item.href ? 'text-blue-300' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex bg-gray-700 p-4">
          <div className="text-sm text-gray-300">
            <p className="font-medium">DT Fellowship</p>
            <p className="text-xs text-gray-400">CRM Data Champion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
