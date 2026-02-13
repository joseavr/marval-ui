"use client"

import { CloudUploadIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useComponentPreviewDemoContext } from "@/components/shared/component-preview"
import { Button } from "@/registry/button"
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadList,
	FileUploadTrigger
} from "@/registry/file-upload"

export function FileUploadDemo() {
	const [files, setFiles] = useState<File[]>([])
	const { state } = useComponentPreviewDemoContext()
	return (
		<div className="mx-auto mt-20 max-w-md">
			<FileUpload
				files={files}
				onFilesChange={setFiles}
				maxFiles={state.maxFiles as number}
				maxSize={state.maxSize as number}
				accept={state.accept as string}
				disabled={state.disabled as boolean}
				multiple={state.multiple as boolean}
				onRejectFile={(_file, error) => {
					console.log({ error })
					if (error) {
						const reason = error.reason
						if (reason === "MAX_SIZE_REACHED") {
							toast.error(`${error.message}`, {
								duration: 1000 * 10
							})
						}
					}
				}}
			>
				<FileUploadDropzone className="flex-row">
					<CloudUploadIcon className="size-4" />
					Drag and drop or
					<FileUploadTrigger asChild>
						<Button variant="link" size="sm" className="p-0">
							choose files
						</Button>
					</FileUploadTrigger>
					to upload
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
