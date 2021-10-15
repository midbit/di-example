import {Book} from "../../domain/models/index.ts"
import {BookRepositoryInterface} from "../../interfaces/repository/index.ts"

class BookRepository implements BookRepositoryInterface  {
	private database = [
		new Book(1, "The Little Prince", "Antoine De Saint-Exupery", true),
		new Book(2, "Pride and Prejudice", "Jane Austen", true),
		new Book(3, "Moby Dick", "Herman Melville", true)
	]

	find(id?: number): Promise<Book[]> {
		if(id) {
			return Promise.resolve(this.database.filter((book) => id == book.id).sort((firstBook, secondBook) => firstBook.id < secondBook.id? 1: -1))
		}
		return Promise.resolve(this.database.sort((firstBook, secondBook) => firstBook.id < secondBook.id? -1: 1))
	}

	update(updatedBook: Book): Promise<void> {
		const originalLength = this.database.length
		const filteredLength= this.database.filter((book) => book.id != updatedBook.id)
		if(originalLength === filteredLength.length) {
			throw new Error("Book not found")
		}
		this.database = [...filteredLength, {...updatedBook}]
		return Promise.resolve()
	}
}

export default BookRepository