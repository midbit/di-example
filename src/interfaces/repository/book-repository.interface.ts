import Book from "../../domain/models/book.ts"

interface BookRepositoryInterface {
	find(id?: number): Promise<Book[]>
	update(book: Book): Promise<void>
}

export default BookRepositoryInterface