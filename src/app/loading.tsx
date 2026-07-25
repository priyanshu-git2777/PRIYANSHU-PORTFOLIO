export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] items-center justify-center px-6"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative flex size-20 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/15" />

          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-r-violet-400 border-t-cyan-400" />

          <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 font-bold text-white shadow-lg">
            PJ
          </div>
        </div>

        <p className="mt-6 font-display text-lg font-semibold">
          Loading experience
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Preparing the next page...
        </p>

        <span className="sr-only">
          Loading the requested portfolio page.
        </span>
      </div>
    </div>
  );
}
