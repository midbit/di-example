
import {BookControllerInterface} from "../../interfaces/controller/index.ts"
import {BookServiceInterface} from "../../interfaces/service/index.ts"

class BookController implements BookControllerInterface {
	constructor(private readonly service: BookServiceInterface){}
	async browse(context: any): Promise<void> {
		const books = await this.service.browse()
		context.response.body = books
	}
	async return(context: any): Promise<void>{
		const id = context.params.id
		await this.service.return(id)
		context.response.body = "Successful"

	}
	async borrow(context: any): Promise<void>{
		const id = context.params.id
		await this.service.borrow(id)
		context.response.body = "Successful"
	}
}

export default BookController