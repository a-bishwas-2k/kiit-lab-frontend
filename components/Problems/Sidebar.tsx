"use client"
import React from 'react';
import { Activity, Users, Code2, Award, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  const menuItems = [
    { icon: Activity, label: 'Overview' },
    { icon: Users, label: 'Users' },
    { icon: Code2, label: 'Problems', active: true },
    { icon: Award, label: 'Contests' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-[#141313] border-r border-gray-200 px-4 py-6 ">
      <div className="flex items-center gap-2 px-2 mb-8">
        <Code2 className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-200">KIIT-LAB</span>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <button onClick={()=>signOut()} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;