import { useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import { Button } from "@/components/Elements/Button";
import { Icon } from "@/components/Elements/Icon";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { useStore } from "@/stores";

import { like } from "../api/like";
import { unlike } from "../api/unlike";

export type LikeButtonProps = {
  liked: boolean;
  productId: string;
};

export function LikeButton({ liked, productId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked);

  const {
    authStore: { isLoggedIn },
    modalStore: { openModal },
  } = useStore();

  function handleClick(id: string) {
    if (isLoggedIn) {
      setIsLiked(!isLiked);

      isLiked ? unlike(id) : like(id);
    } else {
      openModal(<LoginModal />);
    }
  }

  return (
    <Button
      size="xs"
      variant="light"
      className="mb-1"
      onClick={() => handleClick(productId)}
    >
      {isLiked ? (
        <Icon icon={IoMdHeart} color="pink" />
      ) : (
        <Icon icon={IoMdHeartEmpty} />
      )}
    </Button>
  );
}
