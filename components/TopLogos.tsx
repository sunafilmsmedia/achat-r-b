import Image from "next/image";

export default function TopLogos() {
  return (
    <>
      <div
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-30 pointer-events-none anim-fade-in"
        aria-hidden
      >
        <Image
          src="/logo-roux-bachand.png"
          alt="Roux et Bachand"
          width={750}
          height={194}
          priority
          className="h-7 sm:h-9 w-auto"
        />
      </div>

      <div
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30 pointer-events-none anim-fade-in"
        aria-hidden
      >
        <Image
          src="/logo-exp.png"
          alt="eXp Realty"
          width={1414}
          height={903}
          priority
          className="h-7 sm:h-9 w-auto"
        />
      </div>
    </>
  );
}
