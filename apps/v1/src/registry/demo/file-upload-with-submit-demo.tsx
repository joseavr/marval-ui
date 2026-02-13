"use client"

import axios, { AxiosError } from "axios"
import { ImageIcon, UploadIcon, VideoIcon, XIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/button"
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemName,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadList,
	type FileUploadProps,
	FileUploadSubmit
} from "@/registry/file-upload"

export function FileUploadWithSubmitDemo() {
	const [files, setFiles] = useState<File[]>([])

	const handleUpload: FileUploadProps["onUpload"] = async (
		files,
		{ onProgress, onSuccess, onError }
	) => {
		const uploadPromises = files.map(async (file) => {
			const formData = new FormData()
			formData.append("file", file)
			formData.append("fileId", window.crypto.randomUUID())

			try {
				await axios.post("/api/upload", formData, {
					headers: { "Content-Type": "multipart/form-data" },
					onUploadProgress: (event: { loaded: number; total?: number }) => {
						const percent = event.total
							? Math.round((event.loaded * 100) / event.total)
							: 0
						onProgress(file, percent)
					}
				})
				onSuccess(file)
			} catch (err: unknown) {
				if (err instanceof AxiosError) {
					const message =
						err.response?.data &&
						"error" in err.response.data &&
						`${String(err.code)}: ${String(err.cause?.message)}`
					onError(file, new Error(message))
				}
			}
		})

		await Promise.all(uploadPromises)
	}

	return (
		<div className="mt-20 w-full">
			<FileUpload
				files={files}
				onFilesChange={setFiles}
				onUpload={handleUpload}
				className="mx-auto w-full max-w-xs"
				multiple
			>
				<FileUploadDropzone
					variant="dropzone"
					className="w-full flex-row border-0 bg-accent hover:bg-neutral-200 data-dragging:bg-neutral-200 dark:bg-input/30 dark:data-dragging:bg-input/90 dark:hover:bg-input/50"
				>
					<UploadIcon className="size-4" />
					Upload files
				</FileUploadDropzone>

				<FileUploadList className="w-full divide-y divide-border/50">
					{files.map((file) => (
						<FileUploadItem
							className="group/item flex flex-1 flex-col gap-1 rounded-none px-0 py-2 ring-0"
							key={file.name}
						>
							<div className="flex w-full min-w-0 items-center gap-2">
								<FileUploadItemPreview
									className="size-4 shrink-0"
									render={(file, fallback) => {
										if (file.type.includes("image/")) {
											return <ImageIcon />
										} else if (file.type.includes("video/")) {
											return <VideoIcon />
										}
										return fallback()
									}}
								/>

								<FileUploadItemName
									className="min-w-0 flex-1 truncate pr-4 font-mono tracking-tight"
									maxVisibleChars={37}
								/>
								<FileUploadItemDelete asChild>
									<Button
										variant="ghost"
										size="icon"
										className="transform-[opacity] absolute right-0 size-4 p-0 opacity-0 duration-150 hover:bg-transparent group-hover/item:opacity-100"
									>
										<XIcon />
									</Button>
								</FileUploadItemDelete>
							</div>
							<FileUploadItemProgress
								forceMount
								className="h-2 *:data-[slot=file-upload-progress-indicator]:rounded-full *:data-[slot=file-upload-progress-indicator]:bg-accent-foreground"
							/>
						</FileUploadItem>
					))}
					<FileUploadSubmit asChild>
						<Button
							variant="secondary"
							className="data-loading:disable w-full bg-foreground text-background hover:bg-black/80 dark:bg-foreground dark:text-background"
						>
							Upload file
						</Button>
					</FileUploadSubmit>
				</FileUploadList>
			</FileUpload>
		</div>
	)
}
