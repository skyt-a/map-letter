import { FC } from "react";
import {
  Divider,
  ListItem,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { fetchProjects } from "../../api/query/project";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@prisma/client";
import FloatingButton from "../../components/common/FloatingButton";
import { AddIcon } from "@chakra-ui/icons";
import CreateProjectModal from "../../components/project/CreateProjectModal";
import MLSpinner from "../../components/common/MLSpinner";

const Projects: FC<unknown> = () => {
  const { data, isLoading } = useQuery<Project[]>(["projects"], fetchProjects);
  const { onOpen, ...rest } = useDisclosure();
  if (isLoading) {
    return <MLSpinner />;
  }
  return (
    <Wrapper>
      <UnorderedList>
        {data?.map((project) => (
          <>
            <ListItem>{project.title}</ListItem>
            <Divider />
          </>
        ))}
      </UnorderedList>
      <FloatingButton styleType="circle" onClick={onOpen}>
        <AddIcon />
      </FloatingButton>
      <CreateProjectModal {...rest} />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 14px;
`;

export default Projects;
