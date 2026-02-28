type ArrayPropertyConfig<T extends readonly string[]> = {
	type: "array"
	enum: T
	default: T[number]
}

const arrayProperty = <T extends readonly string[]>(config: ArrayPropertyConfig<T>) =>
	config

type PropertyConfig =
	| ArrayPropertyConfig<readonly string[]>
	| {
			type: "boolean"
			default: boolean
	  }
	| {
			type: "input"
			default: string
	  }
	| {
			type: "number"
			default: number
	  }
// | {
//   type: "children"
// }

type ComponentProperties = Record<string, PropertyConfig>

const Index = {
	"button-demo": {
		disabled: {
			type: "boolean",
			default: false
		},
		loading: {
			type: "boolean",
			default: false
		},
		variant: arrayProperty({
			type: "array",
			enum: [
				"default",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
				"brand-primary",
				"brand-secondary",
				"brand-tertiary",
				"brand-neutral-primary",
				"brand-neutral-secondary",
				"brand-neutral-tertiary",
				"brand-destructive-primary",
				"brand-destructive-secondary",
				"brand-destructive-tertiary"
			] as const,
			default: "default"
		}),
		size: arrayProperty({
			type: "array",
			enum: ["default", "sm", "lg", "icon-sm", "icon", "icon-lg"] as const,
			default: "default"
		})
	},
	"copy-button-demo": {
		textToCopy: {
			type: "input",
			default: "Merry Christmas 🎄⛄❄️"
		},
		animationDuration: {
			type: "number",
			default: 2000
		},
		variant: arrayProperty({
			type: "array",
			enum: [
				"default",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
				"brand-primary",
				"brand-secondary",
				"brand-tertiary",
				"brand-neutral-primary",
				"brand-neutral-secondary",
				"brand-neutral-tertiary",
				"brand-destructive-primary",
				"brand-destructive-secondary",
				"brand-destructive-tertiary"
			] as const,
			default: "outline"
		}),
		size: arrayProperty({
			type: "array",
			enum: ["default", "sm", "lg", "icon-sm", "icon", "icon-lg"] as const,
			default: "icon-sm"
		})
	},
	"file-upload-demo": {
		maxFiles: {
			type: "number",
			default: 5
		},
		maxSize: {
			type: "number",
			default: 1024 * 1024 * 10
		},
		multiple: {
			type: "boolean",
			default: true
		},
		accept: {
			type: "input",
			default: ""
		},
		disabled: {
			type: "boolean",
			default: false
		}
	},
	"timeline-demo": {
		activeIndex: {
			type: "number",
			default: -1
		},
		lineWidth: {
			type: "number",
			default: 3
		},
		bulletSize: {
			type: "number",
			default: 20
		},
		reverse: {
			type: "boolean",
			default: false
		},
		orientation: arrayProperty({
			type: "array",
			enum: ["vertical", "horizontal"] as const,
			default: "vertical"
		}),
		variant: arrayProperty({
			type: "array",
			enum: ["default", "alternate"] as const,
			default: "default"
		})
	}
} satisfies Record<string, ComponentProperties>

export { type PropertyConfig, type ComponentProperties, Index }
