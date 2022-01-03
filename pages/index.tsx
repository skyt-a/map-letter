import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { GoogleMapLoadScript } from "../components/googleMap/GoogleMapLoadScript";
import { GoogleMap } from "../components/googleMap/GoogleMap";
import RegisterMap from "./register";

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <GoogleMapLoadScript {...props}>
      <RegisterMap />
    </GoogleMapLoadScript>
  );
};

export default Blog;
