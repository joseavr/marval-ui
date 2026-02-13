import { NextResponse } from "next/server"

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = [
	"image/*",
	"video/*",
	"application/pdf",
	".pdf",
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
	".mp4",
	".webm",
	".mov"
]

function isAcceptedType(file: File): boolean {
	const type = file.type
	const ext = file.name.split(".").pop()?.toLowerCase() ?? ""
	return ACCEPTED_TYPES.some((accepted) => {
		if (accepted.startsWith(".")) return ext === accepted.slice(1)
		if (accepted.endsWith("/*")) {
			const prefix = accepted.slice(0, -1) // e.g. "image"
			return type.startsWith(`${prefix}/`)
		}
		return type === accepted
	})
}

export async function POST(request: Request) {
	try {
		// validate cotent-type to be form-data
		const contentType = request.headers.get("content-type") ?? ""
		if (!contentType.includes("multipart/form-data")) {
			return NextResponse.json(
				{ error: "Content-Type must be multipart/form-data" },
				{ status: 400 }
			)
		}

		const formData = await request.formData()
		const file = formData.get("file")

		// validate it's a file

		// validate file does not reach max file size

		// validate file type is accepted

		// save to storage/S3/etc.

		// Optionally read bytes to validate: await file.arrayBuffer()
		return NextResponse.json({
			success: true,
		})
	} catch (error) {
		const message = error instanceof Error ? error.message : "Upload failed"
		return NextResponse.json(
			{ error: message },
			{ status: 500 }
		)
	}
}
