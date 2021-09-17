
import {BookControllerInterface} from "../../interfaces/controller/index.ts"
import {BookServiceInterface} from "../../interfaces/service/index.ts"

class BookController implements BookControllerInterface {
	constructor(private readonly service: BookServiceInterface){}
	browse(context: any): void {
		const books = this.service.browse()
		context.response.body = books
	}
	return(context: any): void{
		const id = context.params.id
		this.service.return(id)
		context.response.body = "Successful"

	}
	borrow(context: any): void{
		const id = context.params.id
		this.service.borrow(id)
		context.response.body = "Successful"
	}
}

export default BookController