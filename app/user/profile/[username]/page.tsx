import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getUserByUsername, getUserWithPosts } from '@/utils/user';
import { SignoutButton } from '@/components/SignoutButton';
import Image from 'next/image';
import Header from '@/components/Header';
import {  Lock, User, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import ArtSection from '@/components/ArtSection';
import { Footer } from '@/components/Footer';

interface UserProfileProps {
  params: {
    username: string;
  };
}

export default async function UserProfilePage({ params }: UserProfileProps) {
  try {
    // Fetch server-side session
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/auth/login'); // Redirect to login if not authenticated
    }

    // Fetch profile data
    const profileUser = await getUserByUsername(params.username);

    if (!profileUser) {
      redirect('/404'); // Redirect if user profile not found
    }

    // Fetch user posts
    const user = await getUserWithPosts(params.username);

    const isOwnProfile = session?.user?.email === profileUser.email;

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8 mb-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>

            {/* Profile Header */}
            <div className="mb-8 flex items-center space-x-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                {profileUser.image ? (
                  <Image
                    src={profileUser.image}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profileUser.name}</h2>
                <p className="text-gray-600">@{profileUser.username}</p>
              </div>
            </div>

            {/* Art Section */}
            {user && <ArtSection posts={user.posts} isOwnProfile={isOwnProfile} profileUser={profileUser} />}

            {/* Personal Info Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span>{profileUser.email}</span>
                </div>
                {profileUser.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span>{profileUser.phone}</span>
                  </div>
                )}
                {profileUser.country && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span>{profileUser.country}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Account Security */}
            {isOwnProfile && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>Two-Factor Authentication (2FA)</span>
                  </div>
                  <button className="px-4 py-2 rounded-md bg-black text-white">
                    Manage 2FA
                  </button>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {isOwnProfile && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <Link
                  href={`/user/profile/${profileUser.username}/edit`}
                  className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 text-center block"
                >
                  Edit Profile
                </Link>
                <SignoutButton />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching user profile:', error);
    redirect('/500'); // Redirect to a server error page
  }
}

export async function generateMetadata({ params }: UserProfileProps) {
  try {
    const user = await getUserByUsername(params.username);

    return {
      title: user ? `${user.name}'s Profile` : 'Profile Not Found',
      description: user ? `Profile page for ${user.name}` : 'User profile could not be found',
    };
  } catch {
    return {
      title: 'Profile Not Found',
      description: 'User profile could not be found',
    };
  }
}
