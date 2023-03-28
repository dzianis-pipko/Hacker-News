import { CommentItem } from "../types/types";
import { Comment } from "./Comment";
interface CommentsProps {
  comments: CommentItem[];
}

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};
