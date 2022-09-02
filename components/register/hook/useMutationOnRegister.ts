import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost } from "../../../api/mutation/post";

export const useMutationOnRegister = (onCancel) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutationCreate = useMutation(createPost, {
    onSuccess: () => {
      toast({
        description: "投稿が登録されました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onCancel();
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const mutationUpdate = useMutation(updatePost, {
    onSuccess: () => {
      toast({
        description: "投稿が更新されました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onCancel();
      queryClient.invalidateQueries(["posts"]);
    },
  });
  return [mutationCreate, mutationUpdate] as const;
};
