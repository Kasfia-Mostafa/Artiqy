import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentProps {
  comment: {
    author: {
      username: string;
      profilePicture?: string;
    };
    text: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="my-2">
      <div className="flex gap-3 items-center ">
        <Avatar>
          <AvatarImage src={comment?.author?.profilePicture} />
          <AvatarFallback>
            <img
              className="size-10"
              src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
              alt="user-male-circle"
            />
          </AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-base">
          {comment?.author.username}{" "}
          <span className="font-normal pl-1">{comment?.text}</span>
        </h1>
      </div>
    </div>
  );
};

export default Comment;
