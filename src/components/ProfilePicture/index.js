import { useStores } from "../../stores";
import { Image, Transformation } from "cloudinary-react";

const ProfilePicture = (props) => {
  const { size } = props;
  const userStore = useStores().user;
  const transform = (
    <Transformation
      width={size}
      height={size}
      gravity="face"
      crop="thumb"
      radius="max"
    />
  );

  const checkUrl = (url) => (url.match(/^https*/) ? { type: "fetch" } : {});

  return (
    <>
      {userStore.user && !userStore.user.photoURL && (
        <img
          src="avatar-placeholder.png"
          style={{ display: "block", margin: "0 auto" }}
        />
      )}

      {userStore.user && userStore.user.photoURL && (
        <Image
          style={{ display: "block", margin: "0 auto" }}
          publicId={userStore.user.photoURL}
          {...checkUrl(userStore.user.photoURL)}
        >
          <Transformation
            width={size}
            height={size}
            gravity="face"
            crop="thumb"
            radius="max"
          />
        </Image>
      )}
    </>
  );
};

ProfilePicture.defaultProps = {
  size: 80,
};

export default ProfilePicture;
