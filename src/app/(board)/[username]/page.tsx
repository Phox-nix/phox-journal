import Feed from '@/components/Feed';
import Image from '@/components/Image';
import { prisma } from '@/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import FollowButton from '@/components/FollowButton';

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { userId } = await auth();
  const username = (await params).username;
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      _count: { select: { followers: true, following: true } },
      following: userId ? { where: { followerId: userId } } : undefined,
    },
  });
  console.log(userId);
  if (!user) return notFound();
  return (
    <div className="">
      {/* Profile Title */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-sm p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image path="/icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">{user.displayName}</h1>
      </div>
      {/* INFO */}
      <div className="">
        {/* COVER AND AVATAR CONTAINER*/}
        <div className="relative w-full">
          {/* COVER */}
          <div className="w-full aspect-[3/1] relative">
            <Image path={user.cover || '/noCover.png'} alt="cover" w={600} h={200} tr={true} />
          </div>
          {/* AVATAR */}
          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <Image path={user.img || '/noAvatar.jpg'} alt="avatar" w={100} h={100} tr={true} />
          </div>
        </div>
        {/* ICONS */}
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer ">
            <Image path="/icons/more.svg" alt="edit" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer ">
            <Image path="/icons/explore.svg" alt="edit" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer ">
            <Image path="/icons/message.svg" alt="edit" w={20} h={20} />
          </div>
          {userId && <FollowButton userId={user.id} isFollowed={!!user.following.length} />}
        </div>
        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME AND HANDLE */}
          <div>
            <h1 className="text-exl font-bold">{user.displayName}</h1>
            <span className="text-textGray text-sm">{user.username}</span>
          </div>
          {user.bio && <p>{user.bio}</p>}
          {/* JOB AND LOCATION AND DATE */}
          <div className="flex gap-4 text-textGray text-[15px]">
            {user.location && (
              <div className="flex items-center gap-2">
                <Image path="/icons/userLocation.svg" alt="location" w={20} h={20} />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Image path="/icons/date.svg" alt="date" w={20} h={20} />
              <span>
                Joined
                {new Date(user.createdAt.toString()).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          {/* FOLLOWINGS AND FOLLOWERS */}
          <div className="flex gap-4">
            <div className="flex items-ceter gap-2">
              <span className="font-bold">100</span>
              <span className="text-textGray text-[15px]">{user._count.followers}</span>
            </div>
            <div className="flex items-ceter gap-2">
              <span className="font-bold">100</span>
              <span className="text-textGray text-[15px]">{user._count.following}</span>
            </div>
          </div>
        </div>
      </div>
      {/* TWEETS */}
      <Feed userProfileId={user.id} />
    </div>
  );
};
export default UserPage;
