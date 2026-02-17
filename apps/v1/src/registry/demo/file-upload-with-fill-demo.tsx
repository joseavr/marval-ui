"use client"

import { Upload } from "lucide-react"
import { useState } from "react"

import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemCancel,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemName,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadItemSize,
	FileUploadItemStatus,
	FileUploadList,
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
			<h1>File Upload</h1>

			<FileUpload
				files={files}
				onFilesChange={setFiles}
				accept={"image/*"}
				onUpload={handleUpload}
				maxSize={1024 * 1024 * 10}
				autoUpload
				multiple
				className="w-sm max-w-sm"
			>
				<FileUploadDropzone className="w-full">
					<div className="flex items-center gap-2">
						<Upload className="size-5" />

						<span className="font-medium text-foreground text-sm">
							Drag and drop or{" "}
							<span>
								<FileUploadTrigger className="px-0 hover:underline">
									choose file
								</FileUploadTrigger>{" "}
								to upload
							</span>
						</span>
					</div>
				</FileUploadDropzone>

				<span className="mb-4 text-muted-foreground text-xs">
					Recommended max. size: 10 MB, Accepted file types: png, jpg, jpeg.
				</span>

				<FileUploadList className="w-full">
					{files.map((file) => (
						<FileUploadItem key={file.name} className="overflow-hidden">
							<div className="relative flex w-full items-center gap-2">
								<FileUploadItemPreview className="size-8" />
								<FileUploadItemMetadata>
									<FileUploadItemName />
									<span className="flex justify-between gap-1">
										<FileUploadItemSize className="flex text-xs" />
										<FileUploadItemStatus
											className="text-muted-foreground text-xs capitalize"
											render={(status) => {
												if (status === "success") return `completed`
												if (status === "idle") return
												return status
											}}
										/>
									</span>
								</FileUploadItemMetadata>
								<FileUploadItemCancel className="absolute top-0 right-0 hidden data-[status=uploading]:flex" />
								<FileUploadItemDelete className="absolute top-0 right-0 data-[status=uploading]:hidden" />
							</div>
							<FileUploadItemProgress
								forceMount
								variant="fill"
								fillVariant="left-t-right"
							/>
						</FileUploadItem>
					))}
				</FileUploadList>
			</FileUpload>
		</div>
	)
}
