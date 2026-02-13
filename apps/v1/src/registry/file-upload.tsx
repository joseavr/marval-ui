"use client"

// TODO cancel upload

import { Slot } from "@radix-ui/react-slot"
import {
	FileArchiveIcon,
	FileCogIcon,
	FileX,
	Upload,
	UploadCloudIcon,
	XIcon
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React, {
	createContext,
	type Dispatch,
	type RefObject,
	type SVGProps,
	useContext,
	useEffect,
	useId,
	useReducer,
	useRef,
	useState
} from "react"

import { cn } from "@/lib/utils"

const fileTypeToIcon = {
	empty: (props: SVGProps<SVGSVGElement>) => (
		<svg width={40} height={40} fill="none" viewBox="0 0 40 40" {...props}>
			<title>Empty</title>
			<path
				stroke="#D5D7DA"
				strokeWidth={1.5}
				d="M4.75 4A3.25 3.25 0 0 1 8 .75h16c.121 0 .238.048.323.134l10.793 10.793a.46.46 0 0 1 .134.323v24A3.25 3.25 0 0 1 32 39.25H8A3.25 3.25 0 0 1 4.75 36z"
			/>
			<path stroke="#D5D7DA" strokeWidth={1.5} d="M24 .5V8a4 4 0 0 0 4 4h7.5" />
		</svg>
	),
	pdf: (props: SVGProps<SVGSVGElement>) => (
		<svg width={40} height={40} fill="none" viewBox="0 0 40 40" {...props}>
			<title>PDF</title>
			<path
				stroke="#D5D7DA"
				strokeWidth={1.5}
				d="M7.75 4A3.25 3.25 0 0 1 11 .75h16c.121 0 .238.048.323.134l10.793 10.793a.46.46 0 0 1 .134.323v24A3.25 3.25 0 0 1 35 39.25H11A3.25 3.25 0 0 1 7.75 36z"
			/>
			<path stroke="#D5D7DA" strokeWidth={1.5} d="M27 .5V8a4 4 0 0 0 4 4h7.5" />
			<rect width={26} height={16} x={1} y={18} fill="#D92D20" rx={2} />
			<path
				fill="#fff"
				d="M4.832 30v-7.273h2.87q.826 0 1.41.316.582.314.887.87.31.555.31 1.279t-.313 1.278q-.313.555-.906.863-.59.309-1.427.309h-1.83V26.41h1.581q.444 0 .732-.153.29-.156.433-.43.145-.276.145-.635 0-.363-.145-.632a.97.97 0 0 0-.433-.423q-.291-.153-.74-.153H6.37V30zm9.053 0h-2.578v-7.273h2.6q1.095 0 1.889.437.791.433 1.218 1.246.43.814.43 1.947 0 1.136-.43 1.953a2.95 2.95 0 0 1-1.226 1.253q-.795.437-1.903.437m-1.04-1.317h.976q.682 0 1.147-.242.47-.244.703-.756.238-.516.238-1.328 0-.807-.238-1.318a1.54 1.54 0 0 0-.7-.753q-.465-.24-1.146-.241h-.98zM18.582 30v-7.273h4.816v1.268H20.12v1.733h2.958v1.268H20.12V30z"
			/>
		</svg>
	),
	document: (props: SVGProps<SVGSVGElement>) => (
		<svg width={40} height={40} fill="none" viewBox="0 0 40 40" {...props}>
			<title>Document Icon</title>
			<path
				stroke="#D5D7DA"
				strokeWidth={1.5}
				d="M4.75 4A3.25 3.25 0 0 1 8 .75h16c.121 0 .238.048.323.134l10.793 10.793a.46.46 0 0 1 .134.323v24A3.25 3.25 0 0 1 32 39.25H8A3.25 3.25 0 0 1 4.75 36z"
			/>
			<path stroke="#D5D7DA" strokeWidth={1.5} d="M24 .5V8a4 4 0 0 0 4 4h7.5" />
			<path
				stroke="#155EEF"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M11.9 19.5h16.2m-16.2 3.6h16.2m-16.2 3.6h16.2m-16.2 3.6h12.6"
			/>
		</svg>
	),
	video: (props: SVGProps<SVGSVGElement>) => (
		<svg width={40} height={40} fill="none" viewBox="0 0 40 40" {...props}>
			<title>Video Icon</title>
			<path
				stroke="#D5D7DA"
				strokeWidth={1.5}
				d="M4.75 4A3.25 3.25 0 0 1 8 .75h16c.121 0 .238.048.323.134l10.793 10.793a.46.46 0 0 1 .134.323v24A3.25 3.25 0 0 1 32 39.25H8A3.25 3.25 0 0 1 4.75 36z"
			/>
			<path stroke="#D5D7DA" strokeWidth={1.5} d="M24 .5V8a4 4 0 0 0 4 4h7.5" />
			<g
				stroke="#155EEF"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				clipPath="url(#video-02_svg__a)"
			>
				<path d="M20 31.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15" />
				<path d="M18.125 21.724c0-.358 0-.537.075-.637a.38.38 0 0 1 .273-.15c.125-.008.275.089.576.282l3.54 2.276c.262.168.393.252.438.359a.37.37 0 0 1 0 .292c-.045.107-.176.19-.437.359l-3.54 2.276c-.302.193-.452.29-.577.281a.38.38 0 0 1-.273-.15c-.075-.1-.075-.278-.075-.636z" />
			</g>
			<defs>
				<clipPath id="video-02_svg__a">
					<path fill="#fff" d="M11 15h18v18H11z" />
				</clipPath>
			</defs>
		</svg>
	),
	audio: (props: SVGProps<SVGSVGElement>) => (
		<svg width={40} height={40} fill="none" viewBox="0 0 40 40" {...props}>
			<title>Audio Icon</title>
			<path
				stroke="#D5D7DA"
				strokeWidth={1.5}
				d="M4.75 4A3.25 3.25 0 0 1 8 .75h16c.121 0 .238.048.323.134l10.793 10.793a.46.46 0 0 1 .134.323v24A3.25 3.25 0 0 1 32 39.25H8A3.25 3.25 0 0 1 4.75 36z"
			/>
			<path stroke="#D5D7DA" strokeWidth={1.5} d="M24 .5V8a4 4 0 0 0 4 4h7.5" />
			<path
				stroke="#DD2590"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M16.85 28.5v-8.733c0-.362 0-.542.066-.689a.75.75 0 0 1 .269-.317c.133-.089.312-.119.668-.178l6.6-1.1c.48-.08.72-.12.908-.05a.75.75 0 0 1 .39.33c.099.172.099.416.099.904V27m-9 1.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0m9-1.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0"
			/>
		</svg>
	),
	code: (props: SVGProps<SVGSVGElement>) => (
		<svg width={40} height={40} fill="none" viewBox="0 0 40 40" {...props}>
			<title>Code Icon</title>
			<path
				stroke="#D5D7DA"
				strokeWidth={1.5}
				d="M4.75 4A3.25 3.25 0 0 1 8 .75h16c.121 0 .238.048.323.134l10.793 10.793a.46.46 0 0 1 .134.323v24A3.25 3.25 0 0 1 32 39.25H8A3.25 3.25 0 0 1 4.75 36z"
			/>
			<path stroke="#D5D7DA" strokeWidth={1.5} d="M24 .5V8a4 4 0 0 0 4 4h7.5" />
			<path
				stroke="#444CE7"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M23.75 27.75 27.5 24l-3.75-3.75m-7.5 0L12.5 24l3.75 3.75m5.25-10.5-3 13.5"
			/>
		</svg>
	)
} as const

/**
 * Truncates a filename if it exceeds the specified number of visible characters.
 * - If truncation is necessary, it takes half the visible characters from the start and half from the end, inserting "..." in between.
 * - The output will always be at most (maxVisibleChars + 3) characters long.
 */
function truncateText(name: string, maxVisibleChars: number) {
	let filename = name.trim()
	if (filename.length > maxVisibleChars + 3) {
		const half = Math.floor(maxVisibleChars / 2)
		const left = filename.slice(0, half)
		const right = filename.slice(-half)
		filename = `${left}...${right}`
	}
	return filename
}

/**
 * Returns an SVG component that renders an icon based on the file type or extension.
 */
function getFileIcon(file: File) {
	const type = file.type
	const extension = file.name.split(".").pop()?.toLowerCase() ?? ""

	if (type.startsWith("video/")) {
		const FileVideoIcon = fileTypeToIcon.video
		return <FileVideoIcon />
	}

	if (type.startsWith("audio/")) {
		const FileAudioIcon = fileTypeToIcon.audio
		return <FileAudioIcon />
	}

	if (extension === "pdf") {
		const FilePdfIcon = fileTypeToIcon.pdf
		return <FilePdfIcon />
	}

	if (type.startsWith("text/") || ["txt", "md", "rtf"].includes(extension)) {
		const FileDocumentIcon = fileTypeToIcon.document
		return <FileDocumentIcon />
	}

	if (
		[
			"html",
			"css",
			"js",
			"jsx",
			"ts",
			"tsx",
			"json",
			"xml",
			"php",
			"py",
			"rb",
			"java",
			"c",
			"cpp",
			"cs"
		].includes(extension)
	) {
		const FileCodeIcon = fileTypeToIcon.code
		return <FileCodeIcon />
	}

	if (["zip", "rar", "7z", "tar", "gz", "bz2"].includes(extension)) {
		return <FileArchiveIcon />
	}

	if (
		["exe", "msi", "app", "apk", "deb", "rpm"].includes(extension) ||
		type.startsWith("application/")
	) {
		return <FileCogIcon />
	}

	const FileEmptyIcon = fileTypeToIcon.empty
	return <FileEmptyIcon />
}

/**
 * Returns a human-readable file size from bytes.
 * @param bytes - The size of the file in bytes.
 * @returns A string representing the file size in a human-readable format.
 */
function getFileSizeFromBytes(bytes: number) {
	if (bytes === 0) return "0 KB"
	const suffixes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return `${Math.floor(bytes / 1024 ** i)} ${suffixes[i]}`
}

/**
 * Returns a stable key for duplicate detection: normalized name + MIME type.
 * Two files with the same key are considered the same (name + extension + filetype).
 */
function getFileKey(file: File): string {
	const name = file.name.trim().toLowerCase()
	const type = file.type || ""
	return `${name}|${type}`
}

type ErrorReason =
	| "MAX_FILE_REACHED"
	| "CUSTOM_VALIDATION_ERROR"
	| "UNACCEPTED_MIMOTYPE"
	| "MAX_SIZE_REACHED"
	| "KEY_DUPLICATED"

interface FileState {
	file: File
	progress: number
	status: "idle" | "uploading" | "success" | "error" | "cancelled"
	error?: string
}

type InternalState = {
	/**
	 * Intenral state of active files currently managed by the upload system.
	 * - Keyed by `File` that maps to metadata: progress, status, and error.
	 * - A file present here MUST NOT exist in `deletedFilesMap`.
	 */
	fileMap: Map<File, FileState>
	deletedFileMap: Map<File, FileState>
	/**
	 * Cache of object URLs generated via `URL.createObjectURL`. URLs needed to preview images.
	 *
	 * This cache exists to prevent:
	 * - Recreating object URLs on every render
	 * - Unnecessary image reloads
	 * - Memory leaks caused by orphaned Blob URLs
	 * - Size overhead of base64 path.
	 */
	urlCache: Map<File, string>
	/** Whether a drag-and-drop operation is currently over the dropzone. */
	isDraggingOver: boolean
	/** Whether the current file set violates validation rules. */
	isInvalid: boolean
	/** Abort controllers for ongoing uploads to enable cancellation */
	abortControllerMap: Map<File, AbortController>
}

const initialState: InternalState = {
	fileMap: new Map<File, FileState>(),
	deletedFileMap: new Map<File, FileState>(),
	urlCache: new Map<File, string>(),
	isDraggingOver: false,
	isInvalid: false,
	abortControllerMap: new Map<File, AbortController>()
}

type Actions =
	| { type: "SYNC_FROM_VALUE"; files: File[] }
	| { type: "SET_DELETED_FILE"; file: File; fileState: FileState }
	| { type: "SET_UPLOAD_PROGRESS"; file: File; progress: number }
	| { type: "SET_UPLOAD_SUCCESS"; file: File }
	| { type: "SET_UPLOAD_ERROR"; file: File; error: string }
	| { type: "SET_UPLOAD_CANCELLED"; file: File }
	| { type: "SET_DRAG_OVER"; isDraggingOver: boolean }
	| { type: "SET_INVALID"; isInvalid: boolean }

function reducer(state: InternalState = initialState, action: Actions): InternalState {
	switch (action.type) {
		case "SYNC_FROM_VALUE": {
			const internalFileMap = new Map(state.fileMap)
			const urlCacheMap = new Map(state.urlCache)
			const deletedFileMap = new Map(state.deletedFileMap)
			const abortControllerMap = new Map(state.abortControllerMap)
			let shouldResetDeletedFileMap = false

			// add new files
			for (const file of action.files) {
				if (!internalFileMap.has(file)) {
					internalFileMap.set(file, { file, progress: 0, status: "idle" })
					shouldResetDeletedFileMap = true
				}
			}

			// cleanup removed files and their Blob Url after sync
			for (const file of internalFileMap.keys()) {
				if (!action.files.includes(file)) {
					const fileToDelete = file
					internalFileMap.delete(fileToDelete)
					const cachedUrl = urlCacheMap.get(fileToDelete)
					if (cachedUrl) {
						URL.revokeObjectURL(cachedUrl)
						urlCacheMap.delete(fileToDelete)
					}
					// Clean up abort controller for removed files
					const abortController = abortControllerMap.get(fileToDelete)
					if (abortController) {
						abortController.abort()
						abortControllerMap.delete(fileToDelete)
					}
				}
			}

			if (shouldResetDeletedFileMap) {
				deletedFileMap.clear()
			}

			return {
				...state,
				fileMap: internalFileMap,
				urlCache: urlCacheMap,
				deletedFileMap: deletedFileMap,
				abortControllerMap: abortControllerMap,
				...(action.files.length === 0 ? { isInvalid: false } : {})
			}
		}

		case "SET_DELETED_FILE": {
			const fileMap = new Map(state.fileMap)
			const deletedFileMap = new Map(state.deletedFileMap)
			deletedFileMap.set(action.file, action.fileState)
			fileMap.delete(action.file)

			return { ...state, fileMap: fileMap, deletedFileMap: deletedFileMap }
		}

		case "SET_UPLOAD_PROGRESS": {
			const files = new Map(state.fileMap)
			const fileState = files.get(action.file)
			if (fileState) {
				files.set(action.file, {
					...fileState,
					status: "uploading",
					progress: action.progress
				})
			}
			return { ...state, fileMap: files }
		}

		case "SET_UPLOAD_SUCCESS": {
			const files = new Map(state.fileMap)
			const fileState = files.get(action.file)
			if (fileState) {
				files.set(action.file, { ...fileState, status: "success", progress: 100 })
			}
			return { ...state, fileMap: files }
		}

		case "SET_UPLOAD_CANCELLED": {
			const files = new Map(state.fileMap)
			const fileState = files.get(action.file)
			if (fileState) {
				files.set(action.file, { ...fileState, status: "cancelled", progress: 0 })
			}
			return { ...state, fileMap: files }
		}

		case "SET_DRAG_OVER":
			return { ...state, isDraggingOver: action.isDraggingOver }

		case "SET_INVALID":
			return { ...state, isInvalid: action.isInvalid }

		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}

type FileUploadContextValue = {
	value: File[]
	fileMap: InternalState["fileMap"]
	deletedFileMap: InternalState["deletedFileMap"]
	abortControllerMap: InternalState["abortControllerMap"]
	isDraggingOver: InternalState["isDraggingOver"]
	isInvalid: InternalState["isInvalid"]
	disabled: boolean | undefined
	urlCache: Map<File, string>
	dispatch: Dispatch<Actions>
	onUploadFiles: (files: File[]) => Promise<void>
	onValueChange: FileUploadProps["onFilesChange"]
	meta: {
		rootInputRef: RefObject<HTMLInputElement | null>
		rootInputId: string
		rootLabelId: string
		dropzoneId: string
	}
}
const FileUploadContext = createContext<FileUploadContextValue | undefined>(undefined)

function useFileUploadContext(consumerName: string) {
	const context = useContext(FileUploadContext)
	if (!context) {
		throw new Error(`\`${consumerName}\` must be used within \`FileUpload\``)
	}
	return context
}

interface FileUploadProps {
	children: React.ReactNode
	/**
	 * The class name of the root component.
	 */
	className?: string
	/**
	 * The controlled files currently being managed.
	 * - Use this prop for controlled usage.
	 * - Should be used in conjunction with `onValueChange`.
	 */
	files: File[]
	/**
	 * Callback called when files are added or removed.
	 * - Should be used in conjunction with `value`.
	 */
	onFilesChange: (files: File[] | ((prevFiles: File[]) => File[])) => void
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
}
function FileUploadRoot(props: FileUploadProps) {
	const {
		files: value,
		onFilesChange: onValueChange,
		onAcceptFiles,
		onAcceptFile,
		onRejectFile,
		onFileValidate,
		onUpload,
		autoUpload,
		accept,
		maxFiles,
		maxSize,
		name,
		disabled,
		multiple,
		asChild,
		required,
		children,
		className,
		...rootProps
	} = props

	const acceptedTypes = accept ? accept.split(",").map((type) => type.trim()) : null

	const inputId = useId()
	const inputLabelId = useId()
	const dropzoneId = useId()

	const [state, dispatch] = useReducer(reducer, initialState)
	const fileInputRef = useRef<HTMLInputElement>(null)
	// Use useRef on urlCache to prevent dependencies in useffect
	const urlCacheRef = useRef(state.urlCache)
	urlCacheRef.current = state.urlCache

	// clean up orphan Blob URLs on unmount only to prevent memory leaks
	useEffect(() => {
		return () => {
			for (const cachedUrl of urlCacheRef.current.values()) {
				URL.revokeObjectURL(cachedUrl)
			}
		}
	}, [])

	// sync internal states with value after "add" and "delete" files
	useEffect(() => {
		dispatch({ type: "SYNC_FROM_VALUE", files: value })
	}, [value])

	const handleUploadFiles = async (files: File[]) => {
		for (const file of files) {
			// Create a new AbortController for each file upload
			const abortController = new AbortController()
			state.abortControllerMap.set(file, abortController)

			dispatch({ type: "SET_UPLOAD_PROGRESS", file, progress: 0 })
		}
		try {
			await onUpload?.(files, {
				onProgress: (file: File, progress: number) => {
					// Check if upload was cancelled
					const abortController = state.abortControllerMap.get(file)
					if (abortController?.signal.aborted) {
						dispatch({ type: "SET_UPLOAD_CANCELLED", file })
						return
					}

					// TODO: Fix performance issue: dozens of store updates per frame
					dispatch({
						type: "SET_UPLOAD_PROGRESS",
						file,
						progress: Math.min(Math.max(0, progress), 100)
					})
				},
				onSuccess: (file) => {
					const abortController = state.abortControllerMap.get(file)
					if (!abortController?.signal.aborted) {
						// Remove abort controller on success
						state.abortControllerMap.delete(file)
						dispatch({ type: "SET_UPLOAD_SUCCESS", file })
					}
				},
				onError: (file, error) => {
					// Remove abort controller on error
					state.abortControllerMap.delete(file)
					dispatch({
						type: "SET_UPLOAD_ERROR",
						file,
						error: error.message ?? "Upload failed."
					})
				}
			})
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Upload failed"
			for (const file of files) {
				// Remove abort controller on error
				state.abortControllerMap.delete(file)
				dispatch({
					type: "SET_UPLOAD_ERROR",
					file,
					error: errorMessage
				})
			}
		}
	}

	const processFiles = (files: File[]) => {
		if (disabled) return
		const filesToProcess = [...files]

		const acceptedFiles: File[] = []

		// Keys of files already in the list (value) — used to reject duplicates
		const existingKeys = new Set(value.map(getFileKey))

		// Handle max files
		if (maxFiles) {
			const remainingSlotCount = Math.max(0, maxFiles - state.fileMap.size)
			if (filesToProcess.length > remainingSlotCount) {
				const filesExceedingSlots = filesToProcess.slice(remainingSlotCount)
				const file = filesExceedingSlots[0]
				const errorMessage = `You may only upload ${maxFiles} files at a time.`

				onRejectFile?.(file, {
					reason: "MAX_FILE_REACHED",
					message: errorMessage
				})
				dispatch({ type: "SET_INVALID", isInvalid: true })
				return
			}
		}

		for (const file of filesToProcess) {
			if (onFileValidate) {
				const errorMessage = onFileValidate(file)
				if (errorMessage) {
					onRejectFile?.(file, {
						reason: "CUSTOM_VALIDATION_ERROR",
						message: errorMessage
					})
					dispatch({ type: "SET_INVALID", isInvalid: true })
					return
				}
			}

			if (acceptedTypes) {
				const fileType = file.type || ""
				const fileExtension = `.${file.name.split(".").pop()}`

				const isAccepted = acceptedTypes.some(
					(type) =>
						file.type === type ||
						type === fileExtension ||
						(type.includes("/*") && fileType.startsWith(type.replace("/*", "/")))
				)

				if (!isAccepted) {
					const errorMessage = `File type "${file.type}" is not accepted.`
					onRejectFile?.(file, {
						reason: "UNACCEPTED_MIMOTYPE",
						message: errorMessage
					})
					dispatch({ type: "SET_INVALID", isInvalid: true })
					return
				}
			}

			if (maxSize && file.size > maxSize) {
				const errorMessage = `File size exceeds the maximum limit of ${getFileSizeFromBytes(maxSize)}.`
				onRejectFile?.(file, {
					reason: "MAX_SIZE_REACHED",
					message: errorMessage
				})
				dispatch({ type: "SET_INVALID", isInvalid: true })
				return
			}

			// reject duplicate: same name + extension + filetype
			const key = getFileKey(file)
			if (existingKeys.has(key)) {
				const errorMessage = `${file.name} is already in the list.`
				onRejectFile?.(file, {
					reason: "KEY_DUPLICATED",
					message: errorMessage
				})
				dispatch({ type: "SET_INVALID", isInvalid: true })
				return
			}
			existingKeys.add(key)

			// no rejection, add to accepted files
			acceptedFiles.push(file)
			onAcceptFile?.(file)
		}

		if (acceptedFiles.length > 0) {
			dispatch({ type: "SET_INVALID", isInvalid: false })

			onValueChange([...value, ...acceptedFiles])

			if (onAcceptFiles) {
				onAcceptFiles([...value, ...acceptedFiles])
			}

			if (autoUpload && onUpload) {
				requestAnimationFrame(() => {
					handleUploadFiles(acceptedFiles)
				})
			}
		}
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || [])
		processFiles(files)
		event.target.value = ""
	}

	const contextValue: FileUploadContextValue = {
		value,
		urlCache: state.urlCache,
		fileMap: state.fileMap,
		abortControllerMap: state.abortControllerMap,
		deletedFileMap: state.deletedFileMap,
		isDraggingOver: state.isDraggingOver,
		isInvalid: state.isInvalid,
		disabled,
		dispatch,
		onValueChange,
		onUploadFiles: handleUploadFiles,
		meta: {
			rootInputRef: fileInputRef,
			rootInputId: inputId,
			rootLabelId: inputLabelId,
			dropzoneId
		}
	}

	const RootPrimitive = asChild ? Slot : "div"

	return (
		<FileUploadContext value={contextValue}>
			<RootPrimitive
				data-slot="file-upload"
				data-disabled={disabled ? "" : undefined}
				className={cn("relative flex flex-col gap-2", className)}
				{...rootProps}
			>
				{children}
				<input
					type="file"
					id={inputId}
					aria-labelledby={inputLabelId}
					aria-describedby={dropzoneId}
					aria-invalid={state.isInvalid || undefined}
					ref={fileInputRef}
					tabIndex={-1}
					accept={accept}
					name={name}
					className="sr-only"
					disabled={disabled}
					multiple={multiple}
					required={required}
					onChange={handleInputChange}
				/>
				<div id={inputLabelId} className="sr-only">
					{"File upload"}
				</div>
			</RootPrimitive>
		</FileUploadContext>
	)
}

interface FileUploadDropzoneProps extends React.ComponentProps<"div"> {
	asChild?: boolean
	variant?: "dropzone" | "wrapper"
	renderOverlay?: React.ReactNode
}
function FileUploadDropzone({
	asChild,
	variant = "dropzone",
	className,
	onClick: onClickProp,
	onDragOver: onDragOverProp,
	onDragEnter: onDragEnterProp,
	onDragLeave: onDragLeaveProp,
	onDragEnd: onDragEndProp,
	onDrop: onDropProp,
	onPaste: onPasteProp,
	onKeyDown: onKeyDownProp,
	children,
	renderOverlay,
	...props
}: FileUploadDropzoneProps) {
	const context = useFileUploadContext("file-upload-dropzone")

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		onDragOverProp?.(event)

		if (event.defaultPrevented) return
		event.preventDefault()
		context.dispatch({ type: "SET_DRAG_OVER", isDraggingOver: true })
	}

	const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
		onDragEnterProp?.(event)

		if (event.defaultPrevented) return
		event.preventDefault()
		context.dispatch({ type: "SET_DRAG_OVER", isDraggingOver: true })
	}

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		onDragLeaveProp?.(event)
		onDragEndProp?.(event)

		if (event.defaultPrevented) return

		event.preventDefault()
		context.dispatch({ type: "SET_DRAG_OVER", isDraggingOver: false })
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		onDropProp?.(event)
		if (event.defaultPrevented) return
		event.preventDefault()
		context.dispatch({ type: "SET_DRAG_OVER", isDraggingOver: false })

		const inputElement = context.meta.rootInputRef.current
		if (!inputElement) return
		const files = Array.from(event.dataTransfer.files || [])
		const dataTransfer = new DataTransfer()
		for (const file of files) {
			dataTransfer.items.add(file)
		}
		inputElement.files = dataTransfer.files
		inputElement.dispatchEvent(new Event("change", { bubbles: true }))
	}

	const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
		onPasteProp?.(event)

		if (event.defaultPrevented) return
		event.preventDefault()
		context.dispatch({ type: "SET_DRAG_OVER", isDraggingOver: false })

		const inputElement = context.meta.rootInputRef.current
		if (!inputElement) return
		const items = Array.from(event.clipboardData.items || [])
		if (!items) return
		const dataTransfer = new DataTransfer()
		for (const item of items) {
			if (item.kind === "file") {
				const file = item.getAsFile()
				if (file) {
					dataTransfer.items.add(file)
				}
			}
		}
		inputElement.files = dataTransfer.files
		inputElement.dispatchEvent(new Event("change", { bubbles: true }))
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		onKeyDownProp?.(event)
	}

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		// Don’t intercept clicks that should submit a form (let default action run)
		const isSubmitButton =
			(event.target instanceof HTMLButtonElement &&
				(!event.target.hasAttribute("type") ||
					event.target.getAttribute("type") === "submit")) ||
			(event.target instanceof HTMLInputElement && event.target.type === "submit")
		if (isSubmitButton) return

		// Allow consumer-provided click handlers to run first.
		onClickProp?.(event)
		// If the consumer cancelled the event, respect it and stop here.
		if (event.defaultPrevented) return
		// Trigger the hidden input to open the native file selection.
		context.meta.rootInputRef.current?.click()
	}

	const variants = {
		dropzone: cn(
			"flex select-none flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 hover:bg-accent/30 focus-visible:border-ring/50 data-disabled:pointer-events-none data-dragging:border-primary/30 data-invalid:border-destructive data-dragging:bg-accent/30 data-invalid:ring-destructive/20"
		),
		wrapper: cn("w-fit border-0 bg-transparent p-0 hover:bg-transparent")
	}

	const DropzonePrimitive = asChild ? Slot : "div"

	return (
		<DropzonePrimitive
			role="region"
			id={context.meta.dropzoneId}
			aria-disabled={context.disabled || undefined}
			aria-invalid={context.isInvalid || undefined}
			data-slot="file-upload-dropzone"
			data-dragging={context.isDraggingOver ? "" : undefined}
			data-invalid={context.isInvalid ? "" : undefined}
			data-disabled={context.disabled ? "" : undefined}
			tabIndex={context.disabled ? undefined : 0}
			className={cn(
				"group/dropzone relative select-none outline-none transition-colors",
				variants[variant],
				className
			)}
			onClick={handleClick}
			onDragOver={handleDragOver}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragEnd={handleDragLeave}
			onDrop={handleDrop}
			onPaste={handlePaste}
			onKeyDown={handleKeyDown}
			{...props}
		>
			{variant === "dropzone" ? (
				<>
					{children ?? (
						<>
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
									Or click to browse files
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
						</>
					)}
					{renderOverlay && (
						<div
							data-slot="dropzone-overlay"
							className="absolute top-0 left-0 z-0 size-full bg-background/50 opacity-0 backdrop-blur transition-opacity duration-200 ease-out group-data-dragging/dropzone:z-10 group-data-dragging/dropzone:opacity-100"
						>
							{renderOverlay}
						</div>
					)}
				</>
			) : (
				<>
					<div
						data-slot="dropzone-overlay"
						className="absolute top-0 left-0 z-0 size-full bg-background/50 opacity-0 backdrop-blur transition-opacity duration-200 ease-out group-data-dragging/dropzone:z-10 group-data-dragging/dropzone:opacity-100"
					>
						{renderOverlay ?? (
							<div className="flex size-full flex-col items-center justify-center gap-1 text-center">
								<div className="flex items-center justify-center rounded-full border p-2.5">
									<UploadCloudIcon className="size-4 text-muted-foreground" />
								</div>
								<p className="font-medium text-sm">Drag & drop files here</p>
							</div>
						)}
					</div>
					{children}
				</>
			)}
		</DropzonePrimitive>
	)
}

function FileUploadTrigger({
	className,
	asChild = false,
	onClick,
	...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
	const context = useFileUploadContext("file-upload-trigger")

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
		if (event.defaultPrevented) return
		event.stopPropagation()
		context.meta.rootInputRef.current?.click()
	}

	const TriggerPrimitive = asChild ? Slot : "button"

	return (
		<TriggerPrimitive
			type="button"
			aria-controls={context.meta.rootInputId}
			data-slot="file-upload-trigger"
			data-disabled={context.disabled ? "" : undefined}
			disabled={context.disabled}
			onClick={handleClick}
			className={cn(
				"inline-flex items-center justify-center rounded-md px-2 py-1.5 font-medium text-sm transition-colors",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
				className
			)}
			{...props}
		/>
	)
}

function FileUploadList({
	forceMount = false,
	children: childrenProp,
	orientation = "vertical",
	direction = "normal",
	className,
	asChild,
	...props
}: {
	/**
	 * A children is **required**
	 * - **Important**: the direct children of `FileUploadList` must be `FileUploadItem[]` otherwise throws error.
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
	asChild?: boolean
	forceMount?: boolean
}) {
	const rootContext = useFileUploadContext("file-upload-list")
	const shouldRender = forceMount || rootContext.fileMap.size > 0

	// Accounts for when there are non-FileUploadItem inside FileUploadList
	// since we inject the files based on the index.
	let shift = 0

	const children = React.Children.map(childrenProp, (child, index) => {
		if (!React.isValidElement<{ value?: File }>(child)) {
			shift++
			return child
		}
		if (child.type !== FileUploadItem) {
			shift++
			return child
		}

		return React.cloneElement(child, {
			value: rootContext.value[index - shift]
		})
	})

	const ListPrimitive = asChild ? Slot : "div"

	return (
		<ListPrimitive
			role="list"
			data-slot="file-upload-list"
			aria-orientation={orientation}
			data-orientation={orientation}
			data-direction={direction}
			data-state={shouldRender ? "active" : "inactive"}
			className={cn(
				"flex flex-col gap-2 data-[state=inactive]:hidden data-[direction=reverse]:flex-col-reverse",
				orientation === "horizontal" &&
					"flex-row overflow-x-auto p-1.5 data-[direction=reverse]:flex-row-reverse",
				className
			)}
			{...props}
		>
			<AnimatePresence initial={false}>{children}</AnimatePresence>
		</ListPrimitive>
	)
}

type FileUploadItemContextValue = {
	fileState: FileState
	// Whether the file failed to upload.
	hasError: boolean
	id: string
	nameId: string
	sizeId: string
	statusId: string
	messageId: string
}

const FileUploadItemContext = createContext<FileUploadItemContextValue | undefined>(
	undefined
)

function useItemContext(consumerName: string) {
	const context = useContext(FileUploadItemContext)
	if (!context) {
		throw new Error(`\`${consumerName}\` must be used within \`file-upload-item\``)
	}
	return context
}

interface FileUploadItemProps {
	/** Can either render with children or without children. */
	children?: React.ReactNode
	className?: string
}

interface FileUploadItemInternalProps extends FileUploadItemProps {
	/** Injected by parent via cloneElement. Not part of public API. */
	value: File
}

function FileUploadItem(props: FileUploadItemProps) {
	return <FileUploadItemInternal {...(props as FileUploadItemInternalProps)} />
}

function FileUploadItemInternal({
	value,
	className,
	children
}: FileUploadItemInternalProps) {
	const id = useId()
	const rootContext = useFileUploadContext("file-upload-item")
	if (!value) return null
	const fileState =
		rootContext.fileMap.get(value) || rootContext.deletedFileMap.get(value)

	if (!fileState) return null

	const nameId = `file-name-${id}`
	const sizeId = `file-size-${id}`
	const statusId = `file-status-${id}`
	const messageId = `file-message-${id}`
	const hasChildren = Boolean(children)
	const hasError = fileState.error !== undefined || fileState.status === "error"
	const statusTextForSR = hasError
		? `Error: ${fileState.error}`
		: fileState.status === "uploading"
			? `Uploading: ${fileState.progress}% complete`
			: fileState.status === "success"
				? "Upload successful"
				: fileState.status === "cancelled"
					? "Upload cancelled"
					: "Ready to upload"

	const contextValue: FileUploadItemContextValue = {
		fileState,
		hasError,
		id,
		nameId,
		sizeId,
		statusId,
		messageId
	}

	return (
		<FileUploadItemContext value={contextValue}>
			<motion.li
				data-slot="file-upload-item"
				layout
				initial={{ opacity: 0, translateY: -8 }}
				animate={{ opacity: 1, translateY: 0 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.15 }}
				id={id}
				aria-labelledby={nameId}
				aria-describedby={`${nameId} ${sizeId} ${statusId} ${fileState ? messageId : ""}`}
				data-error={hasError ? "" : undefined}
				className={cn(
					"relative flex list-none gap-2.5 rounded-lg p-4 transition-shadow duration-100 ease-linear",
					"ring-1 ring-border ring-inset data-error:ring-2 data-error:ring-destructive",
					className
				)}
			>
				{hasChildren ? (
					children
				) : (
					<div className="flex w-full flex-col gap-2.5">
						<div className="flex w-full items-center gap-2">
							<FileUploadItemPreview />
							<FileUploadItemMetadata />
							<div className="flex items-center gap-1">
								<FileUploadItemCancel className="hidden data-[status=uploading]:flex" />
								<FileUploadItemDelete className="flex data-[status=uploading]:hidden" />
							</div>
						</div>
						<FileUploadItemProgressWithLabel forceMount labelPosition="right" />
					</div>
				)}
				<span id={statusId} className="sr-only">
					{statusTextForSR}
				</span>
			</motion.li>
		</FileUploadItemContext>
	)
}

function FileUploadItemName({
	className,
	maxVisibleChars
}: {
	/** When filename length exceeds (`maxVisibleChars` + 3), show half from the start and half from the end with "..." in between. */
	maxVisibleChars?: number
	className?: string
}) {
	const { fileState, nameId } = useItemContext("file-upload-item-name")
	if (!fileState) return null
	const filename = maxVisibleChars
		? truncateText(fileState.file.name, maxVisibleChars)
		: fileState.file.name.trim()
	return (
		<span
			data-slot="file-upload-item-name"
			id={nameId}
			className={cn("w-full truncate font-medium text-foreground text-sm", className)}
		>
			{filename}
		</span>
	)
}

function FileUploadItemSize({ className }: { className?: string }) {
	const { fileState, sizeId } = useItemContext("file-upload-item-size")
	const fileStatus = fileState.status
	if (!fileState) return null

	return (
		<span
			id={sizeId}
			data-status={fileStatus}
			className={cn(
				"truncate whitespace-nowrap text-muted-foreground text-sm",
				className
			)}
		>
			{getFileSizeFromBytes(fileState.file.size)}
		</span>
	)
}

function FileUploadItemStatus({
	render,
	className
}: {
	/** An optional callback with file status as parameter to render a custom component. */
	render?: (status: FileState["status"]) => React.ReactNode
	className?: string
}) {
	const itemContext = useItemContext("file-upload-item-status")
	const fileStatus = itemContext.fileState.status

	if (render)
		return (
			<div
				data-slot="file-upload-item-status"
				data-status={fileStatus}
				className={className}
			>
				{render(fileStatus)}
			</div>
		)

	return (
		<span
			data-slot="file-upload-item-status"
			data-status={fileStatus}
			className={cn("capitalize", className)}
		>
			{fileStatus}
		</span>
	)
}

function FileUploadItemErrorMessage({ className }: { className?: string }) {
	const { fileState, messageId } = useItemContext("file-upload-item-error-message")
	if (!fileState.error) return null
	return (
		<span
			data-slot="file-upload-item-error-message"
			id={messageId}
			className={cn("text-destructive text-xs", className)}
		>
			{fileState.error}
		</span>
	)
}

function FileUploadItemMetadata({
	children,
	className
}: {
	children?: React.ReactNode
	className?: string
}) {
	return (
		<div
			data-slot="file-upload-item-metadata"
			className={cn("flex min-w-0 flex-1 flex-col", className)}
		>
			{children ?? (
				<>
					<FileUploadItemName />
					<div className="flex gap-2 text-muted-foreground text-sm">
						<FileUploadItemSize />
						-
						<FileUploadItemStatus />
					</div>
					<FileUploadItemErrorMessage />
				</>
			)}
		</div>
	)
}

function ItemDefaultPreview({ file }: { file: File }) {
	const rootContext = useFileUploadContext("default-preview")

	if (file.type.startsWith("image/")) {
		let url = rootContext.urlCache.get(file)
		if (!url) {
			url = URL.createObjectURL(file)
			rootContext.urlCache.set(file, url)
		}
		return <img src={url} alt={file.name} className="size-full object-cover" />
	}

	return getFileIcon(file)
}

function FileUploadItemPreview({
	render,
	className,
	children,
	...props
}: {
	/** An optional callback to render a custom file preview, overriding the default one. */
	render?: (
		file: { fileObject: File; type: string; extension: string },
		fallback: () => React.ReactNode
	) => React.ReactNode
	className?: string
	children?: React.ReactNode
}) {
	const itemContext = useItemContext("file-upload-item-preview")
	const file = itemContext.fileState.file
	const type = file.type
	const extension = file.name.split(".").pop()?.toLowerCase() ?? ""

	return (
		<div
			data-slot="file-upload-item-preview"
			className={cn(
				"relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border bg-accent/50",
				"has-[>svg]:border-none has-[>svg]:bg-transparent [&>svg]:size-full",
				className
			)}
			{...props}
		>
			{render ? (
				render({ fileObject: file, type, extension }, () => (
					<ItemDefaultPreview file={file} />
				))
			) : (
				<ItemDefaultPreview file={file} />
			)}
			{children}
		</div>
	)
}

function FileUploadItemProgress({
	variant = "linear",
	fillVariant = "bottom-t-top",
	strokeWidth = 2,
	size = 40,
	forceMount,
	className,
	asChild = false,
	children,
	...props
}: {
	/**
	 * Different layout styles for the Progress bar.
	 * @default "linear"
	 */
	variant?: "linear" | "fill" | "circular"
	/**
	 * Styles how the `fill` progress variant fills the bar. Only applies when variant is `fill`
	 * - `bottom-t-top`: fills vertically from bottom to top.
	 * - `left-t-right`: fills horizontally from left to right.
	 * @default "bottom-t-top"
	 */
	fillVariant?: "bottom-t-top" | "left-t-right"
	/**
	 * The size (in pixels) of the circular progress. Only applies when variant is `circular`.
	 * @default 40
	 */
	size?: number
	strokeWidth?: number
	forceMount?: boolean
	className?: string
	asChild?: boolean
	children?: React.ReactNode
}) {
	const itemContext = useItemContext("file-upload-item-progress")
	const progressValue = itemContext.fileState.progress
	const shouldRender = forceMount || (progressValue > 0 && progressValue < 100)

	if (!shouldRender) return null

	const ItemProgressPrimitive = asChild ? Slot : "div"

	switch (variant) {
		case "linear":
			return (
				<ItemProgressPrimitive
					role="progressbar"
					data-slot="file-upload-progress"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={progressValue}
					aria-valuetext={`${progressValue}%`}
					aria-labelledby={itemContext.nameId}
					className={cn(
						"flex h-1.5 w-full overflow-x-hidden rounded-full bg-muted",
						className
					)}
					{...props}
				>
					<div
						data-slot="file-upload-progress-indicator"
						className="h-full w-full flex-1 bg-primary transition-transform duration-300 ease-linear"
						style={{
							transform: `translateX(-${100 - progressValue}%)`
						}}
					/>
				</ItemProgressPrimitive>
			)
		case "fill": {
			const progressPercentage = itemContext.fileState.progress
			const inset = 100 - progressPercentage
			return (
				<ItemProgressPrimitive
					role="progressbar"
					data-slot="file-upload-progress"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={progressValue}
					aria-valuetext={`${progressValue}%`}
					aria-labelledby={itemContext.nameId}
					className={cn(
						"absolute inset-0 bg-input transition-[clip-path] duration-300 ease-linear dark:bg-muted-foreground/50",
						className
					)}
					style={{
						clipPath:
							fillVariant === "bottom-t-top"
								? `inset(${inset}% 0% 0% 0%)`
								: `inset(0% ${inset}% 0% 0%)`
					}}
				/>
			)
		}

		case "circular": {
			const circumference = 2 * Math.PI * ((size - 4) / 2)
			const strokeDashoffset =
				circumference - (itemContext.fileState.progress / 100) * circumference

			return (
				<ItemProgressPrimitive
					role="progressbar"
					data-slot="file-upload-progress"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={progressValue}
					aria-valuetext={`${progressValue}%`}
					aria-labelledby={itemContext.nameId}
					className={cn(
						"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
						className
					)}
					{...props}
				>
					{children ?? (
						<svg
							className="-rotate-90 transform overflow-visible"
							width={size}
							height={size}
							viewBox={`0 0 ${size} ${size}`}
							fill="none"
							stroke="currentColor"
						>
							<title>Circle SVG</title>
							<circle
								data-slot="progress-circular-inner"
								className="text-primary/20"
								strokeWidth={strokeWidth}
								cx={size / 2}
								cy={size / 2}
								r={(size - 4) / 2}
							/>
							<circle
								data-slot="progress-circular-outer"
								className="text-primary transition-[stroke-dashoffset] duration-300 ease-linear"
								strokeWidth={strokeWidth}
								strokeLinecap="round"
								strokeDasharray={circumference}
								strokeDashoffset={strokeDashoffset}
								cx={size / 2}
								cy={size / 2}
								r={(size - 4) / 2}
							/>
						</svg>
					)}
				</ItemProgressPrimitive>
			)
		}
	}
}

function FileUploadItemProgressLabel({
	className,
	forceMount
}: {
	className?: string
	forceMount?: boolean
}) {
	const itemContext = useItemContext("file-upload-item-progress")
	const progressValue = itemContext.fileState.progress
	const shouldRender = forceMount || (progressValue > 0 && progressValue < 100)
	if (!shouldRender) return null
	return (
		<span className={cn("text-xs tabular-nums", className)}>{`${progressValue}%`}</span>
	)
}

function FileUploadItemProgressWithLabel({
	labelPosition = "right",
	forceMount,
	className
}: {
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
}) {
	const itemContext = useItemContext("file-upload-item-progress")
	const progressValue = itemContext.fileState.progress
	const shouldRender = forceMount || (progressValue > 0 && progressValue < 100)
	if (!shouldRender) return null

	switch (labelPosition) {
		case "right":
			return (
				<div
					data-slot="file-upload-progress-with-label"
					className={cn("flex w-full items-center gap-3", className)}
				>
					<FileUploadItemProgress variant="linear" forceMount={forceMount} />
					<FileUploadItemProgressLabel
						className="shrink-0 font-medium"
						forceMount={forceMount}
					/>
				</div>
			)
		case "bottom":
			return (
				<div
					data-slot="file-upload-progress-with-label"
					className={cn("flex w-full flex-col items-end gap-2", className)}
				>
					<FileUploadItemProgress variant="linear" forceMount={forceMount} />
					<FileUploadItemProgressLabel className="font-medium" forceMount={forceMount} />
				</div>
			)
		case "top-floating":
			return (
				<div
					data-slot="file-upload-progress-with-label"
					className={cn("relative flex w-full flex-col items-end gap-2", className)}
				>
					<FileUploadItemProgress variant="linear" forceMount={forceMount} />
					{forceMount && (
						<div
							style={{ left: `${progressValue}%` }}
							className="absolute -top-2 -translate-x-1/2 -translate-y-full rounded-lg bg-background px-2 py-1 shadow-lg ring-1 ring-border"
						>
							<FileUploadItemProgressLabel forceMount={forceMount} />
						</div>
					)}
				</div>
			)
		case "bottom-floating":
			return (
				<div
					data-slot="file-upload-progress-with-label"
					className={cn("relative flex w-full flex-col items-end gap-2", className)}
				>
					<FileUploadItemProgress variant="linear" forceMount={forceMount} />
					{forceMount && (
						<div
							style={{ left: `${progressValue}%` }}
							className="absolute -bottom-2 -translate-x-1/2 translate-y-full rounded-lg bg-background px-2 py-1 shadow-lg ring-1 ring-border"
						>
							<FileUploadItemProgressLabel forceMount={forceMount} />
						</div>
					)}
				</div>
			)
	}
}

function FileUploadItemDelete({
	children,
	asChild = false,
	className,
	onClick,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean
}) {
	const rootContext = useFileUploadContext("file-upload-item-delete")
	const itemContext = useItemContext("file-upload-item-delete")

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
		if (event.defaultPrevented) return

		const fileToRemove = itemContext.fileState.file
		rootContext.dispatch({
			type: "SET_DELETED_FILE",
			file: fileToRemove,
			fileState: itemContext.fileState
		})
		rootContext.dispatch({
			type: "SET_INVALID",
			isInvalid: false
		})
		rootContext.onValueChange(rootContext.value.filter((f) => f !== fileToRemove))
	}

	const ItemDeletePrimitive = asChild ? Slot : "button"

	return (
		<ItemDeletePrimitive
			type="button"
			data-slot="file-upload-item-delete"
			data-status={itemContext.fileState.status}
			aria-controls={itemContext.id}
			aria-label="Delete file"
			aria-describedby={itemContext.nameId}
			className={cn("text-muted-foreground", className)}
			onClick={handleClick}
			{...props}
		>
			{children ?? <XIcon className="size-4" />}
		</ItemDeletePrimitive>
	)
}

function FileUploadItemRetry({
	asChild = false,
	children,
	onClick,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean
}) {
	const rootContext = useFileUploadContext("file-upload-item-retry")
	const itemContext = useItemContext("file-upload-item-retry")
	const file = itemContext.fileState.file

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
		if (!itemContext.fileState || event.defaultPrevented || rootContext.disabled) return

		await rootContext.onUploadFiles([file])
	}

	const RetryPrimitive = asChild ? Slot : "button"

	return (
		<RetryPrimitive
			type="button"
			data-slot="file-upload-item-retry"
			aria-controls={itemContext.id}
			aria-label="Retry file"
			aria-describedby={itemContext.nameId}
			onClick={handleClick}
			{...props}
		>
			{children ?? (
				<span className="text-destructive text-sm hover:underline">Try again</span>
			)}
		</RetryPrimitive>
	)
}

function FileUploadItemCancel({
	asChild = false,
	children,
	onClick,
	className,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean
	className?: string
}) {
	const rootContext = useFileUploadContext("file-upload-item-cancel")
	const itemContext = useItemContext("file-upload-item-cancel")
	const file = itemContext.fileState.file
	const abortControllerMap = rootContext.abortControllerMap

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
		if (event.defaultPrevented || rootContext.disabled) return

		const abortController = abortControllerMap.get(file)
		if (abortController) {
			abortController.abort()
			rootContext.dispatch({ type: "SET_UPLOAD_CANCELLED", file: file })
		}
	}

	// Only show cancel button when file is uploading
	if (itemContext.fileState.status !== "uploading") return null

	const CancelPrimitive = asChild ? Slot : "button"

	return (
		<CancelPrimitive
			type="button"
			data-slot="file-upload-item-cancel"
			data-status={itemContext.fileState.status}
			aria-controls={itemContext.id}
			aria-label="Cancel upload"
			aria-describedby={itemContext.nameId}
			onClick={handleClick}
			className={cn("text-muted-foreground hover:text-foreground", className)}
			{...props}
		>
			{children ?? <FileX className="size-4" />}
		</CancelPrimitive>
	)
}

function FileUploadSubmit({
	className,
	asChild = false,
	children
}: {
	className?: string
	children?: React.ReactNode
	asChild?: boolean
}) {
	const rootContext = useFileUploadContext("file-upload-submit")
	const files = rootContext.fileMap.keys().toArray()
	const fileCount = rootContext.fileMap.size
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		setLoading(true)
		await rootContext.onUploadFiles(files)
		setLoading(false)
	}

	if (fileCount === 0) return null

	const SubmitPrimitive = asChild ? Slot : "button"

	return (
		<SubmitPrimitive
			type="button"
			disabled={loading}
			data-slot="file-upload-submit"
			aria-label="Submit files"
			aria-disabled={loading}
			onClick={handleClick}
			className={cn("relative", className)}
		>
			{children ?? <span className="text-sm">Upload files</span>}
		</SubmitPrimitive>
	)
}

function FileUploadMedia({
	className,
	variant = "default",
	...props
}: {
	className?: string
	variant: "default" | "icon" | "image"
	children?: React.ReactNode
}) {
	const variants = {
		default: "bg-transparent",
		icon: "size-8 rounded-sm border bg-input/30 [&_svg:not([class*='size-'])]:size-4",
		image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover"
	}

	return (
		<div
			data-slot="file-upload-media"
			className={cn(
				"flex shrink-0 items-center justify-center gap-2 [&_svg]:pointer-events-none",
				variants[variant],
				className
			)}
			{...props}
		/>
	)
}

export {
	FileUploadRoot as FileUpload,
	FileUploadDropzone,
	FileUploadTrigger,
	FileUploadList,
	FileUploadItem,
	FileUploadItemPreview,
	FileUploadItemMetadata,
	FileUploadItemName,
	FileUploadItemSize,
	FileUploadItemStatus,
	FileUploadItemErrorMessage,
	FileUploadItemProgressWithLabel,
	FileUploadItemProgress,
	FileUploadItemProgressLabel,
	FileUploadItemDelete,
	FileUploadItemRetry,
	FileUploadItemCancel,
	FileUploadSubmit,
	FileUploadMedia,
	getFileSizeFromBytes,
	truncateText,
	type FileUploadProps
}
