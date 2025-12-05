import { getUserByUsername } from '@/utils/user';

interface UserProfileProps {
  params: {
    username: string;
  };
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