"use client"

import { UploadIcon } from "lucide-react"
import { useState } from "react"

import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadList,
	FileUploadTrigger
} from "@/registry/file-upload"

export function FileUploadWithValidationDemo() {
	const [files, setFiles] = useState<File[]>([])

	return (
		<div className="m-auto mt-20">
			<FileUpload value={files} onValueChange={setFiles} className="max-w-md">
				<FileUploadDropzone
					variant="dropzone"
					className="w-full max-w-md flex-row border-0 bg-accent"
				>
					<UploadIcon className="size-4" />
					Upload files
				</FileUploadDropzone>

				<FileUploadTrigger />
				<FileUploadList>
					<FileUploadItem>
						<FileUploadItemPreview />
						<FileUploadItemMetadata />
						<FileUploadItemProgress />
						<FileUploadItemDelete />
					</FileUploadItem>
				</FileUploadList>
			</FileUpload>
		</div>
	)
}
