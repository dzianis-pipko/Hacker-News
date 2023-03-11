import React, { memo } from "react";
import { Comment } from "./Comment";

interface CommentsProps {
  commentsIds: number[];
  refresh: boolean;
}

export const Comments = memo(({ commentsIds, refresh }: CommentsProps) => {
  return (
    <>
      {commentsIds.map(
        (id, i) =>
          id && (
            <React.Fragment key={i}>
              <Comment refresh={refresh} commentId={id} />
            </React.Fragment>
          )
      )}
    </>
  );
});
