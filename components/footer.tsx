export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/steelanterns"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              .stee
            </a>
            . The source code is available on{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            . For inquiries, contributions, contact{" "}
            <a
              href="mailto:steevejeanchilles@gmail.com"
              className="font-medium underline underline-offset-4"
            >
              steevejeanchilles@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
