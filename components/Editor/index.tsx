'use client';

import { slashCommand, suggestionItems } from '@/lib/editor-config';
import {
  EditorRoot,
  EditorContent,
  StarterKit,
  Placeholder,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandList,
  EditorCommandItem,
  HorizontalRule,
  TaskItem,
  TaskList,
  TiptapUnderline,
  TiptapLink,
  handleCommandNavigation,
  EditorContentProps,
} from 'novel';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import AutoJoiner from 'tiptap-extension-auto-joiner';
import { Markdown } from 'tiptap-markdown';
import { cn } from '@/lib/utils';

import './Editor.css';

const extensions = [
  GlobalDragHandle.configure({
    dragHandleWidth: 20,
    scrollTreshold: 100,
  }),
  AutoJoiner,
  StarterKit.configure({
    bulletList: { HTMLAttributes: { class: 'list-disc ml-4' } },
    orderedList: { HTMLAttributes: { class: 'list-decimal ml-4' } },
    heading: { levels: [1, 2, 3] },
  }),
  TiptapLink,
  TiptapUnderline,
  TaskList,
  TaskItem,
  HorizontalRule,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return 'Enter a heading...';
      }
      return 'Start write... (type / for commands)';
    },
    includeChildren: true,
  }),
  Markdown.configure({
    html: false,
    transformPastedText: true,
  }),
  slashCommand,
];

type Props = {
  className?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
} & EditorContentProps;

export default function Editor({
  className,
  initialValue = '# Hello World',
  onChange,
  ...rest
}: Props) {
  return (
    <EditorRoot>
      <div
        className={cn('flex h-full flex-col', className)}
        onClick={() => {
          document.querySelector<HTMLElement>('.tiptap')?.focus();
        }}
      >
        <EditorContent
          {...rest}
          className="prose-content border-input flex-1 cursor-text rounded-xl border [&_.tiptap]:p-4 [&_.tiptap]:pl-7 [&_.tiptap]:outline-none"
          editorProps={{
            handleKeyDown: (view, event) => handleCommandNavigation(event),
          }}
          extensions={extensions}
          onUpdate={({ editor }) => {
            onChange?.(editor.storage.markdown?.getMarkdown?.());
          }}
          onCreate={({ editor }) => {
            editor.commands.setContent(initialValue);
          }}
        >
          <EditorCommand className="border-muted bg-background z-50 h-auto max-h-82.5 w-72 overflow-y-auto rounded-md border px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="text-muted-foreground px-2">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className={`hover:bg-accent aria-selected:bg-accent flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm`}
                  key={item.title}
                >
                  <div className="border-muted bg-background flex h-10 w-10 items-center justify-center rounded-md border">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </div>
    </EditorRoot>
  );
}
