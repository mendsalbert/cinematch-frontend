import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { StarIcon } from "@sanity/icons";
import {
  IconInnerShadowTopRight,
  IconThumbUp
} from "@tabler/icons-react";

export default function MovieCard({
  movie,
  aspect,
  minimal,

  fontSize,
  fontWeight
}) {
  console.log(movie);
  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-10 md:grid-cols-2"
        )}>
        <div
          className={cx(
            " overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105   dark:bg-gray-800"
          )}>
          <Link
            className={cx(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                ? "aspect-[5/4]"
                : "aspect-square"
            )}
            href={``}>
            <Image
              src={movie?.Poster}
              alt={movie?.Poster}
              // priority={preloadImage ? true : false}
              className="object-cover transition-all"
              fill
              sizes="(max-width: 768px) 30vw, 33vw"
            />
          </Link>
        </div>

        <div className={cx(minimal && "flex items-center")}>
          <div>
            <div className="flex gap-3 text-lg">
              <div className=" mt-5 flex flex-row items-center space-x-1 text-sm font-medium uppercase ">
                <span>
                  <StarIcon className="text-2xl" color="#95a4fc" />
                </span>

                <p className="text-md text-[#95a4fc]">
                  {movie.imdbRating}
                </p>
              </div>

              <div className=" mt-5 flex flex-row items-center space-x-1 text-sm font-medium uppercase ">
                <span>
                  <IconThumbUp size={20} color="#e1591a" />
                </span>

                <p className="text-md text-[#e1591a]">
                  {movie.imdbVotes}
                </p>
              </div>
              {/* <Label color={"purple"}>{movie.imdbRating}</Label> */}
            </div>
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                  ? "text-3xl"
                  : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium  tracking-normal text-black"
                  : "font-semibold leading-snug tracking-tight",
                "mt-2    dark:text-white"
              )}>
              <Link href={``}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      dark:from-purple-800 dark:to-purple-900">
                  {movie.Title}
                </span>
              </Link>
            </h2>

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5 flex-shrink-0">
                  {movie.Poster && (
                    <Image
                      src={movie.Poster}
                      alt={movie.Poster}
                      className="rounded-full object-cover"
                      fill
                      sizes="20px"
                    />
                  )}
                </div>
                <span className="truncate text-sm">
                  {movie.Language}
                </span>
              </div>

              <span className="text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <span>{movie.Year}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
