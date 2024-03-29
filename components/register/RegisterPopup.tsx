import { FC, useCallback } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Post } from "@prisma/client";
import { LatLng } from "../../types/googleMap";
import { MarkdownEditor } from "../markdown/MarkdownEditor";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useMutationOnRegister } from "./hook/useMutationOnRegister";
import { useQueryClient } from "@tanstack/react-query";

type RegisterPopupProps = {
  title?: string;
  position: LatLng;
  onCancel: () => void;
  content: string;
  setContent: (content: string) => void;
  selectedPost?: Post;
};

const RegisterPopup: FC<RegisterPopupProps> = ({
  title,
  position,
  onCancel,
  content,
  setContent,
  selectedPost,
}) => {
  const { handleSubmit, register } = useForm();
  const [mutationCreate, mutationUpdate] = useMutationOnRegister(onCancel);
  const onRegister = useCallback(
    async (e) => {
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
    },
    [position, onCancel, content, mutationCreate, mutationUpdate]
  );
  return (
    <>
      <Wrapper>
        <form onSubmit={handleSubmit(onRegister)}>
          <StyledFormControl isRequired>
            <FormLabel>タイトル</FormLabel>
            <Input
              type="text"
              {...register("title", { required: true, value: title })}
              defaultValue={title}
            />
          </StyledFormControl>
          <MarkdownEditor content={content} setContent={setContent} />
          <Action>
            <StyledButton
              w="80px"
              fontSize="0.8rem"
              type="submit"
              bg="brand.800"
              color="#fff"
            >
              {selectedPost === undefined ? "登録" : "更新"}
            </StyledButton>
            <StyledButton
              w="80px"
              fontSize="0.8rem"
              type="button"
              onClick={onCancel}
              bg="fff"
              color="brand.800"
              border="1px"
              borderColor="brand.800"
              ml="8px"
            >
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
  padding: 14px;
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
