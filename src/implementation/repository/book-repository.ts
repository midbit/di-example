import {Book} from "../../domain/models/index.ts"

class BookRepository {
	private database = [
		new Book(1, "The Little Prince", "Antoine De Saint-Exupery", true),
		new Book(2, "Pride and Prejudice", "Jane Austen", true),
		new Book(3, "Moby Dick", "Herman Melville", true)
	]

	find(id?: number): Book[] {
		if(id) {
			return this.database.filter((book) => id == book.id).sort((firstBook, secondBook) => firstBook.id < secondBook.id? 1: -1)
		}
		return this.database.sort((firstBook, secondBook) => firstBook.id < secondBook.id? -1: 1)
	}

	update(updatedBook: Book): void {
		const originalLength = this.database.length
		const filteredLength= this.database.filter((book) => book.id != updatedBook.id)
		if(originalLength === filteredLength.length) {
			throw new Error("Book not found")
		}
		this.database = [...filteredLength, {...updatedBook}]
	}
}

export default BookRepository