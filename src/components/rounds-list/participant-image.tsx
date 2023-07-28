import Image from "next/image"

type ParticipantImageProps = {
  src: string
  alt: string
  lined: boolean
  hasWinner?: boolean
  winner?: boolean
}

const afterClasses =
  " after:content-[''] after:h-[1px] after:width-1/2 after:right-1 after:w-full after:bg-primary-100 after:absolute after:top-1/2 relative after:translate-x-1/2 after:left-1/2"

export function ParticipantImage({
  src,
  alt,
  lined,
  hasWinner = false,
  winner = false,
}: ParticipantImageProps) {
  return (
    <div className={`relative h-[69px] w-[69px] ${lined && afterClasses}`}>
      <div className="relative overflow-hidden rounded-full border-2 border-primary-100">
        {hasWinner && !winner && (
          <div className="absolute h-[69px] w-[69px] bg-primary-100 opacity-40" />
        )}
        <Image
          src={src}
          alt={alt}
          width={69}
          height={69}
          className="h-full w-full object-cover transition-all duration-300 hover:scale-125"
        />
      </div>
    </div>
  )
}
