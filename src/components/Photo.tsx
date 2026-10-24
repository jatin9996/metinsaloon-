import Image from "next/image";

export function Photo({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className={`group relative overflow-hidden bg-sand ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`photo-img object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.04] ${imageClassName}`}
      />
    </div>
  );
}
