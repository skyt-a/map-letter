import { Post } from "@prisma/client";
import { OverlayView } from "@react-google-maps/api";
import { format } from "date-fns";
import { FC, useCallback } from "react";
import { LatLng } from "../../types/googleMap";
import { MarkdownEditor } from "../markdown/MarkdownEditor";

type RegisterPopupProps = {
  position: LatLng;
  onCancel: () => void;
  content: string;
  setContent: (content: string) => void;
  selectedPost?: Post;
};

const RegisterPopup: FC<RegisterPopupProps> = ({
  position,
  onCancel,
  content,
  setContent,
  selectedPost,
}) => {
  const onRegister = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      (async () => {
        if (!position) {
          return;
        }
        try {
          if (selectedPost === undefined) {
            const body = {
              latitude: position.lat,
              longitude: position.lng,
              content,
              publishedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            };
            await fetch("/api/post/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
          } else {
            const body = {
              id: selectedPost.id,
              content,
            };
            await fetch("/api/post/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          onCancel();
        }
      })();
    },
    [position, onCancel, content]
  );
  return (
    <>
      <section>
        <MarkdownEditor content={content} setContent={setContent} />
        <div>
          <button
            type="button"
            className="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
            onClick={onRegister}
          >
            登録
          </button>

          <button
            type="button"
            className="p-2 pl-5 pr-5 bg-gray-500 text-gray-100 text-lg rounded-lg focus:border-4 border-gray-300"
            onClick={onCancel}
          >
            キャンセル
          </button>
        </div>
      </section>
      <style jsx>{`
        section {
          position: absolute;
          top: 0;
          right: 0;
          width: 50vw;
          height: 100vh;
          background-color: #fff;
          z-index: 10;
        }
        div {
          background-color: #fff;
          height: 100px;
          padding: 2rem;
          z-index: 10;
        }
        button + button {
          margin-left: 8px;
        }
      `}</style>
    </>
  );
};

export { RegisterPopup };
