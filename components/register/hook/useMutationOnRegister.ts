import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { createPost, updatePost } from "../../../api/mutation/post";

export const useMutationOnRegister = (onCancel) => {
  const toast = useToast();
  const mutationCreate = useMutation(createPost, {
    onSuccess: () => {
      toast({
        title: "投稿が登録されました",
        description: "投稿が登録されました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onCancel();
    },
  });
  const mutationUpdate = useMutation(updatePost, {
    onSuccess: () => {
      toast({
        title: "投稿が更新されました",
        description: "投稿が更新されました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onCancel();
    },
  });
  return [mutationCreate, mutationUpdate] as const;
};
