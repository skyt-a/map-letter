import { Marker } from "@react-google-maps/api";
import { FC, useCallback, useState } from "react";
import { LatLng } from "../../types/googleMap";
import { GoogleMap } from "../../components/googleMap/GoogleMap";
import { Post } from "@prisma/client";
import { GoogleMapLoadScript } from "../../components/googleMap/GoogleMapLoadScript";
import { RegisterPopup } from "../../components/register/RegisterPopup";
import { useQuery } from "react-query";
import { fetchPost } from "../../api/query/post";
import { Spinner } from "@chakra-ui/react";

type RegisterMapProps = { posts: Post[] };

const RegisterMap: FC<RegisterMapProps> = (props) => {
  const [registerMarkerPosition, setMarkerPosition] = useState<LatLng>();
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [content, setContent] = useState("");
  const { data, isLoading } = useQuery<[Post[], LatLng]>("posts", fetchPost);
  const [posts, nowPosition] = data ?? [];
  const onClickMap = useCallback((param) => {
    const { lat, lng } = param.latLng;
    setMarkerPosition({ lat: lat(), lng: lng() });
  }, []);
  const onClickMarker = useCallback(
    (post: Post) => (e) => {
      e.domEvent.stopPropagation();
      setMarkerPosition({ lat: post.latitude, lng: post.longitude });
      setContent(post.content);
      setSelectedPost(post);
    },
    []
  );
  const onCancel = useCallback(() => {
    setMarkerPosition(undefined);
    setSelectedPost(undefined);
  }, []);

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <GoogleMapLoadScript {...props}>
      <GoogleMap onClick={onClickMap} center={nowPosition}>
        {registerMarkerPosition && <Marker position={registerMarkerPosition} />}
        {posts?.map((post) => (
          <Marker
            key={post.id}
            position={{ lat: post.latitude, lng: post.longitude }}
            onClick={onClickMarker(post)}
          />
        ))}
      </GoogleMap>
      {registerMarkerPosition && (
        <RegisterPopup
          content={content}
          position={registerMarkerPosition}
          onCancel={onCancel}
          selectedPost={selectedPost}
          setContent={setContent}
        />
      )}
    </GoogleMapLoadScript>
  );
};

export default RegisterMap;
