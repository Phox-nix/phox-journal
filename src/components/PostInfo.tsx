import Image from './Image';

const PostInfo = () => {
  return (
    <div className="cursor-pointer w-4 h-4 relative">
      <Image path="icons/infoMore.svg" alt="" w={16} h={16} tr={true} />
    </div>
  );
};

export default PostInfo;
