import { Marker } from "@react-google-maps/api";
import { FC, useCallback, useState } from "react";
import { LatLng } from "../../types/googleMap";
import { GoogleMap } from "../../components/googleMap/GoogleMap";
import { OverlayView } from "@react-google-maps/api";
import { Post } from "@prisma/client";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { format } from "date-fns";
import { GoogleMapLoadScript } from "../../components/googleMap/GoogleMapLoadScript";

type RegisterMapProps = { posts: Post[] };

const RegisterMap: FC<RegisterMapProps> = (props) => {
  const [markerPosition, setMarkerPosition] = useState<LatLng>();
  const onClickMap = useCallback((param) => {
    const { lat, lng } = param.latLng;
    setMarkerPosition({ lat: lat(), lng: lng() });
  }, []);
  const register = useCallback(
    async (e) => {
      e.preventDefault();
      if (!markerPosition) {
        return;
      }
      try {
        const body = {
          latitude: markerPosition.lat,
          longitude: markerPosition.lng,
          publishedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        };
        await fetch("/api/post/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (error) {
        console.error(error);
      }
    },
    [markerPosition]
  );
  return (
    <GoogleMapLoadScript {...props}>
      <GoogleMap onClick={onClickMap}>
        {markerPosition && <Marker position={markerPosition} />}
        {props.posts?.map((post) => (
          <Marker position={{ lat: post.latitude, lng: post.longitude }} />
        ))}
        {markerPosition && (
          <OverlayView
            position={markerPosition}
            mapPaneName="overlayMouseTarget"
          >
            <div>
              <button onClick={register} type="button">
                登録
              </button>
            </div>
          </OverlayView>
        )}
        <style jsx>{`
          div {
            background-color: #fff;
            width: 200px;
            height: 100px;
            padding: 2rem;
            z-index: 10;
          }
        `}</style>
      </GoogleMap>
    </GoogleMapLoadScript>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const posts = await prisma.post.findMany();

  return {
    props: { posts },
  };
};

export default RegisterMap;
