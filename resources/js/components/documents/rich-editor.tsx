import { useEditor, EditorContent } from '@tiptap/react';
import type { Editor as TiptapEditor, JSONContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef } from 'react';
import EditorToolbar from '@/components/documents/editor-toolbar';

type Props = {
    content: JSONContent;
    editable: boolean;
    onChange: () => void;
    onEditorReady: (editor: TiptapEditor | null) => void;
};

export default function RichEditor({
    content,
    editable,
    onChange,
    onEditorReady,
}: Props) {
    const editorInitialized = useRef(false);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                link: false,
            }),
        ],
        content,
        editable,
        immediatelyRender: false,
        onCreate: () => {
            editorInitialized.current = true;
        },
        onUpdate: () => {
            if (editorInitialized.current) {
                onChange();
            }
        },
    });

    useEffect(() => {
        onEditorReady(editor);

        return () => onEditorReady(null);
    }, [editor, onEditorReady]);

    return (
        <div className="space-y-3">
            <EditorToolbar editor={editor} editable={editable} />
            <EditorContent
                editor={editor}
                className="min-h-[60vh] rounded-lg border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-12 sm:py-12 dark:border-border dark:bg-card [&_.tiptap]:mx-auto [&_.tiptap]:min-h-[52vh] [&_.tiptap]:max-w-3xl [&_.tiptap]:text-[15px] [&_.tiptap]:leading-7"
            />
        </div>
    );
}
