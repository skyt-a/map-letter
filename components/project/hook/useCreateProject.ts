import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createProject } from "../../../api/mutation/project";

export const useCreateProject = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      toast({
        description: "プロジェクトが作成されました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });
  const callback = useCallback(async (target) => {
    await mutation.mutateAsync(target);
  }, []);
  return callback;
};
