"use client";

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Folder from '@/assets/folder_filled.svg';
import Star from '@/assets/star_filled.svg';
import Clock from '@/assets/clock_filled.svg';

type Activity = {
  id: string;
  timestamp: string;
  activity: string;
  title: string;
};

function formatActivity(activity: string, title: string): string {
  if (activity === 'WATCH_LATER') {
    return `Added ${title} to watch later`;
  }
  return `Favorited ${title}`;
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

export default function Sidebar() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch('/api/activities');
      if (res.ok) {
        const data = await res.json();
        setActivities(data.activities || []);
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    const handleActivityChange = () => {
      fetchActivities();
    };

    window.addEventListener('watchLaterChanged', handleActivityChange);
    window.addEventListener('favoritesChanged', handleActivityChange);

    return () => {
      window.removeEventListener('watchLaterChanged', handleActivityChange);
      window.removeEventListener('favoritesChanged', handleActivityChange);
    };
  }, [fetchActivities]);

  return (
    <>
      {/* Mobile Nav */}
      <nav className="md:hidden fixed top-15 left-0 right-0 z-40 bg-teal text-white flex flex-row justify-start gap-6 py-3 px-4">
        <Link href="/" className="flex row items-center gap-1">
          <Image src={Folder} alt={""} height={24} width={24} />
          <p className="text-xs">Home</p>
        </Link>

        <Link href="/favorites" className="flex row items-center gap-1">
          <Image src={Star} alt={""} height={24} width={24} />
          <p className="text-xs">Favorites</p>
        </Link>

        <Link href="/watch-later" className="flex row items-center gap-1">
          <Image src={Clock} alt={""} height={24} width={24} />
          <p className="text-xs">Watch Later</p>
        </Link>
      </nav>

      {/* Desktop Nav */}
        <nav className="hidden md:flex fixed top-15 left-0 bottom-0 z-40 group bg-teal text-white w-21 hover:w-56 flex-col px-5 py-6 gap-6">
          <Link href="/" className="flex row ml-2.5 gap-2 items-center">
            <Image src={Folder} alt={""} height={24} width={24} />
            <p className="text-sm hidden group-hover:block">Home</p>
          </Link>

          <Link href="/favorites" className="flex row ml-2.5 gap-2 items-center">
            <Image src={Star} alt={""} height={24} width={24} />
            <p className="text-sm hidden group-hover:block">Favorites</p>
          </Link>

          <Link href="/watch-later" className="flex row ml-2.5 gap-2 items-center">
            <Image src={Clock} alt={""} height={24} width={24} />
            <p className="text-sm hidden group-hover:block">Watch Later</p>
          </Link>

          <div className="flex-col gap-2 items-center self-center hidden group-hover:md:flex bg-neon-teal auto text-darker-blue w-full mx-auto overflow-auto no-scrollbar pt-4 rounded-2xl p-2">
            <p className="font-bold text-lg">Latest Activities</p>
            {activities.length > 0 ? (
              activities.map((activity) => (
              <div key={activity.id} className="w-full">
                <p>{formatTimestamp(activity.timestamp)}</p>
                <p>
                  {activity.activity === 'WATCH_LATER' ? 'Added ' : 'Favorited '}
                  <span className="font-bold">{activity.title}</span>
                  {activity.activity === 'WATCH_LATER' ? ' to watch later' : ''}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-center opacity-70">No recent activities</p>
            )}
          </div>
        </nav>
    </>
  );
}