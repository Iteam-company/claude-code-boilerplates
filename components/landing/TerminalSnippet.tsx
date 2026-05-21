interface Props {
  html: string;
}

export function TerminalSnippet({ html }: Props) {
  return (
    <div
      className="mt-6 overflow-x-auto rounded-lg border border-zinc-800 [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!bg-[#0a0a0a] [&_pre]:p-4 [&_pre]:text-[10px] [&_pre]:leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
