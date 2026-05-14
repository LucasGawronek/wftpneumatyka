"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
  imageLabelPrefix: string;
};

export function ProductImageGallery({
  images,
  productName,
  imageLabelPrefix,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const activeImage = images.includes(selectedImage) ? selectedImage : images[0];

  return (
    <div>
      <div className="relative aspect-[1/1] overflow-hidden rounded-[18px] bg-[#fbfbfb]">
        <Image
          src={activeImage}
          alt={productName}
          fill
          className="object-contain"
          sizes="(max-width: 1280px) 100vw, 700px"
          priority
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((imageUrl, index) => {
            const isActive = activeImage === imageUrl;

            return (
              <button
                key={`${productName}-gallery-${index}`}
                type="button"
                onClick={() => setSelectedImage(imageUrl)}
                className={`relative aspect-square overflow-hidden rounded-[14px] border bg-[#fbfbfb] transition ${
                  isActive
                    ? "border-[var(--wft-orange)] shadow-[0_8px_18px_rgba(247,147,30,0.18)]"
                    : "border-[#ececec] hover:border-[var(--wft-orange)]"
                }`}
                aria-label={`${imageLabelPrefix} ${index + 1} ${productName}`}
                aria-pressed={isActive}
              >
                <Image
                  src={imageUrl}
                  alt={`${productName} - ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 30vw, 140px"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
