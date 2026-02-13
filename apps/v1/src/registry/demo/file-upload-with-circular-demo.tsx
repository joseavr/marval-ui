"use client"

import { UploadIcon, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/button"
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadList,
	type FileUploadProps
} from "@/registry/file-upload"

export function FileUploadWithCircularDemo() {
	const [files, setFiles] = useState<File[]>([])

	const handleUpload: FileUploadProps["onUpload"] = async (
		files,
		{ onProgress, onSuccess, onError }
	) => {
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
			}
		})

		await Promise.all(uploadPromises)
	}

	return (
		<div className="size-full p-10">
			<FileUpload
				files={files}
				onFilesChange={setFiles}
				onUpload={handleUpload}
				multiple
				autoUpload
			>
				<div className="flex flex-row flex-wrap">
					<FileUploadList
						forceMount
						className="w-full flex-wrap gap-4 divide-border/50"
						orientation="horizontal"
					>
						<FileUploadDropzone
							variant="dropzone"
							className="h-[200px] w-[150px] flex-row border-0 bg-accent hover:bg-neutral-200 data-dragging:bg-neutral-200 dark:bg-input/30 dark:data-dragging:bg-input/90 dark:hover:bg-input/50"
						>
							<UploadIcon className="size-12" />
						</FileUploadDropzone>

						{files.map((file) => {
							return (
								<FileUploadItem
									className="group/item flex h-[200px] w-[150px] gap-1 rounded-lg px-0 py-0 ring-0"
									key={file.name}
								>
									<FileUploadItemPreview className="size-full rounded-lg border-none">
										<FileUploadItemProgress
											className="**:data-[slot=progress-circular-inner]:text-foreground/30 **:data-[slot=progress-circular-outer]:text-foreground"
											variant="circular"
											size={80}
											strokeWidth={8}
										/>
									</FileUploadItemPreview>
									<FileUploadItemMetadata className="sr-only" />
									<FileUploadItemDelete asChild>
										<Button
											variant="secondary"
											size="icon"
											className="absolute -top-1 -right-1 size-5 rounded-full"
										>
											<X className="size-3" />
										</Button>
									</FileUploadItemDelete>
								</FileUploadItem>
							)
						})}
					</FileUploadList>
				</div>
			</FileUpload>
		</div>
	)
}
