import Book from "../../domain/models/book.ts"

interface BookRepositoryInterface {
	find(id?: number): Book[]
	update(book: Book): void
}

export default BookRepositoryInterface