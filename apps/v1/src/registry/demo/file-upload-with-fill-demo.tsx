"use client"

import { Upload } from "lucide-react"
import { useState } from "react"

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
	FileUploadItemStatus,
	FileUploadList,
	FileUploadMedia,
	type FileUploadProps,
	FileUploadTrigger
} from "@/registry/file-upload"

export function FileUploadWithFillDemo() {
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
		<div className="mx-auto mt-20 max-w-lg">
			<FileUpload
				files={files}
				onFilesChange={setFiles}
				accept={"image/*"}
				onUpload={handleUpload}
				autoUpload
				multiple
				className="w-xs max-w-xs"
			>
				<FileUploadDropzone className="w-full">
					<div className="flex flex-col items-center gap-1">
						<FileUploadMedia
							variant="icon"
							className="size-12 rounded-full bg-transparent"
						>
							<Upload className="size-6" />
						</FileUploadMedia>
						<span className="font-medium text-foreground text-sm">
							Drag and drop files here
						</span>
						<span className="text-muted-foreground text-xs">Or click to browse</span>
					</div>
					<FileUploadTrigger asChild>
						<button
							type="button"
							className="mt-2 border border-border text-foreground dark:bg-input/30"
						>
							Browse files
						</button>
					</FileUploadTrigger>
				</FileUploadDropzone>

				<FileUploadList className="w-full">
					{files.map((file) => (
						<FileUploadItem key={file.name} className="overflow-hidden">
							<div className="flex w-full items-center gap-2">
								<FileUploadItemPreview className="size-8" />
								<FileUploadItemMetadata>
									<FileUploadItemName />
									<span className="flex gap-1">
										<FileUploadItemSize className="flex text-xs data-[status=uploading]:hidden" />

										<FileUploadItemStatus
											className="hidden text-muted-foreground text-xs capitalize data-[status=success]:flex"
											render={(status) => {
												if (status === "success") return `- Done`
											}}
										/>
									</span>
									<FileUploadItemStatus
										className="hidden text-muted-foreground text-xs capitalize data-[status=uploading]:flex"
										render={(status) => `${status}...`}
									/>
								</FileUploadItemMetadata>
								<FileUploadItemDelete />
							</div>
							<FileUploadItemProgress variant="fill" fillVariant="left-t-right" />
						</FileUploadItem>
					))}
				</FileUploadList>
			</FileUpload>
		</div>
	)
}
