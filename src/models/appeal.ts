export interface IAppeal {
	id: string
	createdAt: string
	updatedAt: string

	title: string
	description: string
	status: string

	completeSolution?: string
	cancelReason?: string
}

export let items: IAppeal[] = []
