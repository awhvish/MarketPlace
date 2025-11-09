import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getUserByUsername } from '@/utils/user';
import { SignoutButton } from '@/components/SignoutButton';
import Image from 'next/image';
import Header from '@/components/Header';
import { User } from 'lucide-react';
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
    const decodedUsername = decodeURIComponent(params.username);
    const user = await getUserByUsername(decodedUsername);
    
    if (!user) {
      redirect('/404');
    }

    const session = await getServerSession(authOptions);
    const isOwnProfile = session?.user?.email === user.email;
    
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black text-white">
          <section className="relative py-20 bg-black/95">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
            
            <div className="relative container mx-auto px-4 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wider text-center">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  {user.name}&apos;s Profile
                </span>
              </h1>

              <div className="mb-8 flex items-center space-x-4 bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-purple-500/30">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <User size={48} className="text-white/90" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-serif tracking-wide text-white">@{user.username}</h2>
                  <p className="text-white/70">{user.email}</p>
                </div>
              </div>

              {user?.posts && (
                <ArtSection 
                  posts={user.posts}
                  isOwnProfile={isOwnProfile}
                  profileUser={user}
                />
              )}

              {isOwnProfile && (
                <div className="mt-8 space-y-4">
                  <Link
                    href={`/user/profile/${user.username}/edit`}
                    className="block w-full text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Edit Profile
                  </Link>
                  <SignoutButton />
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
}