"use client"

import { Upload } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadList,
	FileUploadMedia,
	type FileUploadProps,
	FileUploadTrigger,
	truncateText
} from "@/registry/file-upload"

export function FileUploadWithValidationDemo() {
	const [files, setFiles] = useState<File[]>([])

	const handleFileValidate: FileUploadProps["onFileValidate"] = (file) => {
		// Validate file type
		if (!(file.type.startsWith("application/pdf") || file.type.startsWith("image/"))) {
			return `Only images or pdf files are allowed.`
		}

		// Validate file size
		const MAX_SIZE = 4 * 1024 * 1024
		if (file.size > MAX_SIZE) {
			return `File size exceeds ${MAX_SIZE / (1024 * 1024)}MB`
		}

		// other custom validations.

		return null
	}

	const handleRejectFile: FileUploadProps["onRejectFile"] = (file, error) => {
		toast.error(error.message, {
			description: `${truncateText(file.name, 20)} has been rejected`,
			position: "top-center"
		})
	}

	return (
		<div className="mx-auto mt-20 max-w-lg">
			<FileUpload
				files={files}
				onFilesChange={setFiles}
				maxFiles={4}
				maxSize={1024 * 1024 * 4}
				accept={"image/*,.pdf"}
				onRejectFile={handleRejectFile}
				onFileValidate={handleFileValidate}
				multiple
			>
				<FileUploadDropzone>
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
						<span className="text-muted-foreground text-xs">
							Or click to browse (max 4 images or pdf files, up to 4MB)
						</span>
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

				<FileUploadList>
					{files.map((file) => (
						<FileUploadItem key={file.name} />
					))}
				</FileUploadList>
			</FileUpload>
		</div>
	)
}
