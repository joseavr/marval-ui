"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { UploadIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Button } from "@/registry/button"
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadList,
	FileUploadMedia,
	FileUploadTrigger
} from "@/registry/file-upload"

const formSchema = z.object({
	files: z
		.array(z.custom<File>())
		.min(1, "Please select at least one file")
		.max(4, "Please select up to 4 files")
		.refine((files) => files.every((file) => file.size <= 4 * 1024 * 1024), {
			message: "File size must be less than 4MB",
			path: ["files"]
		})
})

export function FileUploadWithFormDemo() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			files: []
		}
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		toast("Submitted:", {
			description: (
				<pre className="mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground">
					<code>
						{JSON.stringify(
							data.files.map((file) =>
								file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
							),
							null,
							2
						)}
					</code>
				</pre>
			)
		})
	}

	return (
		<div className="mx-auto mt-20 w-md">
			<form id="form-demo" onSubmit={form.handleSubmit(onSubmit)}>
				<Controller
					control={form.control}
					name="files"
					render={({ field, fieldState }) => {
						return (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name} className="font-medium text-md">
									Attachments
								</FieldLabel>
								<FileUpload
									files={field.value}
									onFilesChange={field.onChange}
									name={field.name}
									disabled={field.disabled}
									maxFiles={4}
									maxSize={1024 * 1024 * 4}
									accept={"image/*,.pdf"}
									multiple
								>
									<FileUploadDropzone className="w-full">
										<div className="flex flex-col items-center gap-1">
											<FileUploadMedia
												variant="icon"
												className="size-12 rounded-full bg-transparent"
											>
												<UploadIcon className="size-6" />
											</FileUploadMedia>
											<span className="font-medium text-foreground text-sm">
												Drag and drop files here or click to upload.
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
										{field.value.map((file) => (
											<FileUploadItem key={file.name}>
												<FileUploadItemPreview />
												<FileUploadItemMetadata />
												<FileUploadItemDelete />
											</FileUploadItem>
										))}
									</FileUploadList>
									<FieldDescription>
										Upload up to 4 images up to 4MB each.
									</FieldDescription>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</FileUpload>
							</Field>
						)
					}}
				/>

				<Button type="submit" className="mt-4" form="form-demo">
					Submit
				</Button>
			</form>
		</div>
	)
}
