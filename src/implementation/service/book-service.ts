import {BookServiceInterface} from "../../interfaces/service/index.ts"
import {BookRepositoryInterface} from "../../interfaces/repository/index.ts"

import Book from "../../domain/models/book.ts"
class BookService implements BookServiceInterface {

	constructor(private readonly repository: BookRepositoryInterface){}
	
	async borrow(id: number): Promise<void> {
		const books = await this.repository.find(id)
		const book = books?.[0]
		if(!book){
			return Promise.reject(new Error("Book not found"))
		}
		if(!book.isAvailable) {
			return Promise.reject(new Error("Book is not available"))
		}
		await this.repository.update(new Book(id, book.title, book.author, false))
	}

	async return(id: number): Promise<void> {
		const books = await this.repository.find(id)
		const book = books?.[0]
		if(!book){
			return Promise.reject(new Error("Book not found"))
		}
		if(book.isAvailable) {
			return Promise.reject(new Error("Duplicated Book"))
		}
		await this.repository.update(new Book(id, book.title, book.author, true))
	}
	
	async browse(): Promise<Book[]> {
		return await this.repository.find()
	}

}

export default BookService