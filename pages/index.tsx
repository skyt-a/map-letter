import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { GoogleMapLoadScript } from "../components/googleMap/GoogleMapLoadScript";
import { GoogleMap } from "../components/googleMap/GoogleMap";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findFirst();
  return { props: { feed: [feed] } };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <GoogleMapLoadScript {...props}>
      <GoogleMap />
    </GoogleMapLoadScript>
  );
};

export default Blog;
