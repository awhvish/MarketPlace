import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getUserByUsername } from '@/utils/user';
import { SignoutButton } from '@/components/SignoutButton';
import Header from '@/components/Header';
import Link from 'next/link';
import ArtSection from '@/components/ArtSection';
import { Footer } from '@/components/Footer';
import ProfileImage from './ProfileImage';

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
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 bg-[#0a0a0a] z-0"></div>
        
        {/* Multiple Gradient Orbs */}
        <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="fixed top-1/3 right-1/3 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
        
        {/* Animated Grid Pattern */}
        <div className="fixed inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="relative z-10 min-h-screen flex flex-col text-white">
          <Header />
          <main className="flex-1">
            <section className="relative pt-32 pb-20">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent"></div>
              
              <div className="relative container mx-auto px-4 max-w-6xl">
                {/* Profile Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
                    <span className="gradient-text-animated drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                      {user.name}&apos;s Profile
                    </span>
                  </h1>
                </div>

                {/* Profile Card */}
                <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-purple-500/30 shadow-2xl relative">
                        <ProfileImage image={user.image} alt="Profile Picture" />
                      </div>
                      {/* Decorative glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl -z-10"></div>
                    </div>
                    
                    {/* Profile Info */}
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">@{user.username}</h2>
                      <p className="text-lg text-gray-300 mb-6">{user.email}</p>
                      
                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <div className="glass rounded-xl px-6 py-3 border border-white/10">
                          <p className="text-2xl font-bold gradient-text">{user?.posts?.length || 0}</p>
                          <p className="text-sm text-gray-400">Products</p>
                        </div>
                        <div className="glass rounded-xl px-6 py-3 border border-white/10">
                          <p className="text-2xl font-bold text-green-400">Active</p>
                          <p className="text-sm text-gray-400">Status</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isOwnProfile && (
                      <div className="flex flex-col gap-3 w-full md:w-auto">
                        <Link
                          href={`/user/profile/${user.username}/edit`}
                          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover-scale text-center shadow-lg hover:shadow-purple-500/50"
                        >
                          Edit Profile
                        </Link>
                        <SignoutButton />
                      </div>
                    )}
                  </div>
                </div>

                {/* Products Section */}
                {user?.posts && (
                  <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <ArtSection 
                      posts={user.posts}
                      isOwnProfile={isOwnProfile}
                      profileUser={user}
                    />
                  </div>
                )}
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
}