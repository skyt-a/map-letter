import { FC, useCallback } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Post } from "@prisma/client";
import { LatLng } from "../../types/googleMap";
import { MarkdownEditor } from "../markdown/MarkdownEditor";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useMutationOnRegister } from "./hook/useMutationOnRegister";

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
  const { handleSubmit, register } = useForm();
  const [mutationCreate, mutationUpdate] = useMutationOnRegister(onCancel);
  const onRegister = useCallback(
    (e) => {
      (async () => {
        if (!position) {
          return;
        }
        try {
          if (selectedPost === undefined) {
            await mutationCreate.mutateAsync({
              title: e.title,
              lat: position.lat,
              lng: position.lng,
              content,
            });
          } else {
            await mutationUpdate.mutateAsync({
              id: selectedPost.id,
              title: e.title,
              content,
            });
          }
        } catch (error) {
          console.error(error);
          onCancel();
        }
      })();
    },
    [position, onCancel, content, mutationCreate, mutationUpdate]
  );
  return (
    <>
      <Wrapper>
        <form onSubmit={handleSubmit(onRegister)}>
          <StyledFormControl isRequired>
            <FormLabel>タイトル</FormLabel>
            <Input type="text" {...register("title", { required: true })} />
          </StyledFormControl>
          <MarkdownEditor content={content} setContent={setContent} />
          <Action>
            <StyledButton type="submit">
              {selectedPost === undefined ? "登録" : "更新"}
            </StyledButton>
            <StyledButton type="button" onClick={onCancel}>
              キャンセル
            </StyledButton>
          </Action>
        </form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  background-color: #fff;
  z-index: 10;
`;

const Action = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  height: 100px;
  padding: 2rem;
  z-index: 10;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: 8px;
  }
`;

const StyledFormControl = styled(FormControl)`
  margin: 8px 0;
`;

export { RegisterPopup };
