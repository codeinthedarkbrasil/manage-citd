import { PropsWithChildren } from "@/types/react";

type ParticipantImageProps = {
  src: string;
  alt: string;
  hasLine: boolean;
};

const afterClasses =
  " after:content-[''] after:h-[1px] after:width-1/2 after:right-1 after:w-full after:bg-primary-100 after:absolute after:top-1/2 relative after:translate-x-1/2 after:left-1/2";

export function ParticipantImage({ src, alt, hasLine }: ParticipantImageProps) {
  return (
    <div
      className={`w-[69px] h-[69px] border-2 border-primary-100 rounded-full ${
        hasLine && afterClasses
      }`}
      style={{
        borderRadius: "50%",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover relative z-10"
        style={{
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}
