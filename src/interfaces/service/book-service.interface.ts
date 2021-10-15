import Book from "../../domain/models/book.ts"

interface BookServiceInterface {
	borrow(id: number): Promise<void>
	return(id: number): Promise<void>
	browse(): Promise<Book[]>
}

export default BookServiceInterface