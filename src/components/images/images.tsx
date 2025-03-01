//Hooks
import { useState } from "react";

//UI
import * as icons from "react-icons/io5";

interface Props {
  url: string;
  iconName: keyof typeof icons;
}

export const ImagesComponent = ({ url, iconName }: Props) => {
  const [isError, setIsError] = useState<boolean>(false);

  if (!url || url.length === 0 || url.length < 24 || isError) {
    const Icon = icons[iconName];
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Icon size={150} />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <img
        src={url}
        alt="Product"
        onError={() => setIsError(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );
};
