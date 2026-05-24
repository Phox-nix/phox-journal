import Link from 'next/link';
import Image from './Image';
import Socket from './Socket';
import Notification from './Notification';

const menuList = [
  { id: 1, name: 'Homepage', link: '/', icon: 'home.svg' },
  { id: 2, name: 'Explore', link: '/explore', icon: 'explore.svg' },
  //{ id: 3, name: 'Notifications', link: '/notifications', icon: 'notification.svg' },
  { id: 4, name: 'Messages', link: '/messages', icon: 'message.svg' },
  { id: 5, name: 'Bookmarks', link: '/bookmarks', icon: 'bookmark.svg' },
  { id: 6, name: 'Jobs', link: '/jobs', icon: 'job.svg' },
  { id: 7, name: 'Communities', link: '/communities', icon: 'community.svg' },
  { id: 8, name: 'Profile', link: '/profile', icon: 'profile.svg' },
  { id: 9, name: 'More', link: '/more', icon: 'more.svg' },
];

const LeftBar = () => {
  return (
    <div className=" h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        <Link href="/" className="p-2 rounded-full hover:bg-[#181818]">
          <Image path="icons/logo.svg" alt="Logo" w={24} h={24} />
        </Link>
        <div className="flex flex-col gap-4">
          {menuList.map((item, i) => (
            <>
              {i === 2 && (
                <div key={'custom-item'}>
                  <Notification />
                </div>
              )}
              <Link
                href={item.link}
                className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
                key={item.id}>
                <Image path={`icons/${item.icon}`} alt={item.name} w={24} h={24} />
                <span className="hidden xxl:inline">{item.name}</span>
              </Link>
            </>
          ))}
        </div>
        <Link
          href="/compose/post"
          className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden">
          <Image path="icons/post.svg" alt="new post" w={24} h={24} />
        </Link>
        <Link
          href="/compose/post"
          className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20">
          Post
        </Link>
      </div>
      {/* User Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image path="/avatar.png" alt="phoenix" w={100} h={100} tr={true} />
          </div>
          <div className="hidden xxl:flex flex-col">
            <span className="font-bold">phoenix</span>
            <span className="text-sm text-textGray">@phoxyy777</span>
          </div>
        </div>
        <div className="hidden xxl:block cursor-pointer font-bold">...</div>
      </div>
      <Socket />
    </div>
  );
};

export default LeftBar;
