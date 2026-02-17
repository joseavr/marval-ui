"use client"

import { FileUpIcon } from "lucide-react"
import { useState } from "react"

import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemCancel,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadItemProgressWithLabel,
	FileUploadList,
	FileUploadMedia,
	type FileUploadProps
} from "@/registry/file-upload"

export function FileUploadWithDirectUploadDemo() {
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
		<div className="mx-auto flex w-lg flex-col gap-2 overflow-hidden rounded-4xl border border-border p-8 shadow-xl">
			<h1 className="font-medium text-xl">Upload and attach files</h1>
			<span className="text-muted-foreground text-sm">Attach files to this project</span>
			<FileUpload
				files={files}
				onFilesChange={setFiles}
				onUpload={handleUpload}
				autoUpload
				maxSize={1024 * 1024 * 25}
				accept={"image/*,.pdf"}
				multiple
			>
				<FileUploadDropzone className="h-[240px] rounded-3xl border border-solid bg-input/30 hover:bg-input/50">
					<div className="flex flex-col items-center gap-2">
						<FileUploadMedia
							variant="icon"
							className="size-8 rounded-md bg-background shadow-xs"
						>
							<FileUpIcon className="size-5" />
						</FileUploadMedia>
						<span className="font-medium text-foreground text-sm">
							Drag and drop files here or choose from your device.
						</span>
						<span className="text-muted-foreground text-xs">
							JPG, PNG, PDF. Max files size: 25MB
						</span>
					</div>
				</FileUploadDropzone>

				{files.length > 0 && <span className="text-base text-foreground">Uploads</span>}

				<FileUploadList>
					{files.map((file) => (
						<FileUploadItem
							key={file.name}
							className="rounded-3xl **:data-[slot=file-upload-progress-indicator]:bg-accent-foreground"
						>
							<div className="flex w-full flex-col gap-2.5">
								<div className="flex w-full items-center gap-2">
									<FileUploadItemPreview className="rounded-md"/>
									<FileUploadItemMetadata />
									<div className="flex items-center gap-1">
										<FileUploadItemCancel className="hidden data-[status=uploading]:flex" />
										<FileUploadItemDelete className="flex data-[status=uploading]:hidden" />
									</div>
								</div>
								<FileUploadItemProgressWithLabel forceMount labelPosition="right" />
							</div>
						</FileUploadItem>
					))}
				</FileUploadList>
			</FileUpload>
		</div>
	)
}
