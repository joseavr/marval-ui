type ErrorReason =
	| "MAX_FILE_REACHED"
	| "CUSTOM_VALIDATION_ERROR"
	| "UNACCEPTED_MIMOTYPE"
	| "MAX_SIZE_REACHED"
	| "KEY_DUPLICATED"

export interface FileUploadProps {
	/**
	 * The controlled files currently being managed.
	 * - Use this prop for controlled usage.
	 * - Should be used in conjunction with `onFilesChange`.
	 */
	files: File[]
	/**
	 * Callback called when files are added or removed.
	 * - Should be used in conjunction with `files`.
	 * ```ts
	 * const [state, setState] = useState()
	 *
	 * onFilesChange={(files) => {
	 *   setState(files)
	 * }}
	 * ```
	 */
	onFilesChange: (files: File[]) => void
	/**
	 * Callback called when all files are accepted after validation checks.
	 */
	onAcceptFiles?: (files: File[]) => void
	/**
	 * Callback called when a file is accepted.
	 */
	onAcceptFile?: (file: File) => void
	/**
	 * Callback called when a file is rejected.
	 * @param file - The rejected file
	 * @param error - Rejection details
	 * @param error.reason -
	 * ```ts
	 * // The rejection reason code.
	 * "MAX_FILE_REACHED" | "CUSTOM_VALIDATION_ERROR" |
	 * "UNACCEPTED_MIMOTYPE" | "MAX_SIZE_REACHED" |
	 * "KEY_DUPLICATED"
	 * ```
	 * @param error.message - Human readable error message
	 */
	onRejectFile?: (
		file: File,
		error: {
			reason: ErrorReason
			message: string
		}
	) => void
	/**
	 * Custom validation callback for each file.
	 *
	 * - Must return a string with the error message or return null/undefined for valid file.
	 * - Overrides default validation `message` from `onFileReject`.
	 */
	onFileValidate?: (file: File) => string | null | undefined
	/**
	 * Callback for uploading files.
	 *
	 * - Use for uploading files to a storage bucket or other thrid party service.
	 *
	 * ```ts
	 * onUpload={async (files, { onProgress, onSuccess, onError }) => {
	 *   try {
	 *     const res = await uploadFilesToS3({
	 *       files,
	 *       onUploadProgress: ({ file, progress }) => {
	 *         onProgress(file, progress);
	 *       },
	 *       onUploadError: ({ file, error }) => {
	 *         onError(file, new Error(error.message))
	 *       }
	 *     });
	 *   } catch (error instanceof S3Error) {
	 *		 toast.error(error.message)
	 *   }
	 * }
	 * ```
	 */
	onUpload?: (
		files: File[],
		options: {
			onProgress: (file: File, progress: number) => void
			onSuccess: (file: File) => void
			onError: (file: File, error: Error) => void
		}
	) => Promise<void> | void
	/**
	 * Whether `onUpload` should be called immediately right after dropping files and all validation checks pass.
	 */
	autoUpload?: boolean
	/**
	 * Maximum number of files that can be added from drop or selection.
	 */
	maxFiles?: number
	/**
	 * Maximum file size in bytes.
	 * ```ts
	 * // Maximum 2MB
	 * <FileUpload maxSize={1024 * 1024 * 2 }/>
	 * //                    ^KB    ^MB
	 * ```
	 */
	maxSize?: number
	/**
	 * Specifies the accepted file types. MIME types or file extensions.
	 * - Accept specific MIME types: `accept="image/png,image/jpeg"`
	 * - Accept file extensions: `accept=".png,.jpg,.pdf"`
	 * - Accept multiple types: `accept="image/*,.pdf,.doc,video/mpeg,application/pdf"`
	 */
	accept?: string
	/**
	 * The name attribute for the file input element.
	 * - Useful when using the component in a uncontrolled form.
	 * - See more about uncontrolled forms at https://joseavr.com/notes/form-in-react
	 * ```ts
	 * const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
	 *   const formData = new FormData(e.currentTarget)
	 *   const files = formData.get("dropzone") // <- notice
	 * }
	 *
	 * <form onSubmit={handleSubmit}>
	 *   <FileUpload
	 *      name="dropzone" // <- notice
	 *    />
	 * </form>
	 * ```
	 */
	name?: string
	/**
	 * Whether dropping or uploading files is disabled.
	 */
	disabled?: boolean
	/**
	 * Whether allow multiple can be selected.
	 */
	multiple?: boolean
	/**
	 * Whether a value must be provided for the input before form submission.
	 */
	required?: boolean
	/**
	 * Whether to render the component with a custom child.
	 */
	asChild?: boolean
	/** The children of the component */
	children: React.ReactNode
	/**
	 * The class name of the root component.
	 */
	className?: string
}

export interface FileUploadDropzoneProps {
	/** The children of the component */
	children?: React.ReactNode
	/** Whether to merge props with direct child.  */
	asChild?: boolean
	/**
	 * - `dropzone` — renders as a dropzone box
	 * - `wrapper` — enables dropzone on wrapped content
	 * @default "dropzone"
	 */
	variant?: "dropzone" | "wrapper"
	/**
	 * Custom overlay element to render on top of the dropzone.
	 * - Used for showing as a visual indicator while dragging files over the dropzone.
	 */
	renderOverlay?: React.ReactNode
}

export interface FileUploadTriggerProps {
	/** The children of the component */
	childern?: React.ReactNode
	/** Whether to merge props with direct child.  */
	asChild?: boolean
}

export interface FileUploadSubmit {
	/** Whether to merge props with direct child.  */
	asChild?: boolean
	/** The children of the component */
	children?: React.ReactNode
	className?: string
}

export interface FileUploadListProps {
	/**
	 * A children is **required**
	 * - **Important**: the direct children of `FileUploadList` must be `FileUploadItem[]` otherwise throws error.
	 * ```tsx
	 * // ❌ wrong usage
	 * <FileUploadList>
	 *   <div>
	 *     files.map((file) =>
	 *       <FileUploadItem key={file.name} />
	 *   </div>
	 * </FileUploadList>
	 * ```
	 */
	children: React.ReactNode
	/**
	 * Displays the list either vertical or horizontal
	 * @default "vertical"
	 */
	orientation?: "vertical" | "horizontal"
	/**
	 * Displays the list either reversed or normal
	 * @default "normal"
	 */
	direction?: "normal" | "reverse"
	className?: string
	/** Whether to merge props with direct child.  */
	asChild?: boolean
	/**
	 * Whether to force mount the list even if there are no files.
	 *
	 * ```
	 * <FileUploadList forceMount>
	 *   {files.length === 0 ? (
	 *     <p>No files uploaded</p>
	 *   ) : (
	 *     files.map((file) => (
	 *       <FileUploadItem key={file.name} value={file} />
	 *     ))
	 *   )}
	 * </FileUploadList>
	 * ```
	 */
	forceMount?: boolean
}

export interface FileUploadItemProps {
	/**
	 * Can either render with children or without children.
	 * ```tsx
	 * const [files, setFiles] = useState([])
	 *
	 * // without children: renders default item.
	 * files.map((file) => <FileUploadItem key={file.name} />)
	 *
	 * // with children: custom children allowing composition.
	 * files.map((file) =>
	 *   <FileUploadItem key={file.name}>
	 *     <FileUploadItemName/>
	 *     <FileUploadMetadata/>
	 *     ...
	 * 	 </FileUploadItem>
	 * )
	 * ```
	 */
	children?: React.ReactNode
	/** Whether to merge props with direct child.  */
	asChild?: boolean
}

export interface FileUploadItemPreviewProps {
	/**
	 * An optional callback to render a custom file preview, overriding the default one.
	 *
	 * ```tsx
	 * render={(file, fallback) => {
	 *   if(file.extension.startsWith(".jpg")) {
	 *     return <CustomJPGPreview file={file.fileObject}/>
	 *   }
	 *   // use default behavior for everything else
	 *   return fallback()
	 * }}
	 * ```
	 *
	 * @param file - an object with the file object, file type, and file extension.
	 * @param fallback - a fallback function that renders the default file preview.
	 */
	render?: (
		file: { fileObject: File; type: string; extension: string },
		fallback: () => React.ReactNode
	) => React.ReactNode
	/** The class name of the component */
	className?: string
	/** The children of the component */
	children?: React.ReactNode
}


export interface FileUploadItemNameProps {
	/** The class name of the component */
	className?: boolean
	/** Control the maximum length of the file name to be displayed.
	 * - When filename length exceeds (`maxVisibleChars` + 3), show half from the start and half from the end with "..." in between.
	 */
	maxVisibleChars?: number
}

export interface FileUploadItemSizeProps {
	/** The class name of the component */
	className?: boolean
}

interface FileState {
	file: File
	progress: number
	status: "idle" | "uploading" | "success" | "error"
	error?: string
}

export interface FileUploadItemStatusProps {
	/**
	 * An optional callback with file status as parameter to render a custom component.
	 *
	 * ```ts
	 * render={(status) => {
	 *   switch(status): {
	 *     case "error":
	 *       return (
	 *         <div className="flex items-center gap-1">
	 *           <XCircleIcon className="size-3.5 text-destructive" />
	 *	         <span className="font-medium text-destructive text-sm">Failed</span>
	 *        </div>
	 *       )
	 *     case "uploading":
	 *       return (
	 *         <div className="flex items-center gap-1">
	 *           <UploadCloudIcon className="size-3.5 stroke-[2.5px]" />
	 *           <span className="font-medium text-sm">Uploading...</span>
	 *         </div>
	 *       )
	 *     case ...
	 *   }
	 * }
	 * ```
	 *
	 * @param status -
	 * ```ts
	 * "idle" | "uploading" | "success" | "error"
	 * ```
	 */
	render?: (status: FileState["status"]) => React.ReactNode
}

export interface FileUploadItemErrorProps {
	/** The class name of the component */
	className?: string
}

export interface FileUploadItemMetadataProps {
	/** The children of the component */
	children?: React.ReactNode
	/** The class name of the component */
	className?: boolean
}


export interface FileUploadItemProgressProps {
	/**
	 * Different layout styles for the Progress bar.
	 *
	 * ```tsx
	 * // standard horizontal progress bar.
	 * <FileUploadItemProgress variant="linear" />
	 *
	 * // fills the container vertically based on progress.
	 * <FileUploadItemProgress variant="fill" />
	 *
	 * // circular progress indicator.
	 * <FileUploadItemPreview>
	 *   <FileUploadItemProgress variant="circular" />
	 * </FileUploadItemPreview>
	 * ```
	 *
	 * @default "linear"
	 */
	variant?: "linear" | "fill" | "circular"
	/**
	 * Styles how the `fill` progress variant fills the bar. Only applies when variant is `fill`
	 * - `bottom-t-top`: fills vertically from bottom to top.
	 * - `left-t-right`: fills horizontally from left to right.
	 *
	 * ```tsx
	 * // Fill from bottom to top (default)
	 * <FileUploadItemPreview>
	 *   <FileUploadItemProgress variant="fill" />
	 * </FileUploadItemPreview>
	 *
	 * // Fill from left to right horizontally
	 * <FileUploadItem className="relative">
	 *   <FileUploadItemProgress variant="fill" fillVariant="left-t-right" />
	 * </FileUploadItem>
	 * ```
	 *
	 * @default "bottom-t-top"
	 */
	fillVariant?: "bottom-t-top" | "left-t-right"
	/** 
	 * Set the stroke width of the circular progress. 
	 * 
	 * @default 2
	 */
	strokeWidth?: number
	/**
	 * The size (in pixels) of the circular progress. Only applies when variant is `circular`.
	 * ```tsx
	 * <FileUploadItemProgress variant="circular" size={60} />
	 * ```
	 * @default 40
	 */
	size?: number
	/** Whether to force mount the progress indicator */
	forceMount?: boolean
	/** The class name of the component */
	className?: string
	/** The children of the component */
	children?: React.ReactNode
	/** Whether to merge props with direct child.  */
	asChild?: boolean
}

export interface FileUploadItemProgressLabelProps {
	/** The class name of the component */
	className?: string
	/** Whether to force mount the progress indicator */
	forceMount?: boolean
}

export interface FileUploadItemProgressWithLabelProps {
	/**
	 * Label text relative to the progress bar layout.
	 * - `right`: Text is displayed to the right of the progress bar.
	 * - `bottom`: Text is displayed below the progress bar, aligned to the right.
	 * - `top-floating`: Text is displayed in a floating tooltip above the progress indicator.
	 * - `bottom-floating`: Text is displayed in a floating tooltip below the progress indicator.
	 */
	labelPosition?: "right" | "bottom" | "top-floating" | "bottom-floating"
	forceMount?: boolean
	className?: string
}

export interface FileUploadMediaProps {
	asChild?: boolean
}

export interface FileUploadItemDeleteProps {
	/** The children of the component */
	children?: React.ReactNode
	/** Whether to merge props with direct child.  */
	asChild?: boolean
}

export interface FileUploadItemRetryProps {
	/** The children of the component */
	children?: React.ReactNode
	/** Whether to merge props with direct child.  */
	asChild?: boolean
}


export interface FileUploadItemCancelProps { 
	asChild?: boolean
	className?: string
}