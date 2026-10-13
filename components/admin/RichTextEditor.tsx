'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Sync external value changes (e.g. after load)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value]) // eslint-disable-line

  if (!editor) return null

  const ToolbarBtn = ({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1.5 text-sm rounded transition-colors ${
        active ? 'bg-primary-700 text-white' : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="tiptap-editor border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <strong>B</strong>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <em>I</em>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          H2
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          H3
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          • List
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          1. List
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          ❝
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => {
            const url = window.prompt('Enter URL:')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}
          active={editor.isActive('link')}
        >
          🔗
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().unsetLink().run()}>
          Unlink
        </ToolbarBtn>
        <ToolbarBtn onClick={() => {
          const url = window.prompt('Image URL:')
          if (url) editor.chain().focus().setImage({ src: url }).run()
        }}>
          🖼️
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()}>↩</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()}>↪</ToolbarBtn>
      </div>
      <EditorContent editor={editor} className="min-h-[200px] p-4 focus:outline-none prose max-w-none" />
    </div>
  )
}
