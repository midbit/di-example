class Book {
	constructor(
		public readonly id: number,
		public title: string,
		public author: string, 
		public isAvailable: boolean
	){}
}

export default Book