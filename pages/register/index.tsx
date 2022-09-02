import { Marker } from "@react-google-maps/api";
import { FC, useCallback, useContext, useState } from "react";
import { LatLng } from "../../types/googleMap";
import { GoogleMap } from "../../components/googleMap/GoogleMap";
import { Post } from "@prisma/client";
import { GoogleMapLoadScript } from "../../components/googleMap/GoogleMapLoadScript";
import { RegisterPopup } from "../../components/register/RegisterPopup";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../../api/query/post";
import { Spinner } from "@chakra-ui/react";
import { GeoLocationContext } from "../../components/googleMap/GeolocatonProvider";
import MLSpinner from "../../components/common/MLSpinner";

type RegisterMapProps = { posts: Post[] };

const RegisterMap: FC<RegisterMapProps> = (props) => {
  const [registerMarkerPosition, setMarkerPosition] = useState<LatLng>();
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [content, setContent] = useState("");
  const { data: posts, isLoading } = useQuery<Post[]>(["posts"], fetchPost);
  const { geolocationLatlon: nowPosition } = useContext(GeoLocationContext);
  const onClickMap = useCallback(
    (param) => {
      if (selectedPost) {
        return;
      }
      const { lat, lng } = param.latLng;
      setMarkerPosition({ lat: lat(), lng: lng() });
      setSelectedPost(undefined);
      setContent("");
    },
    [selectedPost]
  );
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
    setContent("");
  }, []);

  if (isLoading) {
    return <MLSpinner />;
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
          title={selectedPost?.title}
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
