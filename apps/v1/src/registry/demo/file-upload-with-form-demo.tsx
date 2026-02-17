"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CircleUser, FileUpIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/registry/button"
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemPreview,
	FileUploadList,
	FileUploadMedia,
	FileUploadTrigger
} from "@/registry/file-upload"

const formSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters.")
		.max(10, "Username must be at most 10 characters.")
		.regex(
			/^[a-zA-Z0-9_]+$/,
			"Username can only contain letters, numbers, and underscores."
		),
	files: z
		.array(z.custom<File>())
		.min(1, "Please select one file")
		.max(1, "Please select one file")
		.refine((files) => files.every((file) => file.size <= 4 * 1024 * 1024), {
			message: "File size must be less than 4MB",
			path: ["files"]
		})
})

export function FileUploadWithFormDemo() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			files: []
		}
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		const toDisplay = {
			username: data.username,
			files: Array.from(data.files).map((file) => ({
				name: file.name,
				size: file.size,
				type: file.type
			}))
		}
		console.log(toDisplay)
	}

	return (
		<Card className="w-full sm:max-w-lg">
			<CardHeader>
				<CardTitle>Profile Settings</CardTitle>
				<CardDescription>Update your profile information below.</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="form-demo" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="username"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field orientation="vertical" data-invalid={fieldState.invalid}>
									<FieldContent className="gap-3">
										<FieldLabel htmlFor="form-demo" className="text-sm">
											Username
										</FieldLabel>
										<Input
											{...field}
											id="form-demo-input"
											aria-invalid={fieldState.invalid}
											placeholder="joseavr"
											autoComplete="username"
											className="rounded-2xl"
										/>
										<FieldDescription>
											This is your public display name. Must be between 3 and 10
											characters. Must only contain letters, numbers, and underscores.
										</FieldDescription>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</FieldContent>
								</Field>
							)}
						/>

						<Separator />

						<Controller
							name="files"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field orientation="vertical" data-invalid={fieldState.invalid}>
									<FieldContent className="gap-2">
										<FieldLabel htmlFor="form-demo" className="text-sm">
											Profile Picture
										</FieldLabel>
										<FieldDescription>
											This is where people will see your actual face.
										</FieldDescription>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</FieldContent>

									<FileUpload
										files={field.value}
										onFilesChange={field.onChange}
										multiple={false}
										maxFiles={1}
										maxSize={1024 * 1024 * 10}
										accept={"image/*,.svg"}
										className="flex flex-row gap-2"
									>
										<div
											className={`flex size-16 items-center justify-center rounded-full bg-accent text-foreground dark:bg-input/30 ${field.value.length > 0 ? "hidden" : "flex"}`}
										>
											<CircleUser className="size-8" />
										</div>

										<FileUploadList className="flex">
											{field.value.map((file) => (
												<FileUploadItem
													key={file.name}
													className="relative size-16 rounded-full p-0"
												>
													<FileUploadItemPreview className="size-full rounded-full" />
													<div className="absolute top-0 right-0">
														<FileUploadItemDelete className="rounded-full bg-input" />
													</div>
												</FileUploadItem>
											))}
										</FileUploadList>

										<FileUploadDropzone className="flex-1 rounded-3xl hover:border-foreground">
											<div className="flex flex-col items-center justify-center gap-1">
												<FileUploadMedia variant="icon" className="rounded-full">
													<FileUpIcon className="size-5" />
												</FileUploadMedia>
												<span className="mt-2 text-foreground text-md">
													<FileUploadTrigger asChild>
														<strong className="p-0!">Click here</strong>
													</FileUploadTrigger>
													{" to upload your file or drag."}
												</span>
												<span className="text-muted-foreground text-xs">
													Supported format: SVG, JPG, PNG (10mb each)
												</span>
											</div>
										</FileUploadDropzone>
									</FileUpload>
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
						Reset
					</Button>
					<Button type="submit" form="form-demo">
						Save
					</Button>
				</Field>
			</CardFooter>
		</Card>
	)
}
