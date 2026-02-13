"use client"

import { ArrowUpRightIcon, GlobeIcon, MicIcon, PaperclipIcon, XIcon } from "lucide-react"
import type React from "react"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/registry/button"
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemName,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadItemSize,
	FileUploadList,
	type FileUploadProps,
	FileUploadTrigger
} from "@/registry/file-upload"

export function FileUploadWithChatDemo() {
	const [input, setInput] = useState("")
	const [files, setFiles] = useState<File[]>([])
	const [searchWebOn, setSearchWebOn] = useState(false)
	const [uploading, setUploading] = useState(false)

	const handleUpload: FileUploadProps["onUpload"] = async (
		files,
		{ onProgress, onSuccess, onError }
	) => {
		setUploading(true)

		const uploadPromises = files.map(async (file) => {
			try {
				// Simulate file upload with progress
				const totalChunks = 10
				let uploadedChunks = 0

				// Simulate chunk upload with delays
				for (let i = 0; i < totalChunks; i++) {
					// Simulate network delay (100-500ms per chunk)
					await new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 100))

					// Update progress for this specific file
					uploadedChunks++
					const progress = (uploadedChunks / totalChunks) * 100
					onProgress(file, progress)
				}

				// Simulate server processing delay
				await new Promise((resolve) => setTimeout(resolve, 1000))
				onSuccess(file)
			} catch (error) {
				onError(file, error instanceof Error ? error : new Error("Upload failed"))
			} finally {
				setUploading(false)
			}
		})

		await Promise.all(uploadPromises)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setInput("")
		setFiles([])
	}

	return (
		<div className="size-full">
			<FileUpload
				files={files}
				onFilesChange={setFiles}
				onUpload={handleUpload}
				disabled={uploading}
				multiple
				autoUpload
				className="size-full"
			>
				<FileUploadDropzone
					variant="wrapper"
					// Prevent dropzone from focusing with tabs
					tabIndex={-1}
					// Prevent dropzone from triggering on click
					onClick={(event) => event.preventDefault()}
					className="mx-auto mt-20 *:data-[slot=dropzone-overlay]:rounded-xl"
				>
					<form
						onSubmit={handleSubmit}
						className="relative m-auto flex w-md max-w-md flex-col gap-2.5 rounded-xl border border-input px-2 py-2 outline-none focus-within:ring-1 focus-within:ring-ring/50 dark:bg-input/30"
					>
						<FileUploadList orientation="horizontal" className="px-0 py-1">
							{files.map((file) => (
								<FileUploadItem
									key={file.name}
									className="group/item max-w-52 rounded-md p-1.5"
								>
									<FileUploadItemPreview className="size-8 [&>svg]:size-5">
										<FileUploadItemProgress variant="fill" />
									</FileUploadItemPreview>
									<FileUploadItemMetadata>
										<FileUploadItemName />
										<FileUploadItemSize className="text-xs" />
									</FileUploadItemMetadata>
									<FileUploadItemDelete asChild>
										<Button
											variant="secondary"
											size="icon-xs"
											className="absolute -top-1 -right-1 hidden size-2 shrink-0 cursor-pointer rounded-full p-2 group-hover/item:flex"
										>
											<XIcon className="size-2" />
										</Button>
									</FileUploadItemDelete>
								</FileUploadItem>
							))}
						</FileUploadList>
						<Textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Ask anything..."
							className="min-h-10 w-full resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 disabled:bg-transparent dark:bg-transparent dark:disabled:bg-transparent"
							disabled={uploading}
							onKeyDown={(event) => {
								// Shift+Enter -> allow default
								if (event.shiftKey) return

								// Enter -> find form ancestor and request form submission
								if (event.key === "Enter") {
									// prevent textarea built-in "Enter" behavior (inserting '\n' new line)
									event.preventDefault()

									const form = event.currentTarget.closest("form")
									if (form instanceof HTMLFormElement) {
										if (typeof form.requestSubmit === "function") {
											form.requestSubmit()
										} else {
											form.submit()
										}
									}
								}
							}}
						/>

						<div className="flex justify-between">
							<div className="flex items-center justify-end gap-1.5">
								<FileUploadTrigger asChild>
									<Button
										type="button"
										size="icon"
										variant="secondary"
										className="size-7 rounded-md border-0 text-muted-foreground hover:text-inherit"
									>
										<PaperclipIcon className="size-3.5" />
										<span className="sr-only">Attach file</span>
									</Button>
								</FileUploadTrigger>

								<Button
									type="button"
									variant="secondary"
									size="icon"
									className="size-7 rounded-md border-0 text-muted-foreground hover:text-inherit"
								>
									<MicIcon />
								</Button>

								<Button
									type="button"
									size={searchWebOn ? "default" : "icon"}
									variant={searchWebOn ? "brand-secondary" : "secondary"}
									className={`rounded-full transition-all ${searchWebOn ? "h-7 border border-primary/30 py-0 [&_svg]:size-4!" : "size-7 text-muted-foreground hover:text-inherit"}`}
									onClick={() => setSearchWebOn((prev) => !prev)}
								>
									<GlobeIcon className="size-3.5" />
									{searchWebOn && <span>Search</span>}
									<span className="sr-only">Search web</span>
								</Button>
							</div>
							<Button
								type="submit"
								size="icon"
								className="size-7 rounded-md"
								disabled={!input.trim() || uploading}
							>
								<ArrowUpRightIcon className="size-3.5" />
								<span className="sr-only">Send message</span>
							</Button>
						</div>
					</form>
				</FileUploadDropzone>
			</FileUpload>
		</div>
	)
}
