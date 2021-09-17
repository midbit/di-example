import {BookServiceInterface} from "../../interfaces/service/index.ts"
import {BookRepositoryInterface} from "../../interfaces/repository/index.ts"

import Book from "../../domain/models/book.ts"
class BookService implements BookServiceInterface {

	constructor(private readonly repository: BookRepositoryInterface){}
	
	borrow(id: number): void {
		const book = this.repository.find(id)?.[0]
		console.log(book)
		if(!book){
			throw new Error("Book not found")
		}
		if(!book.isAvailable) {
			throw new Error("Book is not available")
		}
		this.repository.update(new Book(id, book.title, book.author, false))
	}

	return(id: number): void {
		const book = this.repository.find(id)?.[0]
		if(!book){
			throw new Error("Book not found")
		}
		if(book.isAvailable) {
			throw new Error("Duplicated Book")
		}
		this.repository.update(new Book(id, book.title, book.author, true))
	}
	
	browse(): Book[] {
		return this.repository.find()
	}

}

export default BookService